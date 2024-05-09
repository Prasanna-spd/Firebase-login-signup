import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import axios from "axios";

export const doCreateUserWithEmailAndPassword = async (email, password, phoneNumber,profilePhoto,coverPhoto,gender,citizen,category) => {
  const userCredential= await createUserWithEmailAndPassword(auth, email, password);

  const user=userCredential.user

  const profilePhotoBase64 = await readFileAsBase64(profilePhoto);
  const coverPhotoBase64 = await readFileAsBase64(coverPhoto);

 

  const backendApiUrl="http://localhost:5000/user/save-user";
  try {
    const response = await axios.post(backendApiUrl, {
      email, phoneNumber,
      profilePhoto: profilePhotoBase64,
      coverPhoto: coverPhotoBase64,
      gender,citizen,category
      
    });
    console.log("User data sent to backend:", response.data);
    return response.data
  } catch (error) {
    console.error("Error sending user data to backend:", error);
  }

  // Return the user credential

};
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result.split(",")[1]); 
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const additionalUserInfo = getAdditionalUserInfo(result);


  // Return the signed-in user
  return { user, additionalUserInfo };

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};
