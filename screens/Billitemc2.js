
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Billitem from "./Billitem";
import Toast from "react-native-root-toast";
import { formattedTimestamp } from "../utilies/DateTime";
import { fomartPrice } from "../utilies/Format";
import Billitem2 from "./Billitem2";
export default function Billitemc2({ item }) {
  return (
    <View
      style={{

        borderColor: 'black',
        borderRadius: 0,
        marginBottom: 5

      }}>
      <Text style={{ marginLeft: 120, textAlign: "right", fontWeight: '400', color: "black" }}>{`Thời gian đặt: ${formattedTimestamp(item.acceptedTime)}`}</Text>
      {item.items.map((item1) => (
        <Billitem2
          item1={item1}
          orderId={item.orderId}
        />

      ))

      }


     






    </View>

  )
}