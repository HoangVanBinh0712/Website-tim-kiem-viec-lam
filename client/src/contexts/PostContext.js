import { createContext, useContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constant'
import axios from 'axios'

export const PostContext = createContext()
//state
const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`)
            if (response.data.success) {
                dispatch({ type: "POSTS_LOADED_SUCCESS", payload: response.data.post })
            }
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }
    //Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/category`, newPost)
            if (response.data.success) {
                dispatch({ type: "ADD_POST", payload: response.data.category })
                return response.data
            }

        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }
    //Delete
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/category/${postId}`)
            if (response.data.success) {
                dispatch({ type: "DELETE_POST", payload: postId })
            }
        } catch (error) {
            console.log(error)
        }
    }
    //findPost when user is Updating Post
    const findPost = postId =>{
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type: "FIND_POST",payload: post}  )
    }
    //Update
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/post/${updatedPost._id}`,updatedPost)
            if(response.data.success)
            {
                dispatch({ type: "UPDATE_POST", payload: response.data.post })
                return response.data
            }
        } catch (error) {
            console.log(error)

        }
    }
    //PostContext data

    const PostContextData = {
        getPosts,
        postState,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost, 
        showToast, 
        setShowToast, 
        deletePost,
        updatePost,
        findPost
    }
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider


