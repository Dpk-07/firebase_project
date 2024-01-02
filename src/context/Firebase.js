import React, { createContext, useContext ,useState,useEffect} from "react";
import {getAuth,onAuthStateChanged ,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { fireApp} from "../constant/fireConfig";
import {toast } from 'react-toastify';
import {getFirestore,collection,addDoc,getDocs} from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'


const FirebaseContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const useFirebase = ()=>useContext(FirebaseContext);
export const auth = getAuth(fireApp);
const firebaseStore = getFirestore(fireApp);
const firebaseStorage = getStorage(fireApp)


export const FirebaseProvider = (props)=>{
    const [loggedInUser,setLoggedInUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>    {
            if(user){
                setLoggedInUser(user);
            }else{
                setLoggedInUser(null);
            }
        })
    },[]);

    const signUpWithEmail = (email,password)=>{
        createUserWithEmailAndPassword(auth,email,password).then(()=>toast('Sign Up Successful')).catch((err)=>console.log(err));
    }

    const signInWithEmail = (email,password)=>{
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>toast(userCredential.user)).catch((err)=>toast(err.message));
    }

    const signInWithGoogle = ()=>{
        signInWithPopup(auth,googleProvider)
    }

    const isLoggedIn = loggedInUser ? true : false;

    const handleCreateNewList =async(name ,isbn,price,coverFile)=>{

        const imageRef = ref(firebaseStorage,`uplaods/images/${Date.now()}-${  coverFile.name}`)
        const uploadresult = await uploadBytes(imageRef,coverFile);
        return await addDoc(collection(firebaseStore,"books"),{
            name,
            price,
            isbn,
            imageURL:uploadresult.ref.fullPath,
            userID:loggedInUser.uid,
            userEmail:loggedInUser.email,
            displayName:loggedInUser.displayName,
            photoURL:loggedInUser.photoURL,
        })
    }

    const listAllBooks = ()=>{
        return getDocs(collection(firebaseStore,'books'));
    }

    const getImageURL = (path)=>{
        return getDownloadURL(ref(firebaseStorage,path));
    }

    return(
        <FirebaseContext.Provider value={{signUpWithEmail,getImageURL,listAllBooks,signInWithEmail,handleCreateNewList,signInWithGoogle,isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}