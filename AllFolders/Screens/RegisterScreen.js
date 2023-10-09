import { StyleSheet, Text, View, TouchableOpacity, Pressable, KeyboardAvoidingView, SafeAreaView, TextInput, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { Zocial } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const changeScreen = useNavigation()

    const handleSignUp = () => {
      const user = {
        name: name,
        email: email,
        password: password
      }
      
      // Send a Post request to the Backend API
      console.log("User ✅",user)
      axios.post("http://192.168.53.85:8000/register", user).then((response) => {
        // console.log('Response ✅',response)
        Alert.alert('Registration Successful','You have successfully registered')
        setEmail('')
        setPassword('')
        setName('')
        changeScreen.navigate('Login')
      }).catch((error) => {
        Alert.alert('Registration Error', 'Error while Registering')
        console.log('Registration Error ❎ : ', error)
      })
    }

  return (
    <SafeAreaView style={styles.mainContainer}>

     {/* Image Icon View */}
      <View>
        <TouchableOpacity>
            <Image style={{height: 100, width: 150}}
                source={{uri : 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png'}}
            />
        </TouchableOpacity>
      </View>

      {/* Login to your account */}

        <KeyboardAvoidingView>
            <View style={{ marginTop: 12}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Register a new Account</Text>
            </View>
        </KeyboardAvoidingView>

        {/* Enter Name, Email and Password */}

        <View style={{marginTop: 50}}>
            <View style={styles.epContainer}>
                <FontAwesome5 name="user-tie" size={24} color="#6b6b6a" />
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder='name'
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.epText}
                />
            </View>
            <View style={styles.epContainer}>
                <Zocial name="email" size={24} color="#6b6b6a" />
                <TextInput 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder='email' 
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={[styles.epText, {fontSize: email ? 15 : 14}]}/>
            </View>
            <View style={styles.epContainer}>
                <MaterialCommunityIcons name="account-lock" size={24} color="#6b6b6a" />
                <TextInput 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='password' 
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    autoCorrect={false}
                    style={styles.epText} />
            </View>

            {/* kepp me signin and forgot password */}

            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                <TouchableOpacity>
                    <Text style={{fontSize: 13}}>Keep me signin</Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}

            <Pressable style={styles.btn} onPress={handleSignUp}>
                <Text style={{color: '#fcfbfa', fontWeight: '700', fontSize: 18}}>Signup</Text>
            </Pressable>

            {/* Create Account */}
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
                <Text style={{fontSize: 14, fontWeight: '400'}}>Already have an account ? </Text>
                <TouchableOpacity onPress={() => changeScreen.navigate("Login")}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: '#03a9fc'}}>Login</Text>
                </TouchableOpacity>
            </View>
            

        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
},
epContainer: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    gap: 8,
    borderRadius: 4,
    paddingLeft: 5,
    marginTop: 30,
    borderWidth: 0.2,
    borderColor: '#c9c9c9'
},
epText: {
    width: 270,
    height: 40,
    fontWeight: '600',
},
forgotpass: {
    color: '#03a9fc',
    fontWeight: '600'
},
btn: {
    backgroundColor: '#fabe5c',
    width: 150,
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60
},
})

export default RegisterScreen