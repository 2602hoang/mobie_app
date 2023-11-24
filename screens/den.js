
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import Bills from "./Bills";
import Toast from "react-native-root-toast";
import CheckBox from 'react-native-check-box';
import Billitem from "./Billitem";
import Billitemc1 from "./Billitemc1";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Den({ route }) {
  const listbill = route.params.bills;
  const [pin, setPin] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [sl, setSL] = useState("");
  const [slMax, setSLMax] = useState();
  const [orderId, setOrderId] = useState();
  const [prdId, setPrdId] = useState();
  const { table } = useContext(AuthContext);
  const [alertt, setAlertt] = useState("");
  const nav = useNavigation();

  useEffect(() => {
    // console.log(listbill)
  })

  const toRefund = async (orderId, table, quantity, productID) => {
    if (orderId && table && quantity && productID) {
      try {
        const response = await axios.patch(`${URL}api/v1/booking/refund/${orderId}`,
          {
            note: "Trả hàng",
            secretCode: Number(pin),
            tableId: table,
            quantities: [Number(quantity)],
            productsId: [Number(productID)],
            refundable: false
          }
        )
        if (response.data.statusCode === 200) {
          Toast.show('Thành công',
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
        console.log("error:",error)
        Toast.show('Thất bại',
          {
            backgroundColor: '#3B404F',
            textColor: '#ffffff',
            opacity: 1,
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            animation: true,
          })
      }
    }
  }
  return (
    <View style={{ backgroundColor: '#ffffcc', flex: 1 }}>
      <UIHeader
        title={`CHỌN MÓN TRẢ VÀ NHẬP SL VÀ MÃ PIN`}
        isShowBack
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginTop: 5, borderTopWidth: 2 }}
          data={listbill}
          renderItem={({ item }) => (
            <Billitemc1
              item={item}
              listbill={listbill}
              setModalVisible={setModalVisible}
              setOrderId={setOrderId}
              setPrdId={setPrdId}
              setSLMax={setSLMax}
            />
          )} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        animationType='fade'
        hardwareAccelerated>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: '#00000099'
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              borderRadius: 10,
              padding: 10
            }}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
                fontWeight: "700",
                color: 'while',
                padding: 5,

              }}>Nhập só lượng trả</Text>
            <View
              style={{
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                  padding: 2,
                }}
              >
                <TextInput
                  style={{
                    color: 'black',
                    width: '100%',
                    borderBottomWidth:1,
                  }}
                  placeholderTextColor="#D3D3D3"
                  placeholder="Số lượng trả"
                  keyboardType="number-pad"
                  value={sl.toString()}
                  onChangeText={(e) => {
                    const text = e.replace(/[^0-9]/g, "");
                    setSL(text);
                  }}
                /><TextInput
                style={{
                  color: 'black',
                  width: '100%',
                }}
                placeholderTextColor="#D3D3D3"
                placeholder="mã pin để trả món"
                keyboardType="number-pad"
                
                         secureTextEntry={true}
                          maxLength={4}
                       value={pin}
               
                       onChangeText={(text) => {
                        
                        setPin(text);
                      
                      }}
              />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 10,
                  color: '#E33333',
                }}>{alertt}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
                justifyContent: 'flex-end'
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}>
                <Text
                  style={{

                  }}
                >Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!sl || sl === '0') {
                    setAlertt('Số lượng không hợp lệ');
                  } else
                    if (Number(sl) > Number(slMax)) {
                      setAlertt('Số lượng trà lớn hơn tổng số lượng')
                    } else {
                      setAlertt('');
                      // console.log(typeof(Number(prdId)))
                      toRefund(orderId, table, Number(sl), Number(prdId));
                      nav.goBack();
                      setModalVisible(false);
                      
                    }
                }}>
                <Text
                  style={{
                    marginLeft: 5
                  }}
                >Trả hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
