
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Billitem1 from "./Billitem1";
import Toast from "react-native-root-toast";
import { formattedTimestamp } from "../utilies/DateTime";
import { fomartPrice } from "../utilies/Format";
export default function Billitemc1({ item, setModalVisible, setOrderId, setPrdId, setSLMax }) {
  return (
    <View
      style={{

        borderColor: 'black',
        borderRadius: 0,
        marginBottom: 5

      }}>
      {/* <Text style={{ fontWeight: 'bold', color: "black" }} >ID:{item.orderId}</Text>
      <Text style={{ marginLeft: 120, textAlign: "right", fontWeight: '400', color: "black" }}>{`Thời gian: ${formattedTimestamp(item.acceptedTime)}`}</Text> */}
      {item.items.map((item1) => 
        (
          item1.product.category.ID===3?
          <Billitem1
            item1={item1}
            setModalVisible={setModalVisible}
            setOrderId={setOrderId}
            setPrdId={setPrdId}
            orderId={item.orderId}
            setSLMax={setSLMax}
          />
          
          :
          <View></View>
        ))
      }
      {/* <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, marginRight: 5, textAlign: 'right', fontWeight: 'bold', color: '#111111' }}></Text> */}

    </View>

  )
}