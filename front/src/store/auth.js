import axios from 'axios'
import {
    USER_REQUEST,
    LOGOUT_USER
} from './users'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'


const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
}

const getters = {
    isAuthenticated: state => !!state.token,
    getAuthToken: state => state.token,
    authStatus: state => state.status,
}

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, registration) => {
        if (!registration.username || !registration.password) {
            // console.log('registration: '+JSON.stringify(registration, '', 4))
            commit(AUTH_ERROR, )
            localStorage.removeItem('user-token')
            return false
        }
        return new Promise((resolve, reject) => {
            commit(AUTH_LOADING)
            axios.post('/api/user-login', registration)
                .then(r => {
                    // console.log('AUTH_LOADING: ' + JSON.stringify(r.data, '', 4))
                    const token = r.data.result.token
                    localStorage.setItem('user-token', token)
                    axios.defaults.headers.common.Authorization = token
                    commit(AUTH_SUCCESS, token)
                    console.log(`AUTH_LOADING.riedLocalStorageToken: ${localStorage.getItem('user-token')}`)
                    dispatch(USER_REQUEST)
                    resolve(r)
                })
                .catch(err => {
                    console.error(`AUTH_LOADING: ${JSON.stringify(err)}`)
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    },

    [AUTH_LOGOUT]: ({
        commit
    }) => {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common.Authorization
            commit(LOGOUT_USER)
            resolve()
        })
    }
}

const mutations = {
    [AUTH_LOADING]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, tkn) => {
        state.status = 'success'
        state.token = tkn
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
        state.status = 'logout'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}