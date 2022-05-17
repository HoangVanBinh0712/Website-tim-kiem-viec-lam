import { createContext, useContext, useReducer, useState } from 'react'
import { apiUrl } from './constant'
import axios from 'axios'
export const UserContext = createContext()
//state
const UserContextProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false)
    const [isMarked, setIsMarked] = useState(false)
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
            const response = await axios.get(`${apiUrl}/markPost/${postId}`)
            setIsMarked(response.data.success)
        } catch (error) {
            setIsMarked(false)
        }

    }
    const UserContextData = {
        setShowModal,
        showModal,
        changePassword,
        markPost,
        isUserMarkedPost,
        isMarked,
        setIsMarked
    }
    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider