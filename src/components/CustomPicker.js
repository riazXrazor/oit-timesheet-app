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
	Picker,
	TouchableOpacity
} from 'react-native';
const CustomPicker = (props) => {
	console.log(props.contentsArray);
	// let result = props.contentsArray.map(({ text }) => text.text);
	// console.log("result",result);
	// var finalArray = someJsonArray.map(function (obj) {
	// 	return obj.id;
	//   });
	//   console.log(finalArray);
	//const {contentsArray} = props;
	return (
		<Picker
			selectedValue={props.selectedValue}
			style={{ height: 60, color: '#fcfcfc' }}
			onValueChange={props.onValueChange}
		>
			{props.contentsArray.map((item) => {
				return <Picker.Item label={item.text} value={item.value} />;
				
			})} 
		</Picker>
	);
};
export default CustomPicker;
