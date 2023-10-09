import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const {width} = Dimensions.get('window')

const OrderScreen = () => {
  const changeScreen = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      changeScreen.navigate('Profile')
    }, 1500);
  }, [])
  

  return (
    <View style={{marginTop:40}}>
    <View style={{justifyContent:'center',marginLeft:width*0.4, width:width}}>
       <LottieView
        source={require('../../assets/thumbs.json')} autoPlay loop={true} speed={0.7}
        style={{height:100, width:100, marginVertical:20}}
      />
    </View>
     

      <View style={{gap:10, padding:30}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
          <Ionicons name="checkmark-circle-sharp" size={26} color="#027849" />
          <Text style={{fontSize:22, fontWeight:'700',color:'#027849'}}>Order placed, thank you!</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:17, fontWeight:'500'}}>Conformation will be sent to </Text>
          <Text style={{fontSize:17, fontWeight:'500',color:'#007185'}}>Message Center.</Text>
        </View>
      </View>
      <Text style={{height:1, borderWidth:1, borderColor:'#D0D0D0'}}/>

      

    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})