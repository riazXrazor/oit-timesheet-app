import React, { useState } from 'react';
import { Image, View, Button, StyleSheet, ImageBackground } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const loginFunction = async (credentials) => {
	let response;
	try{
		 response = await fetch('https://lvs9yg3zyh.execute-api.us-east-1.amazonaws.com/dev/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})

		response = await response.json()
	} catch(e) {
		response = {
			error: e.message
		 };
		 
	}

		return response;
};

const login = ({ navigation }) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	return (
		<ImageBackground source={require('../assets/login_bg.jpg')} style={{ width: '100%', height: '100%' }}>
			<View style={[ styles.container ]}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						padding: 15,
						backgroundColor: '#fff',
						width: 200,
						marginLeft: 80,
						borderRadius: 10
					}}
				>
					<Image style={{ width: 122, height: 55 }} source={require('../assets/logo_login_screen.png')} />
				</View>
				<View style={{ paddingTop: 30, paddingBottom: 20 }} />
				<View style={[ styles.username ]}>
					<View
						style={{
							borderWidth: 1,
							borderRadius: 5,
							borderStyle: 'dashed',
							borderColor: '#fff',
							width: 270,
							flexDirection: 'row',
							justifyContent: 'center',
							padding: 10
						}}
					>
						<CustomInput
							placeholder="Enter Username!"
							placeholderTextColor="#fff"
							value={username}
							onChangeText={(val) => setUsername(val)}
						/>
					</View>
				</View>
				<View style={[ styles.username ]}>
					<View
						style={{
							borderWidth: 1,
							borderRadius: 5,
							borderStyle: 'dashed',
							borderColor: '#fff',
							width: 260,
							flexDirection: 'row',
							justifyContent: 'center',
							padding: 10
						}}
					>
						<CustomInput
							placeholder="Enter Password!"
							secureTextEntry={true}
							placeholderTextColor="#fff"
							value={password}
							onChangeText={(val) => setPassword(val)}
						/>
					</View>
				</View>
				<View>
					<View style={[ styles.postionCenter ]}>
						{/* <CustomButton name="Login" onPress={() => navigation.navigate('Logger')} /> */}
						<CustomButton name="Login" onPress={async () => {
								const data = await loginFunction({
									username,
									password
								})

								if(data.error){
									console.log(data)
									return;
								}

								navigation.navigate('Logger',
								{
									info: data,
									username:username,
									password:password
								})
						}} />
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
		marginBottom: 25
	}
});
