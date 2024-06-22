// // // "use client";

// // // import React from 'react';
// // // // import './NewAuth.css';
// // // import styles from './NewAuth.module.css';
// // // import { useEffect } from 'react';
// // // import { auth } from '../../connection'
// // // import { doc, addDoc } from "firebase/firestore";
// // // import { collection } from "firebase/firestore";
// // // // import { useNavigate } from 'react-router-dom';
// // // import {
// // //   createUserWithEmailAndPassword,
// // //   signInWithEmailAndPassword,
// // //   signInWithPopup,
// // //   onAuthStateChanged,
// // //   signOut,
// // // } from "firebase/auth";
// // // import { googleProvider } from "../../connection";
// // // import { useState } from "react";
// // // import { updateProfile } from "firebase/auth";
// // // // import { CallMissedOutgoing } from '@mui/icons-material';
// // // import { db } from "../../connection";
// // // // import {UserContext} from '../../components/authcontext';
// // // import { getUserInfo } from '../../myapi/getUserInfo';
// // // // import { useContext } from 'react';
// // // import { useStore } from "../../store/user";



// // // function ModernLoginPage() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [name, setName] = useState("")
// // //   const [CurrUser,setCurrUser] =useState(null);
// // //   const [openSnackbar, setOpenSnackbar] = useState(false);

// // //   //
// // //   // const {setUser} = useContext(UserContext);
// // //   const {setUser} = useStore(state => state.setUser);

// // // //   const navigate = useNavigate();

  
// // //   const signIn = async () => {
// // //         try {
// // //           await signInWithEmailAndPassword(auth, email, password);
// // //           console.log("userCreated")
// // //         } catch (err) {
// // //           console.log("not working")
// // //           console.error(err);
// // //         }
// // //       };
    
// // //       const signInWithGoogle = async () => {
// // //         try {
// // //           await signInWithPopup(auth, googleProvider);
// // //         //   navigate("/form");
// // //         } catch (err) {
// // //           console.error(err);
// // //         }
// // //       };


// // //       const signUpWithGoogle = async () => {
// // //         try {
// // //           await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
// // //             const user = userCredential.user;
      
// // //             await addDoc(collection(db, "users"), {
// // //               uid: user.uid,
// // //               name: name,
// // //               email: email,
// // //             });
      
// // //           })
// // //           .catch((error) => {
// // //             console.error("Error in signInWithPopup or addDoc:", error);
// // //           });
// // //         } catch (error) {
// // //           console.error("Error in signUpWithGoogle:", error);
// // //         }
// // //       };
    
// // //     const signUp = async () => {
// // //       try {
// // //         await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
// // //           const user = userCredential.user;
// // //           await updateProfile(user, {
// // //             displayName: name,
// // //           });
// // //           await addDoc(collection(db, "users"), {
// // //             uid: user.uid,
// // //             name: name,
// // //             email: email,
// // //           });
// // //         });
// // //         console.log("userCreated")
// // //         } catch (err) {
// // //           console.error(err);
// // //         }
// // //     };
    
// // //       const logout = async () => {
// // //         try {
// // //           await signOut(auth);
// // //         } catch (err) {
// // //           console.error(err);
// // //         }
// // //       };
    
// // //     // useEffect(() => {
// // //     //     const container = document.getElementById('container');
// // //     //     const registerBtn = document.getElementById('register');
// // //     //     const loginBtn = document.getElementById('login');
        
// // //     //     const handleRegisterClick = () => {
// // //     //         container.classList.add("active");
// // //     //     };
        
// // //     //     const handleLoginClick = () => {
// // //     //         container.classList.remove("active");
// // //     //     };
        
// // //     //     registerBtn.addEventListener('click', handleRegisterClick);
// // //     //     loginBtn.addEventListener('click', handleLoginClick);
        
// // //     //     // Clean up event listeners when component unmounts
// // //     //     return () => {
// // //     //         registerBtn.removeEventListener('click', handleRegisterClick);
// // //     //         loginBtn.removeEventListener('click', handleLoginClick);
// // //     //     };
// // //     // }, []); // Empty de

