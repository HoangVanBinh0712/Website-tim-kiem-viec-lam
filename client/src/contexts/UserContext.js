import { createContext, useContext, useReducer, useState } from 'react'
import { apiUrl } from './constant'
import axios from 'axios'
import { userReducer } from '../reducers/userReducer'

export const UserContext = createContext()
//state
const UserContextProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false)

    //Change pass word

    const changePassword = async newModal =>{
        try{
            const response = await axios.put(`${apiUrl}/info/changepassword`,newModal)
            if(response.data.success)
            {

            }
            return response.data
        }catch(error)
        {
            console.log("Error: " + error)
        }
    }

    const UserContextData = {
        setShowModal,
        showModal,
        changePassword
    }
    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider