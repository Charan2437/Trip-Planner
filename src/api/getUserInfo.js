import { db } from "../Backend/setup";
import { auth } from '../Backend/setup';
import { doc, getDoc } from 'firebase/firestore';
import { query, where, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

export const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (userr) => {
        if (userr) {
          const docRef = doc(db, "users", userr.uid);
          console.log(userr.uid);
  
          const q = query(collection(db, "users"), where("uid", "==", userr.uid));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            reject(new Error('No such document!'));
          } else {
            const docSnap = querySnapshot.docs[0];
            resolve(docSnap.data());
          }
        }
      });
    });
  };