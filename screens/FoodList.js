import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView,
    ScrollView,
    Button,
    Alert
} from 'react-native'

import FoodItem from './FoodItem';
import { ArrowLeft, SearchNormal1, AddSquare, MinusSquare, Information } from 'iconsax-react-native';

import { colors, fontSizes, images } from '../constants'

import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { URL } from '../contexts/url';
import { useIsFocused } from '@react-navigation/native';

export default function FoodList({ navigation, route }) {


    const { table, setCarts, foods, setFoods, loais, setLoais } = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [fillter, setFillter] = useState(1);

    useEffect(() => {

        if (!foods?.length) {
            getProducts();
            getCategoryID();
        }
        if (!loais?.length) {
            getCategory();

        }


    }, [isFocused]);

    const getCategoryID = async (id) => {
        try {
            const response = await axios.get(`${URL}api/v1/products/category/${id}`)

            if (response.data.message === "Read Product success: congrats!") {
                setFoods(response.data.data);
            }

        } catch (error) {

            console.log('error: ', error);
        }
    }
    const getProducts = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/products`)

            if (response.data.message === "Read Product success: congrats!") {
                setFoods(response.data.data);

            }

        } catch (error) {
            console.log('error: ', error);
        }
    }
    // /api/v1/products/recommend/:limit
    const getproductLimmit = async (n) => {
        try {
            const response = await axios.get(`${URL}api/v1/products/recommend/${n}`)

            if (response.data.message === "Read recommend Product success: congrats!") {
                setFoods(response.data.data);
            }

        } catch (error) {

            console.log('error: ', error);
        }
    }


    const getCategory = async () => {

        try {

            const response = await axios.get(`${URL}api/v1/categories`)

            if (response.data.message === "Read category success: congrats!") {
                setLoais(response.data.data)
            }
        } catch (error) {
            console.log('error', error);
        }
    }


    const [timkiem, setTimkiem] = useState('')

    // {
    //     console.log(foods[0]);
    // }
    return <View style={{ flex: 1, backgroundColor: '#FFFFCC' }}>
        <View style={{
            height:'10%',
            marginHorizontal: 5,
            marginVertical: 5,
            flexDirection: 'row',

            backgroundColor: '#FFFFC6',
            borderWidth: 5,
            borderRadius: 10,

        }}>

            <TouchableOpacity onPress={() => {
                navigation.navigate('Wellcome');
            }}>
                <ArrowLeft
                    size="55" color="black" />
            </TouchableOpacity>

            <TextInput
                placeholder='Tìm kiếm món ăn theo tên'
                onChangeText={(text) =>
                    setTimkiem(text)
                }

                style={{
                    height: 60,
                    width: 10,
                    backgroundColor: '#FFFFC6',
                    flex: 1,
                }} />
            <SearchNormal1 size="55" color="#000000" />

        </View>
        <View style={{height:'9%'}}>
        <View style={{flexDirection:'row',height:'auto',alignSelf:'center', }}>
        <TouchableOpacity onPress={() => {
                    getProducts();
                }}>
                    <Text style={{ color: 'black', fontSize: fontSizes.h2, }} >|⭐ Tất Cả|</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
                    getproductLimmit(8);
                }}>
                    <Text style={{ color: 'black', fontSize: fontSizes.h2, }} > |⭐8 món lượt bán cao|</Text></TouchableOpacity>

           

                    </View>
        <View style={{
             backgroundColor: '#FFFFCC', marginTop: 1, marginBottom: 5, flexDirection: 'row'
        }}>
            </View>

            <FlatList
                style={{ height: 40, marginBottom: 0, }}
                horizontal
                data={
                    loais
                }
                renderItem={({ item }) => {
                    return <View style={{ borderColor: 'black', flexDirection: 'row',borderTopWidth:1,borderBottomWidth:1 }}>




                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                getCategoryID(item.ID);

                            }}

                        >

                            <Text style={{ color: 'black', fontSize: fontSizes.h2, }} >⭐ {item.name} | </Text>

                        </TouchableOpacity>
                       


                    </View>
                }} >
                
            </FlatList>


        </View>

        <View style={{ height: '79%' }}>
            <FlatList
                data={
                    timkiem ?
                        foods.filter(foods => foods.name.toLowerCase()
                            .includes(timkiem.toLowerCase()))
                        : foods
                }
                renderItem={
                    ({ item }) =>
                        <View style={{
                            borderBottomWidth: 1,
                            // borderTopWidth: 1,
                            // backgroundColor:item.DeletedAt===null?"":"#EEEEEE",
                            // height:150,
                            paddingTop: 2,
                            marginTop: 2
                        }}
                        >
                            <FoodItem

                                food={item} key={item.name} />


                            {item.DeletedAt === null ?
                                <TouchableOpacity style={{ marginBottom: 10, right: 10 }}

                                    onPress={async () => {


                                        // navigation.navigate("Giỏ hàng",[item]);
                                        let check = false;
                                        let check00 = false;
                                        let carts = await AsyncStorage.getItem('carts');
                                        carts = carts ? JSON.parse(carts) : [];
                                        if (carts?.length) {
                                            // console.log(JSON.stringify(carts));
                                            // console.log(carts)
                                            carts.forEach((cart, index) => {
                                                if (cart?.tableId === table) {
                                                    check = true;
                                                    check00 = true;
                                                    if (cart.item) {
                                                        let check2 = false;
                                                        cart.item?.forEach((i) => {
                                                            if (i.id === item.ID) {
                                                                i.qty += 1;
                                                                check2 = true;
                                                            }
                                                        })
                                                        if (!check2)
                                                            carts[index].item.push(
                                                                {

                                                                    id: item.ID,
                                                                    a: item.description,
                                                                    b: item.name,
                                                                    c: item.price,
                                                                    d: item.discountPrice,
                                                                    e: item.category.ID,
                                                                    qty: 1,
                                                                }
                                                            )
                                                    }
                                                }
                                            });
                                        }
                                        else
                                            if (!check) {
                                                check00 = true;
                                                carts.push({
                                                    tableId: table,
                                                    item: [
                                                        {
                                                            id: item.ID,
                                                            a: item.description,
                                                            b: item.name,
                                                            c: item.price,
                                                            d: item.discountPrice,
                                                            e: item.category.ID,
                                                            qty: 1,
                                                        }
                                                    ]
                                                })
                                            }
                                            else {
                                                check00 = true;
                                                carts.push({
                                                    tableId: table,
                                                    item: [
                                                        {
                                                            id: item.ID,
                                                            a: item.description,
                                                            b: item.name,
                                                            c: item.price,
                                                            d: item.discountPrice,
                                                            e: item.category.ID,
                                                            qty: 1,
                                                        }
                                                    ]
                                                })
                                            }

                                        if (!check00) {
                                            carts.push({
                                                tableId: table,
                                                item: [
                                                    {
                                                        id: item.ID,
                                                        a: item.description,
                                                        b: item.name,
                                                        c: item.price,
                                                        d: item.discountPrice,
                                                        e: item.category.ID,
                                                        qty: 1,
                                                    }
                                                ]
                                            })
                                        }
                                        await AsyncStorage.removeItem('carts');
                                        await AsyncStorage.setItem('carts', JSON.stringify(carts));
                                        setCarts(carts);

                                        Toast.show('Thêm Thành Công',
                                            {
                                                backgroundColor: '#3B404F',
                                                textColor: '#ffffff',
                                                opacity: 1,
                                                duration: Toast.durations.SHORT,
                                                position: Toast.positions.BOTTOM,
                                                animation: true,
                                            })

                                    }}>

                                    <Text style={{ textAlign: 'center', color: 'red', fontSize: fontSizes.h4, fontWeight: 'bold' }} >THÊM VÀO GIỎ HÀNG</Text>

                                </TouchableOpacity> : 
                                <View style={{backgroundColor:'#ffffff'}}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', }}>(Nhà Hàng Ngưng Phục Vụ Món Trên)</Text>
                                </View>
                                }





                        </View>} />
        </View>

    </View>

}


