import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constant'
import axios from 'axios'

export const PostContext = createContext()
//state
const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
        allPosts: [],
        page: 1,
        max_page: 1
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    const adminGetPosts = async status => {
        try {
            const response = await axios.get(`${apiUrl}/post/admin/${status}`)
            if (response.data.success) {
                var du = response.data.post.length % 6
                var nguyen = parseInt(response.data.post.length / 6)
                if (du !== 0) nguyen++
                dispatch({ type: "POSTS_PAGING_LOADED_SUCCESS", payload: { posts: response.data.post, max_page: nguyen } })
                dispatch({ type: "PAGING_POSTS", payload: 1 })
            }
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }

    const adminPutPost = async (status, post_id) => {
        try {
            const response = await axios.put(`${apiUrl}/post/${status}/${post_id}`)
            if (response.data.success) {
                dispatch({ type: "UPDATE_POST", payload: response.data.post })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }
    const getMarkedPosts = async () => {
        //listPost
        try {
            const response = await axios.get(`${apiUrl}/markPost/all`);
            if (response.data.success) {
                dispatch({ type: "POSTS_LOADED_SUCCESS", payload: response.data.listPost })
            }
            return response.data
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }

        }
    }

    const deleteMarkPost = async postId => {
        try {
            const response = await axios.post(`${apiUrl}/markPost/${postId}`)
            if (response.data.success) {
                dispatch({ type: "DELETE_MARKED_POST", payload: postId })
            }
            return (response.data)

        } catch (error) {
            return error
        }
    }
    const pageingPost = async (currentPage) => {
        //Get string after ? in url
        dispatch({ type: "PAGING_POSTS", payload: currentPage })
    }
    const getPosts = async (showEmployerPost) => {
        try {
            if (showEmployerPost) {
                const response = await axios.get(`${apiUrl}/post/EmpPost`);
                if (response.data.success) {
                    dispatch({ type: "POSTS_LOADED_SUCCESS", payload: response.data.post })
                }
                return response.data
            }
            const response = await axios.get(`${apiUrl}/post`)
            if (response.data.success) {
                //Tinh max page
                var du = response.data.post.length % 6
                var nguyen = parseInt(response.data.post.length / 6)
                if (du !== 0) nguyen++
                dispatch({ type: "POSTS_PAGING_LOADED_SUCCESS", payload: { posts: response.data.post, max_page: nguyen } })
                dispatch({ type: "PAGING_POSTS", payload: 1 })
            }
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }
    //Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/post`, newPost)
            if (response.data.success) {
                dispatch({ type: "ADD_POST", payload: response.data.post })
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
            const response = await axios.delete(`${apiUrl}/post/${postId}`)
            if (response.data.success) {
                dispatch({ type: "DELETE_POST", payload: postId })
                setShowToast({ show: true, message: response.data.message, type: response.data.success ? 'success' : 'danger' })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const findPostById = async postId => {
        try {
            const response = await axios.get(`${apiUrl}/postDetail/${postId}`)
            if (response.data.success) {
                dispatch({ type: "FIND_POST", payload: response.data.post })
            }
            return response.data.post
        } catch (error) {
            console.log(error)
            return error
        }

    }

    //findPost when user is Updating Post
    const findPost = postId => {
        console.log(postState.posts)
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: "FIND_POST", payload: post })
    }

    //Update
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/post/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({ type: "UPDATE_POST", payload: response.data.post })
                return response.data
            }
        } catch (error) {
            console.log(error)

        }
    }
    const getEmpPosts = async () => {
    }
    const getSearchPosts = async (formSearch) => {
        try {
            const response = await axios.post(`${apiUrl}/post/search`, formSearch)
            if (response.data.success) {
                var du = response.data.post.length % 6
                var nguyen = parseInt(response.data.post.length / 6)
                if (du !== 0) nguyen++
                dispatch({ type: "POSTS_PAGING_LOADED_SUCCESS", payload: { posts: response.data.post, max_page: nguyen } })
                dispatch({ type: "PAGING_POSTS", payload: 1 })
            }
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
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
        findPost,
        findPostById,
        getEmpPosts,
        adminGetPosts,
        adminPutPost,
        getMarkedPosts,
        deleteMarkPost,
        getSearchPosts,
        pageingPost
    }
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider


