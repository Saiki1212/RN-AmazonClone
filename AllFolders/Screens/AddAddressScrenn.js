import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import SearchHeader from '../Components/SearchHeader'
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {  UserType } from '../../UserContext';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';

const {width} = Dimensions.get('window')

const AddAddressScrenn = () => {
  const changeScreen = useNavigation()
  const [addresses, setAddresses] = useState([])
  const {userId, setUserId} = useContext(UserType)
  // console.log("userId", userId);

  useEffect(() => {
    fetchTheDataOfAddresses()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchTheDataOfAddresses()
    },[])
  )
  
  const fetchTheDataOfAddresses = async () => {
    try {
      // console.log("line 30 AddAddressesScreen ;")
      // console.log("line 31 AddAddressesScreen userId 🔥🔥 --->> ;", userId)
      const response = await axios.get(`http://192.168.53.85:8000/addresses/${userId}`)
      // console.log("line 33 AddAddressesScreen response  >> 🔥🔥🔥🔥 ;")
      const {addresses} = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log("Error add address screen : : 24: ", error)
    }
  }
  // console.log('Adresses ✅✅✅✅ ::: ',addresses)

  return (
    <SafeAreaView>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <SearchHeader/>

            {/* Adding Addresses .......*/}

            <View style={{marginHorizontal: 10}}>
              <Text style={{marginTop: 10, fontSize: 20, fontWeight: '600'}}>Your Addresses</Text>
              <Pressable style={styles.newAddress} onPress={() => changeScreen.navigate('NewAddress')}>
                <Text style={{fontSize:15, fontWeight:'500'}}>Add a new Address</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </Pressable>
              <Pressable>
                {/* Adding all the available addreesses ........... */}
                {addresses.map((item,index) => (
                  <Pressable key={index} style={styles.singleAddress}>
                    <View style={{flexDirection: 'row',alignItems: 'center', gap:5}}>
                      <Text style={{fontSize:16, fontWeight:'bold'}}>{item?.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>
                    <Text style={styles.t1}>{item?.houseNo},  {item?.landmark}</Text>
                    <Text style={styles.t1}>{item?.city},  {item?.landmark}</Text>
                    <Text style={styles.t1}>Phone No : {item?.mobileNo}</Text>
                    <Text style={styles.t1}>{item?.state}  {item?.country}</Text>
                    <Text style={styles.t1}>Pincode : {item?.postalcode}</Text>

                    <View style={{flexDirection:'row', marginTop: 10, gap:10}}>
                      <Pressable style={styles.default}>
                        <Text style={styles.defaultText}>Set as Default</Text>
                      </Pressable>
                      <Pressable style={styles.default}>
                        <Text style={styles.defaultText}>Edit</Text>
                      </Pressable>
                      <Pressable style={styles.default}>
                        <Text style={styles.defaultText}>Remove</Text>
                      </Pressable>
                    </View>

                  </Pressable>
                ))}
              </Pressable>

            </View> 

        </ScrollView>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  newAddress: {
    marginTop: 10,
    padding:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#c7c7c7',
    backgroundColor:'#fafafa',
    borderRadius: 5,
    justifyContent: 'space-between'
  },
  singleAddress: {
    marginTop: 15,
    padding:10,
    borderWidth: 0.5,
    borderColor: '#c7c7c7',
    backgroundColor:'white',
    borderRadius: 5,
  },
  t1: {
    fontSize: 15,
    marginTop:5,
    fontWeight:'500',
    color:'#181818'
  },
  default: {
    paddingVertical:6,
    // borderWidth: 0.5,
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
    width: width*0.25
  },
  defaultText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  }
})

export default AddAddressScrenn