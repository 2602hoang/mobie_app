import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Switch,
    SafeAreaView,
    Button,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { images, colors, icons, fontSizes } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FoodItem from './FoodItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, AddSquare, MinusSquare, Check } from 'iconsax-react-native';
import { AuthContext } from '../contexts/AuthContext';
import OrderItem from '../screens/OderItem'
import Toast from 'react-native-root-toast';
import { fomartPrice } from '../utilies/Format';
function Oder({ navigation, }) {

    const isFocused = useIsFocused();
    const [check,setCheck]=useState(false);
    useEffect(() => {

        getCartForTable();

    }, [isFocused, flag, carts]);

    const getCartForTable = () => {

        if (carts?.length) {
            carts.forEach(cart => {
                if (cart.tableId === table) {
                    setCartTable(cart.item);

                }
            }
            );
        }

    }

    const { table, carts, setCarts, me, cartTable, setCartTable, note, setNote, foods } = useContext(AuthContext);

    const [flag, setFlag] = useState(true);
    // const minQuantities = foods.map((item) => item.discount.minQuantity);

    // console.log("456",minQuantities);
    const saveCart = async (item) => {
        if (item.qty <= 0) {
            if (cartTable?.length) {
                cartTable.forEach((i, index) => {
                    if (i.id === item.id) {

                        cartTable.splice(index, 1);

                    }
                })
            }
        }

        await AsyncStorage.removeItem('carts');
        await AsyncStorage.setItem('carts', JSON.stringify(carts));
        setCarts(carts);
        setFlag(!flag);

    }

    // {
    //     console.log(cartTable)
    // }
    // const tongTien = cartTable?.map((cartItem) => {
    //     const correspondingFood = foods.map((food) => food.discount.minQuantity);
    //     const minQuantity = correspondingFood.discount.minQuantity;
    //     console.log(correspondingFood.discount.minQuantity);
    //     if (cartItem.qty >= minQuantity) {
    //       return correspondingFood.discountPrice * cartItem.qty;
    //     } else {
    //       return correspondingFood.price * cartItem.qty;
    //     }
    //   }).reduce((accumulator, item) => {
    //     return accumulator + item;
    //   }, 0);
    //  const minQuantities = foods.map((item) => item.discount.minQuantity)
    //     console.log(minQuantities);

    const tongTien = cartTable?.map((item) => {
        // console.log(item.id);
        const correspondingFood = foods?.find((food) => food.ID === item.id);
        // console.log(foods)
        const minQuantity = correspondingFood?.discount.minQuantity;

        // console.log("sl", item.qty);
        // console.log("gt", minQuantity);
        if (item.qty > minQuantity) {
            return item.d * item.qty;
        }
        return item.c * item.qty;
    }).reduce((accumulator, item) => {
        return accumulator + item;
    }, 0);
    // const minQuantities = foods.map((item) => item.discount.minQuantity);

    // console.log("gt",minQuantities);

    // const tongTien = cartTable?.map((cartItem) => {


    //     if (cartItem.qty >= minQuantity) {
    //         return correspondingFood.discountPrice * cartItem.qty;
    //     } else {
    //         return correspondingFood.price * cartItem.qty;
    //     }
    // }).reduce((accumulator, item) => {
    //     return accumulator + item;
    // }, 0);

    // console.log(tongTien);


    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFCC' }}>

            <View style={{
                 height: '10%',
                marginHorizontal: 5,
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center'
                , backgroundColor: '#FFFFCC',
                borderWidth: 5,
               
                borderRadius: 10,

            }}>
                <TouchableOpacity style={{}} onPress={() => {
                    navigation.navigate('Thực đơn');
                }}>
                    <ArrowLeft size="55" color="black" />
                </TouchableOpacity>





                <Text style={{ color: 'blue' }}>{me.fullName}   [BÀN SỐ:{table}] </Text>

                <Text></Text>

            </View>


            <View style={{height:'80%'}}>
                <View style={{  }}>
                    <Text style={{ textAlign: 'center', color: 'black' }}> ------đơn hàng tạm tính------</Text>
                <Text style={{ color: 'red' }}>Ghi Chú Đơn Hàng:</Text>
                    <TextInput

                        placeholder="(Nhập ghi chú cho đơn hàng!!! Tối đa 100 ký tự)"
                        maxLength={100}
                        value={note}
                        style={{ alignSelf: 'center', padding: 10, width: '82%', maxHeight: 150, }}
                        multiline={true}
                        onChangeText={(text) => setNote(text)}

                    />




                </View >
                <View style={{ height:'80%'  }}>
                    <View style={{ backgroundColor: '#FFFFCC', borderTopWidth: 1,height:'90%' }}>
                        {
                            <FlatList
                                data={cartTable}
                                renderItem={
                                    ({ item }) =>

                                        <OrderItem
                                            item={item}

                                            saveCart={saveCart}

                                        />




                                }


                            />
                                
                        }

                            
                    </View>
                    
                    {tongTien === undefined || tongTien===0 ?
                            <Text></Text>
                            : 
                            <View style={{height:'10%' ,flexDirection:'row'}}>
                               {!check?
                                <TouchableOpacity 
                            style={{backgroundColor:'#ffffcc',width:'40%',alignSelf:'center',borderRadius:10,borderWidth:1,top:5}}
                            onPress={()=>{
                                setCheck(true);
                            }}><Text style={{color:check?"#ffffcc":"black",textAlign:'center'}}>{check?"":"Thêm Giá Bàn"}</Text></TouchableOpacity>
                            :<></>}
                            <Text style={{alignItems:'flex-end',alignSelf:'flex-end',alignContent:'flex-end', textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: 2,marginLeft:'auto' }}>Tổng Tiền :{fomartPrice(tongTien)}</Text>
                            
                        </View>
                        }
                </View>
                


             </View>

            <View style={{height:'10%'}}>
            

                <TouchableOpacity
                    onPress={() => {
                        if (cartTable?.length) {
                            navigation.navigate('Oderpin', { cart: cartTable,check :check, table: table  });
                        } else {
                            Toast.show('Đơn Hàng Rỗng',
                                {
                                    backgroundColor: '#3B404F',
                                    textColor: '#ffffff',
                                    opacity: 1,
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    animation: true,
                                })
                        }
                    }}
                    style={{
                        backgroundColor: '#7FFF00',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '60%',
                        height: 50,
                        marginRight: 5,
                        marginBottom: 5,
                        alignSelf: 'center',
                        // borderBottomWidth: 3,
                        borderWidth:5,
                        borderRadius:10

                    }} >
                    <Text style={{ color: 'red' }}>Đặt món</Text></TouchableOpacity>

                    {/* </View> */}

                </View>












        </View>)




} export default Oder