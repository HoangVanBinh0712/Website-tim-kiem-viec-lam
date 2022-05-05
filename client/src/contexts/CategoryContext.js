import { createContext, useContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constant'

import axios from 'axios'
import { categoryReducer } from '../reducers/categoryReducer'
export const CategoryContext = createContext()


const CategoryContextProvider = ({ children }) => {


    const [categoryState, dispatch] = useReducer(categoryReducer, {
        categories: [],
        categoryLoading: true
    })

    
    const getCategory = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/category`)
            if (response.data.success) {
                dispatch({ type: "CATEGORY_LOADED_SUCCESS", payload: response.data.category})
            }
        } catch (error) {
            dispatch({ type: "CATEGORY_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }
    const CategoryContextData = {
        getCategory,
        categoryState
    }
    return (
        <CategoryContext.Provider value={CategoryContextData}>
            {children}
        </CategoryContext.Provider>
    )
}
export default CategoryContextProvider

