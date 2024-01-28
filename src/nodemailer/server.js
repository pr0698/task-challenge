const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

const app = express();
const port = 3001;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3fJzsNaI6jSL_RvjZGuWZkpFS4zzjGzs",
  authDomain: "task-manager-49b4a.firebaseapp.com",
  projectId: "task-manager-49b4a",
  storageBucket: "task-manager-49b4a.appspot.com",
  messagingSenderId: "767376520295",
  appId: "1:767376520295:web:b473234e19be73121ed0c2",
  measurementId: "G-6RHQ91FH7N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srivastavapratham06@gmail.com',
    pass: 'xrkp dqpv cphj pwmh',
  },
});

app.use(bodyParser.json());
app.use(cors());

// Sign-up endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)

  try {
    console.log("1")
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("2")
    // Send email verification
    //const verificationToken = await userCredential.user.getIdToken();
    const uid = userCredential.user.uid;
    console.log(uid);
    const verificationLink = `http://localhost:3001/verify/${uid}`;
    console.log(verificationLink)
    const mailOptions = {
      from: 'srivastavapratham06@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: ${verificationLink}`,
    };
    console.log("3")
    await transporter.sendMail(mailOptions);
    console.log("4")
    res.status(200).send('User registered successfully. Check your email for verification.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    // Check if the email is verified
    const user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      return res.status(401).send('Email not verified. Please check your inbox for a verification email.');
    }

    res.status(200).send('Login successful.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in.');
  }
});

app.get('/verify/:token', async (req, res) => {
  const token = req.params.token;
  console.log(token)
  try {
    //await firebase.auth().signInWithCustomToken(token);
    await admin.auth().updateUser(token, {emailVerified: true});
    await firebase.auth().currentUser.sendEmailVerification();

    res.status(200).send('Email verified successfully. You can now log in.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying email.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});