import React, { useState } from 'react';
import {
	Text,
	Image,
	TextInput,
	View,
	StyleSheet,
	ImageBackground,
	Button,
	Alert,
	TouchableOpacity
} from 'react-native';
const CustomButton = (props) => {
    console.log(props);
    return(
        <View style={[ styles.postionCenter ]}>
					<TouchableOpacity
						style={{
							alignItems: 'center',
							width: 120,
							backgroundColor: 'green',
							padding: 15,
							borderRadius: 5,
							marginBottom: 10
						}}
						onPress={props.onPress}
					>
						<Text style={{ color: '#fff', fontSize: 15 }}>{props.name}</Text>
					</TouchableOpacity>
				</View>
    );
}
export default CustomButton;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	postionCenter: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
});