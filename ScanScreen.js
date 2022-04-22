import { Camera } from "expo-camera";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator, Button, Modal, useWindowDimensions } from "react-native";
import { fetch } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from "expo-image-manipulator";
import * as jpeg from "jpeg-js";
import { useModel } from './ModelContext';
import { materials, materialInfo } from './Data/items';
import { getDatabase, onValue, ref, set } from "firebase/database";


const identifyMaterial = (itemName) => {
    let res;
    console.log(itemName);
    const alias = itemName.split(',');
    for (let i = 0; i < alias.length; i++) {
        for (const [key, value] of Object.entries(materials)) {
            if (alias[i] === key) {
                res = materialInfo[value];
            }
        }
    }
    if (!res) res = { type: 'Unkniwn', generalInfo: 'no info', tips: [], pointsValue: 0 };
    return res;
}

const ScanScreen = ({navigation}) => {
    const [hasCameraPermission, setCameraAccessPermission] = useState(null);
    const connectedUser = useRef();
    const [ismodelDetecting, setmodelActivityStatus] = useState(false);
    const { model, isModelReady, error } = useModel();
    const [newPredictions, setPredictions] = useState([]);
    const camera = useRef(null);
    const imageURL = useRef(null);
    const db = getDatabase();
    const {height} = useWindowDimensions();

    useEffect(async () => {
      const getPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraAccessPermission(status === "granted");
      }
      getPermission();
      const userRef = ref(db, 'recyclers/VM/User');
      const unsubscribe = onValue(userRef, (snapshot) => {
        if(!snapshot) return;
        if(!snapshot.val()) {
          navigation.replace('CodeScreen');
          return;
        }
        for (const [key, value] of Object.entries(snapshot.val())) {
          connectedUser.current = { id: key, collectedPoints: value };
        }});

      return () => {
        unsubscribe();
      }
    }, []);

    const incrementPoints = useCallback((val) => {
        if (!connectedUser.current?.id) return;
        const reference = ref(db, '/recyclers/VM/User');
        const currentPoints = connectedUser.current.collectedPoints;
        set(reference, { [connectedUser.current.id]: val + currentPoints });
    }, [connectedUser.current, ref, db]);

    const imageToTensor = useCallback((rawImageData) => {
        const { width, height, data } = jpeg.decode(rawImageData, {
            useTArray: true,
        }); // return as Uint8Array

        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4;
        }

        return tf.tensor3d(buffer, [height, width, 3]);
    }, [tf, jpeg]);

    const classifyImageAsync = useCallback(async (source) => {
        try {
            const imageAssetPath = Image.resolveAssetSource(source);
            const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
            const rawImageData = await response.arrayBuffer();
            const imageTensor = imageToTensor(rawImageData);
            const newPredictions = await model.classify(imageTensor, 1);
            console.log(newPredictions);
            if (newPredictions.length == 0) {
                setMaterialModalStatus(true);
            }
            setPredictions(newPredictions);
            const result = identifyMaterial(newPredictions[0].className);
            console.log(result);
            if(result?.pointsValue > 0) {
               incrementPoints(result.pointsValue);
            }
            setmodelActivityStatus(false);

        } catch (error) {
            console.log("Exception Error: ", error);
        }
    }, [Image, setPredictions, imageToTensor, model]);

    const detectObject = useCallback(async () => {
        console.log('identify object pressed');
        setmodelActivityStatus(true);
        const res = await camera.current.takePictureAsync();
        imageURL.current = res.uri;
        const manipResponse = await ImageManipulator.manipulateAsync(
            res.uri,
            [{ resize: { width: 900 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        const source = { uri: manipResponse.uri };

        setPredictions(null);
        await classifyImageAsync(source);
    }, [camera, setPredictions, classifyImageAsync]);

    if (!isModelReady) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ActivityIndicator size={33} />
            </View>
        );
    }
    if (!hasCameraPermission || error) {
        console.log(hasCameraPermission);
        return <Text>No Camera Permission. {error}</Text>
    }

    return (
        <>
        <Modal animationType="fade" visible={ismodelDetecting} transparent={true}>
          <View style={{alignSelf: 'center', backgroundColor: '#fff', height: 150, width: 150, borderRadius: 12, position: 'absolute', top: height * 0.35, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('./assets/gif/ObjectScan.gif')} style={{width: '100%', height: '80%'}} resizeMode='contain'/>
            <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 8}}>Detecting ......</Text>
          </View>
        </Modal>
        <Camera ref={camera} style={styles.camContainer}>
            <View style={styles.mainContainer}>
                <Text style={styles.textStyle}>Scan your object here</Text>
                <View style={styles.scanContainer}>
                </View>
                <Button title='Detect Object' onPress={detectObject}/>
            </View>
        </Camera>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    camContainer: {
        flex: 1,
    },
    scanContainer: {
        marginTop: 30,
        borderRadius: 22,
        borderWidth: 2,
        height: '70%',
        width: '95%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        opacity: 0.5
    },
    lowerPart: {

    },
    textStyle: {
        paddingTop: 10,
        fontSize: 15
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});
export default ScanScreen;