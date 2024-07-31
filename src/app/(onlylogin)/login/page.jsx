

// 'use client';

// import React, { useState, useEffect } from 'react';
// import './styles.css';
// import { auth } from '../../../connection';
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { googleProvider } from "../../../connection";
// import { updateProfile } from "firebase/auth";
// import { db } from "../../../connection";
// import { getUserInfo } from '../../../myapi/getUserInfo';
// import { useStore } from "../../../store/user";
// import { useRouter } from 'next/navigation';


// function LoginForm() {
//   const [isActive, setIsActive] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [CurrUser, setCurrUser] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const router = useRouter();
//   const [emailValid, setEmailValid] = useState(true); // State for email validation
//   const [emailExists, setEmailExists] = useState(false); // State to track if email exists
//   const [authError, setAuthError] = useState(""); // State to track authentication errors

//   const { setUser } = useStore(state => state.setUser);

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     setAuthError(""); // Clear any previous errors when toggling
//   };

//   const handleEmailValidation = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const checkEmailExists = async () => {
//     const usersRef = collection(db, "users");
//     const q = query(usersRef, where("email", "==", email));
//     const querySnapshot = await getDocs(q);
//     return !querySnapshot.empty;
//   };

//   const signIn = async (e) => {
//     e.preventDefault();
//     try {
//       if (!handleEmailValidation()) {
//         setEmailValid(false);
//         return;
//       }

//       setAuthError(""); // Clear any previous errors

//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in successfully.");
//       router.push('/');
//     } catch (err) {
//       console.error("Error signing in:", err.message);
//       setAuthError("Incorrect email or password. Please try again."); // Set authentication error message
//     }
//   };

//   const signInWithGoogle = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push('/');
//     } catch (err) {
//       console.error("Error signing in with Google:", err.message);
//     }
//   };

//   const signUpWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
//         const user = userCredential.user;
//         await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           name: name,
//           email: email,
//         });
//         router.push('/');
//       }).catch((error) => {
//         console.error("Error in signInWithPopup or addDoc:", error.message);
//       });
//     } catch (error) {
//       console.error("Error in signUpWithGoogle:", error.message);
//     }
//   };

//   const signUp = async () => {
//     try {
//       if (!handleEmailValidation()) {
//         setEmailValid(false);
//         return;
//       }

//       const emailExists = await checkEmailExists();
//       if (emailExists) {
//         setEmailExists(true);
//         return;
//       }

//       await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
//         const user = userCredential.user;
//         await updateProfile(user, {
//           displayName: name,
//         });
//         await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           name: name,
//           email: email,
//         });
//         console.log("User signed up successfully.");
//         router.push('/');
//       });
//     } catch (err) {
//       console.error("Error signing up:", err.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error("Error signing out:", err.message);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrUser(user.displayName || null);
//         if (CurrUser == null) {
//           setCurrUser(user.email);
//         }
//         getUserInfo().then((data) => {
//           setUser(oldUser => ({ ...oldUser, ...data }));
//         }).catch((err) => {
//           console.error("Error fetching user info:", err.message);
//         });
//       } else {
//         setCurrUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <div className={`container ${isActive ? "active" : ""}`}>
//         <div className="form-container sign-up">
//           <form>
//             <h1>Create Account</h1>
//             <div className="social-icons">
//               <button type="button" onClick={signUpWithGoogle}>Sign Up with Google</button>
//             </div>
//             <span>or use your email for registration</span>
//             <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             {!emailValid && <p className="error-message">Please enter a valid email address.</p>}
//             {emailExists && <p className="error-message">This email address is already registered.</p>}
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <button type="button" onClick={signUp}>Sign Up</button>
//           </form>
//         </div>
//         <div className="form-container sign-in">
//           <form>
//             <h1>Sign In</h1>
//             <div className="social-icons">
//               <button type="button" onClick={signInWithGoogle}>Sign In with Google</button>
//             </div>
//             <span>or use your account</span>
//             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <a href="#">Forgot your password?</a>
//             <button type="button" onClick={signIn}>Sign In</button>
//             {authError && <p className="error-message">{authError}</p>} {/* Display authentication error */}
//           </form>
//         </div>
//         <div className="toggle-container">
//           <div className="toggle">
//             <div className="toggle-panel toggle-left">
//               <h1>Welcome Back!</h1>
//               <p>Enter your personal details to use all site features</p>
//               <button onClick={toggleActive}>Sign In</button>
//             </div>
//             <div className="toggle-panel toggle-right">
//               <h1>Hello, Friend!</h1>
//               <p>Register with your personal details to use all site features</p>
//               <button onClick={toggleActive}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginForm;


'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';
import { auth } from '../../../connection';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { googleProvider } from "../../../connection";
import { updateProfile } from "firebase/auth";
import { db } from "../../../connection";
import { getUserInfo } from '../../../myapi/getUserInfo';
import { useStore } from "../../../store/user";
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [isActive, setIsActive] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [CurrUser, setCurrUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();
  const [emailValid, setEmailValid] = useState(true); // State for email validation
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists
  const [authError, setAuthError] = useState(""); // State to track authentication errors

  const { setUser } = useStore(state => state.setUser);

  const toggleActive = () => {
    setIsActive(!isActive);
    setAuthError(""); // Clear any previous errors when toggling
  };

  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      if (!handleEmailValidation()) {
        setEmailValid(false);
        return;
      }

      setAuthError(""); // Clear any previous errors

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: user.displayName }));
      console.log("User signed in successfully.");
      router.push('/');
    } catch (err) {
      console.error("Error signing in:", err.message);
      setAuthError("Incorrect email or password. Please try again."); // Set authentication error message
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: user.displayName }));
      router.push('/');
    } catch (err) {
      console.error("Error signing in with Google:", err.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: user.email,
      });
      localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: user.displayName }));
      router.push('/');
    } catch (error) {
      console.error("Error in signUpWithGoogle:", error.message);
    }
  };

  const signUp = async () => {
    try {
      if (!handleEmailValidation()) {
        setEmailValid(false);
        return;
      }

      const emailExists = await checkEmailExists();
      if (emailExists) {
        setEmailExists(true);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
      });
      localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: user.displayName }));
      console.log("User signed up successfully.");
      router.push('/');
    } catch (err) {
      console.error("Error signing up:", err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user.displayName || null);
        if (CurrUser == null) {
          setCurrUser(user.email);
        }
        localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: user.displayName }));
        getUserInfo().then((data) => {
          setUser(oldUser => ({ ...oldUser, ...data }));
        }).catch((err) => {
          console.error("Error fetching user info:", err.message);
        });
      } else {
        setCurrUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={`container ${isActive ? "active" : ""}`}>
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <button type="button" onClick={signUpWithGoogle}>Sign Up with Google</button>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            {!emailValid && <p className="error-message">Please enter a valid email address.</p>}
            {emailExists && <p className="error-message">This email address is already registered.</p>}
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={signUp}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <button type="button" onClick={signInWithGoogle}>Sign In with Google</button>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forgot your password?</a>
            <button type="button" onClick={signIn}>Sign In</button>
            {authError && <p className="error-message">{authError}</p>} {/* Display authentication error */}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button onClick={toggleActive}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button onClick={toggleActive}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;