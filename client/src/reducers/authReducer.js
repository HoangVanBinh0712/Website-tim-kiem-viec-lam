export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, profile,profiles } } = action
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
        case 'PROFILE_LOAD_SUCCESS':
            return {
                ...state,
                profile: profile,
                profileLoading: false,
            }
        case 'PROFILES_LOAD_SUCCESS':
            return {
                ...state,
                profiles: profiles,
                profileLoading: false,
            }
        default:
            return state
    }
}