import React, { useState } from 'react';
import {
	Text,
	TextInput,
	Image,
	View,
	StyleSheet,
	ImageBackground,
	Button,
	Alert,
	Picker,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomVectorIcons = (props) =>{
    return(
        <Icon style={{ width: 30, height: 30 }} name={props.name} size={props.size} color={props.color} />
    );
}
export default CustomVectorIcons;