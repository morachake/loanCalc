import type React from "react"
import { AppProvider } from "./src/context/AppContext"
import HomePage from "./src/pages/HomePage"


const App: React.FC = () => {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App

