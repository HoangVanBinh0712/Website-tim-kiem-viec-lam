export const userReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoading: false,

            }
        default:
            return state
    }
}