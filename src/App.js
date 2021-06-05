import firebase from "firebase/app";
import "firebase/database";
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

const fbConfig = {
  apiKey: "AIzaSyDEL0biOGkniOQHyGv2U0SbbHqZkzzEF7s",
  authDomain: "fir-exreact.firebaseapp.com",
  databaseURL: "https://fir-exreact-default-rtdb.firebaseio.com",
  projectId: "fir-exreact",
  storageBucket: "fir-exreact.appspot.com",
  messagingSenderId: "380914606998",
  appId: "1:380914606998:web:a331cc46da8e8bc0d073b7",
  measurementId: "G-QBTG9Z5F6Z"
};

const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(fbConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

export default function App() {

  function handleClick() {
    firebase.database().ref('users/').push({
      name: 'Nguyen Quoc Nhan',
      address: 'Tien Giang',
    });
  }

  return (
    <div>
      <h1>Hello React Redux</h1>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <button onClick={handleClick} >click</button>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}