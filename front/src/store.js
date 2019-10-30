import Vue from 'vue'
import Vuex from 'vuex'
import auth from './store/auth'
import users from './store/users'
import mediaStore from './store/mediaStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        mediaStore,
    },
})