// // //     useEffect(() => {
// // //       const container = document.getElementById('container');
// // //       const registerBtn = document.getElementById('register');
// // //       const loginBtn = document.getElementById('login');
      
// // //       const handleRegisterClick = () => {
// // //         console.log("loaing")
// // //         container.classList.add("active");
// // //       };
      
// // //       const handleLoginClick = () => {
// // //           container.classList.remove("active");
// // //       };
      
// // //       registerBtn.addEventListener('click', handleRegisterClick);
// // //       loginBtn.addEventListener('click', handleLoginClick);
      
// // //       // Clean up event listeners when component unmounts
// // //       return () => {
// // //           registerBtn.removeEventListener('click', handleRegisterClick);
// // //           loginBtn.removeEventListener('click', handleLoginClick);
// // //       };
// // //   }, []); // Empty dependencies array ensures this runs once
  



// // //     useEffect(() => {
// // //         const unsubscribe = onAuthStateChanged(auth, (user) => {
// // //           if (user) {
// // //             setCurrUser(user.displayName || null);
// // //             if(CurrUser == null){
// // //                 setCurrUser(user.email);
// // //             }
// // //             // console.log({user})
// // //             getUserInfo().then((dataa) => {
// // //               console.log({dataa});
// // //               setUser(oldUser => ({...oldUser, ...dataa}));
              
// // //             }).catch((err) => {
// // //               console.error(err);
// // //             }
// // //             );

// // //              // or user.displayName, or any other user property
// // //           } else {
// // //             setCurrUser(null);
// // //           }
// // //         });
    
// // //         // Cleanup subscription on unmount
// // //         return () => unsubscribe();
// // //       }, [auth]);
    
// // //     return (
// // //       <div className={styles.body}>
// // //         <div className={styles.container} id="container">
// // //             <div className={styles['form-container']}>
// // //                 <form onSubmit={(e) => e.preventDefault()}>
// // //                     <h1>Create Account</h1>
// // //                     <input type="text" placeholder="Name"  onChange={(e) => setName(e.target.value)} required/>
// // //                     <div className="social-icons">
// // //                         {/* <googleIcon/> */}
// // //                         <button onClick={signUpWithGoogle} href="#" className="icon"><img src= "../assets/googleIcon.ico" alt="googleIcon" /></button>
// // //                         {/* <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a> */}
// // //                         {/* <a href="#" className="icon"><i className="fab fa-github"></i></a> */}
// // //                         {/* <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a> */}
// // //                     </div>
// // //                     <span>or use your email for registration</span>
// // //                     <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
// // //                     <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
// // //                     <button onClick={signUp}>Sign Up</button>
// // //                 </form>
// // //             </div>
// // //             <div className={`${styles['form-container']} ${styles['sign-in']}`}>
// // //                 <form onSubmit={(e) => e.preventDefault()}>
// // //                     <h1>Sign In</h1>
// // //                     <div className="social-icons">
// // //                         <button onClick={signInWithGoogle}  className="icon"><img src= "../assets/googleIcon.ico" alt="googleIcon" /></button>
// // //                         {/* <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a> */}
// // //                         {/* <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a> */}
// // //                         {/* <a href="#" className="icon"><i className="fab fa-github"></i></a> */}
// // //                         {/* <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a> */}
// // //                     </div>
// // //                     <span>or use your email password</span>
// // //                     <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
// // //                     <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
// // //                     <a href="#">Forget Your Password?</a>
// // //                     <button onClick={signIn}>Sign In</button>
// // //                 <button onClick={logout}>LogOut</button>
// // //                 <div><h1>Hello {CurrUser}</h1></div>
// // //                 </form> 
// // //             </div>
// // //             <div className={styles['toggle-container']}>
// // //             <div className={styles.toggle}>
// // //               <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
// // //                   <h1>Welcome Back!</h1>
// // //                   <p>Enter your personal details to use all site features</p>
// // //                   <button className={styles.hidden} id="login">Sign In</button>
// // //               </div>
// // //               <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
// // //                   <h1>Hello, Friend!</h1>
// // //                   <p>Register with your personal details to use all site features</p>
// // //                   <button className={styles.hidden} id="register">Sign Up</button>
// // //               </div>
// // //           </div>
// // //             </div>
// // //         </div>
// // //         </div>
// // //     );
// // // }

