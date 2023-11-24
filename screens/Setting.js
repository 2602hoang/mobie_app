import React, {useState, useEffect, useContext} from 'react';
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
} from 'react-native'
import {images, colors, icons, fontSizes} from '../constants'

import { UIHeader } from '../components';

import {StackActions, useNavigation} from '@react-navigation/native'
import {LogoutCurve,LanguageSquare,TableDocument} from 'iconsax-react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { URL } from '../contexts/url';
function Setting (props) {
    useEffect(() => {
		
		getThongtin();
		
		
		
	}, []);
    
    const { Logout,setMe,me} = useContext(AuthContext);
    const nav = useNavigation();
    const getThongtin =async ()=>
    {
		// await wait(3000);
        try{
            const response = await axios.get(`${URL}api/v1/auth/me`);
        
        if (response.data.message === "Get user info success: congrats!") {
            setMe(response.data.data);
        }
    }catch(error){
            console.log('error',error);
        }
    }
    return (
        <View style={{ flex:1, backgroundColor:'#FFFFCC' }}>
            <UIHeader title={"THÔNG TIN & NGHIỆP VỤ"} isShowBack
            />
            <ScrollView>
                <View style={{height:'100', backgroundColor:'#CCFF66',justifyContent:'center',marginTop:5, marginBottom:10,marginLeft:5,marginRight:5,borderRadius:10}}>
                    <Text style={{ fontSize:fontSizes.h1 ,color:'red', paddingStart:20,}}>Thông Tin Nhân Viên</Text>
                    
                </View>
                <View style={{height:150
                }}>
                         <Text style={{paddingStart:15, fontSize:fontSizes.h2,color:'black'}}>HỌ VÀ TÊN: {me.fullName}</Text>
                         <Text></Text>
                         <Text style={{paddingStart:15, fontSize:fontSizes.h2,color:'black'}}>GIỚI TÍNH : {me.gender ? 'Nữ' : 'Nam'}</Text>
                         <Text></Text>
                         <Text style={{paddingStart:15, fontSize:fontSizes.h2,color:'black'}} >SỐ ĐIỆN THOẠI: {me.tel}</Text>
                         <Text></Text>
                         <Text style={{paddingStart:15, fontSize:fontSizes.h2,color:'black'}}>CHỨC VỤ : Nhân Viên</Text>

                </View>
                    <View style={{height:'50', backgroundColor:'#CCFF66',justifyContent:'center',marginTop:30,marginLeft:5,marginRight:5,borderRadius:10}}>
                <Text style={{ fontSize:fontSizes.h1 ,color:'red', paddingStart:20 }}>Nghiệp Vụ </Text>
                    </View>
                    <View>
                        
                        <TouchableOpacity
                        onPress={()=>{
                            nav.navigate('Bills');
                    }}
                        style={{flexDirection:'row',paddingStart:30 ,borderBottomWidth:3,borderRadius:20,marginTop:5,borderBlockColor:'black'}}>
                        <TableDocument size="30" color="black"style={{top:7,let:3}}/>
                            <Text style={{ fontSize:fontSizes.h2,marginBottom:10,marginTop:10,color:'black' }}>Lịch sử đơn hàng theo bàn</Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',paddingStart:30 ,borderBottomWidth:3,borderRadius:20,marginTop:5,borderBlockColor:'black'}}>
                        <LanguageSquare size="30" color="black" style={{top:7,let:3}}/>
                            <Text style={{ fontSize:fontSizes.h2,marginBottom:10,marginTop:10,color:'black' }}>Thay đổi ngôn ngữ </Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',paddingStart:30 ,borderBottomWidth:5,borderRadius:20,marginTop:5,borderBlockColor:'black'}} onPress={() => {
                            Logout();
                        }} >
                        <LogoutCurve size="30" color="black" style={{top:7,let:3}}/>
                            <Text style={{ fontSize:fontSizes.h2,marginBottom:10,marginTop:10 ,color:'black'}}>Đăng xuất tài khoản </Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>
    )
    }  
export default Setting