import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
const CustomButton = props => {
  return (
    <View style={[styles.postionCenter, {...props.style}]}>
      {!props.loading ? (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            width: props.width || 120,
            backgroundColor: 'green',
            padding: 15,
            borderRadius: 15,
            marginBottom: 10,
          }}
          onPress={!props.disabled ? props.onPress : () => {}}>
          <Text style={{color: '#fff', fontSize: 18}}>{props.name}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          style={{
            padding: 15,
            borderRadius: 15,
            marginBottom: 10,
          }}
          size="small"
          color="green"
        />
      )}
    </View>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  postionCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