// // // export default ModernLoginPage;


// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import styles from './NewAuth.module.css';
// // import { auth } from '../../connection';
// // import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// // import { googleProvider } from "../../connection";
// // import { updateProfile } from "firebase/auth";
// // import { addDoc, collection } from "firebase/firestore";
// // import { db } from "../../connection";
// // import { getUserInfo } from '../../myapi/getUserInfo';
// // import { useStore } from "../../store/user";

// // function ModernLoginPage() {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [name, setName] = useState("");
// //     const [CurrUser, setCurrUser] = useState(null);
// //     const [isSignInActive, setIsSignInActive] = useState(true); // State to track active form

// //     const { setUser } = useStore(state => state.setUser);

// //     const signIn = async () => {
// //         try {
// //             await signInWithEmailAndPassword(auth, email, password);
// //             console.log("Signed In successfully");
// //         } catch (err) {
// //             console.error("Sign In error:", err);
// //         }
// //     };

// //     const signInWithGoogle = async () => {
// //         try {
// //             await signInWithPopup(auth, googleProvider);
// //         } catch (err) {
// //             console.error("Sign In with Google error:", err);
// //         }
// //     };

// //     const signUpWithGoogle = async () => {
// //         try {
// //             await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
// //                 const user = userCredential.user;
// //                 await addDoc(collection(db, "users"), {
// //                     uid: user.uid,
// //                     name: name,
// //                     email: email,
// //                 });
// //             }).catch((error) => {
// //                 console.error("Error in signInWithPopup or addDoc:", error);
// //             });
// //         } catch (error) {
// //             console.error("Sign Up with Google error:", error);
// //         }
// //     };

// //     const signUp = async () => {
// //         try {
// //             await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
// //                 const user = userCredential.user;
// //                 await updateProfile(user, {
// //                     displayName: name,
// //                 });
// //                 await addDoc(collection(db, "users"), {
// //                     uid: user.uid,
// //                     name: name,
// //                     email: email,
// //                 });
// //             });
// //             console.log("User created successfully");
// //         } catch (err) {
// //             console.error("Sign Up error:", err);
// //         }
// //     };

// //     const logout = async () => {
// //         try {
// //             await signOut(auth);
// //         } catch (err) {
// //             console.error("Logout error:", err);
// //         }
// //     };

// //     useEffect(() => {
// //         const unsubscribe = onAuthStateChanged(auth, (user) => {
// //             if (user) {
// //                 setCurrUser(user.displayName || user.email);
// //                 getUserInfo().then((data) => {
// //                     setUser(oldUser => ({ ...oldUser, ...data }));
// //                 }).catch((err) => {
// //                     console.error("Get user info error:", err);
// //                 });
// //             } else {
// //                 setCurrUser(null);
// //             }
// //         });

// //         return () => unsubscribe();
// //     }, [auth, setUser]);

// //     const handleSignInClick = () => {
// //         setIsSignInActive(true);
// //     };

// //     const handleSignUpClick = () => {
// //         setIsSignInActive(false);
// //     };

