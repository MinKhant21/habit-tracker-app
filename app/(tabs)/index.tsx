import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View>
      <Text>Home Page</Text>
     
      <Link href="/login">Login</Link>
    </View>
  )
}

export default index