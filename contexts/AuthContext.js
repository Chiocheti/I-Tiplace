import { createContext , useState } from "react";
import Router from "next/router";
import firebase from '../lib/firebase'

import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

import { auth } from '../lib/firebase';

const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const signin = async () => {
        // Conexão com o GithubProvider
        try{
            console.log("Loading 1 : " + loading);
            setLoading(true);
            console.log("Loading 2 : " + loading);
            return await signInWithPopup(auth, provider).then(async (result) => {
            setUser(result.user);
            console.log(user);
            console.log("Loading 3 : " + loading);
            });
        } finally {
            setLoading(false);
            console.log("Loading 4 : " + loading);
        }
    }
    
    const signout = () => {
        setUser(null);
        console.log(user);
        Router.push('/');       
    }

    return <AuthContext.Provider value={{
        user,
        loading,
        signin,
        signout
    }}> { children } </AuthContext.Provider>
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext