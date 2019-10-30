import axios from 'axios'

export const ZONES_LOAD = 'ZONES_LOAD'
export const ZONE_SAVE = 'ZONE_SAVE'

export const ZONES_PUT = 'ZONES_PUT'
export const ZONE_ADD = 'ZONE_ADD'

const state = {
    Items: [
        // {id:1, zName: 'Зона 1', svgD:'qwegfaewqew', workbox:[0,0,0,0],
    ]
}

const getters = {}

const actions = {
    /**
     * Загрузка зон
     * @param {*} param0 
     */
    [ZONES_LOAD]: ({ commit }) => {
        axios.get('/api/get-zones')
            .then(r => {
                if (r.data.success) {
                    commit(ZONES_PUT, r.data.result)
                } else {
                    console.error('Ошибка загрузки 7001: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.error('Ошибка загрузки 7002: ' + r)
            })
    },
    /**
     * Сохранение зоны
     * @param {*} param0 
     */
    // saveRoom({ commit }, item){
    [ZONE_SAVE]: ({ commit }, item) => {
        item[0].workBox = JSON.stringify(item[0].workBox)
        axios.post('/api/set-zone', item[0])
            .then(r => {
                if (r.data.success) {
                    commit(ZONE_ADD, [r.data.result, item[1]])
                } else {
                    console.error('Ошибка загрузки 7021: ' + r.data.errorMessage)
                }
            })
            .catch(r => {
                console.error('Ошибка загрузки 7022: ' + r)
            })
    }
}

const mutations = {
    /**
     * Добавление в stor данных по MAC-адресам системы
     * @param {*} state 
     * @param {*} payload 
     */
    [ZONES_PUT]: (state, payload) => {
        let ret = JSON.parse(payload)
        state.Items = ret.map(el => {
            el.workBox = JSON.parse(el.workBox)
            return el
        })
    },
    /**
     * Добавление новой зоны
     * @param {*} state 
     * @param {*} payload 
     */
    [ZONE_ADD]: (state, payload) => {
        let ret = JSON.parse(payload[0].toString())
        if (payload[1] == -1) {
            ret.workBox = JSON.parse(ret.workBox)
            state.Items.push(ret)
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}