// <!-- The core Firebase JS SDK is always required and must be listed first -->

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->


import { firebase } from '@firebase/app'
import "firebase/auth";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: "https://test-63eb7.firebaseio.com",
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: "test-63eb7.appspot.com",
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;