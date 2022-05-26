import { useState, createContext, useReducer, useEffect } from "react"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant"
import { authReducer } from "../reducers/authReducer"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        profileLoading: true,
        profile: null,
        profiles: []
    })
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
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


    //
    const adjustUser = async updatedUser => {
        try {
            let type
            if (updatedUser.role === 0)
                type = "jobseeker"
            else if (updatedUser.role === 1)
                type = "employer"
            else type = "admin"
            const response = await axios.put(`${apiUrl}/info/${type}`, updatedUser)
            if (response.data.success) {
                dispatch({
                    type: "USER_UPDATED_SUCCESS",
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }
            return response.data

        } catch (error) {
            console.log("Error: " + error)
        }
    }

    const getProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/profile`)
            if (response.data.success) {
                dispatch({
                    type: "PROFILE_LOAD_SUCCESS",
                    payload: { profile: response.data.profile }
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const createProfile = async profile => {
        try {
            const response = await axios.post(`${apiUrl}/profile`, profile)
            if (response.data.success) {
                dispatch({
                    type: "PROFILE_LOAD_SUCCESS",
                    payload: { profile: response.data.profile }
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const updateProfile = async profile => {
        try {
            const response = await axios.put(`${apiUrl}/profile`, profile)
            if (response.data.success) {
                dispatch({
                    type: "PROFILE_LOAD_SUCCESS",
                    payload: { profile: response.data.profile }
                })
            }
            return response.data
        } catch (error) {
            console.log(error.message)
        }
    }
    const getProfileSubmitted = async postId => {
        try {
            const response = await axios.get(`${apiUrl}/submitted/post/${postId}`)
            if (response.data)
                dispatch({
                    type: "PROFILES_LOAD_SUCCESS",
                    payload: { profiles: response.data.profiles }
                })
        } catch (error) {

        }
    }
    const authContextData = {
        loginUser, registerUser,
        logoutUser, authState, adjustUser,
        showToast, setShowToast,
        getProfile, createProfile,
        updateProfile, getProfileSubmitted
    }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider
