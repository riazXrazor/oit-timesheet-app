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
const CustomInput = (props) => {
	return (
		<TextInput
			style={{
				color: '#fff',
				width: 148,
				borderWidth: 1,
				paddingLeft: 21,
				borderColor: 'transparent'
			}}
			{...props}
		/>
	);
};

export default CustomInput;
