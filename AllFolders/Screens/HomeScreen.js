import { StyleSheet, Image, Text, View, SafeAreaView, ScrollView, Pressable, StatusBar, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons,Entypo } from '@expo/vector-icons';
import topList from '../Components/HomeScreen1stHorizontalList'
import { SliderBox } from 'react-native-image-slider-box';
import tDeals from '../Components/TrendingDeals';
import todayDeals from '../Components/TodaysDeals'
import axios from 'axios';
import FakeProductItem from '../Components/FakeProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import SearchHeader from '../Components/SearchHeader';
import { UserType } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'
const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const changeScreen = useNavigation()
  const SliderBoxImages = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/PC_CC_1X._SY304_CB576938243_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_758x608_New_compressed._SY608_CB448277514_.jpg',
    'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg',
  ]
  const [products, setProducts] = useState([])
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [category, setCategory] = useState('jewelery')
  const [modalopen, setModalOpen] = useState(false)
  const {userId, setUserId} = useContext(UserType)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')
  // console.log('Selected Address is : ----->>  ', selectedAddress)
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ])

  const handleDropdownOpen = () => {
    setDropDownOpen(true)
  }

  const handleDropdownClose = () => {
    setDropDownOpen(false)
  }
  
  // Fetching address if userid Exists .....

  useEffect(() => {
    if(userId) {
      fetchTheDataOfAddresses()
    }
  }, [[userId, modalopen]])

  const fetchTheDataOfAddresses = async () => {
    // console.log('Addresses:😍😍😍', addresses);
      try {
        // console.log('Addresses:😍😍😍', userId);
        const response = await axios.get(`http://192.168.53.85:8000/addresses/${userId}`)
        // console.log('Addresses: 😍😍😍', addresses);
        const {addresses} = response.data
        setAddresses(addresses)
        // console.log('Addresses:😍😍😍', addresses);
      } catch (error) {
        console.log("Error homeScreen 😍😍😍 72 : : : ", error)
      }
    }

  // getting/ Fetching  UserId ........
  useEffect(() => {
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }
    fetchUser();
  },[]);
  
  

  // console.log('Addresses : : : home : ; : ', addresses)

  useEffect(() => {
    const fetchFakeData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
      } catch (error) {
        console.log('Error fetching fake data ❎❎❎ : ', error)
      }
    }
    fetchFakeData()
  },[])

  const cart = useSelector((state) => state.cart.cart)

  // console.log("Cart ✅✅✅ : ", cart)
  return (
    <>
    <StatusBar backgroundColor={'#00CED1'}></StatusBar>
    <SafeAreaView style={styles.mainSafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Search Bar ....... */}
        <SearchHeader/>

        {/* Address Bar ...... */}

        <Pressable style={styles.mainDeliveryContainer} onPress={() => setModalOpen(!modalopen)}>
          <Ionicons name="location-outline" size={22} color="black" />
          
          {selectedAddress ? (
            <Text>Delivery to {selectedAddress?.name.length > 10 ? (selectedAddress?.name.slice(0,10)+"..") : selectedAddress?.name}
             - {selectedAddress?.city.length > 10 ? (selectedAddress?.city.slice(0,10)+"..") : selectedAddress?.city} {selectedAddress?.postalcode}</Text>
          ) : (
            <Text>Add the Delivery Address</Text>
          )}
          
          <Entypo name="chevron-small-down" size={24} color="#40403f" />
        </Pressable>

        {/* Horizontal Scroll View */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topList.map((item, index) => (
            <Pressable key={index} style={styles.scrollPress}>
              <Image style={{height: 65, width: 65, resizeMode: 'contain'}} source={{uri: item.imageUrl}}/>
              <Text style={styles.scrollText}>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

              {/* Slider Box ....... */}

        <SliderBox
          images = {SliderBoxImages}
          autoPlay
          circleLoop
          dotColor={'#02a0d9'}
          inactiveDotColor={'gray'}
          ImageComponentStyle={{width: '100%'}}
        />

        {/* Trending Deals ...... */}
        <Text style={styles.trendText}>Top Trending Deals of the week</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
          {tDeals.map((item,index)=> (
            <Pressable key={index} style={{marginVertical: 15}}
              onPress={() => changeScreen.navigate('Info',{
                id: item.id,
                title: item.title,
                oldPrice: item.oldPrice,
                price: item.price,
                carouselImages: item.carouselImages,
                color: item.color,
                size: item.size,
                offer: item.offer,
                item: item
              })}
            >
              <Image style={{height: 180, width: width/2, resizeMode: 'contain'}} source={{uri : item?.image}}/>
            </Pressable>
          ))}
        </View>

        <Text style={{height:0.5, borderWidth: 1, borderColor: '#e0dede', marginTop: 15}}/>
        {/* Todays Deals ...... */}

        <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>Today's Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {todayDeals.map((item,index) => (
            <Pressable style={{marginTop: 5}} key={index}
              onPress={() => changeScreen.navigate('Info',{
                id: item.id,
                title: item.title,
                oldPrice: item.oldPrice,
                price: item.price,
                carouselImages: item.carouselImages,
                color: item.color,
                size: item.size,
                offer: item.offer,
                item: item
              })}
            >
              <Image style={{width: width/2, height: 150, resizeMode: 'contain'}} source={{uri : item?.image}}/>
              <View style={styles.offView}>
                <Text style={styles.offText}>Upto {item?.offer} off</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{height:0.5, borderWidth: 1, borderColor: '#e0dede', marginTop: 15}}/>

        <View style={{marginTop: 20, marginBottom: dropDownOpen? 40: 15, width: '55%', marginLeft: 10}}>
          <DropDownPicker
            style={{borderColor: "#B7B7B7",height: 30,marginBottom: dropDownOpen ? 130 : 15,}}
            open={dropDownOpen}
            value={category}
            items={items}
            setDropDownOpen={setDropDownOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder='Choose the categery'
            onOpen={handleDropdownOpen}
            onClose={handleDropdownClose}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

         {/* Displaying Fake products ......... */}
         <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
         {products?.filter((item) => item.category === category)
            .map((item,index) => (
                <FakeProductItem key={index} item={item}/>
              ))
         }
          
        </View>
        <Text style={{height:0.5, borderWidth: 1, borderColor: '#e0dede', marginTop: 15}}/>

      </ScrollView>
    </SafeAreaView>

    <BottomModal
      onBackdropPress = {() => setModalOpen(!modalopen)}
      swipeDirection={['up','down']}
      swipeThreshold={200}
      modalAnimation={(
        new SlideAnimation({
          slideFrom: 'bottom'
        })
      )}
      onHardwareBackPress={() => setModalOpen(!modalopen)}
      visible={modalopen}
      onTouchOutside={() => setModalOpen(!modalopen)}
    >
      <ModalContent style={{height: 400, width: '100%'}}>
        <View style={{marginTop:8}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Choose the delivery location</Text>
          <Text style={{ marginTop: 5, color: 'gray'}}>Select a delivery location to see product availability in your location</Text>
        </View>
        {/* {console.log("Addresses ↓🔥🔥🔥🔥✅✅✅ : ",addresses)} */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* {console.log('Addresses:😍237😍237😍237 ::::  ', addresses)} */}
          {addresses.map((item,index) => (
            <Pressable key={index} 
            onPress={() => setSelectedAddress(item)}
            style={[styles.newAddress, {backgroundColor: selectedAddress === item ? '#fae9cd': null}]}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontWeight:'500'}}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text numberOfLines={1} style={{width: 150, marginVertical:3}}>{item?.houseNo}, {item?.landmark}</Text>
              <Text numberOfLines={1}>{item?.city}</Text>
              <Text numberOfLines={1} style={{marginTop:3}}>{item?.state}, {item?.country}</Text>
              <Text>{item?.postalcode}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.newAddress} onPress={() => { setModalOpen(false),changeScreen.navigate('AddAddress')}}> 
            <Text style={{textAlign: 'center', color: '#0066b2', fontWeight: '500'}}>Add a delivery Address</Text>
          </Pressable>
        </ScrollView>
        <View style={{gap:7, marginBottom: 8}}>
          <View style={{flexDirection: 'row', gap: 5, marginLeft: 7, alignItems: 'center'}}>
            <Ionicons name="location-outline" size={25} color="#0066b2" />
            <Text style={{fontSize: 15, fontWeight: '500', color:'#0066b2'}}>Enter an Indian pincode</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, marginLeft: 7, alignItems: 'center'}}>
          <Ionicons name="location-sharp" size={25} color="#0066b2" />
            <Text style={{fontSize: 15, fontWeight: '500', color:'#0066b2'}}>Use my current location</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, marginLeft: 7, alignItems: 'center'}}>
          <Ionicons name="ios-globe-outline" size={22} color="#0066b2" />
            <Text style={{fontSize: 15, fontWeight: '500', color:'#0066b2'}}>Delivery outside India</Text>
          </View>
        </View>
      </ModalContent>
    </BottomModal>

    </>
  )
}

const styles = StyleSheet.create({
  mainSafeAreaView: {
    // marginTop: Platform.OS ==='android' ? 40 : 0,
    flex: 1,
    backgroundColor: 'white'
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 3,
    flex: 1,
    gap: 8,
    height: 45,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#9e9e9e',
    paddingHorizontal: 5
  },
  searchStyle: {
    flex: 1,
    height: 45,
    fontSize: 18
  },
  mainDeliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE'
  },
  scrollPress: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4
  },
  trendText: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10
  },
  offView: {
    paddingVertical: 5,
    marginHorizontal: 14,
    backgroundColor: '#fa4343',
    borderRadius: 5,
    marginTop: 5
  },
  offText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  },
  newAddress: {
    height: 160,
    width: 160,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    marginRight: 10,
    // gap: 10
  },
})

export default HomeScreen