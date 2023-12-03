
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



export default function ListBills({ route, }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listbill, setListbill] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { check, setCheck } = useContext(AuthContext);
  const numChecked = useRef(0);
  const nav = useNavigation();
  const isFocused = useIsFocused();



  const ban = route.params.id;
  const soluong = listbill.reduce((acc, item) => {
    item.items.forEach(e => {
      acc += e.quantity;
    });
    return acc;

  }, 0);


  // {console.log(listbill.table.map(p=>p.table.basePrice))}

  const totalPriceOfAllBills = listbill.reduce((acc, bill) => {
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
  const orderTotalPrices = {};
  listbill.forEach((order) => {
    const totalPrice1 = order.items.reduce((acc, item) => {
      // {console.log(item.table.basePrice)}
      if (item.quantity > item.product.discount.minQuantity) {
        acc += item.product.discountPrice * item.quantity;
      } else {
        acc += item.product.price * item.quantity;
      }
      return acc; // Explicitly return the accumulator value
    }, 0);
    orderTotalPrices[order.orderId] = totalPrice1;
  });
  // const orderTotalPrices = {};
  // listbill.forEach((order) => {
  //   const totalPrice1 = order.items.reduce((acc, item) => acc + item.product.discountPrice * item.quantity, 0);
  //   orderTotalPrices[order.orderId] = totalPrice1;
  // });


  //  const totalPriceOfAllBills = totalPrice.reduce((acc, price) => acc + price, 0);
  useEffect(() => {
    numChecked.current = 0;
    getlistbill();
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [isLoading, isFocused]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getlistbill();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  const giaban = listbill.map((item) => item.table.basePrice);
  // console.log(giaban[0]);

  const finishedbill = async (id) => {
    try {
      const response = await axios.patch(`${URL}api/v1/booking/finished/?orderId=${id}`);
      if (response.data.statusCode === 200) {
      }

    } catch (error) {
      console.log('error', error);
    }
  }

  const finishedbills = async () => {
    for (const e of listbill) {
      await finishedbill(e.orderId);
    }
    Toast.show('Kết thúc đơn thành công ',
      {
        backgroundColor: '#3B404F',
        textColor: '#ffffff',
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        animation: true,
      })
      nav.navigate('Wellcome');
    setIsLoading(!isLoading);
    await AsyncStorage.removeItem('check');
    setCheck([])
  }
  const compensatebills = async (id) => {
    try {
      const response = await axios.patch(`${URL}api/v1/booking/compensated/?orderId=${id}`);
      if (response.data.statusCode === 200) {
        setIsLoading(!isLoading);
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


  const getlistbill = async (ban) => {
    try {
      const response = await axios.get(`${URL}api/v1/booking/table/${route.params.id}`);
      if (response.data.statusCode === 200) {
        setListbill(response.data.data);
        // console.log(response.data.data);

      }

    } catch (error) {
      console.log('error', error);
    }
  }

  const dem = () => {
    let d = 0;
    listbill.forEach(e => {
      e.items.forEach(i => {
        d++;
      })
    })
    return d;
  }
  // const soluong = listbill.reduce((acc, item) => {
  //   item.items.forEach(e => {
  //     acc += e.quantity;
  //   });
  //   return acc;

  // }, 0);

  // { console.log("1213",listbill[0]) }
  return (
    <View style={{ backgroundColor: '#ffffcc', flex: 1 }}>
      <UIHeader
        title={`ĐƠN HÀNG CỦA BÀN: ${ban}`}
        isShowBack
      // isOption

      />
      {listbill.length && !isLoading ?
        <View style={{ display: "flex", flexDirection: 'row', position: "absolute", bottom: 5, justifyContent: 'center', alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00CC00',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              height: 50,
              borderRadius: 10,
            }}
            onPress={() => {
              if (numChecked.current === dem())
                finishedbills()
              else {
                Toast.show('Đơn hàng chưa được giao đủ món',
                  {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    animation: true,
                  });
              }
            }}>
            <Text style={{ color: 'black', }}>KẾT THÚC</Text></TouchableOpacity>
          <TouchableOpacity
            style={{

            }}
            onPress={() => {
              Alert.alert(
                "Bạn Muốn Đền Món Hay Trả Món Nước",
                "Đền Món Hoặc Trả Món",
                // "Trả Món Nước ",
                [
                  {
                    text: 'Trả Món',
                    onPress: () => {
                      nav.navigate('Den', { bills: listbill })
                    },
                  },
                  {
                    text: 'Đền món',
                    onPress: () => {
                      nav.navigate('ListBills2', { bills: listbill })
                    },
                  },
                  {
                    text: 'Hủy',
                    onPress: () => {
                      // Do nothing
                    },
                  },
                ],
              );
            }}
          >
            <MoreCircle
              size="50"
              color="red"
            />
          </TouchableOpacity>
        </View>
        : <></>}

      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        listbill.length ?

          <View style={{ height: '80%' }}>
            <View style={{ height: '83%' }}>
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

                style={{ borderTopWidth: 2 }}
                data={listbill}
                renderItem={({ item }) => (
                  <Billitemc
                    item={item}
                    finishedbills={finishedbills}
                    compensatebills={compensatebills}
                    orderTotalPrices={orderTotalPrices}
                    listbill={listbill}
                    numChecked={numChecked}
                  >
                    {/* <Text>ok :{item.table.basePrice}</Text> */}
                  </Billitemc>

                )} />
            </View>
            <View style={{ height: '17%' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ textAlign: 'left', color: 'black', fontWeight: 'bold',marginLeft: 'auto' }}>
                    {giaban[0] === 0 ? "" : `Giá bàn ${ban}: ${fomartPrice(giaban[0])}`}
                  </Text>
                  <Text style={{ textAlign: 'left', color: 'black', fontWeight: 'bold', }}>{`Tổng Số Lượng Món bàn ${ban} : `}</Text>

                  <Text style={{  color: 'black', fontWeight: 'bold',  }}>{`Tổng tiền bàn  ${ban} : `}</Text>

                </View>
                <View style={{ flexDirection: 'column', }}>

                  <Text style={{ textAlign: 'right', color: 'black', fontWeight: 'bold',  }}>{giaban[0] === 0 ? "" : fomartPrice(giaban[0])}</Text>
                  <Text style={{ color: 'black', fontWeight: 'bold', }}>{soluong}</Text>
                  <Text style={{  color: 'black', fontWeight: 'bold',right:20}}>{fomartPrice((totalPriceOfAllBills + giaban[0]) * 1.1)}</Text>

                </View>
              </View>
              <Text style={{ textAlign: 'center', marginRight: 10, fontSize: 10 }}>(Giá trên đã bao gồm giá bàn và VAT)</Text>
            </View>
          </View>

          : <View style={{ marginTop: 200 }}>
            <Text style={{
              textAlign: 'center',
            }}>(Hiện tại không có đơn hàng nào được bếp chấp nhận)</Text>
          </View>
      }
    </View>
  )
}
