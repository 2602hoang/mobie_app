import React, { useContext, useEffect, useState } from 'react';


import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
    ScrollView,
    Button,
    SafeAreaView
} from 'react-native'
import { ArrowLeft, Check, HambergerMenu, Tenx } from 'iconsax-react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { URL } from '../contexts/url';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
//secret_code

function Oderpin({ navigation, route }) {
    const [pin, setPin] = useState(null)
    //3779
    const { table, carts, setCarts, me, setCartTable, note, setNote } = useContext(AuthContext);
    //const [mepin, setmepin] = useState(3730);

    // useEffect(()=>{
    //     console.log(route.params.cart)
    // },[])
    // console.log(route.params.check);
    const toOrder = async () => {
        let quantities = [];
        let productsId = [];
        const cart = route.params.cart;
        if (cart) {
            cart.forEach(e => {
                quantities.push(Number(e.qty));
                productsId.push(e.id);
            })
            if (table, quantities.length, productsId.length) {
            //   console.log("ok",Number(pin));
                try {
                   
                    const response = await axios.post(`${URL}api/v1/booking`,
                        {
                           
                            note: note,
                            secretCode: Number(pin),
                            tableId: table,
                            quantities: quantities,
                            productsId: productsId,
                            includeTableCost: route.params.check
                        }
                    )
                    
                    if (response.data.statusCode === 200) {
                        removeCart();
                        setNote('');
                        Toast.show('Thành công',
                            {
                                backgroundColor: '#3B404F',
                                textColor: '#ffffff',
                                opacity: 1,
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.BOTTOM,
                                animation: true,
                            })
                        navigation.navigate('Thực đơn')
                    }
                } catch (error) {
                    Toast.show('Mã Pin Sai',
                        {
                            backgroundColor: '#3B404F',
                            textColor: '#ffffff',
                            opacity: 1,
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            animation: true,
                        })
                }
            }
            else {
                Toast.show('Lỗi ',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        animation: true,
                    })
            }
        }
        else {
            Toast.show('Lỗi',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    animation: true,
                })
        }
    }

    const removeCart = async () => {
      
        if (carts?.length) {
            carts.forEach((cart, index) => {
                if (cart.tableId === table) {
                    carts.splice(index, 1);
                }
            }
            );
        }

        await AsyncStorage.removeItem('carts');
        await AsyncStorage.setItem('carts', JSON.stringify(carts));
        setCarts(carts);
        setCartTable(null);
    }

    return (
        
        <View style={{ flex: 1, backgroundColor: '#ffffcc' }}>
            <View style={{height:'10%', flexDirection:'row', borderBottomWidth: 4, borderTopWidth: 5 }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MyTabs');
                }}>
                    <ArrowLeft size="55" color="black" />
                </TouchableOpacity>
                <Text style={{ textAlign:'right',alignSelf:'center',right:-180 }}>[BÀN: {table}]</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <SafeAreaView style={{ width: 300 }}>
                    <Text></Text>
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        Hãy Nhập Chính Xác Mã Pin Của Bạn
                    </Text>
                    <Text>
                        *_________________________________*
                    </Text>
                    <Text>

                    </Text>
                    <TextInput

                        placeholder="Nhập mã pin để đặt món"
                        keyboardType='number-pad'
                        secureTextEntry={true}
                        maxLength={4}
                        value={pin}
                        style={{ textAlign:'center', borderBottomWidth: 4, marginTop: 200,width:'80%' ,alignSelf:'center'}}
                        onChangeText={(text) => {setPin(text);}}
                    />
                    <Text></Text>
                    <Button
                    style={{width:'50%',}}
                        title="Xác Nhận Mã Pin"
                        onPress={() => {
                            toOrder();
                        }
                        }
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}
export default Oderpin
