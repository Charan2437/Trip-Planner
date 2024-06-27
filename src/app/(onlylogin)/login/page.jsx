// // "use client"

// // import React, { useState } from 'react';
// // import './styles.css';  
// // import { useEffect } from 'react';
// // import { auth } from '../../../connection'
// // import { doc, addDoc } from "firebase/firestore";
// // import { collection } from "firebase/firestore";
// // import {
// //   createUserWithEmailAndPassword,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   onAuthStateChanged,
// //   signOut,
// // } from "firebase/auth";
// // import { googleProvider } from "../../../connection";
// // import { updateProfile } from "firebase/auth";
// // import { db } from "../../../connection";
// // import { getUserInfo } from '../../../myapi/getUserInfo';
// // import { useStore } from "../../../store/user";
// // import { get } from 'http';


// // function LoginForm() {
// //   const [isActive, setIsActive] = useState(true);

// //   const toggleActive = () => {
// //     setIsActive(!isActive);
// //   };

// //   const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [name, setName] = useState("")
// //     const [isSignUp, setIsSignUp] = useState(false);
// //     const [CurrUser,setCurrUser] =useState(null);
// //     const [openSnackbar, setOpenSnackbar] = useState(false);
  
// //     // //   //
// //     const {setUser} = useStore(state => state.setUser);
// //     const signIn = async () => {
// //           try {
// //             await signInWithEmailAndPassword(auth, email, password);
// //             console.log("userCreated")
// //           } catch (err) {
// //             console.log("not working")
// //             console.error(err);
// //           }
// //         };
      
// //         const signInWithGoogle = async () => {
// //           try {
// //             await signInWithPopup(auth, googleProvider);
// //           } catch (err) {
// //             console.error(err);
// //           }
// //         };
  
  
// //         const signUpWithGoogle = async () => {
// //           try {
// //             await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
// //               const user = userCredential.user;
// //               await addDoc(collection(db, "users"), {
// //                 uid: user.uid,
// //                 name: name,
// //                 email: email,
// //               });
// //             })
// //             .catch((error) => {
// //               console.error("Error in signInWithPopup or addDoc:", error);
// //             });
// //           } catch (error) {
// //             console.error("Error in signUpWithGoogle:", error);
// //           }
// //         };
      
// //       const signUp = async () => {
// //         try {
// //           await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
// //             const user = userCredential.user;
// //             await updateProfile(user, {
// //               displayName: name,
// //             });
// //             await addDoc(collection(db, "users"), {
// //               uid: user.uid,
// //               name: name,
// //               email: email,
// //             });

// //           });
// //           console.log("userCreated")
// //           } catch (err) {
// //             console.error(err);
// //           }
// //       };
      
// //         const logout = async () => {
// //           try {
// //             await signOut(auth);
// //           } catch (err) {
// //             console.error(err);
// //           }
// //         };
// //       useEffect(() => {
// //           const container = document.getElementById('container');
// //           const registerBtn = document.getElementById('register');
// //           const loginBtn = document.getElementById('login');
          
// //           const handleRegisterClick = () => {
// //               container.classList.add("active");
// //           };
          
// //           const handleLoginClick = () => {
// //               container.classList.remove("active");
// //           };
          
// //           registerBtn?.addEventListener('click', handleRegisterClick);
// //           loginBtn?.addEventListener('click', handleLoginClick);
          
// //           return () => {
// //               registerBtn?.removeEventListener('click', handleRegisterClick);
// //               loginBtn?.removeEventListener('click', handleLoginClick);
// //           };
// //       }, []); 
  
// //       useEffect(() => {
// //           const unsubscribe = onAuthStateChanged(auth, (user) => {
// //             if (user) {
// //               setCurrUser(user.displayName || null);
// //               if(CurrUser == null){
// //                   setCurrUser(user.email);
// //               }
// //               getUserInfo().then((dataa) => {
// //                 console.log({dataa});
// //                 setUser(oldUser => ({...oldUser, ...dataa}));
                
// //               }).catch((err) => {
// //                 console.error(err);
// //               }
// //               );
// //             } else {
// //               setCurrUser(null);
// //             }
// //           });
      
// //           // Cleanup subscription on unmount
// //           return () => unsubscribe();
// //         }, [auth]);
      
        
// //     //     {/* <style global jsx>{`
// //     //         *{
// //     //             margin: 0;
// //     //             padding: 0;
// //     //             box-sizing: border-box;
// //     //             font-family: 'Montserrat', sans-serif;
// //     //         }
    
