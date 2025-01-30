/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomePage from './src/pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';



function App(): React.JSX.Element {


  return (
    <NavigationContainer>
           <HomePage/>
    </NavigationContainer>
  );
}


export default App;
