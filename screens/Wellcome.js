import React, { useState, useEffect, useContext, useCallback } from 'react';
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
    Alert,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

import { colors, fontSizes, images } from '../constants'
import { Bag, Check, HambergerMenu, SearchNormal1 } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../contexts/url';
import { AuthContext } from '../contexts/AuthContext';
import { fomartPrice } from '../utilies/Format';
import Tooltip from 'react-native-tooltip';
function Wellcome({ navigation }) {
    const [bans, setBan] = useState([])
    const [timban, setTimban] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { setTable } = useContext(AuthContext);
    const [fillter, setFillter] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    // const Text1 = ({ available, ...rest }) => {
    //     const color = available ? 'black' : 'red';
    //     return (
    //       <Text style={{ color, fontSize: fontSizes.h3, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>
    //         Trạng thái: {item.available ? 'Trống' : 'Có Khách'}
    //       </Text>
    //     );
    //   };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            getBan();
        }, 1000)
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getBan();
            setRefreshing(false);
        }, 1000);
    }, []);


    const getBan = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/tables`)

            if (response.data.statusCode === 200) {
                setBan(response.data.data);
                // console.log("ban",response.data.data);
            }


        } catch (error) {

            console.log('error: ', error);
        }

    }
    // {console.log(bans)}
    const getBanIDsudung = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/tables/status/false`)

            if (response.data.message === "Read Table by employeeId and status success: congrats!") {
                setBan(response.data.data);
            }
            // console.log("ok",JSON.parse(response.data.data));

        } catch (error) {

            console.log('error: ', error);
        }

    }
    const getBanIDcontrong = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/tables/status/true`)

            if (response.data.message === "Read Table by employeeId and status success: congrats!") {
                setBan(response.data.data);
            }
            // console.log('con trong')
            // console.log("ok",response.data.data);

        } catch (error) {

            console.log('error: ', error);
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFCC' }}>
            <View style={{
                height: '20%',
                backgroundColor: '#FFFFCC',
                marginHorizontal: 5,
                marginVertical: 5,


                //flexDirection: 'row'
            }}>

                <View style={{
                    marginHorizontal: 5,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                    , backgroundColor: '#FFFFCc'
                    , borderWidth: 5,
                    borderRadius: 10
                }}>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Setting');
                    }}>
                        <HambergerMenu size="55" color="black" />
                    </TouchableOpacity>


                    <TextInput
                        placeholder='Tìm kiếm tên bàn'
                        onChangeText={(text) =>
                            setTimban(text)
                        }

                        style={{
                            height: 60,
                            width: 10,
                            backgroundColor: '#FFFFCc',
                            flex: 1,
                            borderRadius: 20,
                        }} />
                    <SearchNormal1 size="55" color="#000000" />



                </View>

                <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#ffffcc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '33%',
                        height: 50,
                        marginBottom: 5,
                        marginLeft: 0,
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                        borderWidth: fillter === 1 ? 1 : 0,

                    }}
                        onPress={() => {
                            getBan();
                            setFillter(1);
                        }
                        }
                    >
                        <Text style={{ color: 'black', fontWeight: fillter === 1 ? '500' : 'normal' }}>TẤT CẢ </Text></TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: '#ffffcc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '33%',
                        height: 50,
                        marginBottom: 5,
                        borderRadius: 10,
                        borderWidth: fillter === 2 ? 1 : 0,
                        alignSelf: 'flex-end',
                    }}
                        onPress={() => {
                            getBanIDcontrong();
                            setFillter(2);
                        }}
                    >
                        <Text style={{ color: 'black', fontWeight: fillter === 2 ? '500' : 'normal' }}>CÒN TRỐNG</Text></TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: '#ffffcc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '33%',
                        height: 50,
                        marginRight: 5,
                        marginBottom: 5,
                        borderRadius: 10,
                        borderWidth: fillter === 3 ? 1 : 0,
                        alignSelf: 'flex-end',
                    }}
                        onPress={() => {
                            getBanIDsudung();
                            setFillter(3);
                        }}
                    >
                        <Text style={{ color: 'black', fontWeight: fillter === 3 ? '500' : 'normal' }}>SỬ DỤNG</Text></TouchableOpacity>
                </View>
            </View>

            {/* <TouchableOpacity onPress={() => {
                            navigation.navigate('FoodList');
            
                        }}> */}
            {isLoading ?
                <View className="bg-[#0A0909] flex-1 justify-center items-center">
                    <ActivityIndicator size={'large'} color={'#1273FE'} />
                </View> :
                <View style={{ height: '80%' }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }

                        style={{ marginTop: 5 }}
                        // data={bans.filter(ban=> ban.ID == timban)}

                        data={
                            timban ?
                                bans.filter(bans => bans.ID == timban)
                                : bans
                        }
                        numColumns={1}

                        renderItem={({ item }) =>


                            <TouchableOpacity style={{
                                flex: 1, height: '100%',
                                //  marginLeft: index % 2 == 0 ? 10 : 0,
                                // marginTop: 5,
                                marginBottom: 10,
                                width: '90%',
                                alignSelf: 'center',
                                // height:300,
                                marginRight: 5,
                                borderRadius: 20,
                                borderWidth: 2, borderColor: 'rgba(0,0,0,0.5)',
                                backgroundColor: item.available ? '#ffffff' : '#FFCC00'
                            }}
                                onPress={() => {
                                    navigation.navigate('MyTabs', item.ID);
                                    setTable(item.ID);
                                }}
                            >


                                {/* {console.log(item)} */}
                                <View style={{flexDirection:''}}>
                                    
                                    <View style={{ flexDirection: 'column', alignSelf:'center',justifyContent:'center'}}>
                                        <Text style={{ color: item.available ? 'black' : 'red', fontSize: fontSizes.h2, fontWeight: 'bold', textAlign: 'center' }}>Tên bàn :{item.ID}</Text>
                                        <Text style={{ color: item.available ? 'black' : 'red', fontSize: fontSizes.h3, fontWeight: 'bold', textAlign: 'center' }}>Trạng thái: {item.available ? 'Trống' : 'Có Khách'}</Text>

                                        <Text style={{ color: 'red', fontSize: fontSizes.h3, fontWeight: 'bold', textAlign: 'center' }}>{item.basePrice === 0 ? "" : "Phụ Phí: " + fomartPrice(item.basePrice)}</Text>
                                        {/* <Text></Text> */}
                                        <Text style={{ color: 'black', fontSize: fontSizes.h3, fontWeight: 'bold', textAlign: 'center' }}>Khu Vực:{item.area.pos}</Text>
                                        <Text style={{ color: 'black', fontSize: fontSizes.h3, fontWeight: 'bold', textAlign: 'center' }}>Loại:{item.normalTable ? "Phổ Thông" : "Bàn VIP"}</Text>
                                        <Text style={{ color: '#00CC00', fontSize: fontSizes.h4, fontWeight: 'bold', textAlign: 'center' }}>Số lượng khách :{item.capacity}</Text>

                                    </View>
                                    {!item.available?
                                    <View style={{alignSelf:'',justifyContent:''}}>
                                    <TouchableOpacity
                                    //  style={{borderWidth:1,width:'20%',borderColor:'black'}}
                                    onPress={() => {
                                        Alert.alert(
                                            `Bạn Muốn xem đơn của bàn   ${item.ID}`,
                                          "đơn chờ xác nhận Hoặc đơn đang ra món",
                                          
                                          [
                                            // {
                                            //   text: `đơn chờ xác nhận hoặc từ chối ${item.ID}`,
                                            //   onPress: () => {
                                            //     navigation.navigate('Oderlist', { id: item.ID })
                                            //   }
                                            // },
                                            {
                                              text: `xem đơn của bàn  ${item.ID}`,
                                              onPress: () => {
                                                navigation.navigate('Oderlist', { id: item.ID })
                                              }
                                            },
                                            {
                                              text: "Thoát",
                                              onPress: () => {}
                                            },
                                          ],
                                        )
                                      }}

                                        style={{borderRadius:15, borderWidth:1,width:'30%',borderColor:'red', flexDirection: 'row', justifyContent: 'center',alignSelf:'center', }}>
                                        
                                            <Bag
                                            
                                                title='danh sách đơn'
                                                text='danh sách đơn'
                                                variant="Bold"
                                                size="32"
                                                color="#FF0000"
                                            />
                                        <Text style={{textAlign:'center',marginTop:5,color:'red',fontWeight:'900'}}>đơn hàng </Text>
                                    </TouchableOpacity>
                                    </View> :<></>}

                                    {/* <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Oderlist', { id: item.ID })
                                        }}
                                    ><Text> đơn chấp nhận</Text></TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('ListBills', { id: item.ID })
                                        }}
                                    ><Text> xem ra món </Text></TouchableOpacity>
                                </View> */}

                                </View>
                                
                            </TouchableOpacity>} />
                </View>}

        </View>

    )

}
export default Wellcome