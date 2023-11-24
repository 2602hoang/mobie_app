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





                <Text style={{ color: 'blue' }}>Nhân phụ trách:{me.fullName}               [BÀN SỐ:{table}] </Text>

                <Text></Text>

            </View>


            <View style={{height:'81%'}}>
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
                <View style={{ height:'85%'  }}>
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
                    
                    {tongTien === undefined ?
                            <Text></Text>
                            : 
                            <View style={{height:'15%'}}>
                           
                            <Text style={{alignItems:'flex-end',alignSelf:'flex-end',alignContent:'flex-end', textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: 2,marginRight:5 }}>Tổng Tiền :{fomartPrice(tongTien)}</Text>
                            <TouchableOpacity 
                            style={{backgroundColor:'#66FF33',width:'25%',alignSelf:'center',borderRadius:10,borderWidth:1}}
                            onPress={()=>{
                                setCheck(true);
                            }}><Text style={{color:check?"red":"black",textAlign:'center'}}>{check?"":"Thêm Giá Bàn"}</Text></TouchableOpacity>
                        </View>
                        }
                </View>
                


             </View>

           <View style={{height:'15%'}}>
            <View style={{  flexDirection: 'row', borderTopWidth: 3 }}>
            <TouchableOpacity style={{
                backgroundColor: '#99FF66',
                justifyContent: 'center',
                alignItems: 'center',
                width: '33%',
                height: 50,
                marginBottom: 5,
                marginLeft: 0,
                alignSelf: 'flex-end',
                borderRightWidth: 3,
                borderBottomWidth: 3

            }}
                onPress={() => {
                    navigation.navigate('ListBills', { id: table });
                }}

            >
                <Text style={{ color: 'black' }}>XEM MÓN RA</Text></TouchableOpacity>
            <TouchableOpacity

                onPress={() => {
                    navigation.navigate('Oderlist', { id: table })

                }}
                style={{
                    backgroundColor: '#FFFF33',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '33%',
                    height: 50,
                    marginBottom: 5,
                    alignSelf: 'flex-end',
                    borderRightWidth: 3,
                    borderBottomWidth: 3

                }} >
                <Text style={{ color: 'black' }}>XEM ĐƠN HÀNG</Text></TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    if (cartTable?.length) {
                        navigation.navigate('Oderpin', { cart: cartTable,check :check });
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
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '34%',
                    height: 50,
                    marginRight: 5,
                    marginBottom: 5,
                    alignSelf: 'flex-end',
                    borderBottomWidth: 3,

                }} >
                <Text style={{ color: 'black' }}>ĐẶT MÓN </Text></TouchableOpacity>

                </View>

            </View>












        </View>)




} export default Oder