import axios from 'axios'
import {setUser} from "../reducers/userReducer";

export const registration = async ( name,
                                    email,
                                    password,
                                    
                                    number) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            name,
            email,
            password,
            
            number

        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data))
            console.log(response.data)
            console.log(response.data.accessToken)
            localStorage.setItem('token', response.data.accessToken)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.accessToken)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
