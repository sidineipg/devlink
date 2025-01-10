import {  ReactNode, useEffect, useState } from 'react'
import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface PrivateProps {
    children: ReactNode
}



export function Private({children}: PrivateProps): any {

    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {   

        const unsub = onAuthStateChanged(auth, user => {
            if(user) {
                const userData={
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem('@reaclinks', JSON.stringify(userData))
                setLoading(false);
                setSignedIn(true);
            }else{
                setLoading(false);
                setSignedIn(false);
            }
        })

        return () => {
            unsub();
        }


    }, [])


    if(loading){
        return <div></div>
    }

    if(!signedIn){
        return <Navigate to="/login" />
    }


    return children;
}