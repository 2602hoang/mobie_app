import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Button,
    Alert,
} from 'react-native'

import { colors, fontSizes } from '../constants'
import { ArrowLeft, Menu } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native'
import { MenuOption, MenuProvider } from 'react-native-popup-menu'

function UIHeader(props) {
    const navigation = useNavigation();
    
    const {
        title,
        leftIconName,
        rightIconName,
        onPressLeftIcon,
        onPressRightIcon,
        isShowBack,
        isOption,
    } = props
    return <View style={{
        height: 55,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        {leftIconName != undefined ? <Icon
            name={leftIconName}
            style={{ padding: 10 }}
            size={23} color={'white'}
            onPress={onPressLeftIcon}
        /> : <View style={{ width: 50, height: 50 }} />}
        {isShowBack ?
            <TouchableOpacity
                style={{
                    left: 0,
                    position: 'absolute'
                }}
                onPress={() => {
                    navigation.goBack();
                }}>
                <ArrowLeft
                    size="55" color="black" />
            </TouchableOpacity> : <></>
        }
        {/* {isOption ?
            <TouchableOpacity
                style={{
                    right: 0,
                    position: 'absolute'
                }}
                onPress={() => {
                    Alert.alert(
                        "Bạn Muốn Đền Món Hay Trả Món Nước",
                        "Đền Món Hoặc Trả Món",
                        // "Trả Món Nước ",
                        [
                          {
                            text: "Đền Món",
                            onPress: () => {
                                 navigation.navigate('Den')
                              
                            }
        
                          },
                          {
                            text: "Trả Món",
                            onPress: () => {
                                // TODO: Trả món
                            }
                          },
                        ],
                      );
                }}
            >
                <Menu
                    size="32"
                    color="#111111"
                />
           
            </TouchableOpacity>
            : <></>} */}

        <Text style={{
            fontSize: fontSizes.h5,
            alignSelf: 'center',
            lineHeight: 45,
            color: 'white'
        }}>{title}</Text>
        {rightIconName != undefined ? <Icon
            name={rightIconName}
            style={{ padding: 10 }}
            size={18} color={'white'}
            onPress={onPressRightIcon}
        /> : <View style={{ width: 50, height: 50, }} />}
    </View>
}
export default UIHeader