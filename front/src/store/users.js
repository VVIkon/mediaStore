import axios from 'axios'
import authStore from './auth'

import { AUTH_LOGOUT, AUTH_SUCCESS } from './auth'

export const MAC_OWNERS_REQUEST = 'MAC_OWNERS_REQUEST'
export const BOSS_REQUEST = 'BOSS_REQUEST'
export const SET_USER = 'SET_USER'
export const USER_REQUEST = 'USER_REQUEST'
export const SET_SUBORD = 'SET_SUBORD'

const MAC_OWNERS_APPLAY = 'MAC_OWNERS_APPLAY'
const ADD_OWNER = 'ADD_OWNER'
const APPLAY_USER = 'APPLAY_USER'
const BOSS_APPLAY = 'BOSS_APPLAY'
const ADD_BOSS = 'ADD_BOSS'
export const LOGOUT_USER = 'LOGOUT_USER'


const state = {
    //  все кто имеют МАС 
    macOwners: [
        // {id: 1, uName: 'Неопределён', departId:0},
    ],
    // Пользователь под котором залогинился пользователь
    masterUser: {
        // {id: 0, uName: '', uLogin: '',uPassword: '', permitionId: 0, tokenExpare: 0, departId:0, departs: [], active: 0}
    },
    // Список руководителей системы
    bossList: [
        // {id: 0, uName: '', uLogin: '',uPassword: '', permitionId: 0, tokenExpare: 0, departId:0, active: 0}
    ]
}

const getters = {
    isTokenLegal: state => {
        let now = new Date().getTime()
        return state.masterUser.tokenExpare > now
    },
    userPermitions: state => { return state.masterUser.permitionId },
    masterUserDeparts: state => { return state.masterUser }

}

const actions = {
    /**
     * Загрузка владельцев МАС-адресов
     * @param {*} param0 
     */
    [MAC_OWNERS_REQUEST]: ({ commit }) => {
        axios.get('/api/get-users')
            .then(r => {
                if (r.data.success) {
                    commit(MAC_OWNERS_APPLAY, r.data.result)
                } else {
                    console.log('Ошибка.user.010: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.log('Ошибка.user.011: ' + r)
            })
    },
    /**
     * Загрузка руководителей
     * @param {*} param0 
     */
    [BOSS_REQUEST]: ({ commit }) => {
        axios.get('/api/get-boss')
            .then(r => {
                // console.log(BOSS_REQUEST)
                if (r.data.success) {
                    commit(BOSS_APPLAY, r.data.result)
                } else {
                    console.log('Ошибка.user.010: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.log('Ошибка.user.011: ' + r)
            })
    },
    /**
     * Сохранение правил соподчинения
     */
    [SET_SUBORD]: ({ commit }, item) => {
        axios.post('/api/set-subordination', item[0])
            .then(r => {
                if (r.data.success) {
                    commit(ADD_BOSS, [r.data.result, item[1]])
                } else {
                    console.log('Ошибка.user.020: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.log('Ошибка.user.021: ' + r)
            })
    },
    /**
     * Сохранение владельцев МАС-адресов
     * @param {*} param0 
     */
    // saveUser({ commit }, item){
    [SET_USER]: ({ commit }, item) => {
        axios.post('/api/set-user', item[0])
            .then(r => {
                if (r.data.success) {
                    commit(ADD_OWNER, [r.data.result, item[1]])
                } else {
                    console.log('Ошибка.user.020: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.log('Ошибка.user.021: ' + r)
            })
    },
    // Запрос user по id
    [USER_REQUEST]: ({ commit, dispatch }) => {
        if (authStore.getters.isAuthenticated) {
            // console.log(`USER_REQUEST.Params: ${JSON.stringify(authStore.state, '', 4)}`)
            axios.post('/api/get-user', { uToken: authStore.state.token })
                .then(r => {
                    if (r.data.success) {
                        // console.log(`USER_REQUEST: ${JSON.stringify(r.data, '', 4)}`)
                        commit(APPLAY_USER, r.data.result.user)
                        commit(AUTH_SUCCESS, authStore.state.token)
                    } else {
                        console.log('Ошибка.user.030: ' + r.data.errorMessage)
                        dispatch(AUTH_LOGOUT)
                    }
                })
                .catch(r => {
                    console.log('Ошибка.user.031: ' + r)
                })
        }
    }
}

const mutations = {
    /**
     * Добавление в stor данных по MAC-адресам системы
     * @param {*} state 
     * @param {*} payload 
     */
    [MAC_OWNERS_APPLAY]: (state, payload) => {
        let owners = JSON.parse(payload)
        for (const owner of owners) {
            owner.uPassword = null // убираю пароль для отображения. Пароль будет перезаписан, если будет введён! ==> [SET_USER]
        }
        state.macOwners = owners
    },
    /**
     * Добавление в stor данных по руководителям системы и правилам соподчинения
     * @param {*} state 
     * @param {*} payload 
     */
    [BOSS_APPLAY]: (state, payload) => {
        let bosss = JSON.parse(payload)
        let outBosss = bosss.map(boss => {
            let subordArr = (boss.subordinations.length == 0) ? [] : JSON.parse(boss.subordinations[0].departs)
            let subords = subordArr.map(subord => {
                return { id: subord, dName: '' }
            })
            const _id = boss.subordinations.length > 0 ? boss.subordinations[0].id : 0
            const _active = boss.subordinations.length > 0 ? boss.subordinations[0].active : 0
            return { id: boss.id, subordinationId: _id, uName: boss.uName, active: _active, subordinations: subords, departs: subordArr }
        })
        state.bossList = outBosss
    },
    /**
     * Добавление нового к руководителю правила соподчинения
     * @param {*} state 
     * @param {*} payload 
     */
    [ADD_BOSS]: () => {
        // let ret = payload[0]
        // if (payload[1] == -1) {
        //     state.bossList.push(ret)
        //}
    },
    /**
     * Добавление нового МАС-адреса
     * @param {*} state 
     * @param {*} payload 
     */
    [ADD_OWNER]: (state, payload) => {
        let ret = payload[0]
        ret.uPassword = null // убираю пароль для отображения. Пароль будет перезаписан, если будет введён! ==> [SET_USER]
        if (payload[1] == -1) {
            state.macOwners.push(ret)
        }
    },
    [APPLAY_USER]: (state, payload) => {
        // console.log('applayUser: ' + JSON.stringify(payload, '', 4))
        state.masterUser = payload
        state.masterUser.uPassword = null // убираю пароль для отображения. Пароль будет перезаписан, если будет введён! ==> [SET_USER]
        if (state.masterUser.subordinations.length > 0) {
            state.masterUser.departs = JSON.parse(state.masterUser.subordinations[0].departs).sort()
            delete(state.masterUser.subordinations)
        } else {
            state.masterUser.departs = []
        }
    },
    [LOGOUT_USER]: (state) => {
        state.masterUser = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}