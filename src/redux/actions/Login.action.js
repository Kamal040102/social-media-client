import axios from "axios";
import jwt from "jwt-decode"

const SERVER_URI = "https://social-media-server-z33y.onrender.com/api/v1"

export const loginIntialize = () => ({
    type: "LOGIN_INITIALIZATION"
})

export const loginSuccess = (token) => ({
    type: "LOGIN_SUCCESS",
    payload: token
})

export const loginFail = (err) => ({
    type: "LOGIN_FAIL",
    payload: err
})

export const convertLoginToken = (data) => ({
    type: "CONVERT_LOGIN_TOKEN",
    payload: data
})

export const resetLoginData = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_LOGIN_DATA"
        })
    }
}

export const loginApiCall = (body) => {
    return (dispatch) => {
        dispatch(loginIntialize());
        axios.post(`${SERVER_URI}/auth/login`, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            dispatch(loginSuccess(res.data.message))
            const data = jwt(res.data.message)
            dispatch(convertLoginToken(data))

        }).catch((err) => {
            dispatch(loginFail(err.message))
        })
    }
}