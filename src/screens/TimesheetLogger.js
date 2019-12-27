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

const TimesheetLogger = ({navigation}) => {
  const [logDate, setLogDate] = useState(toDate(new Date(), 'P'));

  const [logType, setLogType] = useState(0);
  const [project, setProject] = useState(0);
  const [workType, setWorkType] = useState(0);
  const [hour, setHour] = useState(0);
  const [desc, setDesc] = useState('Project Work');
  const [submitting, setSubmitting] = useState(false);
  const [showdatePicker, setshowdatePicker] = useState(false);
  const [data, setData] = useState({
    name: '',
    pass: '',
    remember_me: '',
    form_build_id: '',
    form_id: '',
    op: '',
    email: '',
    projectsList: [],
    logtypeList: [],
    worktypeList: [],
    timeList: [],
  });
  const [username, setUsername] = useState(['']);
  const [password, setPassword] = useState(['']);
  useEffect(() => {
    setData(navigation.getParam('info'));
    setUsername(navigation.getParam('username'));
    setPassword(navigation.getParam('password'));
  }, []);

  const loggerFunction = async loggingdata => {
    let valid = true;
    for (const key in loggingdata) {
      if (!loggingdata[key]) {
        valid = false;
      }
    }

    if (!valid) {
      Toast.show('Please fill all the fields !!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }
    try {
      setSubmitting(true);
      response = await fetch(
        'https://lvs9yg3zyh.execute-api.us-east-1.amazonaws.com/dev/log',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loggingdata),
        },
      );

      await response.json();
      setSubmitting(false);
      Toast.show('Logged successfully !!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
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
            <View style={{position: 'relative', flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    color: '#fcfcfc',
                    fontSize: 18,
                    paddingTop: 12,
                    paddingRight: 25,
                  }}>
                  Date:
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.calanderStyling]}
                onPress={() => setshowdatePicker(true)}>
                <Text style={{color: 'black', fontSize: 15}}>
                  {' '}
                  {format(logDate, 'dd/MM/yyyy')}{' '}
                </Text>
              </TouchableOpacity>
              <View style={{position: 'absolute', top: 16, right: 0}}>
                <CustomVectorIcons name="calendar" size={18} color="black" />
              </View>
              {showdatePicker && (
                <DateTimePicker
                  value={logDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(_e, date) => {
                    setshowdatePicker(false);
                    if (!date) return;
                    setLogDate(toDate(date));
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              label="Select Log Type"
              selectedValue={logType}
              onValueChange={e => {
                setLogType(e);
              }}
              contentsArray={data.logtypeList}
            />
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              label="Select Log Project"
              selectedValue={project}
              onValueChange={e => {
                setProject(e);
              }}
              contentsArray={data.projectsList}
            />
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              label="Select Work Type"
              selectedValue={workType}
              onValueChange={e => {
                setWorkType(e);
              }}
              contentsArray={data.worktypeList}
            />
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              label="Select Log Hour"
              selectedValue={hour}
              onValueChange={e => {
                setHour(e);
              }}
              contentsArray={data.timeList}
            />
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <CustomInput
            placeholder="Description"
            placeholderTextColor="#fff"
            value={desc}
            onChangeText={val => setDesc(val)}
            multiline={true}
            numberOfLines={3}
          />
        </View>
        <View style={[styles.postionCenter]}>
          <CustomButton
            name="Submit"
            loading={submitting}
            onPress={() => {
              loggerFunction({
                username,
                password,
                date: format(logDate, 'yyyy-MM-dd'),
                project,
                time: hour,
                logtype: logType,
                worktype: workType,
                desc,
              });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
TimesheetLogger.navigationOptions = ({navigation}) => ({
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
        navigation.navigate('login');
      }}>
      <CustomVectorIcons name="logout" size={24} color="white" />
    </TouchableOpacity>
  ),
});

export default TimesheetLogger;
