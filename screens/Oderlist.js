
import { Button, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../contexts/url";
import { AuthContext } from "../contexts/AuthContext";
import { colors, fontSizes } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Oder from "./Oder";
import { UIHeader } from "../components";
import { ArrowLeft } from "iconsax-react-native";
import { fomartPrice } from "../utilies/Format";
import { formattedTimestamp } from "../utilies/DateTime";


export default function Oderlist({ route, navigation }) {

  const [bills, setBills] = useState([])
  const nav = useNavigation();
  const ban = route.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const soluong = bills.reduce((acc, item) => {
    item.items.forEach(e => {
      acc += e.quantity;
    });
    return acc;

  }, 0);


  const totalPriceOfAllBills = bills.reduce((acc, bill) => {
    const totalPriceForBill = bill.items.reduce((billAcc, item) => {
      // Apply the appropriate price based on quantity
      let itemPrice;
      if (item.quantity > item.product.discount.minQuantity) {
        itemPrice = item.product.discountPrice * item.quantity;
      } else {
        itemPrice = item.product.price * item.quantity;
      }

      // Accumulate the item price into the bill total
      billAcc += itemPrice;
      return billAcc;
    }, 0);

    // Accumulate the bill total into the overall total
    acc += totalPriceForBill;
    return acc;
  }, 0);




  useEffect(() => {
    getbils();
    setTimeout(() => {
      setIsLoading(false);
    }, 500)

  }, [isLoading])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getbils();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  



  const getbils = async (ban) => {
    try {
      const response = await axios.get(`${URL}api/v1/booking/table/preparing/${route.params.id}`);
      if (response.data.statusCode === 200) {

        setBills(response.data.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  
  const orderTotalPrices = {};
  bills.forEach((order) => {
    // console.log('456456',order)
    const totalPrice1 = order.items.reduce((acc, item) => {
      // console.log(item.product.discount.minQuantity);
      if (item.quantity > item.product.discount.minQuantity) {
        acc += item.product.discountPrice * item.quantity;
      } else {
        acc += item.product.price * item.quantity;
      }
      return acc; // Explicitly return the accumulator value
    }, 0);
    orderTotalPrices[order.orderId] = totalPrice1;
  });


  return (
    // {!isLoading :<></>}
    <View style={{ backgroundColor: '#ffffcc', flex: 1 }}>
      <UIHeader
        title={`ĐƠN HÀNG CHỜ XÁC NHẬN BÀN (${ban})`}
        isShowBack
      />


      {!isLoading ?
        <View >
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={{ textAlign: "center", fontSize: fontSizes.h1, color: 'red',marginBottom:10 }}>-----Danh Sách Món Ăn-----</Text>
            <TouchableOpacity
            onPress={()=>{
              nav.navigate('Billrejected',{ID :ban});
            }}
            style={{borderBottomWidth:1,borderTopWidth:1, width:'50%',alignSelf:'center'}}><Text style={{ textAlign: "center", color: 'black', }}>Xem Đơn Từ Chối</Text></TouchableOpacity>
          </View>
          <View style={{height:'75%'}}>
          {bills.length ?
            <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
              style={{ marginTop: 5, borderTopWidth: 2, borderBottomWidth: 2 }}
              
              data={bills}
              renderItem={({ item }) => (
                <View
                  style={{

                    borderColor: 'black',
                    borderRadius: 0,
                    marginBottom: 5

                  }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontWeight: 'bold', color: "black" }}>ID:{item.orderId}</Text>

                    <Text style={{ marginLeft: 120, textAlign: "right", fontWeight: '400', color: "black" }}>{`Thời gian: ${formattedTimestamp(item.createdTime)}`}</Text>
                  </View>
                  {item.note.length ?
                    <Text style={{ color: 'red', textAlign: 'center' }}>Ghi chú đơn :({item.note})</Text>
                    : <Text></Text>
                  }
                  {item.items.map((item1) => (

                    <View style={{}}>


                    {console.log("okee",item1)}
                      <Text style={{ fontWeight: 'bold', color: "black" }}>{`Tên Món Ăn: ${item1.product.name}`}</Text>
                      <Text></Text>
                      {/* <View style={{ flexDirection: 'row' }}> */}
                      <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'right' }}>{`Đơn Giá: ${item1.product.discount.minQuantity <item1.quantity ? fomartPrice(item1.product.discountPrice) : fomartPrice(item1.product.price)}`}</Text>

                      {/* <Text style={{ marginLeft: 140, fontWeight: 'bold', color: 'red' }}>{`Giá Giảm: ${fomartPrice(item1.product.discountPrice)}`}</Text> */}
                      {/* </View> */}
                      <Text style={{ marginRight: 50, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{`SL: ${item1.quantity}`}</Text>


                    </View>





                  ))}
                  <Text style={{ fontWeight: 'bold', color: '#111111', textAlign: 'right', marginRight: 2 }}>{`Tổng Tiền Đơn ${item.orderId}:  ${fomartPrice(orderTotalPrices[item.orderId])}`}</Text>
                  <View style={{ borderBottomWidth: 1, borderStyle: 'dotted' }}></View>
                </View>
              )}

            />

            : 
            
            <Text style={{ textAlign: "center", color: 'black',alignSelf:'stretch',justifyContent:'space-evenly',alignItems:'stretch',marginTop:'auto' }} >(Hiện Tại Chưa Có Đơn nào chờ bếp xác nhận)</Text>     
            }
            </View>


        <View style={{height:'10%'}}>
          <View>
          
            {soluong != 0 ?
              <View style={{ marginTop: 0, marginBottom: 50 }}>
                <Text style={{ textAlign: 'right', color: 'black', fontWeight: 'bold', marginRight: 10 }}>{`Tổng Số Lượng Món bàn ${ban} : ${soluong}`}</Text>
                <Text style={{ textAlign: 'right', color: 'black', fontWeight: 'bold', marginRight: 10 }}> {`Tổng tiền bàn ${ban}: ${fomartPrice(totalPriceOfAllBills)}`}</Text>
              </View>
              :
              <View></View>
            }
          </View>
          </View>
        </View>
        : <></>}
       
    </View>

  )
}
