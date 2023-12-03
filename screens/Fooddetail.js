import { ArrowLeft, SearchNormal1 } from "iconsax-react-native";
import { Text, TextInput, TouchableOpacity, View, Image, FlatList, ScrollView, SafeAreaView } from "react-native";
import { fontSizes } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, getState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fomartPrice } from "../utilies/Format";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { UIHeader } from "../components";


export default function Fooddetail({ route }) {
    const { foods, setFoods, } = useContext(AuthContext);
    const nav = useNavigation();
    const { table, setCarts, } = useContext(AuthContext);
    useEffect(() => {
        setFoods();
    }, []);




    return (<View style={{ flex: 1, backgroundColor: '#FFFFCC' }}>
        <UIHeader
            title={`CHI TIẾT MÓN ĂN`}
            isShowBack
        />
        {/* <Text style={{top:10,color:'red',fontSize:fontSizes.h2,textAlign:'center'}}>Thông tin món ăn</Text> */}
        <View style={{ alignItems: 'flex-start' }} >
            <Text></Text>
            <Text></Text>
            <Image
                source={{ uri: route.params.food.thumb }}
                style={{ width: 300, height: 250, borderRadius: 10, justifyContent:'center',alignSelf:'center' }}
            />
            <SafeAreaView>
            <ScrollView>
                {/* <Text></Text> */}
                <Text style={{
                    textAlign: 'left',
                    fontSize: fontSizes.h4,
                    color: 'black'
                }}> 
            - TÊN MÓN ĂN: {route.params.food.name}.{'\n'}{'\n'}
            - ĐƠN GIÁ: {fomartPrice(route.params.food.price)}. {'\n'}{'\n'}
            - GIÁ KHUYẾN MÃI: {fomartPrice(route.params.food.discountPrice)}.{'\n'}{'\n'}
            - MÔ TẢ MÓN: {route.params.food.description}.{'\n'}{'\n'}
            - LƯỢT MUA: ({route.params.food.reorderLevel}). {'\n'}</Text>
                <Text></Text>
            </ScrollView>
            </SafeAreaView>
        </View>



    </View>
    )



}