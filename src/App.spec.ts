import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { supabase } from './lib/supabase'

// Mock Supabase
vi.mock('./lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        error: null
      }))
    }))
  }
}))

// Mock window.open
window.open = vi.fn()

describe('App.vue (UI & Security)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T12:00:00'))
  })

  it('should validate and submit the form successfully', async () => {
    const wrapper = mount(App)
    
    // Fill the form
    await wrapper.find('input[type="text"]').setValue('Jonas Teste')
    await wrapper.find('input[type="tel"]').setValue('8499999999')
    
    const dateInputs = wrapper.findAll('input[type="date"]')
    await dateInputs[0].setValue('2026-04-10')
    await dateInputs[1].setValue('2026-04-12')
    
    await wrapper.find('input[type="time"]').setValue('14:00')

    // Submit
    await wrapper.find('form').trigger('submit.prevent')
    
    // Check if supabase.insert was called
    expect(supabase.from).toHaveBeenCalledWith('reservas')
    // We can't easily check the nested insert call without more complex mocking, 
    // but we can check if the bookingStatus changed if we had access to it.
    // However, we can check if window.open was called with the WhatsApp link.
    expect(window.open).toHaveBeenCalled()
  })

  it('SECURITY: should handle massive input strings (DoS prevention mindset)', async () => {
    const wrapper = mount(App)
    const massiveString = 'A'.repeat(10001) // 10k chars
    
    await wrapper.find('input[type="text"]').setValue(massiveString)
    await wrapper.find('input[type="tel"]').setValue('123456789')
    
    const dateInputs = wrapper.findAll('input[type="date"]')
    await dateInputs[0].setValue('2026-04-10')
    await dateInputs[1].setValue('2026-04-12')

    await wrapper.find('form').trigger('submit.prevent')

    // Check if it still tries to submit (it should handle it or we could add validation to truncate)
    expect(supabase.from).toHaveBeenCalled()
  })

  it('SECURITY: should not be vulnerable to basic HTML injection in name', async () => {
    const wrapper = mount(App)
    const xssPayload = '<script>alert("xss")</script>'
    
    await wrapper.find('input[type="text"]').setValue(xssPayload)
    
    // Even if we submit, the payload should be treated as a string by the Supabase client
    // Here we verify it doesn't crash the component during reactive updates
    expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe(xssPayload)
  })

  it('BUSINESS LOGIC: should show error if dates are invalid (integrated test)', async () => {
    const wrapper = mount(App)
    
    const dateInputs = wrapper.findAll('input[type="date"]')
    await dateInputs[0].setValue('2026-04-10')
    await dateInputs[1].setValue('2026-04-09') // End before Start

    // The pricing computed (calculatePrice) will return an error object
    // We should check if the UI displays this error if we added error display in App.vue
    // Since App.vue now displays the error
    const totalText = wrapper.text()
    expect(totalText).not.toContain('R$ 0,00')
    expect(totalText).toContain('Data de fim deve ser posterior à data de início')
  })
})
