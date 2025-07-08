import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const signUp = async ({name, email, password}) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                }
            }
        })

        if (error) {
            console.log("Error signing up:", error);
            return { success: false, error: error };
        }

        return { success: true, data: data };
    }

    const signIn = async ({email, password})=>{
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.log("Error signing in:", error);
                return { success: false, error: error.message };
            }
            console.log("Signed in successfully:", data);
            return { success: true, data: data };
        }catch(error){
            console.log("Error signing in:", error);
        }
    };


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, [])


    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUp, signOut, signIn }}>
            {children}
        </AuthContext.Provider>
    )
};