// //     return (
// //         <div className={styles.body}>
// //             <div className={styles.container}>
// //                 <div className={styles['form-container']}>
// //                     {isSignInActive ? (
// //                         <form onSubmit={(e) => e.preventDefault()}>
// //                             <h1>Sign In</h1>
// //                             <div className="social-icons">
// //                                 <button onClick={signInWithGoogle} className="icon"><img src="../assets/googleIcon.ico" alt="googleIcon" /></button>
// //                             </div>
// //                             <span>or use your email password</span>
// //                             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
// //                             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
// //                             <a href="#">Forget Your Password?</a>
// //                             <button onClick={signIn}>Sign In</button>
// //                         </form>
// //                     ) : (
// //                         <form onSubmit={(e) => e.preventDefault()}>
// //                             <h1>Create Account</h1>
// //                             <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
// //                             <div className="social-icons">
// //                                 <button onClick={signUpWithGoogle} className="icon"><img src="../assets/googleIcon.ico" alt="googleIcon" /></button>
// //                             </div>
// //                             <span>or use your email for registration</span>
// //                             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
// //                             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
// //                             <button onClick={signUp}>Sign Up</button>
// //                         </form>
// //                     )}
// //                 </div>
// //                 <div className={styles['toggle-container']}>
// //                     <div className={styles.toggle}>
// //                         <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
// //                             <h1>Welcome Back!</h1>
// //                             <p>Enter your personal details to use all site features</p>
// //                             <button className={styles.hidden} id="login" onClick={handleSignInClick}>Sign In</button>
// //                         </div>
// //                         <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
// //                             <h1>Hello, Friend!</h1>
// //                             <p>Register with your personal details to use all site features</p>
// //                             <button className={styles.hidden} id="register" onClick={handleSignUpClick}>Sign Up</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default ModernLoginPage;










// "use client";


// import React from 'react';
// import './styles.css'
// // import './NewAuth.css';
// import styles from './NewAuth.module.css';
// import { useEffect } from 'react';
// import { auth } from '../../connection'
// import { doc, addDoc } from "firebase/firestore";
// import { collection } from "firebase/firestore";
// // import { useNavigate } from 'react-router-dom';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { googleProvider } from "../../connection";
// import { useState } from "react";
// import { updateProfile } from "firebase/auth";
// // import { CallMissedOutgoing } from '@mui/icons-material';
// import { db } from "../../connection";
// // import {UserContext} from '../../components/authcontext';
// import { getUserInfo } from '../../myapi/getUserInfo';
// // import { useContext } from 'react';
// import { useStore } from "../../store/user";


// function ModernLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("")
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [CurrUser,setCurrUser] =useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   // //   //
//   const {setUser} = useStore(state => state.setUser);
//   const signIn = async () => {
//         try {
//           await signInWithEmailAndPassword(auth, email, password);
//           console.log("userCreated")
//         } catch (err) {
//           console.log("not working")
//           console.error(err);
//         }
//       };
    
//       const signInWithGoogle = async () => {
//         try {
//           await signInWithPopup(auth, googleProvider);
//           navigate("/form");
//         } catch (err) {
//           console.error(err);
//         }
//       };


//       const signUpWithGoogle = async () => {
//         try {
//           await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
//             const user = userCredential.user;
//             await addDoc(collection(db, "users"), {
//               uid: user.uid,
//               name: name,
//               email: email,
//             });
      
//           })
//           .catch((error) => {
//             console.error("Error in signInWithPopup or addDoc:", error);
//           });
//         } catch (error) {
//           console.error("Error in signUpWithGoogle:", error);
//         }
//       };
    
//     const signUp = async () => {
//       try {
//         await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
//           const user = userCredential.user;
//           await updateProfile(user, {
//             displayName: name,
//           });
//           await addDoc(collection(db, "users"), {
//             uid: user.uid,
//             name: name,
//             email: email,
//           });
//         });
//         console.log("userCreated")
//         } catch (err) {
//           console.error(err);
//         }
//     };
    
//       const logout = async () => {
//         try {
//           await signOut(auth);
//         } catch (err) {
//           console.error(err);
//         }
//       };
    
//     useEffect(() => {
//         const container = document.getElementById('container');
//         const registerBtn = document.getElementById('register');
//         const loginBtn = document.getElementById('login');
        
//         const handleRegisterClick = () => {
//             container.classList.add("active");
//         };
        
//         const handleLoginClick = () => {
//             container.classList.remove("active");
//         };
        
//         registerBtn?.addEventListener('click', handleRegisterClick);
//         loginBtn?.addEventListener('click', handleLoginClick);
        
