export const feriados2026 = [
  '2026-01-01', // Ano Novo
  '2026-02-16', // Carnaval
  '2026-02-17', // Carnaval
  '2026-04-03', // Sexta Santa
  '2026-04-21', // Tiradentes
  '2026-05-01', // Trabalho
  '2026-06-04', // Corpus Christi
  '2026-09-07', // Independência
  '2026-10-12', // Aparecida
  '2026-11-02', // Finados
  '2026-11-15', // Proclamação
  '2026-11-20', // Consciência Negra
  '2026-12-25', // Natal
]

export interface PricingResult {
  total: number
  days: number
  isPackage?: boolean
  error?: string
}

export function calculatePrice(dataInicio: string, dataFim: string): PricingResult {
  if (!dataInicio || !dataFim) return { total: 0, days: 0 }

  const start = new Date(dataInicio + 'T12:00:00')
  const end = new Date(dataFim + 'T12:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Security/Business Rule: No past dates
  if (start < today) {
    return { total: 0, days: 0, error: 'Data de início não pode ser no passado' }
  }

  const diffTime = end.getTime() - start.getTime()
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (isNaN(diffDays) || diffDays <= 0) {
    return { total: 0, days: 0, error: isNaN(diffDays) ? 'Datas inválidas' : 'Data de fim deve ser posterior à data de início' }
  }

  const startDay = start.getUTCDay()
  const isWeekendPackage = diffDays === 3 && (startDay === 5 || startDay === 6)

  if (isWeekendPackage) {
    const hasHolidayOnCriticalDays = feriados2026.some(f => {
      const holidayDate = new Date(f + 'T12:00:00')
      const hDay = holidayDate.getUTCDay()
      // If holiday is Friday (5) or Monday (1)
      if (hDay !== 5 && hDay !== 1) return false
      return holidayDate >= start && holidayDate <= end
    })

    if (hasHolidayOnCriticalDays) {
      return { total: 900, days: diffDays, isPackage: true }
    }
    return { total: 800, days: diffDays, isPackage: true }
  }

  return { total: diffDays * 300, days: diffDays }
}
