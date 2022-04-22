import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { initializeFB } from './config/firebaseConfig';
import { getDatabase, onValue, ref } from 'firebase/database'
import {ModelProvider} from './ModelContext';
import ScanScreen from './ScanScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    initializeFB();
  }, []);
  return (
    <ModelProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='CodeScreen' component={CodeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='ScanScreen' component={ScanScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ModelProvider>
  );
}
const CodeScreen = ({navigation}) => {
  const db = useRef();
  const [identifyCode, setIdentifyCode] = useState();
  const [err, setError] = useState(false);
  useEffect(() => {
    initializeFB();
    db.current = getDatabase();
    const identificationCodeRef = ref(db.current, 'recyclers/VM');
    const unsubscribe = onValue(identificationCodeRef, (snapshot) => {
      if (!snapshot || !snapshot.val()) {
        setError(true);
        return;
      }
      const data = snapshot.val();
      setIdentifyCode();
      setError(false);
      if (data.Code) {
        const c = data.Code;
        const code = [];
        for (var i = 0; i < c.length; i++) {
          code.push(c.charAt(i));
        }
        setIdentifyCode(code);
      } else if (data.User){
        navigation.replace('ScanScreen');
      } else {
        setError(true);
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  if(err) {
    return (
      <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, paddingHorizontal: 12}}>
          We are aware that there is an error with the Vending Machine :(
        </Text>
        <Text style={{fontSize: 20, paddingHorizontal: 12, paddingVertical: 10}}>
          Our team is working on it.
        </Text>
        <Text style={{ fontSize: 20, paddingHorizontal: 12 }}>
          Sorry for the inconvenience!
        </Text>
      </View>
    );
  }
  if (!identifyCode) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{ paddingTop: 30, alignItems: 'center'}}>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, marginRight: 10}}>Step 1: Scan the QR Code</Text>
            <View style={{width: 60, height: 60}}>
              <Image source={require('./assets/gif/QRScan.gif')} style={{ height: '100%', width: '100%' }} resizeMode='contain'/>
            </View>
          </View>
          <Image source={require('./assets/QRCode.png')} resizeMode="contain" style={{width: 300, height: 400}}/>
          <Text style={{ fontSize: 20, alignSelf: 'flex-start', marginBottom: 20}}>Step 2: Enter the below code</Text>
        </View>
        <ScrollView horizontal={true}>
          {identifyCode.map((ch, index) => <CodeNumber key={index} num={ch} />)}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};
const CodeNumber = ({ num }) => {
  return (
    <View style={styles.codeContainer}>
      <Text style={{ fontSize: 28 }}>{num}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  codeContainer: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 8
  }
});