//         // Clean up event listeners when component unmounts
//         return () => {
//             registerBtn?.removeEventListener('click', handleRegisterClick);
//             loginBtn?.removeEventListener('click', handleLoginClick);
//         };
//     }, []); // Empty de

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//           if (user) {
//             setCurrUser(user.displayName || null);
//             if(CurrUser == null){
//                 setCurrUser(user.email);
//             }
//             // console.log({user})
//             getUserInfo().then((dataa) => {
//               console.log({dataa});
//               setUser(oldUser => ({...oldUser, ...dataa}));
              
//             }).catch((err) => {
//               console.error(err);
//             }
//             );

//              // or user.displayName, or any other user property
//           } else {
//             setCurrUser(null);
//           }
//         });
    
//         // Cleanup subscription on unmount
//         return () => unsubscribe();
//       }, [auth]);
    
//     // return (
//     //   <div className={styles.body}>
//     //             <div className={`${styles.container} ${isSignUp ? styles.active : ''}`}>            <div className={styles['form-container']}>
//     //             <form onSubmit={(e) => {
//     //                 e.preventDefault();
//     //                 console.log("Form submitted");
//     //               }}>
//     //                 <h1>Create Account</h1>
//     //                 <input type = "text"/>
//     //                 <input type="text" placeholder="Name"  onChange={(e) => setName(e.target.value)} required/>
//     //                 <div className="social-icons">
//     //                     <button onClick={signUpWithGoogle} href="#" className="icon"><img src= "../assets/googleIcon.ico" alt="googleIcon" /></button>
//     //                 </div>
//     //                 <span>or use your email for registration</span>
//     //                 <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
//     //                 <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
//     //                 <button onClick={signUp}>Sign Up</button>
//     //             </form>
//     //         </div>
//     //         <div className={`${styles['form-container']} ${styles['sign-in']}`}>
//     //         <form onSubmit={(e) => {
//     //                 e.preventDefault();
//     //                 console.log("Form submitted");
//     //               }}>
//     //                 <h1>Sign In</h1>
//     //                 <div className="social-icons">
//     //                     <button onClick={signInWithGoogle}  className="icon"><img src= "../assets/googleIcon.ico" alt="googleIcon" /></button>
//     //                 </div>
//     //                 <span>or use your email password</span>
//     //                 <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
//     //                 <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
//     //                 <a href="#">Forget Your Password?</a>
//     //                 <button onClick={signIn}>Sign In</button>
//     //             <button onClick={logout}>LogOut</button>
//     //             <div><h1>Hello {CurrUser}</h1></div>
//     //             </form> 
//     //         </div>
//     //         <div className={styles['toggle-container']}>
//     //           <div className={styles.toggle}>
//     //             <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
//     //               <h1>Welcome Back!</h1>
//     //               <p>Enter your personal details to use all site features</p>
//     //               <button className={styles.hidden} onClick={() => setIsSignUp(false)}>Sign In</button>
//     //             </div>
//     //             <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
//     //               <h1>Hello, Friend!</h1>
//     //               <p>Register with your personal details to use all site features</p>
//     //               <button className={styles.hidden} onClick={() => setIsSignUp(true)}>Sign Up</button>
//     //             </div>
//     //       </div>
//     //         </div>
//     //     </div>
//     //     </div>
//     // );

//     const toggleForm = () => {
//       setIsSignUp(!isSignUp);
//     };

//   return (
//     <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
//       <div className="form-container sign-up">
//         <form>
//           <h1>Create Account</h1>
//           <div className="social-icons">
//             <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
//           </div>
//           <span>or use your email for registration</span>
//           <input type="text" placeholder="Name" />
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button>Sign Up</button>
//         </form>
//       </div>
//       <div className="form-container sign-in">
//         <form>
//           <h1>Sign In</h1>
//           <div className="social-icons">
//             <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
//             <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
//           </div>
//           <span>or use your email and password</span>
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <a href="">Forgot your email or password?</a>
//           <button>Sign in</button>
//         </form>
//       </div>
//       <div className="toggle-container">
//         <div className="toggle">
//           <div className="toggle-panel toggle-left">
//             <h1>Welcome Back!</h1>
//             <p>Enter your personal details to use all of site features</p>
//             <button className="hidden" onClick={toggleForm}>Sign In</button>
//           </div>
//           <div className="toggle-panel toggle-right">
//             <h1>Hello, User!</h1>
//             <p>Register with your personal details to use all of site features</p>
//             <button className="hidden" onClick={toggleForm}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// }

