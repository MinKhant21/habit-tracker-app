import { useAuth } from '@/lib/auth-context'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const index = () => {
  const {signOut} = useAuth()
  return (
    <View>
      <Text>Home Page</Text>
     
      <Link href="/login">Login</Link>

      <Button  onPress={signOut} >Sign Out</Button>
    </View>
  )
}

export default index