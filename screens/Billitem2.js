
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { fomartPrice } from "../utilies/Format";
import CheckBox from 'react-native-check-box';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { URL } from "../contexts/url";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";



export default function Billitem2({ item1, orderId}) {
  const nav = useNavigation();
  const compensatebills = async (orderId,billId) => {
    try {
      const response = await axios.patch(`${URL}api/v1/bills/compensated/?orderId=${orderId}&billId=${billId}`);
      if (response.data.statusCode === 200) {
        nav.goBack();
        Toast.show('Đền đơn thành công ',
          {
            backgroundColor: '#3B404F',
            textColor: '#ffffff',
            opacity: 1,
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            animation: true,
          })
      }

    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <View style={{}}>

      <Text style={{ fontWeight: 'bold', color: "black" }}>{`Tên Món Ăn: ${item1.product.name}`}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>{`Giá Gốc: ${fomartPrice(item1.product.price)}`}</Text>

        <Text style={{ marginLeft: 140, fontWeight: 'bold', color: 'red' }}>{`Giá Giảm: ${fomartPrice(item1.product.discountPrice)}`}</Text>
      </View>
      <Text style={{ marginRight: 50, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{`SL: ${item1.quantity}`}</Text>
      <View style={{  }}>
      <TouchableOpacity
        onPress={() => {
          compensatebills(orderId,item1.billId);
        }}
        style={{
          marginLeft: 10,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 40,
          borderRadius: 10,
          alignSelf: 'flex-end',
        }} ><Text>Đền món</Text></TouchableOpacity>
      </View>
      <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, marginRight: 5, textAlign: 'right', fontWeight: 'bold', color: '#111111' }}>{`Thành Tiền: ${fomartPrice(item1.product.discountPrice * item1.quantity)}`}</Text>
    </View>

  )
}