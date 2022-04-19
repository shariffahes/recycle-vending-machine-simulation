import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyDlSkOA8UMGKTL1oz4bId9iz1RiNJtMxII',
  authDomain: 'irecycle-fa7d5.firebaseapp.com',
  databaseURL: 'https://irecycle-fa7d5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'irecycle-fa7d5',
  storageBucket: 'irecycle-fa7d5.appspot.com',
  messagingSenderId: '348552091572',
  appId: '1:348552091572:web:8ac8ade4cf252555c684e1',
}

export const initializeFB = () => {
    initializeApp(firebaseConfig);
}