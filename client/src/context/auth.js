import { createContext, useReducer } from "react";

const AuthContext = createContext({
    user: null,
    login: (data) => {},
    logout: (data) => {}
})

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer,{user:null});

    const login = (userData) => {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }
    const logout = (userData) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
    return (
        <AuthContext.Provider value={{user:state,login,logout}} {...props}/>
    )
}

export {AuthContext,AuthProvider}