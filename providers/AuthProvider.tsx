import React from 'react';
import { supabase } from '@/utils/supabase';
import { router, useRouter } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const AuthContext = React.createContext({
    user: null,
    signIn: async (email: string, password: string) => { },
    signOut: async () => { },
    signUp: async (username: String, email: string, password: string) => { },
    likes: [],
    getLikes: async (id: string) => { },
    followings: [],
    getFollowings: async (id: string) => { },
    followers: [],
    getFollowers: async (id: string) => { },
    friends: [],
    getFriends: async () => { }
})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState(null);
    const router = useRouter();
    const [likes, setLikes] = React.useState([]);
    const [followings, setFollowings] = React.useState([]);
    const [followers, setFollowers] = React.useState([]);
    const [friends, setFriends] = React.useState<string[]>([]);

    const getFriends = async () => {
        const followingIds = followings.map((f) => f.follower_user_id);
        const followersIds = followers.map((f) => f.user_id);
        const duplicates = followingIds.filter((id) => followersIds.includes(id));
        setFriends(duplicates);
        console.log("Duplicates", duplicates)

    }
    React.useEffect(() => {


        getFriends();

    }, [followings, followers]);
    const getUser = async (id: string) => {
        const { data, error } = await supabase.from('User').select('*').eq('id', id).single();
        if (error) {
            return console.log(error)
        }
        setUser(data);
        console.log(data)
        router.push('/(tabs)');
    }
    const getLikes = async (id: string) => {
        const { data, error } = await supabase.from('Like').select('*').eq('user_id', id);
        if (error) {
            return console.log(error)
        }
        setLikes(data);
        console.log(data)
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
    const getFollowers = async (id: string) => {
        const { data, error } = await supabase.from('Follower').select('*, User(*)').eq('follower_user_id', id);
        if (error) {
            return console.log(error)
        }
        setFollowers(data);
        console.log(data)
    }
    const getFollowings = async (id: string) => {
        const { data, error } = await supabase.from('Follower').select('*').eq('user_id', id);
        if (error) {
            return console.log(error)
        }
        setFollowings(data);
        console.log(data)
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

    React.useEffect(() => {
        const { data: authData } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                router.push('/(auth)');
            } else {
                setUser(session.user ?? null);
            }
        });

        return () => {

            authData.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{
        user, signIn, signOut, signUp, likes, getLikes,
        followings, getFollowings, followers, getFollowers, friends, getFriends
    }}>{children}</AuthContext.Provider>

}
export const useAuth = () => React.useContext(AuthContext) 
