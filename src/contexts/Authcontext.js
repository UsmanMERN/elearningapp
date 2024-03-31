import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = { isAuthenticated: false, user: {}, points: 0, userEnrolledCourse: [] }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return { ...state, isAuthenticated: true, user: payload };
        case "LOGOUT":
            return { ...state, isAuthenticated: false };
        case "ADD_POINTS":
            return { ...state, points: payload };
        case "CHECK_ENROLLED_COURSE":
            let updatedEnrolledCourses;
            if (Array.isArray(payload)) {
                updatedEnrolledCourses = [...state.userEnrolledCourse, ...payload];
            } else {
                updatedEnrolledCourses = [...state.userEnrolledCourse, payload];
            }
            return { ...state, userEnrolledCourse: updatedEnrolledCourses };
        default:
            return state;
    }
};

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