import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {toDate} from 'date-fns';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/CustomButton';
import CustomVectorIcons from '../components/CustomVectorIcons';
import CustomPicker from '../components/CustomPicker';
import styles from '../components/style';
import CustomInput from '../components/CustomInput';
//import { ScrollView } from 'react-native-gesture-handler';

const TimesheetLogger = ({navigation}) => {
  const [logDate, setLogDate] = useState(toDate(new Date(), 'P'));
  const [testdate, setTestdate] = useState('');

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
    //console.log("hello")
    setData(navigation.getParam('info'));
    setUsername(navigation.getParam('username'));
    setPassword(navigation.getParam('password'));
  }, []);

  const loggerFunction = async loggingdata => {
    let response;
    console.log('loggingdata', loggingdata);
    try {
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

      response = await response.json();
      console.log(response);
    } catch (e) {
      console.log('error', e);
      response = {
        error: e.message,
      };
    }

    return response;
  };

  return (
    <ImageBackground
      source={require('../assets/login_bg.jpg')}
      style={{flex: 1, width: '100%', height: '100%'}}>
      <View style={[styles.container]}>
        {/* <View style={[ styles.logoStyling ]}>
					<Image style={{ width: 120, height: 53 }} source={require('../assets/logo_login_screen.png')} />
				</View> */}
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
                  onChange={(e, date) => {
                    setLogDate(toDate(date));
                    setshowdatePicker(false);
                    setTestdate(format(logDate, 'yyyy-MM-dd'));
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              selectedValue={logType}
              onValueChange={e => {
                setLogType(e);
              }}
              contentsArray={data.logtypeList}
            />
            <View style={{position: 'absolute', top: 18, right: 3}}>
              <CustomVectorIcons name="caretdown" size={18} color="green" />
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              selectedValue={project}
              onValueChange={e => {
                setProject(e);
              }}
              contentsArray={data.projectsList}
            />
            <View style={{position: 'absolute', top: 18, right: 3}}>
              <CustomVectorIcons name="caretdown" size={18} color="green" />
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              selectedValue={workType}
              onValueChange={e => {
                setWorkType(e);
              }}
              contentsArray={data.worktypeList}
            />
            <View style={{position: 'absolute', top: 18, right: 3}}>
              <CustomVectorIcons name="caretdown" size={18} color="green" />
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={[styles.borderStyling]}>
            <CustomPicker
              selectedValue={hour}
              onValueChange={e => {
                setHour(e);
              }}
              contentsArray={data.timeList}
            />
            <View style={{position: 'absolute', top: 20, right: 4}}>
              <CustomVectorIcons name="caretdown" size={18} color="green" />
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <View style={{width: '83%', marginBottom: 15}}>
            <View style={[styles.borderDottedStyling]}>
              <CustomInput
                placeholderTextColor="#fff"
                value={desc}
                onChangeText={val => setDesc(val)}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
        <View style={[styles.postionCenter]}>
          <CustomButton
            name="Submit"
            onPress={async () => {
              const data = await loggerFunction({
                username,
                password,
                date: testdate,
                project,
                time: hour,
                logtype: logType,
                worktype: workType,
                desc,
              });

              if (data.error) {
                console.log(data);
                return;
              }
            }}
          />
        </View>
      </View>
    </ImageBackground>
    // 		</View>
    // 	</ScrollView>
    // </SafeAreaView>
  );
};

export default TimesheetLogger;
