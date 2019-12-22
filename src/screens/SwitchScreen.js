import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import Toast from 'react-native-root-toast';
import { StackActions, NavigationActions } from 'react-navigation';
import CustomButton from '../components/CustomButton';

const loginFunction = async (credentials) => {
    let response;
    try {
        response = await fetch('https://lvs9yg3zyh.execute-api.us-east-1.amazonaws.com/dev/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        response = await response.json()
    } catch (e) {
        response = {
            error: e.message
        };

    }

    return response;
};

const login = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);

    const onSubmit = async (username, password) => {

        const data = await loginFunction({
            username,
            password
        })

        if (data.error) {
            Toast.show(data.error, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
            return;
        }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Logger', params: {
                    info: data,
                    username: username,
                    password: password
                }
            })],
        });
        navigation.dispatch(resetAction);
    }

    useEffect(() => {
        async function load() {
            setLoading(true);
            const username = await AsyncStorage.getItem('@oit:username');
            const password = await AsyncStorage.getItem('@oit:password');
            if (username && password) {
                onSubmit(username, password);
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                navigation.dispatch(resetAction);
            }
        }
        load();
    }, [])


    return (
        <ImageBackground source={require('../assets/login_bg.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={[styles.container]}>

                <Image
                    style={{ width: '50%', resizeMode: 'contain', alignSelf: 'center' }}
                    source={require('../assets/logo_login_screen.png')} />

                <View style={{ paddingTop: 30, paddingBottom: 20 }} />

                <View>
                    <View style={[styles.postionCenter]}>
                        <CustomButton loading={loading} disabled={btnActive} style={{ marginTop: 25 }} name="Login" onPress={onSubmit} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    postionCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    username: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        // marginBottom: 25
    }
});
