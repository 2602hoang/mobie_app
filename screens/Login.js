import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {images, colors,fontSizes} from '../constants'
import {isValidEmail, isValidPassword} from '../utilies/Validations'
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Eye, EyeSlash } from 'iconsax-react-native';

function Login({navigation},) {
    const [keyboardIsShown, setKeyboardIsShown] = useState(false)
 
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('levanc@gmail.com')
    //dsoFresherXuanHoa
    //dsoInternXuanHoa
    const [password, setPassword] = useState('levanc@gmail.com')
    const { Login, errorLogin } = useContext(AuthContext);
    const isValidationOK = () => email.length > 0 && password.length > 0
                            && isValidEmail(email) == true
                            && isValidPassword(password) == true

    useEffect(()=>{
       
        Keyboard.addListener('keyboardDidShow', () => {            
            setKeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {            
            setKeyboardIsShown(false)
        })
    })
    const [visible, setVisible] = useState(true)
    const [fillter,setFillter] = useState(1);
    

    return <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{
        flex: 100,
        backgroundColor: '#FFFFCC'
    }}>
        <View style={{
            flex: 30,
            flexDirection: 'row',            
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h2,
                fontWeight: 'bold',
                width: '40%'
            }}>Nhà Hàng Lẩu "Xuýt Xoa" </Text>
            <Image
                // tintColor = {colors.primary}
                source={
                    images.computer
                } style={{
                    width: 180,
                    height: 180,
                    alignSelf: 'center'
                }} />
        </View>
        <View style={{flex: 30}}>
            <View style={{marginHorizontal: 15}}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Email :</Text>
                <TextInput
                    onChangeText={(text)=>{
                        
                       setErrorEmail(isValidEmail(text) == true ? 
                                    '' : 'Email không đúng định dạng')
                       setEmail(text)    
                    }}
                    style={{
                        color: 'black'
                    }}
                    // keyboardType='email'
                    placeholder='Nhập email đăng nhập'
                    value={email}
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{height: 1, 
                    backgroundColor: colors.primary, 
                    width: '100%',                    
                    marginHorizontal: 15,
                    marginBottom: 5,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red', 
                    fontSize: fontSizes.h6,
                    marginBottom: 15,
                    }}>{errorEmail}</Text>
            </View>

            <View style={{
                marginHorizontal: 15,}}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Mật khẩu:</Text>
                <View style={{flexDirection:'row'}}>
                <TextInput
                    onChangeText={(text)=>{
                        setErrorPassword(isValidPassword(text) == true ? 
                                    '' : 'Mật khẩu ít nhất 3 ký tự ')
                        setPassword(text)    
                    }}                    
                    style={{
                        color: 'black'
                    }}
                    
                    placeholder='Nhập mật khẩu'
                    value={password}
                    secureTextEntry={visible}
                    placeholderTextColor={colors.placeholder}
                    
                />
                <TouchableOpacity 
                
                className="w-1/12 items-end"
                 onPress={() => {
                setVisible(!visible)
                
                }}>
                     {visible?
                 <Eye  size="28"color="#FF8A65" style={{left:120,top:15,marginRight:2}}/> 
                    :
                    <EyeSlash size="28"color="#FF8A65" style={{left:120,top:15,marginRight:2}}/>
                     }
                </TouchableOpacity>
             
                </View>
                <View style={{height: 1, 
                    backgroundColor: colors.primary, 
                    width: '100%',
                    marginBottom: 15,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red', 
                    fontSize: fontSizes.h6,
                    marginBottom: 15, 
                    textAlign:'center'                   
                    }}>{errorLogin}</Text>
            </View>
        </View>
        {keyboardIsShown == false ? <View style={{  flex: 15 }}>



            <TouchableOpacity
                disabled = {isValidationOK() == false}
                onPress={() => {
                    Login(email, password);
                }}
                style={{
                    backgroundColor: isValidationOK() == true 
                                        ? colors.primary: colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 18
                }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h5,
                    color: 'white'
                }}>ĐĂNG NHẬP </Text>
            </TouchableOpacity>
        




        </View> : <View style={{flex: 15}}>
        </View>}
        {keyboardIsShown == false ? <View style={{
            flex: 25,            
        }}>
            <View style={{
                height: 40,
                flexDirection: 'row',   
                alignItems: 'center',
                marginHorizontal: 20
            }}>
                <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h3,
                    color: 'black',
                    alignSelf: 'center',
                    marginHorizontal: 5,
                }}>Đăng nhập để sử dụng ứng dụng </Text>
                <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
            </View>
            

        </View> : <View style={{ flex: 25,}}>
                </View>}
        {/* <Text style={{
                    color: 'red', 
                    fontSize: fontSizes.h6,
                    marginBottom: 15,                    
                    }}>{errorLogin}</Text> */}
                    
    </KeyboardAvoidingView>
}
export default Login
