import React from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const AuthContext = React.createContext({
    user: null,
    signIn: async (email: string, password: string) => { },
    signOut: async () => { },
    signUp: async (username: String, email: string, password: string) => { }
})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState(null);
    const router = useRouter();

    const getUser = async (id: string) => {
        const { data, error } = await supabase.from('User').select('*').eq('id', id).single();
        if (error) {
            return console.log(error)
        }
        setUser(data);
        console.log(data)
        router.push('/(tabs)');
    }
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        console.log(data)
        if (error) {
            return console.log(error)
        }
        getUser(data?.user?.id)


    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            return console.log(error)
        }
        setUser(null);
        router.push('/(auth)');
    }
    const signUp = async (username: String, email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        console.log(data)
        if (error) {
            return console.log(error)
        }
        const { error: errorUser } = await supabase.from('User').insert([{
            id: data?.user?.id, email: email, username: username
        }])
        if (errorUser) {
            return console.log(errorUser)
        }
        setUser(data);
        getUser(data?.user?.id)

        router.push('/(tabs)');
    }
    return <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>{children}</AuthContext.Provider>

}
export const useAuth = () => React.useContext(AuthContext) 
