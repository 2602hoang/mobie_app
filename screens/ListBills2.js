
import { ActivityIndicator, Alert, Button, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../contexts/url";
import { AuthContext } from "../contexts/AuthContext";
import { colors, fontSizes } from "../constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Oder from "./Oder";
import { UIHeader } from "../components";
import Billitemc2 from "./Billitemc2";



export default function ListBills2({ route }) {
  const listbill = route.params.bills;
  const { table } = useContext(AuthContext);
  useEffect(() => {
  }, []);
  return (
    <View style={{ backgroundColor: '#ffffcc', flex: 1 }}>
      <UIHeader
        title={`Đền món: ${table}`}
        isShowBack
      // isOption

      />
      <View>
        <View style={{ height: '90%' }}>
          <FlatList
            style={{ borderTopWidth: 2 }}
            data={listbill}
            renderItem={({ item }) => (
              <Billitemc2
                item={item}
              >
              </Billitemc2>
            )} />
        </View>
      </View>
    </View>
  )
}