// export default ModernLoginPage;

"use client"

import React, { useState } from 'react';
import './styles.css';  // Assuming you've saved the CSS in a file named style.css
// import './NewAuth.css';
// import styles from './NewAuth.module.css';
import { useEffect } from 'react';
import { auth } from '../../connection'
import { doc, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { googleProvider } from "../../connection";
import { updateProfile } from "firebase/auth";
// import { CallMissedOutgoing } from '@mui/icons-material';
import { db } from "../../connection";
// import {UserContext} from '../../components/authcontext';
import { getUserInfo } from '../../myapi/getUserInfo';
// import { useContext } from 'react';
import { useStore } from "../../store/user";


function LoginForm() {
  const [isActive, setIsActive] = useState(true);

  const toggleActive = () => {
    setIsActive(!isActive);
  };


  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [isSignUp, setIsSignUp] = useState(false);
    const [CurrUser,setCurrUser] =useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
  
    // //   //
    const {setUser} = useStore(state => state.setUser);
    const signIn = async () => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("userCreated")
          } catch (err) {
            console.log("not working")
            console.error(err);
          }
        };
      
        const signInWithGoogle = async () => {
          try {
            await signInWithPopup(auth, googleProvider);
            navigate("/form");
          } catch (err) {
            console.error(err);
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
        
            })
            .catch((error) => {
              console.error("Error in signInWithPopup or addDoc:", error);
            });
          } catch (error) {
            console.error("Error in signUpWithGoogle:", error);
          }
        };
      
      const signUp = async () => {
        try {
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
          });
          console.log("userCreated")
          } catch (err) {
            console.error(err);
          }
      };
      
        const logout = async () => {
          try {
            await signOut(auth);
          } catch (err) {
            console.error(err);
          }
        };
      
      useEffect(() => {
          const container = document.getElementById('container');
          const registerBtn = document.getElementById('register');
          const loginBtn = document.getElementById('login');
          
          const handleRegisterClick = () => {
              container.classList.add("active");
          };
          
          const handleLoginClick = () => {
              container.classList.remove("active");
          };
          
          registerBtn?.addEventListener('click', handleRegisterClick);
          loginBtn?.addEventListener('click', handleLoginClick);
          
          // Clean up event listeners when component unmounts
          return () => {
              registerBtn?.removeEventListener('click', handleRegisterClick);
              loginBtn?.removeEventListener('click', handleLoginClick);
          };
      }, []); // Empty de
  
      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setCurrUser(user.displayName || null);
              if(CurrUser == null){
                  setCurrUser(user.email);
              }
              // console.log({user})
              getUserInfo().then((dataa) => {
                console.log({dataa});
                setUser(oldUser => ({...oldUser, ...dataa}));
                
              }).catch((err) => {
                console.error(err);
              }
              );
  
               // or user.displayName, or any other user property
            } else {
              setCurrUser(null);
            }
          });
      
          // Cleanup subscription on unmount
          return () => unsubscribe();
        }, [auth]);
      
        

  return (
    <>
    <style global jsx>{`
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body{
            background-color: #c9d6ff;
            background: linear-gradient(to right, #e2e2e2, #c9d6ff);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
        } 
`}</style>
    <div className={`container ${isActive ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <button onClick={signInWithGoogle}>google SignIn</button>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name"  onChange={(e) => setName(e.target.value)} required/>
          <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
           <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={signUp}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <button onClick={signUpWithGoogle}>google SignUp</button>
            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-github"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          <a href="#">Forgot your password?</a>
          <button onClick={signIn}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button onClick={toggleActive}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button onClick={toggleActive}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginForm;