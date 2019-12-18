import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { create } from 'istanbul-reports';

// Reducers TODO
import notifyReducer from './reducers/notifyReducer'

const firebaseConfig = {
    apiKey: "AIzaSyBxp7kZgt_j8uls_BXc1xSN5TbcC7dl7JM",
    authDomain: "new-react-client-panel.firebaseapp.com",
    databaseURL: "https://new-react-client-panel.firebaseio.com",
    projectId: "new-react-client-panel",
    storageBucket: "new-react-client-panel.appspot.com",
    messagingSenderId: "1019673470105",
    appId: "1:1019673470105:web:86f1d5d8e0955d36abc408",
    measurementId: "G-55YS6HVSG9"
};


// Initilise the firebase instance
firebase.initializeApp(firebaseConfig);
// Initilize firestore
const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    enableClaims: true // Get custom claims along with the profile
};

export default store;














