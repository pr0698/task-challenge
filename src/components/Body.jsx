import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
//import { auth } from '../utils/firebase';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import Home from './Home';

const Body = () => { 
    const dispatch = useDispatch();
   const appRouter = createBrowserRouter([
    {
      path: "/",
      element:<Login/>
    },
    {
      path:"/homepage",
      element:<Home/>
    }
  ]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const {uid,email,displayName,photoURL} = user;
//         dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL:photoURL }))
//       } else {
//         dispatch(removeUser());
//       }
//     });
//   },[])
  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default Body