
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { fomartPrice } from "../utilies/Format";
import CheckBox from 'react-native-check-box';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";



export default function Billitem1({ item1, setModalVisible, setOrderId, setPrdId, orderId, setSLMax }) {
  // {console.log(item1)}
  return (
    <View style={{}}>
      <Text style={{ fontWeight: 'bold', color: "black" }}>{`Tên nước: ${item1.product.name}`}</Text>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>{`Giá Gốc: ${fomartPrice(item1.product.price)}`}</Text>

        <Text style={{ marginLeft: 140, fontWeight: 'bold', color: 'red' }}>{`Giá Giảm: ${fomartPrice(item1.product.discountPrice)}`}</Text>
      </View> */}
      <Text style={{ marginRight: 50, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{`SL: ${item1.quantity} `}</Text>

      <TouchableOpacity
        onPress={() => {
          setOrderId(orderId);
          setPrdId(item1.product.ID);
          setModalVisible(true);
          setSLMax(item1.quantity)
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
        }} ><Text>Trả Hàng</Text></TouchableOpacity>
      <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, marginRight: 5, textAlign: 'right', fontWeight: 'bold', color: '#111111' }}></Text>
    </View>

  )
}