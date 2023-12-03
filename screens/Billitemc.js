
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Billitem from "./Billitem";
import Toast from "react-native-root-toast";
import { formattedTimestamp } from "../utilies/DateTime";
import { fomartPrice } from "../utilies/Format";
export default function Billitemc({ item, finishedbills, orderTotalPrices, compensatebills, listbill, numChecked }) {
  return (
    <View
      style={{

        borderColor: 'black',
        borderRadius: 0,
        marginBottom: 5

      }}>

      {/* <Text style={{ fontWeight: 'bold', color: "black" }} >ID:{item.table.basePrice}</Text> */}
      <Text style={{ marginLeft: 'auto', textAlign: "right", fontWeight: '300', color: "black" }}>{`Thời gian đặt: ${formattedTimestamp(item.acceptedTime)}`}</Text>
      {item.items.map((item1) => (
        <Billitem
          item1={item1}
          numChecked={numChecked}
          orderTotalPrices={orderTotalPrices}
          listbill={listbill}

        />

      ))

      }
      <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1,fontWeight: 'bold', color: 'red', textAlign: 'right', marginRight: 2 }}>{`Tổng Tiền Đơn ${item.orderId}: ${fomartPrice(orderTotalPrices[item.orderId])}`}</Text>


     






    </View>

  )
}