import  React from "react"
import { useEffect, useState } from "react"
import { AppProvider } from "./src/context/AppContext"
import HomePage from "./src/pages/HomePage"
import BootSplash from "react-native-bootsplash"
import SplashScreen from "./src/pages/SplashScreen"

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)) 
    }

    init().finally(async () => {
      await BootSplash.hide({ fade: true })
      console.log("BootSplash has been hidden successfully")
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App

