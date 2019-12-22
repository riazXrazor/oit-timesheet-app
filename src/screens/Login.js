import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import Toast from 'react-native-root-toast';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const loginFunction = async (credentials) => {
	let response;
	try {
		response = await fetch('https://lvs9yg3zyh.execute-api.us-east-1.amazonaws.com/dev/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})

		response = await response.json()
	} catch (e) {
		response = {
			error: e.message
		};

	}

	return response;
};

const login = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [btnActive, setBtnActive] = useState(false);
	const onSubmit = async () => {
		setLoading(true);
		const data = await loginFunction({
			username,
			password
		})
		setLoading(false);
		if (data.error) {
			Toast.show(data.error, {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
			})
			return;
		}

		Toast.show("Login Sucessful", {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
		})

		await AsyncStorage.setItem('@oit:username', username);
		await AsyncStorage.setItem('@oit:password', password);

		navigation.navigate('Logger',
			{
				info: data,
				username: username,
				password: password
			})
	}

	useEffect(() => {
		if (username && password) {
			setBtnActive(false)
		} else {
			setBtnActive(true)
		}
	}, [username, password, btnActive])

	return (
		<ImageBackground source={require('../assets/login_bg.jpg')} style={{ width: '100%', height: '100%' }}>
			<View style={[styles.container]}>

				<Image
					style={{ width: '50%', resizeMode: 'contain', alignSelf: 'center' }}
					source={require('../assets/logo_login_screen.png')} />

				<View style={{ paddingTop: 30, paddingBottom: 20 }} />
				<View style={[styles.username]}>

					<CustomInput
						placeholder="Enter Username"
						value={username}
						onChangeText={(val) => setUsername(val)}
					/>

				</View>
				<View style={[styles.username]}>

					<CustomInput
						placeholder="Enter Password"
						secureTextEntry={true}
						value={password}
						onChangeText={(val) => setPassword(val)}
					/>

				</View>
				<View>
					<View style={[styles.postionCenter]}>
						<CustomButton loading={loading} disabled={btnActive} style={{ marginTop: 25 }} name="Login" onPress={onSubmit} />
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default login;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	postionCenter: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	username: {
		flexDirection: 'row',
		justifyContent: 'center',
		borderWidth: 1,
		// marginBottom: 25
	}
});
