import { createContext, useState, useContext, type ReactNode } from "react"
import type { LoanFormData, LoanCalculationResult, AppContextType } from "../types"

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loanData, setLoanData] = useState<LoanCalculationResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const calculateLoan = async (formData: LoanFormData): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://localhost:8000/api/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data: LoanCalculationResult = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }
      setLoanData(data)
      console.log(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return <AppContext.Provider value={{ loanData, loading, error, calculateLoan }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

