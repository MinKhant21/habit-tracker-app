import { useAuth } from '@/lib/auth-context';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const AuthScreen = () => {

    const [isSignUp, setIsSignUp] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');

    const {signUp, signIn} = useAuth();

    const handleSignUpPress = () => {
        setIsSignUp((prev)=>!prev);
    }

    const handleSubmit = async() => {
        if(email == '' || password == ''){
            alert('Please fill in all fields');
            return;
        }
        
        try {
            if(isSignUp){
                const error = await signUp(email, password);
                console.log('error',error)

                setError(error || '');
            }else{
                const error = await signIn(email, password);
                console.log('error',error)
                setError(error || '');
            }
            // alert('Success');
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }

            // alert(error.message);
        }
    }



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <View style={styles.contain}>

                    <Text style={styles.title} >{isSignUp ? 'Create An Account' : 'Welcome Back'}</Text>

                    <TextInput 
                        label="Email"
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        mode="outlined"
                        onChangeText={(text)=>setEmail(text)}
                        
                     />

                    <TextInput 
                        label="Password"
                        placeholder="Password"
                        keyboardType="default"
                        style={styles.input}
                        mode="outlined"
                        onChangeText={(text)=>setPassword(text)}


                     />

                     {
                        error && <Text style={{color : 'red'}} >{error}</Text>
                     }

                    <Button mode="contained" onPress={handleSubmit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Button mode="text" 
                    onPress={handleSignUpPress}
                    style={{
                        marginTop : 16,
                    }}>
                        {isSignUp ? 'Already have an account? Sign In' : 'Create an account? Sign Up'}
                    </Button>

                </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        
    },
    contain : {
        padding : 20
    },
    title : {
        fontSize : 24,
        fontWeight : 'bold',
        marginBottom : 20,
        alignSelf : 'center',
    },
    input : {
       marginBottom : 16,
    }
})

export default AuthScreen;
