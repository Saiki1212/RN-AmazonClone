import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { UserType } from '../../UserContext'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const AddingNewAddressScreen = () => {

    const changeScreen = useNavigation()

    const [name, setName] = useState('')
    const [mobileNo, setNumber] = useState('')
    const [houseNo, setFlat] = useState('')
    const [city, setArea] = useState('')
    const [landmark, setLandmark] = useState('')
    const [postalcode, setPincode] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')

    const {userId, setUserId} = useContext(UserType)

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId)
        }
        fetchUser();
      },[]);

    const handleAddingAddress = () => {
        console.log("line 36 Addingnew AddressesScreen userId --->> ;", userId)
        const address = {
            name,
            mobileNo,
            houseNo,
            city,
            landmark,
            postalcode,
            country,
            state
        }
        console.log("line 36 Addingnew AddressesScreen addresses ✅✅✅ --->> ;", address)
        axios.post("http://192.168.53.85:8000/addresses",{userId,address})
            .then((response)=> {
                // console.log('Responses 😍😍😍 : Add New Addresses : --> ' ,response)
                Alert.alert('Address added successfully')
                setName('')
                setNumber('')
                setFlat('')
                setArea('')
                setLandmark('')
                setPincode('')
                setCountry('')
                setState('')

                setTimeout(() => {
                    changeScreen.goBack()
                }, 500);

            }).catch((error => {
                Alert.alert('Error while adding Address',error)
                console.log('Error adding address : L : : : ', error)
            }))
    }

  return (
    <>
        <StatusBar backgroundColor='#00CED1'/>
        <View style={{height: 50, backgroundColor: '#00CED1', marginTop:Platform.OS==='ios'? 50:0}}/>
        <ScrollView style={{marginTop: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontSize:18, fontWeight:'500'}}>Add a new Address</Text>
                <View>
                    <Text style={styles.inputText}>Full Name</Text>
                    <TextInput 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Enter your full name'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Mobile Number</Text>
                    <TextInput 
                        value={mobileNo}
                        onChangeText={(text) => setNumber(text)}
                        placeholder='mobile number'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Flat, House-No, company</Text>
                    <TextInput 
                        value={houseNo}
                        onChangeText={(text) => setFlat(text)}
                        placeholder='House Number'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Area, sector, village</Text>
                    <TextInput 
                        value={city}
                        onChangeText={(text) => setArea(text)}
                        placeholder='Area'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Landmark</Text>
                    <TextInput 
                        value={landmark}
                        onChangeText={(text) => setLandmark(text)}
                        placeholder='Ex : Near LPU'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Pincode</Text>
                    <TextInput 
                        value={postalcode}
                        onChangeText={(text) => setPincode(text)}
                        placeholder='pincode'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Country</Text>
                    <TextInput 
                        value={country}
                        onChangeText={(text) => setCountry(text)}
                        placeholder='country'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>State</Text>
                    <TextInput 
                        value={state}
                        onChangeText={(text) => setState(text)}
                        placeholder='state'
                        placeholderTextColor={"gray"}
                        style={styles.InputStyle}
                    />
                </View>
                <Pressable style={styles.submitForm} onPress={handleAddingAddress}>
                    <Text style={styles.submitText}>Add Address</Text>
                </Pressable>
            </View>
            
        </ScrollView>
    </>
    
  )
}

const styles = StyleSheet.create({
    inputText: {
        marginTop:10,
        fontSize: 16,
        fontWeight: '500'
    },
    InputStyle: {
        padding: 10,
        borderWidth: 1,
        marginTop: 7,
        borderRadius: 5,
        borderColor: '#d7d7d7'
    },
    submitForm: {
        paddingHorizontal: 20,
        paddingVertical:15,
        backgroundColor: '#FFC72C',
        borderRadius: 6,
        marginTop: 25,
        margin: 10,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 17,
        fontWeight: '600',
    },
})

export default AddingNewAddressScreen