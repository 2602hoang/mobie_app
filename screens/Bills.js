
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { URL } from "../contexts/url";
import { AuthContext } from "../contexts/AuthContext";
import { fontSizes } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Oder from "./Oder";
import { UIHeader } from "../components";


export default function Bills({ route }){
    const {  } = useContext(AuthContext);
    const nav = useNavigation();
    
    const [bills,setBills] = useState([]);
    const [tables,setTables] = useState(null);
    


    useEffect(() => {
        getBill();
    }, []);
    const getBill = async ()=>{
        try {
           
            const response = await axios.get(`${URL}api/v1/booking/employee`)
            if(response.data.statusCode === 200){
                setBills(response.data.data);
                getTables(response.data.data);
                console.log(response.data.data);
            }
           
        } catch (error) {
            console.log("Lỗi",error);
        }
    }
    
    const getTables = (billss) =>{
        let arr = [];
        billss.forEach(e => {
            arr.push(e.table.ID);
        });
        setTables(Array.from(new Set(arr)).sort());
    }

    const getOrderByTableId= (tableId)=>{
        let order=[];
        bills.map(e=>{
            if(e.table.ID === tableId.item){
                order.push(e);
            }
        })
        nav.navigate("Billdetail",{orders:order, tableId:tableId.item});
    }

return<View style={{backgroundColor:'#ffffcc',flex:1}}>
    <UIHeader
            title={`LỊCH SỬ ĐƠN HÀNG THEO BÀN `}
            isShowBack
        />
            <FlatList 
            style={{marginTop:10}}
                data={tables} 
                renderItem={ ({ item }) =>
                
                <View style={{borderWidth:1,alignSelf:'center',borderRadius:10,
                }}>
                    <TouchableOpacity
                    
                    onPress={()=>{
                        getOrderByTableId({item});
                    }}>
                <Text style={{textAlign:'center', color: 'black', fontSize: fontSizes.h2, fontWeight: 'bold',margin:40 }}>Tổng đơn của bàn : {item}</Text>
                </TouchableOpacity></View>
            }
            
    
        >
               
            </FlatList>


</View>

{/* <Text>{item.note}</Text>
<Text>{item.table.ID}</Text>
{
  item.items.map(p=> <Text>
      {p.ID}
  </Text>) */}

}