import axios from "axios"
import ForgetPassword from "../../Pages/ForgetPassword/ForgetPassword.page"

export const forgetPasswordInitiate = () => ({
    type: "FORGET_PASSWORD_INITIATE"
})

export const forgetPasswordSuccess = (message) => ({
    type: "FORGET_PASSWORD_SUCCESS",
    payload: message
})

export const forgetPasswordFail = (message) => ({
    type: "FORGET_PASSWORD_FAIL",
    payload: message
})

export const forgetPasswordRemoveData = () => {
    return (dispatch) => {
        dispatch({
            type: "FORGET_PASSWORD_REMOVE_DATA"
        })
    }
}

export const resetPasswordRemoveData = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_PASSWORD_REMOVE_DATA"
        })
    }
}

export const resetPasswordApiCall = (password, resetToken) => {
    return (dispatch) => {
        dispatch(forgetPasswordInitiate())
        axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/resetPassword`, { password }, {
            headers: {
                "Accept": "application/json",
                "Content-Tyoe": "application/json",
                "Authorization": `Bearer ${resetToken}`
            }
        }).then((res) => {
            dispatch(forgetPasswordSuccess(res.data.message))
        }).catch((err) => {
            dispatch(forgetPasswordFail(err.response.data.message))
        })
    }
}

export const forgetPasswordApiCall = (email) => {
    return (dispatch) => {
        dispatch(forgetPasswordInitiate())
        axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/forgetPassword`, { email }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((res) => {
            dispatch(forgetPasswordSuccess(res.data.message))
        }).catch((err) => {
            dispatch(forgetPasswordFail(err.response.data.message))
        })
    }
}