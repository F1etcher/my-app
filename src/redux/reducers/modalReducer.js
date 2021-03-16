export const SET_OPEN = 'SET_OPEN'
export const SET_ONE_PAGE ='SET_ONE_PAGE'

const initialState = {
    modal: false,
    pageModal: null

}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPEN:
            return {
                ...state, modal: action.open
            }
        case SET_ONE_PAGE:
            return {
                ...state, pageModal: action.info
            }
        default:
            return state
    }
}

export const setOpen = (open) => ({type: SET_OPEN, open})
export const setPage = (info) => ({type: SET_ONE_PAGE, info})

export default modalReducer