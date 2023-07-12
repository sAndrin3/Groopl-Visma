import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = () => {
        //to do
        setCurrentUser({ id: 1, name: "Malanga", profilePic: "https://images.pexels.com/photos/1582720/pexels-photo-1582720.jpeg?auto=compress&cs=tinysrgb&w=400" })
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        // login()
    }, [currentUser]);
    // 
    useEffect(() => login(), [])
    // 
    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}