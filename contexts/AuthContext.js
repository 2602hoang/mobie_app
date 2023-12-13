import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from './url';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken, setUserToken] = useState("demo");
	const [errorLogin, setErrorLogin] = useState(null);
	
	const [carts, setCarts] = useState(null);
	const [table, setTable] = useState(null);
	const [foods, setFoods] = useState([]);
	const [check, setCheck] = useState([]);
    const [loais, setLoais] = useState([]);
	const [me, setMe] = useState([]);
	const [cartTable, setCartTable] = useState(null);
	const [note, setNote] = useState('');
	//const [bills,setBills] = useState();
	// const [textSearch, setTextSearch] = useState("");
	useEffect(() => {
		LoadUserVerified();
		// getThongtin();
		
		LoadCarts();
		LoadCheck();
		
	}, []);
	
	const LoadUserVerified = async () => {
		if (await AsyncStorage.getItem('userToken')) {
			setUserToken(await AsyncStorage.getItem('userToken'));
			addToken(await AsyncStorage.getItem('userToken'));
			getThongtin();
		}
		else setUserToken(null);
		
	}
	
	const LoadCarts = async ()=>{
		if (await AsyncStorage.getItem('carts')) {
			setCarts(JSON.parse(await AsyncStorage.getItem('carts')));
		}
	}

	const LoadCheck = async ()=>{
		if (await AsyncStorage.getItem('check')) {
			setCheck(JSON.parse(await AsyncStorage.getItem('check')));
		}
	}

	
	
	

	const Login = async (email,password) => {
				console.log(`${URL}api/v1/auth/sign-in`);
		try {

			const response = await axios.post(`${URL}api/v1/auth/sign-in`,
			{
				email: email,
				password: password,
			}
			)	
			
			if (response.data.message ==="Sign up success: welcome!") {
				
				setErrorLogin('Đăng nhập thành công');
				setTimeout(() =>{
					setErrorLogin('');
				}, 3000)

				console.log(response.data.data.token)
				await AsyncStorage.setItem('userToken',response.data.data.token);
				setUserToken(response.data.data.token);
				addToken(response.data.data.token);}
			
		} catch (error) {
			console.log('Loging error: ',error);
			console.log(error);
			setErrorLogin('Thông tin không chính xác');
			setTimeout(() =>{
						setErrorLogin('');
					}, 3000)
		}
	}
	
	const Logout = async () =>{
		await AsyncStorage.removeItem('userToken');
		setUserToken(null);
	}
	
	const addToken=(token)=>{
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		} else {
			delete axios.defaults.headers.common['Authorization']
		}
	}

	return (
		<AuthContext.Provider value={{
			userToken, setUserToken, Login, Logout, errorLogin, table, setTable, carts, setCarts, foods, setFoods, loais, setLoais,me,setMe,
			cartTable, setCartTable,note, setNote, check,setCheck
		}}>
			{children}
		</AuthContext.Provider>
	)
}

