import React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import type { LoanFormData, LoanCalculationResult } from "../types/types"

interface AppContextType {
  formData: LoanFormData | null
  loanData: LoanCalculationResult | null
  loading: boolean
  error: string | null
  setFormData: (data: LoanFormData) => void
  calculateLoan: (formData: LoanFormData) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<LoanFormData | null>(null)
  const [loanData, setLoanData] = useState<LoanCalculationResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const calculateLoan = async (data: LoanFormData): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://localhost:8000/api/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result: LoanCalculationResult = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }
      setLoanData(result)
      setFormData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppContext.Provider value={{ formData, loanData, loading, error, setFormData, calculateLoan }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

