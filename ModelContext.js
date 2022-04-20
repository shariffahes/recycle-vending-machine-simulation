import React, { useReducer, useEffect, useContext } from 'react';
import { ready } from '@tensorflow/tfjs';
import * as mobilenet from "@tensorflow-models/mobilenet";
import '@tensorflow/tfjs-react-native';

const ModelContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'model-is-ready': return { ...state, isModelReady: true, model: action.model };
        case 'initialized-failed': return { ...state, error: action.error }
        default: throw new Error('Unhandled action type: ' + action.type);
    }
};
export const ModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        isModelReady: false,
        model: null,
        error: null
    });

    const { model, isModelReady, error } = state;
    useEffect(() => {
        const initializeTF = async () => {
            try {
                ready();
                console.log('tensorflow done');

            } catch (error) {
                console.log('tf failed');
                console.log(error.toString());
                dispatch({ type: 'model-failed', error });

            }
        }
        const initializeModel = async () => {
            try {
                console.log("initializing model");
                const mod = await mobilenet.load({ version: 2, alpha: 1 });
                console.log('done');
                dispatch({ type: 'model-is-ready', model: mod });

            } catch (error) {
                console.log('cocossd failed');
                console.error(error.toString());
                dispatch({ type: 'initialized-failed', error });

            }
        }
        initializeTF();
        initializeModel();
    }, []);
    const values = { model, isModelReady, error };

    return (
        <ModelContext.Provider value={values}>
            {children}
        </ModelContext.Provider>);
};

export const useModel = () => {
    const context = useContext(ModelContext);
    if (!context) throw new Error('useModel must be used within a ModelProvider');
    return context;
};