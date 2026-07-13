// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "mssql";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID
};

const azureConfig = {
    user: process.env.MS_USER,
    password: process.env.MS_PASS,
    server: process.env.MS_SERVER,
    port: parseInt(process.env.MS_PORT ? process.env.MS_PORT : '0'), // optional, defaults to 1433
    database: process.env.MS_DATABASE,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

const msDatabase = require("mssql");

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const fireStorage = getStorage(app);

export { db, fireStorage, msDatabase, azureConfig };