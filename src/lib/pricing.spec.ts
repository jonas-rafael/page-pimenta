import { describe, it, expect, beforeEach, vi } from 'vitest'
import { calculatePrice } from './pricing'

describe('calculatePrice (Business Logic & Security)', () => {
  beforeEach(() => {
    // Set system time to a fixed date for consistent tests
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T12:00:00'))
  })

  it('should calculate normal pricing (300 per day)', () => {
    const result = calculatePrice('2026-04-10', '2026-04-11')
    expect(result.total).toBe(300)
    expect(result.days).toBe(1)
  })

  it('should calculate weekend package (Friday to Monday)', () => {
    const result = calculatePrice('2026-04-10', '2026-04-13') // Friday to Monday
    expect(result.total).toBe(800)
    expect(result.isPackage).toBe(true)
  })

  it('should calculate weekend package with holiday (Friday is holiday)', () => {
    // 2026-04-03 is Sexta Santa (Friday)
    const result = calculatePrice('2026-04-03', '2026-04-06')
    expect(result.total).toBe(900)
    expect(result.isPackage).toBe(true)
  })

  // SECURITY / ABUSE CASES
  it('SECURITY: should not allow booking in the past', () => {
    const result = calculatePrice('2026-03-31', '2026-04-01')
    expect(result.total).toBe(0)
    expect(result.error).toBe('Data de início não pode ser no passado')
  })

  it('SECURITY: should not allow check-out before check-in', () => {
    const result = calculatePrice('2026-04-10', '2026-04-09')
    expect(result.total).toBe(0)
    expect(result.error).toBe('Data de fim deve ser posterior à data de início')
  })

  it('SECURITY: should handle empty strings gracefully', () => {
    const result = calculatePrice('', '')
    expect(result.total).toBe(0)
    expect(result.days).toBe(0)
  })

  it('SECURITY: should handle invalid date formats', () => {
    const result = calculatePrice('invalid-date', '2026-04-10')
    expect(result.total).toBe(0)
    expect(result.error).toBe('Datas inválidas')
  })
})