// //     //         body{
// //     //             background-color: #c9d6ff;
// //     //             background: linear-gradient(to right, #e2e2e2, #c9d6ff);
// //     //             display: flex;
// //     //             align-items: center;
// //     //             justify-content: center;
// //     //             flex-direction: column;
// //     //             height: 100vh;
// //     //         } 
// //     // `}</style> */}

// //   return (
// //     <>
// //     <div className={`container ${isActive ? "active" : ""}`}>
// //       <div className="form-container sign-up">
// //         <form>
// //           <h1>Create Account</h1>
// //           <div className="social-icons">
// //             <button onClick={signUpWithGoogle}>google SignUp</button>
// //           </div>
// //           <span>or use your email for registration</span>
// //           <input type="text" placeholder="Name"  onChange={(e) => setName(e.target.value)} required/>
// //           <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
// //            <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
// //           <button onClick={signUp}>Sign Up</button>
// //         </form>
// //       </div>
// //       <div className="form-container sign-in">
// //         <form>
// //           <h1>Sign In</h1>
// //           <div className="social-icons">
// //             <button onClick={signInWithGoogle}>google SignIn</button>
// //             <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
// //             <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
// //             <a href="#" className="icon"><i className="fab fa-github"></i></a>
// //             <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
// //           </div>
// //           <span>or use your account</span>
// //           <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
// //           <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
// //           <a href="#">Forgot your password?</a>
// //           <button onClick={signIn}>Sign In</button>
// //         </form>
// //       </div>
// //       <div className="toggle-container">
// //         <div className="toggle">
// //           <div className="toggle-panel toggle-left">
// //             <h1>Welcome Back!</h1>
// //             <p>Enter your personal details to use all of site features</p>
// //             <button onClick={toggleActive}>Sign In</button>
// //           </div>
// //           <div className="toggle-panel toggle-right">
// //             <h1>Hello, Friend!</h1>
// //             <p>Register with your personal details to use all of site features</p>
// //             <button onClick={toggleActive}>Sign Up</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }

// // export default LoginForm;



// "use client"
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

// function LoginForm() {
//   const [isActive, setIsActive] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [CurrUser, setCurrUser] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [emailValid, setEmailValid] = useState(true); // State for email validation
//   const [emailExists, setEmailExists] = useState(false); // State to track if email exists
//   const [errorMessage, setErrorMessage] = useState('');

//   const { setUser } = useStore(state => state.setUser);

//   const toggleActive = () => {
//     setIsActive(!isActive);
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

//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in successfully.");
//     } catch (err) {
      
//       console.error("Error signing in:", err.message);
//       setErrorMessage(err.message);
//     }
//   };

//   const signInWithGoogle = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("signing in with Google")
//       await signInWithPopup(auth, googleProvider);
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
//         // Optionally, redirect to sign-in page or perform other actions upon successful sign-up
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

//   //getting User Data
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrUser(user.displayName || null);
//         if (CurrUser == null) {
//           setCurrUser(user.email);
//         }
//         getUserInfo().then((data) => {
//           console.log({ data });
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
//      <div className={`container ${isActive ? "active" : ""}`}>
//         <div className="form-container sign-up">
//           <form>
//             <h1>Create Account</h1>
//             <div className="social-icons">
//               <button onClick={signUpWithGoogle}>Sign Up with Google</button>
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
//               <button onClick={signInWithGoogle}>Sign In with Google</button>
//             </div>
//             <span>or use your account</span>
//             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <a href="#">Forgot your password?</a>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
          
//             <button type="button" onClick={signIn}>Sign In</button>
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

function LoginForm() {
  const [isActive, setIsActive] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [CurrUser, setCurrUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
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

      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully.");
    } catch (err) {
      console.error("Error signing in:", err.message);
      setAuthError("Incorrect email or password. Please try again."); // Set authentication error message
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Error signing in with Google:", err.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: name,
          email: email,
        });
      }).catch((error) => {
        console.error("Error in signInWithPopup or addDoc:", error.message);
      });
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

      await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: name,
          email: email,
        });
        console.log("User signed up successfully.");
      });
    } catch (err) {
      console.error("Error signing up:", err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
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
        getUserInfo().then((data) => {
          console.log({ data });
          setUser(oldUser => ({ ...oldUser, ...data }));
        }).catch((err) => {
          console.error("Error fetching user info:", err.message);
        });
      } else {
        setCurrUser(null);
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
