/**
 * Formats a number or string value as currency
 * @param value The value to format as currency
 * @param defaultValue Optional default value if the input is invalid
 * @returns Formatted currency string
 */
export const formatCurrency = (value: string | number | undefined | null, defaultValue = "$0.00"): string => {
    if (value === undefined || value === null) return defaultValue
  
    const numericValue = typeof value === "string" ? Number.parseFloat(value) : value
    if (isNaN(numericValue)) return defaultValue
  
    return `$${numericValue.toFixed(2)}`
  }
  
  /**
   * Formats a payment frequency string to be more readable
   * @param frequency The payment frequency string
   * @param defaultValue Optional default value if the input is invalid
   * @returns Formatted payment frequency string
   */
  export const formatPaymentFrequency = (frequency: string | undefined | null, defaultValue = "Monthly"): string => {
    if (!frequency) return defaultValue
  
    return frequency
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  
  /**
   * Formats a percentage value
   * @param value The value to format as percentage
   * @param decimals Number of decimal places
   * @param defaultValue Optional default value if the input is invalid
   * @returns Formatted percentage string
   */
  export const formatPercentage = (
    value: number | string | undefined | null,
    decimals = 2,
    defaultValue = "0%",
  ): string => {
    if (value === undefined || value === null) return defaultValue
  
    const numericValue = typeof value === "string" ? Number.parseFloat(value) : value
    if (isNaN(numericValue)) return defaultValue
  
    return `${numericValue.toFixed(decimals)}%`
  }
  
  /**
   * Formats a loan term
   * @param years Number of years
   * @param months Number of months
   * @returns Formatted loan term string
   */
  export const formatLoanTerm = (years: number | undefined | null, months: number | undefined | null): string => {
    const y = years || 0
    const m = months || 0
    return `${y}y ${m}m`
  }
  

  export const Banks = [
    {
      id: 1,
      name: "Equity",
      interestRate: 3.5,
    },
    {
      id: 2,
      name: "NCBA",
      interestRate: 3.25,
    },
    {
      id: 3,
      name: "STANBIC",
      interestRate: 3.75,
    },
    {
      id: 4,
      name: "KCB",
      interestRate: 3.6,
    },
    {
      id: 5,
      name: "DTB",
      interestRate: 3.45,
    },
  ]