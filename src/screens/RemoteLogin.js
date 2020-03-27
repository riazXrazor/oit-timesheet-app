import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {toDate} from 'date-fns';
import Toast from 'react-native-root-toast';
import CustomButton from '../components/CustomButton';
import CustomVectorIcons from '../components/CustomVectorIcons';
import CustomPicker from '../components/CustomPicker';
import styles from '../components/style';
import CustomInput from '../components/CustomInput';
import AsyncStorage from '@react-native-community/async-storage';

const RemoteLogin = ({navigation}) => {
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkin, setCheckin] = useState('');
  useEffect(() => {
    (async function() {
      const u = await AsyncStorage.getItem('@oit:username');
      const p = await AsyncStorage.getItem('@oit:password');
      const n = await AsyncStorage.getItem('@oit:remote');
      setUsername(u);
      setPassword(p);
      setCheckin(n);
    })();
  }, []);

  const checkinout = async () => {
    const loggingdata = {
      username,
      password,
    };

    try {
      setSubmitting(true);
      const response = await fetch(
        'https://lvs9yg3zyh.execute-api.us-east-1.amazonaws.com/dev/check-in-out',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loggingdata),
        },
      );

      res = await response.json();
      if (res.nid) {
        await AsyncStorage.setItem('@oit:remote', res.nid);
        setCheckin(res.nid);
      } else {
        await AsyncStorage.setItem('@oit:remote', '');
        setCheckin('');
      }
      if (res.message) {
        Toast.show(res.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
      setSubmitting(false);
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/login_bg.jpg')}
      style={{flex: 1, width: '100%', height: '100%'}}>
      <View style={[styles.container]}>
        <View style={[styles.postionCenter]}>
          <View>
            <CustomButton
              loading={submitting}
              onPress={checkinout}
              name={checkin ? 'Check Out' : 'Check In'}
              width={150}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
RemoteLogin.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerBackground: (
    <ImageBackground
      source={require('../assets/login_bg.jpg')}
      style={{flex: 1, width: '100%', height: '100%'}}></ImageBackground>
  ),
  headerLeft: (
    <Image
      style={[styles.headerLogostyling]}
      source={require('../assets/logo_login_screen.png')}
    />
  ),
  headerRight: (
    <TouchableOpacity
      style={[styles.logoutBorderStyling]}
      onPress={async () => {
        await AsyncStorage.removeItem('@oit:username');
        await AsyncStorage.removeItem('@oit:password');
        navigation.navigate('Loginscreen');
      }}>
      <CustomVectorIcons name="logout" size={24} color="white" />
    </TouchableOpacity>
  ),
});

export default RemoteLogin;
