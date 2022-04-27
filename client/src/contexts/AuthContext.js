import { createContext, useReducer, useEffect } from "react"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant"
import { authReducer } from "../reducers/authReducer"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    //Check Authenticated 
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }
            console.log(response.data.user)
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    // useEffect(() => loadUser(), [])
    useEffect(() => {
        async function fetchData() {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            }

            try {
                const response = await axios.get(`${apiUrl}/auth`)
                if (response.data.success) {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: { isAuthenticated: true, user: response.data.user }
                    })
                }
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: false, user: null }
                })
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    //Login
    const loginUser = async userForm => {
        try {

            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }
    const registerUser = async userForm => {
        try {
            var response
            if (userForm.mode === '0') {
                response = await axios.post(`${apiUrl}/auth/jobseeker/register`, userForm)
                console.log(response.data)

            } else {
                response = await axios.post(`${apiUrl}/auth/employer/register`, userForm)
            }
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })
    }
    const authContextData = { loginUser, registerUser, logoutUser, authState }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider
