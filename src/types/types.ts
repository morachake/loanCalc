export interface LoanFormData {
  bank: string
  loan_amount: string
  loan_term_years: string
  loan_term_months: string
  interest_rate: string
  compound_period:
    | "ANNUALLY"
    | "SEMI_ANNUALLY"
    | "QUARTERLY"
    | "MONTHLY_APR"
    | "SEMI_MONTHLY"
    | "BIWEEKLY"
    | "WEEKLY"
    | "DAILY"
    | "CONTINUOUS"
  payment_frequency:
    | "EVERYDAY"
    | "EVERY_WEEK"
    | "EVERY_WEEKS"
    | "EVERY_HALF_MONTH"
    | "EVERY_MONTH"
    | "EVERY_6_MONTHS"
    | "ANNUALLY"
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
  payment_amount: string
  total_payments: number
  total_interest: string
  total_cost: string
  amortization_schedule: AmortizationEntry[]
  annual_rate: number
  loan_term_years: number
  loan_term_months: number
  loan_amount: string
  payment_frequency: string
}

export interface AppContextType {
  loanData: LoanCalculationResult | null
  loading: boolean
  error: string | null
  calculateLoan: (formData: LoanFormData) => Promise<void>
}

