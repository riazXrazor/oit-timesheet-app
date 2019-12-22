import React, { useState } from 'react';
import Picker from 'react-native-picker-select';
const CustomPicker = (props) => {
	return (
		<Picker
			placeholder={{
				label: props.label,
				value: null,
			}}
			selectedValue={props.selectedValue}
			style={{ height: 60, color: '#fcfcfc' }}
			onValueChange={props.onValueChange}
			items={props.contentsArray.map((item) => ({
				label: item.text,
				value: item.value,
			}))}
		/>


	);
};
export default CustomPicker;
