import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { initializeFB } from './config/firebaseConfig';
import { getDatabase, onValue, ref, set } from 'firebase/database'


export default function App() {

  const [identifyCode, setIdentifyCode] = useState();
  const [connectedUser, setConnection] = useState(null);
  const db = useRef();

  useEffect(() => {
    initializeFB();
    db.current = getDatabase();
    const identificationCodeRef = ref(db.current, 'recyclers/VM');
    const unsubscribe = onValue(identificationCodeRef, (snapshot) => {
      if (!snapshot) return;
      const data = snapshot.val();
      if (data.Code) {
        const c = data.Code;
        const code = [];
        for (var i = 0; i < c.length; i++) {
          code.push(c.charAt(i));
        }
        setIdentifyCode(code)
      } else {
        setIdentifyCode();
        const user = data.User;
        for (const [key, value] of Object.entries(user)) {
          setConnection({ id: key, collectedPoints: value });
        }
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const incrementPoints = useCallback((val) => {
    if (!connectedUser?.id) return;
    const reference = ref(db.current, '/recyclers/VM/User');
    set(reference, { [connectedUser.id]: val });
  }, [db, ref, connectedUser]);

  if (!identifyCode) {
    return (
      <View>
        <ActivityIndicator size='large' />
        <Button style={{ backgroundColor: 'blue' }} title='Add 100 points' onPress={() => incrementPoints(100)} />
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
}
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
