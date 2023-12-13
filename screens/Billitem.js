
import { Alert, Text, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { fomartPrice } from "../utilies/Format";
import CheckBox from 'react-native-check-box';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";



export default function Billitem({ item1, numChecked, orderTotalPrices, listbill }) {

  const [answer, setAnswer] = useState("");


  const [isChecked, setIsChecked] = useState(false);
  const { check, setCheck } = useContext(AuthContext);
  //   const orderTotalPrices = {};
  //   listbill.forEach((order) => {
  //   const totalPrice1 = order.items.reduce((acc, item) => acc + item.product.discountPrice * item.quantity, 0);
  //   orderTotalPrices[order.orderId] = totalPrice1;
  // });

  useEffect(() => {
    LoadCheck();
  }, [listbill])

  // useEffect(() => {
  //   LoadCheck();
  // })

  const LoadCheck = async () => {
    check.forEach(e => {
      if (e.billId === item1.billId && e.productId === item1.product.ID) {
        setIsChecked(true);
        numChecked.current = numChecked.current + 1;
        return;
      }
    })
  }

  return (

    <View style={{}}>
      {/* {item1.quantity>0? */}
      <View>

        <Text style={{ fontWeight: 'bold', color: "black" }}>{`Tên Món Ăn: ${item1.product.name}`}</Text>
        {/* <Text style={{ marginRight: 50, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{` ${item1.status? "":"MÓn đang được bếp làm"}`}</Text> */}
        {item1.status ?
          <View style={{ flexDirection: 'row', marginLeft:5 }}>
             <CheckBox
              style={{ }}
              onClick={() => {
                if (isChecked === false) {
                  Alert.alert(
                    "Món ăn đã chắc chắn được ra đủ",
                    "đúng hoặc sai",
                    [
                      {
                        text: "đúng",
                        onPress: async () => {

                          setAnswer("đúng");

                          setIsChecked(!isChecked);
                          numChecked.current = numChecked.current + 1;
                          check.push({ billId: item1.billId, productId: item1.product.ID })
                          await AsyncStorage.removeItem('check');
                          await AsyncStorage.setItem('check', JSON.stringify(check));
                        }

                      },
                      {
                        text: "sai",
                        onPress: () => {
                          setAnswer("sai");
                        }
                      },
                    ],
                  );
                  // else {
                  //   numChecked.current = numChecked.current -1;
                  //   } 
                }
              }}

              isChecked={isChecked}

            />

            <Text style={{ color: !isChecked ? "#FFFFCC" : "#00FF00", fontWeight: !isChecked ? "normal" : "bold", marginLeft: 'auto', textAlign: 'auto' }}>xác nhận đã ra món</Text>

           
          </View>
          : <View></View>}
        {/* <View style={{ flexDirection: 'row' ,right}}> */}
        {/* <Text style={{ fontWeight: 'bold', color: 'black' }}>{`Giá Gốc: ${fomartPrice(item1.product.price)}`}</Text> */}

        <Text style={{ marginLeft: 140, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{`Đơn giá: ${item1.quantity > item1.product.discount.minQuantity ? fomartPrice(item1.product.discountPrice) : fomartPrice(item1.product.price)}`}</Text>

        <Text style={{ marginRight: 8, textAlign: 'right', fontWeight: 'bold', color: 'red' }}>
          {item1.quantity === 0 ? 'Trả hết hàng' : 'SL:' + item1.quantity + ' / ' + item1.product.uint}
        </Text>

        {/* </View> */}
        {/* <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, marginRight: 5, textAlign: 'right', fontWeight: 'bold', color: '#111111' }}>{`Thành Tiền: ${item1.quantity>=3?  fomartPrice(item1.product.discountPrice * item1.quantity):fomartPrice(item1.product.price * item1.quantity)}`}</Text> */}
      </View>
      {/* :<View></View>} */}


    </View>

  )
}