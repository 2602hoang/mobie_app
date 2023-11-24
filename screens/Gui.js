
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Wellcome from '../screens/Wellcome'
import FoodList from '../screens/FoodList'
import Setting from '../screens/Setting'
import Oder from '../screens/Oder'
import Bills from '../screens/Bills'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DrawerNavigator } from '@react-navigation/drawer';
import { ShoppingBag, Note } from 'iconsax-react-native';
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Oderpin from './Oderpin'
import Fooddetail from './Fooddetail'
import Billdetail from './Billdetail'
import Oderlist from './Oderlist'
import { colors } from '../constants'
import ListBills from './ListBills'
import Den from './den'
import ListBills2 from './ListBills2'
import Billrejected from './Billrejected'


const Tab = createBottomTabNavigator();

 

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'red', tabBarActiveBackgroundColor: '#ffffcc' }} >
      <Tab.Screen name="Thực đơn" component={FoodList}
        options={{
          animation: 'slide_from_left',
          tabBarIcon: ({ color, size }) => <Note size="32" color="black" />
        }} />
      <Tab.Screen name="Giỏ Hàng" component={Oder}
        options={{
          animation: 'slide_from_right',
          tabBarIcon: ({ color, size }) => <ShoppingBag size="32" color="black" />,
        }}
         />
    </Tab.Navigator>
  );
}
// function MyDrawer()  {
//   return (
//     <DrawerNavigator>
//       <Drawer.Screen name="Den" component={Den} />
//       {/* <Drawer.Screen name="Settings" component={Settings} /> */}
//     </DrawerNavigator>
//   );
// }
function Gui(props) {
  
  const Stack = createNativeStackNavigator();
  const { userToken } = useContext(AuthContext);
  if(userToken == "demo")
    return;
  if (userToken){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name='Wellcome' component={Wellcome} />
        {/* <Stack.Screen name='FoodList'a component={FoodList} /> */}
        <Stack.Screen 
          name='Setting' 
          a component={Setting} 
          options={{
            animation: 'slide_from_left'
          }}/>
        <Stack.Screen name='MyTabs' a component={MyTabs}  options={{
            animation: 'slide_from_right'
          }}/>
        <Stack.Screen name='Oderpin' a component={Oderpin} options={{
            animation: 'slide_from_right'
          }} />
        <Stack.Screen name='Fooddetail' a component={Fooddetail} options={{
          animation: 'slide_from_left'
        }}/>
        <Stack.Screen name='Bills' a component={Bills}
        options={{
          animation: 'slide_from_right'
        }}/>
        <Stack.Screen name='ListBills' a component={ListBills}
        options={{
          animation: 'slide_from_right'
        }}/>
        <Stack.Screen name='Den' a component={Den}
        options={{
          animation: 'slide_from_right'
        }}/>
         <Stack.Screen name='ListBills2' a component={ListBills2}
        options={{
          animation: 'slide_from_right'
        }}/>
         <Stack.Screen name='Billrejected' a component={Billrejected}
        options={{
          animation: 'slide_from_right'
        }}/>
        
        
        <Stack.Screen name="Billdetail" a component={Billdetail}/>
        <Stack.Screen name="Oderlist" a component={Oderlist}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
    }
   return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );

} export default Gui