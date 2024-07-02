import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import firebase from "firebase/compat/app";

import { auth } from "@/firebaseConfig";
import Splash from "@/pages/status/Splash";

interface IAuthContext {
    user: firebase.User | null;
}

const initContext = {
    user: null,
};

const AuthContext = createContext<IAuthContext>(initContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        console.log(user);
    }, [user]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Splash /> : children}
        </AuthContext.Provider>
    );
};
