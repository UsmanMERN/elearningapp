import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = { isAuthtenticated: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return Object.assign({}, { isAuthtenticated: true, user: payload })
        case "LOGOUT":
            return Object.assign({}, { isAuthtenticated: false })
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { useAuthContext }