import { createContext, useState } from 'react'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
export const UserContext = createContext()
//state
const UserContextProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false)
    const [isMarked, setIsMarked] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    //Change pass word

    const changePassword = async newModal => {
        try {
            const response = await axios.put(`${apiUrl}/info/changepassword`, newModal)
            if (response.data.success) {

            }
            return response.data
        } catch (error) {
            console.log("Error: " + error)
        }
    }
    const markPost = async postId => {
        try {
            const response = await axios.post(`${apiUrl}/markPost/${postId}`)
            if (response.data.success) {
                return (response.data)
            }
        } catch (error) {
            return error
        }
    }

    const isUserMarkedPost = async (postId) => {
        //userMarkPost
        try {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            }
            const response = await axios.get(`${apiUrl}/markPost/${postId}`)
            setIsMarked(response.data.success)
        } catch (error) {
            console.log(error)
            setIsMarked(false)
        }

    }
    const applyJob = async (postId) => {
        try {
            const response = await axios.put(`${apiUrl}/submitted/${postId}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const isSubmittedPost = async (postId) => {
        try {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            }
            const response = await axios.get(`${apiUrl}/submitted/${postId}`)
            setIsSubmitted(response.data.result)
        } catch (error) {
            console.log(error)
            setIsSubmitted(false)
        }
    }
    const UserContextData = {
        setShowModal,
        showModal,
        changePassword,
        markPost,
        isUserMarkedPost,
        isMarked,
        setIsMarked,
        applyJob,
        isSubmittedPost,
        isSubmitted,
        setIsSubmitted
    }
    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider