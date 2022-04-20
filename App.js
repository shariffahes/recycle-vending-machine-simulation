import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, Button, SafeAreaView, ActivityIndicator } from 'react-native';
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
  useEffect(() => {
    initializeFB();
    db.current = getDatabase();
    const identificationCodeRef = ref(db.current, 'recyclers/VM');
    const unsubscribe = onValue(identificationCodeRef, (snapshot) => {
      if (!snapshot) return;
      const data = snapshot.val();
        setIdentifyCode();
      if (data.Code) {
        const c = data.Code;
        const code = [];
        for (var i = 0; i < c.length; i++) {
          code.push(c.charAt(i));
        }
        setIdentifyCode(code);
      } else {
        navigation.replace('ScanScreen');
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  
  if (!identifyCode) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={{ paddingTop: 30, alignItems: 'center' }}>
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
