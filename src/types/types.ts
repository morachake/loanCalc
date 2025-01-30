export interface LoanFormData {
  bank: string
  loan_amount: string
  loan_term_years: string
  loan_term_months: string
  interest_rate: string
  compound_period: "ANNUALLY" | "SEMI_ANNUALLY" | "QUARTERLY" | "MONTHLY_APR" | "SEMI_MONTHLY" | "BIWEEKLY" | "WEEKLY" | "DAILY" | "CONTINUOUS"
  payment_frequency: "EVERYDAY" | "EVERY_WEEK" | "EVERY_WEEKS" | "EVERY_HAIF_AMONTH" | "EVERY_MONTH" | "EVERY_6_MONTHS" | "ANNUALLY"
}

export interface AmortizationEntry {
  payment_number: number
  beginning_balance: string
  payment_amount: string
  principal_amount: string
  interest_amount: string
  ending_balance: string
}

export interface LoanCalculationResult {
  monthly_payment: string
  total_payments: number
  total_interest: string
  amortization_schedule: AmortizationEntry[]
}

export interface AppContextType {
  loanData: LoanCalculationResult | null
  loading: boolean
  error: string | null
  calculateLoan: (formData: LoanFormData) => Promise<void>
}

