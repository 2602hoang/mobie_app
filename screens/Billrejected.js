
import { ActivityIndicator, Alert, Button, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../contexts/url";
import { AuthContext } from "../contexts/AuthContext";
import { colors, fontSizes } from "../constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Oder from "./Oder";
import { UIHeader } from "../components";
import { ArrowLeft, MoreCircle } from "iconsax-react-native";
import { fomartPrice } from "../utilies/Format";
import { formattedTimestamp } from "../utilies/DateTime";
import Bills from "./Bills";
import Toast from "react-native-root-toast";
import CheckBox from 'react-native-check-box';
import Billitem from "./Billitem";
import Billitemc from "./Billitemc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuOption, MenuOptions, MenuProvider, MenuTrigger } from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Billrejected({route}) {
 
    const [billrejected,setBillrejected]=useState();
      const Ban = route.params.ID;
    // {console.log(Ban)} 
    const nav = useNavigation();
  useEffect(() => {
   
    getBillrejected();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500)
  }, []);
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     getBillrejected();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 500);
//   }, []);


  
 


  const getBillrejected = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/booking/table/rejected/${route.params.ID}`);
      if (response.data.statusCode === 200) {
        setBillrejected(response.data.data);
        // console.log(response.data.data);
      }

    } catch (error) {
      console.log('error', error);
    }
  }

  
  return (
    <View style={{ backgroundColor: '#ffffcc', flex:1 }}>
      <UIHeader
        title={`ĐƠN BẾP TỪ CHỐI BÀN :${Ban} `}
        isShowBack
      />
      <View style={{height:'80%'}}>
        <FlatList
        data={billrejected?.reverse()}
        
        renderItem={({ item }) => (
            <View
              style={{
               borderTopWidth:2,
                borderColor: 'black',
                marginTop: 20,
               
              }}
            >
            
              <View>
                <View style={{flexDirection:'row'}}>
                <Text style={{ fontWeight: 'bold', color: 'black',marginRight:140 }} >ID:{item.orderId}</Text>
                <Text style={{ fontWeight: 'bold', color: 'black' }} >Trạng thái đơn:Bếp từ chối</Text>
                
                </View>
                <Text style={{ fontWeight: 'bold', color: 'black',marginRight:140 }} >Lý Do:{item.reason}</Text>
    
                {/* <Text style={{ fontWeight: 'bold', color: 'black' }} >{`Loại Đơn: Đơn đền (nhân viên phụ trách:${me.fullName})` }</Text> */}
                <Text style={{ fontWeight: 'bold', color: 'black' }} >Thời gian đặt đơn:{formattedTimestamp(item.createdTime)}</Text>
                {item.note.length?
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Ghi Chú :{item.note}</Text>
                :<Text></Text>}
              </View>
              {item.items.map((item1) => (
                <View style={{marginTop:10  , borderStyle: 'dashed', borderBottomWidth: 1,}}>
                  <Text style={{ fontWeight: 'bold', color: 'black' }} >{`Tên món ăn : ${item1?.product?.name}`}</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>{`Giá Gốc: ${fomartPrice(item1.product.price)}`}</Text>
                  <View style={{ flexDirection: 'column', alignSelf: 'flex-end', marginRight: 2 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'right' }}>{`Đơn Giá: ${item1.product.discount.minQuantity <item1.quantity ? fomartPrice(item1.product.discountPrice) : fomartPrice(item1.product.price)}`}</Text>
    
    
                    {/* <Text style={{ fontWeight: 'bold', color: 'red' }}>{`Giá Giảm: ${fomartPrice(item1.product.discountPrice)}`}</Text> */}
                    
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }} >{`${item1.quantity===0?"Đã Trả Hết Hàng": "SL:" +item1.quantity}`}</Text>
                    {/* <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }} >{`Thành Tiền:${fomartPrice(item1. item1.quantity*item1.product.discountPrice)}`}</Text> */}
           
                  </View>
                  
                  
                  <Text></Text>
                </View>
              ))}
              {/* <View style={{  flexDirection: 'row',alignSelf:'flex-end' }}>
              <Text style={{ fontWeight: 'bold', color: '#111111', textAlign: 'right', marginRight: 2 , marginRight: 180}}>{`Tổng SL: ${orderQuantity[item.orderId]}`}</Text>
           <Text style={{ fontWeight: 'bold', color: '#111111', textAlign: 'right', marginRight: 2 }}>{`Tổng Tiền: ${fomartPrice(orderTotalPrices[item.orderId])}`}</Text>
           
           </View> */}
            </View>
          )}
        />

       
      </View>
     <View>
        <TouchableOpacity 
        onPress={()=>{
            nav.navigate('Thực đơn');
        }}
        style={{backgroundColor:'#ffffff',borderWidth:1, width:'50%',alignSelf:'center',marginTop:6}}><Text style={{ textAlign: "center", color: 'red', }}>Đặt lại đơn</Text></TouchableOpacity>
     </View>
    </View>
  )
}
