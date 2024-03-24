import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthContextProvider from './src/contexts/Authcontext'
import AppNavigator from './src/AppNavigator/AppNavigator'

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  )
}

const styles = StyleSheet.create({})