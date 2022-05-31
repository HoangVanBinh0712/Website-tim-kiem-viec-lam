export const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'POSTS_PAGING_LOADED_SUCCESS':
            return {
                ...state,
                allPosts: payload.posts,
                postsLoading: false,
                max_page: payload.max_page
            }
        case 'POSTS_LOADED_FAIL':
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        case 'POSTS_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case 'FIND_POST':
            return {
                ...state,
                post: payload,
                postsLoading: false
            }
        case 'UPDATE_POST':
            const newPosts = state.posts.map(post => {
                if (post._id === payload._id) return payload
                return post
            })
            return {
                ...state,
                posts: newPosts
            }
        case 'DELETE_MARKED_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.postId._id !== payload)
            }
        case "PAGING_POSTS":
            return {
                ...state,
                page: payload,
                posts: state.allPosts.slice(6 * (payload - 1), 6 * (payload - 1) + 6)
            }
        default:
            return state
    }
}