import { createContext, useContext, useEffect, useState } from "react";
const authContext = createContext();
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ContextProvider = function ({ children }) {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    };
    useEffect(() =>{
           const verifyUser = async () =>{
            try {
                const res = await axios.get("http://localhost:5000/api/auth/verify")
                if(res.data.success){
                    setUser(res.data.user)
                }else{
                    setUser(null)
                }
            } catch (error) {
                console.log(error)
            }
           }
           verifyUser();
    })
    return (
        <authContext.Provider value={{ user, login }}>
            {children}
        </authContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(authContext);
export default ContextProvider;