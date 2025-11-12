import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
   <>
    <Tabs>
      <Tabs.Screen name="index" 
        options={{ 
          title: 'Home' ,
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ color, size ,focused }) =>{
            return focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <Entypo name="home" size={24} color="gray" />
            ) 
          }
        }}
      
      />
      <Tabs.Screen name="login" 
        options={{ 
          title: 'Login' ,
          tabBarActiveTintColor: 'coral'
        }}
      />
    </Tabs>
   </>
  );
}
