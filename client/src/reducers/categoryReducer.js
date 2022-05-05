export const categoryReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'CATEGORY_LOADED_SUCCESS':
            return {
                ...state,
                categories: payload,
                categoryLoading: false
            }
        case 'CATEGORY_LOADED_FAIL':
            return {
                ...state,
                categories: [],
                categoryLoading: false
            }
        default:
            return state
    }
}