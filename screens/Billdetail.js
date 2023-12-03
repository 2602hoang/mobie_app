
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../contexts/url";
import { AuthContext } from "../contexts/AuthContext";
import { fontSizes } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Oder from "./Oder";
import { UIHeader } from "../components";
import { ArrowLeft } from "iconsax-react-native";
import { fomartPrice } from "../utilies/Format";
import { formattedTimestamp } from "../utilies/DateTime";




export default function Billdetail({ route, navigation }) {
  const ban = route.params.tableId;
  const orders = route.params.orders;

  const { me } = useContext(AuthContext);
  const soluong = orders.reduce((acc, item) => {
    item.items.forEach(e => {
      acc += e.quantity;
    });
    return acc;

  }, 0);
  const orderQuantity = {};
  orders.forEach((order) => {
    const quantity1 = order.items.reduce((acc, item) => acc + item.quantity, 0);
    orderQuantity[order.orderId] = quantity1;
  });


  const orderTotalPrices = {};
  orders.forEach((order) => {
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


  // const totalPrice = orders.map((item1) => {
  //   const price = item1.items.map(p => p.product.discountPrice * p.quantity).reduce((acc, p) => acc + p, 0);
  //   return price;

  // });

  // const totalPriceOfAllBills = totalPrice.reduce((acc, price) => acc + price, 0);
  const totalPriceOfAllBills = orders.reduce((acc, bill) => {
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

  }, [])
  return <View style={{ backgroundColor: '#ffffcc', flex: 1 }}>
    <UIHeader
      title={`ĐƠN HÀNG CỦA BÀN : ${ban}`}
      isShowBack
    />

    <FlatList
      data={orders.slice(0, 10)}
      renderItem={({ item }) => (
        <View
          style={{
            borderTopWidth: 2,
            borderColor: 'black',
            marginTop: 20,

          }}
        >

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black', marginRight: 'auto' }} >ID:{item.orderId}</Text>
              <Text style={{ fontWeight: 'bold', color: 'black' }} >Trạng thái:{item.status ? "Hoàn Thành" : "Chưa Hoàn Thành"}</Text>



            </View>
            <Text style={{ fontWeight: 'bold', color: 'black', marginRight: 140 }} >{item.reason ? "Lý Do từ chối đơn:" + item.reason : ""}</Text>
            <Text style={{ fontWeight: 'bold', color: 'black' }} >{item.compensate ? `Loại Đơn: Đơn đền (nhân viên phụ trách:${me.fullName})` : ""}</Text>
            <Text style={{ fontWeight: 'bold', color: 'black' }} >Thời gian:{formattedTimestamp(item.createdTime)}</Text>
            {item.note.length ?
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Ghi Chú :{item.note}</Text>
              : <Text></Text>}
          </View>
          {item.items.map((item1) => (
            <View style={{ marginTop: 10, borderStyle: 'dashed', borderBottomWidth: 1, }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }} >{`Tên món ăn : ${item1?.product?.name}`}</Text>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{`Giá Gốc: ${fomartPrice(item1.product.price)}`}</Text>
              <View style={{ flexDirection: 'column', alignSelf: 'flex-end', marginRight: 2 }}>
                <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'right' }}>{`Đơn Giá: ${item1.product.discount.minQuantity < item1.quantity ? fomartPrice(item1.product.discountPrice) : fomartPrice(item1.product.price)}`}</Text>


                {/* <Text style={{ fontWeight: 'bold', color: 'red' }}>{`Giá Giảm: ${fomartPrice(item1.product.discountPrice)}`}</Text> */}

                <Text style={{ marginRight: 8, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>
                  {item1.quantity === 0 ? 'Trả hết hàng' : 'SL:' + item1.quantity + ' / ' + item1.product.uint}
                </Text>
                {/* <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }} >{`Thành Tiền:${fomartPrice(item1. item1.quantity*item1.product.discountPrice)}`}</Text> */}

              </View>


              <Text></Text>
            </View>
          ))}
          <View style={{ flexDirection: 'column', alignSelf: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', color: '#111111', textAlign: 'right', marginRight: 2, marginRight: '180' }}>{`Tổng SL: ${orderQuantity[item.orderId]}`}</Text>
            <Text style={{ fontWeight: 'bold', color: '#111111', textAlign: 'right', marginRight: 2 }}>{`Tổng Tiền: ${fomartPrice(orderTotalPrices[item.orderId])}`}</Text>

          </View>
        </View>
      )}
    />
    <View style={{ marginTop: 0, marginTop: 20, flexDirection: 'column' }}>
      <Text style={{ textAlign: 'left', color: 'red', fontWeight: 'bold', marginRight: 10 }}>{`Tổng số lượng bán theo bàn ${ban}  là : ${soluong}`}</Text>
      <Text style={{ textAlign: 'left', color: 'red', fontWeight: 'bold' }}> {`Tổng tiền Bán theo bàn ${ban}  là : ${fomartPrice(totalPriceOfAllBills)}`}</Text>
    </View>


  </View>
}
