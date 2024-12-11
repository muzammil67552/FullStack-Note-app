import { createContext, useContext, useState } from "react";
const authContext = createContext();

// eslint-disable-next-line react/prop-types
const ContextProvider = function ({ children }) {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    };
    return (
        <authContext.Provider value={{ user, login }}>
            {children}
        </authContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(authContext);
export default ContextProvider;