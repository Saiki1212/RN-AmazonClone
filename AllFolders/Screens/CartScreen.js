import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import SearchHeader from '../Components/SearchHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../Redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window')
const CartScreen = () => {

    const changeScreen = useNavigation()

    const cart = useSelector((state) => state.cart.cart)
    const[isChecked, setIsChecked] = useState(false)
    // console.log('Cart Items : ',cart)
    const totalCartAmount = cart?.map ( (item) => item?.price*item?.quantity ).reduce( (curr,pre) => curr+pre,0 )
    const totalProducts = cart?.map((item) => item?.quantity).reduce((curr, pre) => curr+pre,0)

    const dispatch = useDispatch()
    const incresaseQuantity=(item) => {
        dispatch(incrementQuantity(item))
    }
    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }
    const removeItem = (item) => {
        dispatch(removeFromCart(item))
    }


  return (
    <SafeAreaView>
        <ScrollView style={{backgroundColor:'##f1f1f1'}}>
            <SearchHeader/>
            
            {
                totalCartAmount !== 0 ?
                 <>
                    <View style={{flexDirection:'row', padding: 12,paddingHorizontal:20, alignItems: 'center'}}>
                        <Text style={{fontSize:22, fontWeight:'500'}}>Total : ₹</Text>
                        <Text style={{fontSize:24, fontWeight:'700'}}>{totalCartAmount}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, alignItems: 'center'}}>
                        <Text style={{fontSize:18}}>EMI Available </Text>
                        <Pressable>
                            <Text style={{fontSize:18, color: '#007185'}}>Details </Text>
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row', padding: 12,paddingHorizontal:20, gap:8}}>
                        <View style={{width: 23,height:23, borderRadius:'14', backgroundColor:'#007600',justifyContent:'center', alignItems:'center'}}>
                            <Ionicons name="ios-checkmark-sharp" size={22} color="white" />
                        </View>
                        <View>
                            <Text style={{fontSize:17, color: '#007600'}}>Your Order is eligible for FREE Delivery.</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:17}}>Select this option at checkout.</Text>
                                <Text style={{fontSize:17, color: '#007185'}}>Details</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable style={{padding:15, backgroundColor:'#FFD814', marginHorizontal:20, borderRadius:8, marginTop:20}}
                        onPress={() => changeScreen.navigate('Proceed')}>
                        <Text style={{textAlign:'center', fontSize:17, fontWeight:'600'}}>Proceed to Buy ({totalProducts} items)</Text>
                    </Pressable>
                    <View style={{flexDirection:'row', margin:20,marginTop:40, gap:12}}>
                        <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#007185' : undefined} style={styles.checkBox}/>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:17, fontWeight:'500'}}>Send as a gift. </Text>
                            <Text style={{fontSize:17}}>custom message</Text>
                        </View>
                    </View>
                </>  :
                <>
                    <View style={{alignItems:'center', gap:15, marginTop:20}}>
                    {/* <Text>Cart is Empty</Text> */}
                        {/* <Lottie source={require('../../assets/cartAnimation.json')} autoPlay loop/> */}
                        <Text style={{fontSize:18, fontWeight:'500'}}>Your AmazonClone Cart is empty</Text>
                        <Text style={{fontSize:18, fontWeight:'500', color:'#007185'}}>Pick up where you left off</Text>
                    </View>
                    <View style={{padding: 10, backgroundColor:'#FFD814', margin:20, borderRadius:4}}>
                        <Text style={{fontSize: 17, fontWeight:'500'}}>Pay with AmazonClone Pay UPI</Text>
                        <View style={{ width:width*0.9}}>
                            <Text style={{fontSize: 17, fontWeight:'500'}}>Enjoy faster payments & instant refunds <Text style={{fontSize: 17, fontWeight:'700'}}>Set up now</Text></Text>
                        </View>
                    </View>
                    <Pressable style={styles.shopnow}
                        onPress={() => changeScreen.navigate('Home')}
                        >
                        <Text style={{fontSize:18, fontWeight:'500'}}>Shop Now</Text>
                    </Pressable>
                </>
            }
            
            

            <Text style={{height:1,borderColor:'#D0D0D0', borderWidth:1, marginTop:10,marginHorizontal:20}}/>

            <View style={{}}>
                {cart?.map((item, index) => (
                    <View key={index} style={{backgroundColor:'#fff', margin: 20, borderRadius: 5, marginBottom:0}}>
                        <Pressable style={{flexDirection:'row', gap:10}}>
                            <View style={{justifyContent:'space-between'}}>
                                <Image source={{uri: item?.image}} style={{height: 140,width:140, resizeMode:'contain', marginTop:10}}/>
                                <Pressable>
                                    <View style={{flexDirection:'row', padding:10}}>
                                        <Pressable 
                                            style={styles.del}
                                            onPress={() => decreaseQuantity(item)} >
                                            {
                                                item.quantity > 1 ? <Entypo name="minus" size={24} color="black" />
                                                : <MaterialIcons name="delete-outline" size={24} color="black" />
                                            }
                                            
                                        </Pressable>
                                        <Pressable style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#cfcfcf', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={styles.num}>{item?.quantity}</Text>
                                        </Pressable>
                                        
                                        <Pressable 
                                            onPress={() => incresaseQuantity(item)}
                                            style={styles.add}>
                                            <MaterialIcons name="add" size={24} color="black" />
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </View>
                            <View>
                                <Text numberOfLines={2} style={{width:(width-width/2.1), fontWeight:'500', marginTop:5}}>{item?.title}</Text>
                                {item.offer ? (
                                    <View style={{flexDirection:'row', marginTop:10, gap:10, alignItems:'center'}}>
                                        <View style={{paddingVertical:6,paddingHorizontal:10, backgroundColor: '#CC0C39',borderRadius:4}}>
                                            <Text style={{color:'#fff', fontWeight:'700'}}>{item?.offer} off</Text>
                                        </View>
                                        <Text style={{color:'#CC0C39', fontSize:15, fontWeight:'500'}}>Limited time deal</Text>
                                    </View>
                                    ) : (
                                        <Text style={{color:'#CC0C39', fontSize:15, fontWeight:'500', marginTop:8}}>No offer</Text>
                                    )}
                                <View style={{flexDirection:'row', gap:30, alignItems:'center'}}>
                                    <View style={{flexDirection:'row', paddingVertical:10}}>
                                        <Text style={{fontSize: 15,fontWeight:'600', marginTop:2}}>₹</Text>
                                        <Text style={{fontSize:23, fontWeight:'700'}}>{item?.price}</Text>
                                        <Text style={{fontSize: 15,fontWeight:'600', marginTop:2}}>00</Text>
                                    </View>
                                    <View style={{paddingTop:10}}>
                                        {item.offer ? (
                                            <>
                                                <Text style={{fontSize:15, color:'#7d7c7c'}}>M.R.P.:</Text>
                                                <Text style={{fontSize:15, color: '#7d7c7c', textDecorationLine:'line-through'}}>{(item.price + (item.price * (parseFloat(item.offer) / 100))).toFixed(2)}</Text>
                                            </>
                                        ) : null}
                                    </View>
                                </View>
                                <>
                                    {item.price >= 4000 ? (
                                        <View>
                                            <Image style={{height: 40, width: 40, resizeMode:'contain'}} source={{uri : 'http://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png'}}/>
                                            <Text style={{fontSize: 15, color:'#7a7a79'}}>Eligible for FREE Shipping</Text>
                                        </View>
                                        
                                    ) : null}
                                </>
                                <Text style={{fontSize: 15, paddingVertical:5, color:'#007600'}}>In stock</Text>
                                <>
                                    {item.size? (
                                        <View style={{flexDirection:'row', marginVertical:5}}>
                                            <Text style={{fontSize:15, fontWeight:'500'}}>Size: </Text>
                                            <Text numberOfLines={1} style={{width:200}}>{item.size}</Text>
                                        </View>
                                        
                                    ) : null}
                                </>
                                <>
                                    {
                                        item.price*item.quantity <= 2000 ? <Text style={styles.cashback}>10% Cashback applied.</Text> :
                                            item.price*item.quantity <= 5000 ? <Text style={styles.cashback}>25% Cashback applied.</Text> : <Text style={styles.cashback}>40% Cashback applied.</Text>
                                    }
                                </>
                                <>
                                    <Pressable style={{margin: 10,padding:10, borderWidth:0.3, width:width*0.2, borderRadius:6, borderColor:'#a1a1a1'}}
                                    onPress={() => removeItem(item)}>
                                        <Text style={{textAlign:'center'}}>Delete</Text>
                                    </Pressable>
                                </>
                            </View>
                        </Pressable>
                    </View>
                    
                ))}
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    checkBox: {
        borderRadius: 5,
        width:25,
        height:25
    },
    cashback: {
        fontSize:15,
        fontWeight:'500',
        color:'#007600'
    },
    del: {
        backgroundColor:'#e8e6e6',
        padding:6,
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6,
        borderWidth:1,
        borderColor:'#cfcfcf'
    },
    num: {
        // textAlign:'center',
        paddingVertical:6,
        paddingHorizontal:25,
        fontSize:17,
        fontWeight:'500',
        color: '#007185'
    },
    add: {
        backgroundColor:'#e8e6e6',
        padding:6,
        borderTopRightRadius:6,
        borderBottomRightRadius:6,
        borderWidth:1,
        borderColor:'#cfcfcf'
    },
    shopnow: {
        padding:10,
        // paddingVertical:10,
        margin:30,
        backgroundColor:'#ffc014',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        width:150,
        marginLeft:'auto',
        marginRight:'auto'
    },
})