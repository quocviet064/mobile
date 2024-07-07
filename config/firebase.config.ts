import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "api-key",
//   authDomain: "project-id.firebaseapp.com",
//   databaseURL: "https://project-id.firebaseio.com",
//   projectId: "project-id",
//   storageBucket: "project-id.appspot.com",
//   messagingSenderId: "sender-id",
//   appId: "app-id",
//   measurementId: "G-measurement-id",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDR7RwJzldaFQKDupCkzwVhSUSRVQUdAtg",
  authDomain: "project-swd-268c0.firebaseapp.com",
  projectId: "project-swd-268c0",
  storageBucket: "project-swd-268c0.appspot.com",
  messagingSenderId: "352238382942",
  appId: "1:352238382942:web:955bb5e6808d93307fa9cf",
};

const app = initializeApp(firebaseConfig);
