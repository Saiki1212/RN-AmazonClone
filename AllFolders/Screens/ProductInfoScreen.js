import { StyleSheet,SafeAreaView, Text, View, StatusBar, ScrollView, TextInput, Pressable, Image, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons, EvilIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/CartReducer';
import SearchHeader from '../Components/SearchHeader';
const {width} = Dimensions.get('window');
const height = (width);
const ProductInfoScreen = ({}) => {
  const routeLoop = useRoute();
  const changeScreen = useNavigation();
  const [isHeartClicked, setIsHeartCkicked] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const hangleHeartChange = () => {
    isHeartClicked? setIsHeartCkicked(false) : setIsHeartCkicked(true)
  }

  const dispatch = useDispatch()
  const AddItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 4000);
  }

  const BuyNow = (item) => {
    // setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      // setAddedToCart(false)
      changeScreen.navigate('Cart')
    }, 100);
  }
  
  const cart = useSelector((state) => state.cart.cart)

  // console.log("Cart ✅✅✅ : ", cart)
  
  return (
    <>
    <StatusBar backgroundColor={'#00CED1'}></StatusBar>
    <SafeAreaView style={styles.mainSafeAreaView}>
      <ScrollView>
      {/* Search Bar ....... */}
        <SearchHeader/>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {routeLoop.params.carouselImages.map((item, index) => (
            <Image style={styles.imageStyle} source={{uri: item}} key={index}/>
          ))}
        </ScrollView>
        <View style={styles.offShareContainer}>
          <View style={styles.offerContainer}>
            <Text style={styles.offerText}>{routeLoop?.params.offer}% off</Text>
          </View>
          <View style={{backgroundColor: '#fafafa', padding: 10, borderRadius: '50%'}}>
            <AntDesign name="sharealt" size={24} color="black" />
          </View>
        </View>
        <Pressable onPress={hangleHeartChange} style={styles.likeIcon}>
          { isHeartClicked ? <AntDesign name="heart" size={28} color="#FF3040" />:<AntDesign name="hearto" size={25} color="#ababab"  />}
        </Pressable>

              {/* Title */}

        <View style={{padding: 10, marginTop:16}}>
          <Text numberOfLines={2} style={{fontWeight: '500'}}>{routeLoop?.params.title}</Text>
          <Text style={{fontSize: 20, fontWeight: '700',marginTop:8}}>₹{routeLoop?.params.price}</Text>
          <Text style={{height:0.5, borderWidth: 1, borderColor: '#e0dede', marginTop: 15}}/>
        </View>

            {/* color */}

        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={{fontWeight: '400', fontSize: 15}}>Color : </Text>
          <Text style={{fontWeight: '500', fontSize: 15}}>{routeLoop?.params?.color}</Text>
        </View>

            {/* Size */}

        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={{fontWeight: '400', fontSize: 15}}>Size : </Text>
          <Text style={{fontWeight: '500', fontSize: 15}}>{routeLoop?.params?.size}</Text>
        </View>
        <Text style={{height:0.5, borderWidth: 1, borderColor: '#e0dede', marginTop: 15}}/>
        <View style={{padding: 10}}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Text style={{fontSize:15, fontWeight: '400'}}>Total : </Text>
                <Text style={{fontSize:17, fontWeight: '700'}}>₹{routeLoop?.params?.price}</Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
              <Text style={[styles.deliveryStyleCommon, styles.deliveryStyleColor]}>Free Amazon delivery</Text>
              <Text style={[styles.deliveryStyleCommon, styles.deliveryStyleColorless]}> Monday 2nd October,</Text>
              <Text style={styles.deliveryStyleCommon}> on the orders dispatched by Amazon over ₹499.</Text>
            </View>
            
        </View>

        <View style={{flexDirection:'row', margin:10, gap:5}}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={{fontSize:16, fontWeight:'500', color:'#007185'}}>Deliver to phagwara Sub-Dist... 144411</Text>
        </View>
        <Text style={styles.stockText}>In stock</Text>
        <Pressable style={styles.PressableStyle} onPress={() => {AddItemToCart(routeLoop?.params?.item)}}>
        {addedToCart ? 
            (<Text style={styles.PressableText}>Added to Cart</Text> ):
                (<Text style={styles.PressableText}>Add to Cart</Text>)
        }
          {/* <Text style={styles.PressableText}>Add to Cart</Text> */}
        </Pressable>
        <Pressable onPress={() => {BuyNow(routeLoop?.params?.item)}}
            style={[styles.PressableStyle, {backgroundColor: '#FFA41C'}]}>
          <Text style={styles.PressableText}>Buy Now</Text>
        </Pressable>

        {/* Final Image List find */}

          <ScrollView>
          {routeLoop.params.carouselImages.map((item, index) => (
            <Image style={styles.imageStyle} source={{uri: item}} key={index}/>
          ))}
          </ScrollView>

      </ScrollView>
    </SafeAreaView>
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
  imageStyle: {
    height:height,
    width: width,
    resizeMode: 'contain',
    marginTop:20
  },
  offerContainer: {
    height: 45,
    width: 45,
    borderRadius: 24,
    backgroundColor: '#C60C30',
    justifyContent: 'center',
    alignItems:'center',
  },
  offerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',
    fontWeight: '800'
  },
  offShareContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    top:-height
  },
  likeIcon: {
    marginHorizontal: 20,
    marginTop: -(height/3),
    height: 48,
    width: 29,
  },
  deliveryStyleCommon: {
    marginTop: 8, 
    fontSize:16,
    fontWeight:'500',
  },
  deliveryStyleColor: {
    color: '#007185', 
  },
  deliveryStyleColorless: {
    fontWeight:'700'
  },
  stockText: {
    margin: 10,
    fontSize: 19,
    fontWeight: '500',
    color: '#007600'
  },
  PressableStyle: {
    backgroundColor: '#FFD814',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    borderRadius: 50
  },
  PressableText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
})

export default ProductInfoScreen