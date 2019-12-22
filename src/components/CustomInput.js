import React from 'react';
import {
	OutlinedTextField,
} from 'react-native-material-textfield';
const CustomInput = (props) => {
	return (
		<OutlinedTextField
			containerStyle={{ width: '73%' }}
			value={props.value}
			autoCorrect={false}
			enablesReturnKeyAutomatically={true}
			onChangeText={props.onChangeText}
			returnKeyType='next'
			label={props.placeholder}
			value={props.value}
			secureTextEntry={props.secureTextEntry ? true : false}
			labelTextStyle={{ color: '#fff' }}
			textColor="#fff"
			tintColor="#fff"
			baseColor="#fff"
			multiline={props.multiline}
			numberOfLines={props.numberOfLines}
		/>
	);
};

export default CustomInput;
