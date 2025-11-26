import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, SegmentedButtons, TextInput } from 'react-native-paper'

const FREQUENCY = ["Daily","Monthly","Yearly"]
const AddHabitScreen = () => {

  const [title , setTitle ] = useState<String | null>("")
  const [description , setDescription ] = useState<String | null>("")
  const [frequency , setFrequency ] = useState<String | null>("Daily")

  return (
    <View style={styles.container}>

      <TextInput 
        name ="Title" mode='outlined' placeholder='Enter Title'
        style={styles.title}
        onChangeText={(value)=>setTitle(value)}
      />

      <TextInput  
        onChangeText={(value)=>setDescription(value)}
        style={styles.description} 
        name ="Description" mode='outlined' 
        placeholder='Enter Description'
      />

      

      <SegmentedButtons
        onValueChange={(value)=>setFrequency(value)}
       style={styles.segmentBtn}
        buttons={FREQUENCY.map((freq)=>(
          {
            label : freq,
            value : freq,
         }
        ))}
      />
      <Button
        mode='contained'
      >
        Add Habit
      </Button>
       
    </View>
  )
}

const  styles = StyleSheet.create({
  container : {
      flex : 1 ,
      justifyContent:"center",
     padding : 20,
  },

  title : {
    marginBottom : 16
  },

  description : {
    marginBottom : 16
  },

  segmentBtn : {
    marginBottom : 24
  }

})

export default AddHabitScreen