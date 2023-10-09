import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign, Ionicons, Fontisto, FontAwesome } from '@expo/vector-icons';
import { UserType } from '../../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ProfileScreen = () => {
  const changeScreen = useNavigation()
  useLayoutEffect(() => {
    changeScreen.setOptions({
      headerTitle:'',
      headerStyle:{backgroundColor:'#00CED1'},
      headerLeft: () => (
        <Image
          style={{ width:140,height:120, resizeMode:'contain'}}
          source={{uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png'}}
        />
      ),
      headerRight: () => (
        <View style={{flexDirection:'row', alignItems:'center', gap:10,marginRight:15}}>
          <Ionicons name='notifications-outline' size={24} color='#000'/>
          <AntDesign name='search1' size={24} color='#000'/>
        </View>
      )
    })
  }, [])

  const {userId, setUserId} = useContext(UserType) 
  const [user, setUser] = useState()
  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`http://192.168.53.85:8000/profile/${userId}`)
        const {user} = response.data
        setUser(user)
      } catch (error) {
        console.log("error profile screen 38 : ", error)
      }
    }
    fetchUserProfile()
  },[])

  const handleLogOut = () => {
    clearAuthToken()
  }

  const clearAuthToken = async() => {
    await AsyncStorage.removeItem('authToken')
    console.log('Auth token removed successfully logged out .....')
    changeScreen.replace('Login')
  }

  const fetchOrders = async() => {
    try {
      const response = await axios.get(`http://192.168.53.85:8000/order/${userId}`)
      const orders = response.data.orders
      setOrders(orders)
      setLoading(false)
    } catch (error) {
      console.log("error line 68")
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrders()
    },[])
  )

  useEffect(() => {
    fetchOrders()
  },[])
  // console.log('orders from profile screen ✅✅ : ', orders)

  return (
    <ScrollView backgroundColor={'#fff'}>
    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#00CED1'}}>
      <View style={{flexDirection:'row', gap:10, padding:10, alignItems:'center'}}>
        <Fontisto name="person" size={24} color="black" />
        <Text style={styles.headerFont}>Hello, {user?.name}</Text>
      </View>
      <View style={{flexDirection:'row', gap:10, padding:10, alignItems:'center'}}>
        <FontAwesome name="flag" size={24} color="red" />
        <Text style={styles.headerFont}>EN</Text>
      </View>
    </View>

      <View style={{padding:10, flexDirection:'row',gap:10, justifyContent:'space-evenly', marginTop:20}}>
        <Pressable style={styles.YourOrderPressable}>
          <Text style={styles.headerFont}>Your Orders</Text>
        </Pressable>
        <Pressable style={styles.YourOrderPressable}>
          <Text style={styles.headerFont}>Buy Again</Text>
        </Pressable>
      </View>
      <View style={{padding:10, flexDirection:'row',gap:10, justifyContent:'space-evenly'}}>
        <Pressable style={styles.YourOrderPressable}>
          <Text style={styles.headerFont}>Your Account</Text>
        </Pressable>
        <Pressable style={styles.YourOrderPressable}
        onPress={handleLogOut}>
          <Text style={styles.headerFont}>LogOut</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingView}>
            <Text style={{textAlign:'center',fontSize:20, fontWeight:'700', color:'#494a4a'}}>Fetching data ........</Text>
          </View>
        ) : (
          orders.length > 0 ? (
            orders?.map((order) => (
              <Pressable style={{
                marginTop: 20,padding: 15,borderRadius: 8,borderWidth: 1,
                borderColor: "#d0d0d0",marginHorizontal: 10,justifyContent: "center",alignItems: "center"}}
                key={order._id}>
                {order?.products.slice(0,1).map((product) => (
                  // product.length > 1 ? 
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{uri : product?.image}}
                      style={{height:130, width:130, resizeMode:'contain'}}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text> No orders</Text>
          )
        )}
      </ScrollView>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerFont: {
    fontSize:17, 
    fontWeight:'500',
    textAlign:'center'
  },
  YourOrderPressable: {
    padding:20,
    borderWidth:0.4,
    borderColor:'#D0D0D0',
    backgroundColor:'#f5f5f5',
    borderRadius:'50%',
    flex:1
  },
  loadingView: {
    height: height*0.2,
    width: width*0.8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d0d0d0',
    backgroundColor:'#f5f5f5',
    margin:20,
    justifyContent:'center',
  },
})

export default ProfileScreen