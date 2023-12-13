import React, {useState, useEffect, useContext} from 'react';
import {
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from 'react-native'
import {images, colors, icons, fontSizes} from '../constants'

import {ArrowLeft,SearchNormal1,AddSquare ,MinusSquare, Information} from 'iconsax-react-native';
import { fomartPrice } from '../utilies/Format';
import {  useNavigation } from '@react-navigation/native';



    
    

function FoodItem(props) {
    const nav = useNavigation();
    // discount.minQuantity
    // {console.log("ok ne",props.food)}
    //  console.log(props);
    let {id,name,price,description,thumb,reorderLevel,discountPrice,category,DeletedAt,uint} =props.food;
    // const [food, setFood] = useState({name: '',
    //   price: 0,
    //   description: '',});
    // {console.log(foods)}
    
  return(
    <View style={{
        height:150,
        backgroundColor:DeletedAt===null?'#FFFFCC':"#ffffff",
        paddingTop:10,
        paddingStart:10,
        flexDirection:'row'
        }}>
        <Image 
        source={{uri: thumb}}
        style={{ width:120,height:120, borderRadius:10,marginRight:10 }}
        />
        <View style={{
                flexDirection:'row',
                flex:1,
                marginRight:10,
                backgroundColor:'FFFFCC',
                marginLeft:20}}> 
          
          
          <View style={{marginTop:2}}>
            <Text style={{
                fontSize:fontSizes.h6,
                color:'black',
                maxWidth:100,
            }}>Tên: {name}. </Text>
              {/* <Text></Text> */}
            {/* <Text>{description}</Text> */}
            {/* <Text style={{
                fontSize:fontSizes.h6,
                color:'black',
                
            }}>Đơn giá: {uint}</Text> */}
            <Text style={{
                fontSize:fontSizes.h4,
                color:'black',
                
            }}>ĐG: {fomartPrice(price)} / {uint}</Text>
           
            <Text style={{
                fontSize:fontSizes.h6,
                color:'red',
                fontWeight:'bold',
                fontSize:fontSizes.h4
            }}>Giá KM: {fomartPrice(discountPrice)}</Text>
            {/* <Text style={{
                fontSize:fontSizes.h6,
                color:'red',
                fontWeight:'bold',
                fontSize:fontSizes.h4
            }}>Giá khuyến mãi:{discount.minQuantity}</Text> */}
            
            </View>

            <View style={{
            // marginRight:5,
            flexDirection:'column'}}>
          <TouchableOpacity onPress={() => {
            nav.navigate('Fooddetail',{food: props.food});
            Alert.alert(
              `Chi tiết món ăn ${name}`
            );
          }}>
            <Information title='AAA' size="32"color="#FF8A65"  variant="Broken"  />
          
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
export default FoodItem

                    
