import { Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import {ArrowLeft,AddSquare ,MinusSquare, FormatCircle} from 'iconsax-react-native';
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext, foods, setFoods} from "../contexts/AuthContext";
import { fomartPrice } from "../utilies/Format";
export default function OrderItem({item,saveCart}) {
    const [total, setTotal] = useState(0);
    const [qty, setQty] = useState(0);
    const {  foods,cartTable } = useContext(AuthContext);
    const ref_qty = useRef();
    // console.log("tao ne1",item);
        // const minQuantities = foods.map((item) => item.discount.minQuantity);
    const correspondingFood = foods?.find((food) => food.ID === item.id);
    const minQuantity = correspondingFood?.discount.minQuantity;
    // console.log("tao ne",saveCart);
    //  console.log(minQuantity);
    //     console.log("ok",correspondingFood);
    // const thanhTien1 =item.c * qty;
    // const correspondingFood = foods.find((food) => food.id === item.ID);
    // const minQuantity = correspondingFood.discount.minQuantity;
    // console.log(cartTable);
        // const thanhTien =item.d * qty;
        // const thanhTien = [];

    //     cartTable.map((item) => {
    //       const correspondingFood = foods.find((food) => food.id === item.ID);
    //       const minQuantity = correspondingFood.discount.minQuantity;
    //         const thanhTien=0;
    //       if (item.qty >= minQuantity) {
    //         thanhTien =item.d * item.qty;
    //       } else {
    //         thanhTien =item.c * item.qty;
    //       }
    //     });
    // console.log(thanhTien);

    
    useEffect(() => {
        if(item)
            setQty(item.qty);
            // setTotal(item.d * qty);
    }, []);
    
    if(!item) return;
    return(
        <View style={{flexDirection:"column"}}>
       
        <View>
        {/* <Text style={{color:'black',fontWeight:'500'}}>Loại Món ăn: {item.a}</Text> */}
        {/* <Text>-------------------------------------------------------------</Text> */}
        <Text style={{color:'black',fontWeight:'500'}}>Tên Món ăn: {item.b}</Text>
            <Text></Text>
        <Text style={{ color: qty > minQuantity ? "red" : "black",fontWeight:'bold'}}>Đơn giá: {qty>minQuantity?  fomartPrice(item.d) :  fomartPrice(item.c)}  </Text>
        {/* <Text style={{color:'red',fontWeight:'500'}}>Giá KM khi mua 3 món: {fomartPrice(item.d)}</Text> */}
        
        
        </View> 
        
        
        {/* <Text 
            > {Foods.name} </Text>

            <Text></Text>
            <Text>{fomartPrice(price)}</Text> */}
            <View style={{flexDirection:'row',}}>
            <Text></Text>
            <Text style={{top:15,color:"red"}}>Số Lượng Món:</Text>
            <TextInput 
      
            ref={ref_qty}
            keyboardType='number-pad'
             placeholder="số lượng món > 0"
            value = {qty.toString()}
            onChangeText={(e) => {
                const text = e.replace(/[^0-9]/g, "");
                setQty(text);
                if(text===""||text==='0')
                {}
                else{
                    
                item.qty=text;
                saveCart(item);}
            }}
            
            onBlur={()=>{
               if(qty===""||qty==='0')
               ref_qty.current.focus()
            }
            }
        /> 
        
        <View style={{alignContent:'flex-end',flexDirection:'row-reverse', marginRight:-8}}>
        <TouchableOpacity
       
        onPress={()=>{
            item.qty++;
            setQty(item.qty);
            saveCart(item);
            }}>
        <AddSquare size="30"color="#f47373"/>
        </TouchableOpacity>
       
        
        
       
        <TouchableOpacity  onPress={()=>{
            item.qty--;
            setQty(item.qty);
            saveCart(item);
            }}>
        <MinusSquare size="30" color="#f47373"/>
        </TouchableOpacity> 
        </View>
       
        
        
        
        </View>
        {/* <Text style={{textAlign:'left',color:'red',fontWeight:'bold',}} >Thành tiền: {fomartPrice(thanhTien)}</Text> */}
    </View>
    )
}
