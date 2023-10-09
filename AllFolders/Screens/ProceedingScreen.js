import { Alert, Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../../UserContext'
import axios from 'axios'
import { FontAwesome, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import SearchHeader from '../Components/SearchHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../../Redux/CartReducer';

const {width} = Dimensions.get('window')

const ProceedingScreen = () => {
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const changeScreen = useNavigation()
  
  // const deliveryCharge = 
  const steps = [
    { title: 'Address' , content: 'Address Form'},
    { title: 'Delivery' , content: 'Delivery options'},
    { title: 'Payment' , content: 'Payment method'},
    { title: 'Place order' , content: 'Place order'},
  ]

  const [addresses, setAddresses] = useState([])
  const {userId, setUserId} = useContext(UserType)
  const [currState, setCurrState] = useState(0)

  useEffect(() => {
    fetchTheDataOfAddresses()
  }, [])

  const fetchTheDataOfAddresses = async () => {
    try {
      const response = await axios.get(`http://192.168.53.85:8000/addresses/${userId}`)
      const {addresses} = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log("Error : : 31: ", error)
    }
  }
  // console.log('Adresses ✅✅✅✅  34::: ',addresses)

  const DeliveryTime = [
    {id: 1, title: 'by tommorow', amount:240},
    {id: 2, title: 'within 2 days', amount:120},
    {id: 3, title: 'Delivery by Monday', amount:0},
  ]

  const Payments = [
    {id: 1, tiltle: 'UPI', subTitle:'AmazonClone Pay, Paytm, Gpay, Phonepe...'},
    {id: 2, tiltle: 'Credit or debit card', subTitle:'Paytm, Gpay, Phonepe and more'},
    {id: 3, tiltle: 'EMI', subTitle:'Kotak, HDFC, IDFC'},
    {id: 4, tiltle: 'Net Banking', subTitle:'SBI, HDFC, ICICI and more accepted.'},
    {id: 5, tiltle: 'Cash on Delivery/Pay on Delivery', subTitle:'Cash, UPI and Cards accepted.'},
  ]

  const [selectAdd, setSelectedAdd] = useState('')
  const [selectTime, setSelecteTime] = useState('')
  const [selectPay, setSelectePay] = useState('')

  const totalCartAmount = cart?.map ( (item) => item?.price*item?.quantity ).reduce( (curr,pre) => curr+pre,0 )
  const deliveryCharge = selectTime?.amount;
  const promotionA = selectTime?.amount/2;
  const total = totalCartAmount + deliveryCharge;
  const orderTotal = total - promotionA;

  const handlePlaceOrder = async () => {
    try {
      const OrderDetails = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectAdd,
        paymentMethod: selectPay?.tiltle
      }

      console.log(selectAdd)

      const response = await axios.post('http://localhost:8000/orders',OrderDetails)
      if(response.status == 200) {
        changeScreen.navigate('Order')
        dispatch(cleanCart())
        console.log('OrderPlaced successfully : ',response.data)
      }
      else {
        console.log('handlePlaceOrder Error in else part : ',response.data)
      }

    } catch (error) {
      console.log("handlePlaceOrder Error : ", error)
    }
  }

  return (
    <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
        <SearchHeader/>
        <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around', alignItems:'center'}}>
          {steps.map((item,index) => (
            <View key={index}>
              {index > 0 && (
                <View
                  // style={[{ flex: 1, height: 5, backgroundColor: "green" },
                  //     index <= currState && { backgroundColor: "green" },]}
                />
              )}
              <View style={{}}>
                {index < currState ? (
                  <View style={{flexDirection:'row'}}>
                    <View style={{alignItems:'center'}}>
                      <View style={{height:25, width:25, borderRadius:15,justifyContent:'center', alignItems:'center', borderColor:'#007185', borderWidth:1}}>
                        <View style={{height:15,width:15, backgroundColor:'#007185', borderRadius:13}}/>
                      </View>
                      <Text style={{color:'#007185'}}>{item?.title}</Text>
                    </View>
                    
                    {index < 3 ? 
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:-15}}>
                      <Text style={{height:1,borderColor:'#007185', borderWidth:1, width:60}}/>
                    </View> : null 
                    }
                  </View>
                ) : (
                  <View style={{flexDirection:'row'}}>
                    <View style={{alignItems:'center'}}>
                      <View style={{height:25, width:25, borderRadius:15,justifyContent:'center', alignItems:'center', borderColor:'#bfbfbf', borderWidth:1, backgroundColor:'#ededed'}}/>
                      <Text style={{color:'#8a8888'}}>{item?.title}</Text>
                    </View>
                    {index < 3 ? 
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:-15}}>
                      <Text style={{height:1,borderColor:'#D0D0D0', borderWidth:1, width:60}}/>
                    </View> : null 
                    }
                  </View>
                  )}
              </View>
            </View>
          ))}
        </View>
        <Text style={{height:1,borderColor:'#D0D0D0', borderWidth:3, width:width, marginTop:10}}/>
        <ScrollView showsVerticalScrollIndicator={false} backgroundColor={'#f5f5f5'}>
        {/* current state === 0 */}

        {currState == 0 && (
          <View>
            <Text style={styles.selectadd}>Select a delivery address</Text>
            <Pressable>
              {addresses?.map((item,index) => (
                <Pressable key={index} style={styles.singleAddress} 
                    onPress={() => setSelectedAdd(item)} >
                    <View style={{flexDirection:'row'}}>
                      <View style={{padding: 10, justifyContent:'center', alignItems:'center'}}>
                        {selectAdd && selectAdd._id === item?._id ? (
                          <MaterialCommunityIcons name="record-circle" size={24} color="#007185" />
                        ) : (
                          <FontAwesome name="circle-o" size={26} color="#c7c7c7" />
                        )}
                      </View>
                      <Pressable key={index} style={{padding:10}}>
                        <View style={{flexDirection: 'row',alignItems: 'center', gap:5}}>
                          <Text style={{fontSize:16, fontWeight:'bold'}}>{item?.name}</Text>
                          <Entypo name="location-pin" size={24} color="red" />
                        </View>
                        <Text style={styles.t1}>{item?.houseNo},  {item?.landmark}</Text>
                        <Text style={styles.t1}>{item?.city}</Text>
                        <Text style={styles.t1}>Phone No : {item?.mobileNo}</Text>
                        <Text style={styles.t1}>{item?.state}  {item?.country}</Text>
                        <Text style={styles.t1}>Pincode : {item?.postalcode}</Text>
                      </Pressable>
                    </View>
                    { selectAdd && selectAdd._id === item?._id ? (
                          <View style={{}}>
                            <Pressable style={{backgroundColor:'#FFD814', padding:15, margin:10, borderRadius:8}}
                            onPress={() => setCurrState(1)}>
                              <Text style={{textAlign:'center', fontSize:18, fontWeight:'500'}}>Delivery to this address</Text>
                            </Pressable>
                            <Pressable style={{padding:10, margin:10, borderRadius:8, borderWidth:0.5, borderColor:'#e0e0e0'}}>
                              <Text style={{textAlign:'center', fontSize:16}}>Edit Address</Text>
                            </Pressable>
                            <Pressable style={{padding:10, margin:10,marginTop:0, borderRadius:8, borderWidth:0.5, borderColor:'#e0e0e0'}}>
                              <Text style={{textAlign:'center', fontSize:16}}>Add delivery instructions</Text>
                            </Pressable>
                          </View>
                        ) : null}
                </Pressable>
              ))}
            </Pressable>
          </View>
        )}

        {/* current state === 1 */}

        {currState == 1 && (
          <View style={{backgroundColor:'#f5f5f5'}}>
            <Text style={styles.selectadd}>Choose your delivery options</Text>
            {DeliveryTime?.map((item, index) => (
              <Pressable key={index} style={styles.deliveryOptions}
                onPress={() => setSelecteTime(item)}>
                  <View style={{padding: 10, justifyContent:'center', alignItems:'center'}}>
                    {selectTime && selectTime.id === item?.id ? (
                      <MaterialCommunityIcons name="record-circle" size={24} color="#007185" />
                    ) : (
                      <FontAwesome name="circle-o" size={26} color="#c7c7c7" />
                    )}
                  </View>
                  {index < 2 ? (
                    (index == 0 ? (
                      <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#007600', fontSize:17, fontWeight:'500'}}>₹240</Text>
                        <Text style={{fontSize:17, fontWeight:'400'}}> - {item?.title}</Text>
                      </View>
                    ) : (
                      <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#007600', fontSize:17, fontWeight:'500'}}>₹120</Text>
                        <Text style={{fontSize:17, fontWeight:'400'}}> - {item?.title}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#007600', fontSize:17, fontWeight:'500'}}>Free delivery</Text>
                        <Text style={{fontSize:17, fontWeight:'400'}}> - {item?.title}</Text>
                      </View>
                  )}
                  
              </Pressable>
            ))}
            {selectTime ? 
            <Pressable style={styles.continue} onPress={() => setCurrState(2)}>
              <Text style={{fontSize:17, fontWeight:'500',textAlign: 'center'}}>Continue</Text>
            </Pressable> : null }
          </View>
        )}

        {/* current state === 2 */}

        {currState == 2 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#fafafa'}}>
            <Text style={styles.selectadd}> Select a payment method</Text>
            <View style={styles.clonePay}>
              <View>
                <Text style={{fontSize:16,fontWeight:'600'}}>Pay with AmazonClone Pay UPI</Text>
                <Text style={{paddingVertical:5}}>Enjoy faster payments & instant refunds</Text>
                <Text style={{fontWeight:'500', color:'#FFD814'}}>set up now</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="black" />
            </View>
            {selectPay !== '' ? (
              <Pressable onPress={() => setCurrState(3)} style={[styles.continue, {marginTop:0, marginBottom:10}]}>
                <Text style={{fontSize:17, fontWeight:'500',textAlign: 'center'}}>Continue</Text>
              </Pressable>
            ) : null}
            
            {Payments?.map((item,index) => (
              <View key={index}>
                {index == 0 && (
                  <View>
                    <Text style={{fontSize:17, fontWeight:'500', paddingHorizontal:20, paddingVertical:10, color:'#595959'}}>AMAZONCLONE PAY</Text>
                    <Pressable style={styles.upi} >
                      {selectPay && selectPay.id === item?.id ? (
                        <Pressable style={styles.clickedPayment}>
                          <MaterialCommunityIcons name="record-circle" size={24} color="#007185" />
                          <View style={{gap:5}}>
                            <Text style={[styles.defaultSelected, {color:"#007185"}]}>{item?.tiltle}</Text>
                            <Text style={styles.defaultSelected}>Select to get started with Clone UPI</Text>
                          </View>
                        </Pressable>
                      ) : (
                        <Pressable style={styles.clickedPayment} onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel',
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }}>
                          <FontAwesome onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel',
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }} name="circle-o" size={26} color="#c7c7c7" />
                          <View onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel',
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }} style={{gap:5}}>
                            <Text style={styles.defaultSelected}>{item?.tiltle}</Text>
                            <Text style={styles.defaultSelected}>Select to get started with Clone UPI</Text>
                          </View>
                        </Pressable>
                        
                      )}
                    </Pressable>
                    <Text style={{fontSize:17, fontWeight:'500', padding:20, paddingBottom:10, color:'#595959'}}>MORE WAYS TO PAY</Text>
                  </View>
                )}
                <View style={{}}>
                  {index != 0 && (
                    <Pressable style={styles.morePay} onPress={() => setSelectePay(item)}>
                      {selectPay && selectPay.id === item?.id ? (
                        <Pressable style={styles.clickedPayment} >
                          <MaterialCommunityIcons name="record-circle" size={24} color="#007185" />
                          <View onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel', 
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }} style={{gap:5}}>
                            <Text style={[styles.defaultSelected, {color:"#007185"}]}>{item?.tiltle}</Text>
                            <Text style={styles.defaultSelected}>{item?.subTitle}</Text>
                          </View>
                        </Pressable>
                        ) : (
                          <Pressable onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel',
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }} style={styles.clickedPayment}>
                            <FontAwesome onPress={() => {
                              setSelectePay(item)
                              Alert.alert('UPI/Card','Pay Online', [
                                {
                                  text:'cancel',
                                  onPress:() => console.log('cancelled')
                                },
                                {
                                  text:'Ok',
                                  onPress:() => pay()
                                }
                              ])
                            }} name="circle-o" size={26} color="#c7c7c7" />
                            <Text style={styles.defaultSelected}>{item?.tiltle}</Text>
                          </Pressable>
                      )}
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
            {selectPay !== '' ? (
              <Pressable onPress={() => setCurrState(3)} style={[styles.continue, {marginTop:20, marginBottom:20}]}>
                <Text style={{fontSize:17, fontWeight:'500',textAlign: 'center'}}>Continue</Text>
              </Pressable>
            ) : null}
          </ScrollView>
        )}

        {currState == 3 && (
          <ScrollView>
            <Text style={styles.selectadd}>Order now</Text>
            <View style={styles.optBox}>
              <Text numberOfLines={2} style={{fontSize:17, fontWeight:'500'}}>One-time password required at time of delivery</Text>
              <Text numberOfLines={2} style={{fontSize:17, color:'#007185'}}>One-time password required at time of delivery</Text>
            </View>
            <View style={styles.shippingPriceBox}>
              <View style={{flexDirection:'row'}}>
                <Text numberOfLines={1} style={{paddingVertical:10, paddingLeft:10}}>Shipping to : </Text>
                <Text numberOfLines={1} style={{paddingVertical:10, paddingRight:10, fontWeight:'500', width:width*0.7}}>{selectAdd?.name},{selectAdd?.city},{selectAdd?.landmark}</Text>
              </View>
              <Text style={{height:0.5, borderWidth:0.5, borderColor:'#d6d6d6'}}/>
              <View style={{padding:10, backgroundColor:'#fff'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, marginBottom:2}}>
                  <Text style={{color: "#737373", fontSize:17}}>Items:</Text>
                  <Text style={{color: "#737373", fontSize:17}}>₹{totalCartAmount}.00</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, marginBottom:2}}>
                  <Text style={{color: "#737373", fontSize:17}}>Delivery:</Text>
                  <Text style={{color: "#737373", fontSize:17}}>₹{deliveryCharge}.00</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, marginBottom:2}}>
                  <Text style={{color: "#737373", fontSize:17}}>Total:</Text>
                  <Text style={{color: "#737373", fontSize:17}}>₹{total}.00</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, marginBottom:2}}>
                  <Text style={{color: "#737373", fontSize:17}}>Promotion Applied:</Text>
                  <Text style={{color: "#737373", fontSize:17}}>-₹{promotionA}.00</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:10}}>
                  <Text style={{fontWeight:'600', fontSize:20}}>Order Total:</Text>
                  <Text style={{color:'#CC0C39',fontSize:20, fontWeight:'600'}}>₹{orderTotal}.00</Text>
                </View>
              </View>
              <Text style={{height:0.5, borderWidth:0.5, borderColor:'#d6d6d6'}}/>
            </View>
            <View style={styles.payModeOutline}>
              <View style={styles.payMode}>
                <View style={{gap:15}} >
                  <Text style={{fontSize:18}}>Pay with</Text>
                  <Text style={{fontSize:18, fontWeight:'600'}}>{selectPay?.tiltle}</Text>
                </View>
                <FontAwesome name="angle-right" size={24} color="#737373" />
              </View>
              <Text style={{height:0.5, borderWidth:0.5, borderColor:'#d6d6d6'}}/>
              <View style={styles.AddGift}>
                <FontAwesome name="angle-down" size={24} color="#000" />
                <Text style={{fontSize:18, fontWeight:'500', color:'#007185'}}>Add Gift Card or Promo Code</Text>
              </View>
            </View>

            <Pressable style={styles.placeOrder} onPress={handlePlaceOrder}>
              <Text style={{fontSize:17, fontWeight:'500',textAlign:'center'}}>Place your order</Text>
            </Pressable>
            
          </ScrollView>
        )}

        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectadd: {
    fontSize:24,
    fontWeight:'600',
    padding: 20,
  },
  singleAddress: {
    marginTop: 15,
    padding:10,
    borderWidth: 0.2,
    borderColor: '#c7c7c7',
    backgroundColor:'white',
    borderRadius: 5,
    // flexDirection:'row',
    marginHorizontal:20
  },
  t1: {
    fontSize: 17,
    marginTop:5,
    fontWeight:'500',
    color:'#181818'
  },
  deliveryOptions: {
    flexDirection:'row',
    gap:6,
    alignItems:'center',
    margin:10,
    marginHorizontal:20,
    marginBottom:5,
    backgroundColor:'#fff',
    padding:10,
    paddingVertical:6,
    borderBottomEndRadius:6,
    borderEndStartRadius:6,
    borderWidth:0.5,
    borderColor:'#dbdbdb'
  },
  continue: {
    padding:15,
    marginTop:20,
    marginHorizontal:20,
    backgroundColor:'#FFD814',
    borderRadius:8
  },
  clonePay: {
    padding:20,
    margin:20,
    borderRadius:8,
    backgroundColor:'#fff',
    borderWidth:0.4,
    borderColor:'#dbdbdb',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  upi: {
    alignItems:'center',
    gap:15,
    padding:20,
    marginHorizontal:20,
    borderRadius:8,
    backgroundColor:'#fff',
    borderWidth:0.4,
    borderColor:'#dbdbdb',
    flexDirection:'row'
  },
  morePay: {
    // alignItems:'center',
    padding:20,
    marginHorizontal:20,
    backgroundColor:'#fff',
    borderRadius:8, 
    borderWidth:0.5, 
    borderColor:'#dbdbdb',
    marginBottom:10
  },
  clickedPayment: {
    flexDirection:'row',
    alignItems:'center',
    gap: 10
  },
  defaultSelected: {
    fontSize:16,
    fontWeight:'500'
  },
  default: {
    fontSize:16,
  },
  optBox: {
    padding: 20,
    margin: 20,
    borderWidth:3,
    borderLeftWidth:15,
    borderColor:'orange',
    gap: 8,
    borderRadius:8,
    backgroundColor:'#fff'
  },
  shippingPriceBox: {
    backgroundColor:'#fff',
    borderWidth:1,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    borderColor: "#d6d6d6",
    margin:20,
  },
  payModeOutline: {
    margin:20,
    backgroundColor:'#fff'
  },
  payMode: {
    flexDirection:'row',
    padding:20,
    justifyContent:'space-between',
    alignItems:'center'
  },
  AddGift: {
    borderWidth:1,
    borderColor: '#d6d6d6',
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    flexDirection:'row',
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:'#fff',
    gap:8
  },
  placeOrder: {
    paddingHorizontal:20,
    paddingVertical:15,
    margin:20,
    backgroundColor:'#FFD814',
    borderRadius:10
  }
})

export default ProceedingScreen