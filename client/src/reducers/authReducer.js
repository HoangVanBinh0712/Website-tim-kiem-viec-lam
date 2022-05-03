export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
            }
        case 'USER_UPDATED_SUCCESS':
            return {
                ...state,
                user,
                postsLoading: false,
            }
        default:
            return state
    }
}