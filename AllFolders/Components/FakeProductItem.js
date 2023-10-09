import { Pressable, StyleSheet, Text, View , Image, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/CartReducer'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const FakeProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false)
  const dispatch = useDispatch()
  const AddItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 4000);
  }
  const cart = useSelector((state) => state.cart.cart)

  // console.log("Cart ✅✅✅ : ", cart)

  return (
    <Pressable style={{marginVertical:20, borderWidth: 0.2, borderRadius: 8, borderColor: '#d6d6d6',marginHorizontal: width/24}}>
      <View>
        <Image style={{width: (width/2.5), height: height/5, resizeMode: 'contain'}} source={{uri : item?.image}}/>
        <Text numberOfLines={1} style={{width: 150, marginVertical: 10, textAlign: 'center'}}>{item?.title}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text style={{fontWeight: '500'}}>₹{item?.price*30}</Text>
          <Text style={{fontWeight: '500', color: '#FFD814' }}>{item?.rating?.rate} rating</Text>
        </View>
        <Pressable onPress={() => {AddItemToCart(item)}}
          style={{backgroundColor: '#FFD814', borderRadius: 15, padding:10, marginVertical:4, marginHorizontal: 8, alignItems: 'center'}}>
        {addedToCart ? 
              (<Text style={{fontWeight:'500'}}>Added to Cart</Text> ):
                  (<Text style={{fontWeight:'500'}}>Add to Cart</Text>)
          }
        </Pressable>
      </View>
    </Pressable>
  )
}

export default FakeProductItem
