<template>
    <v-app>
        <v-navigation-drawer
            temporary
            :mini-variant='miniVariant'
            :clipped='clipped'
            v-model='drawer'
            app
        >
        <!-- <v-navigation-drawer persistent :mini-variant='miniVariant' :clipped='clipped' v-model='drawer' enable-resize-watcher fixed app> -->
        <!-- <v-list dense class='grey lighten-4'>
            <template v-for='item in items'>
            <v-layout v-if='item.heading' :key='item.heading' row align-center>
                <v-flex xs6>
                <v-subheader v-if='item.heading'>{{ item.heading }}</v-subheader>
                </v-flex>
            </v-layout>

            <v-list-group
                v-else-if='item.children && item.permition <= masterUser.permitionId'
                v-model='item.model'
                :key='item.text'
                :prepend-icon="item.model ? item.icon : item['icon-alt']"
                append-icon
            >
                <v-list-tile slot='activator'>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-for='(child, i) in item.children' :key='i' :to='child.to'>
                <v-list-tile-action v-if='child.icon'>
                    <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key='item.text' :to='item.to'>
                <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </template>
        </v-list> -->
        </v-navigation-drawer>

        <!-- <v-toolbar app :clipped-left='clipped'>
        <v-toolbar-side-icon @click.stop='drawer = !drawer'></v-toolbar-side-icon>
        <v-toolbar-title v-text='title'></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class='hidden-sm-and-down'>
            <span class='grey--text master-user-name'>{{masterUser.uName ? masterUser.uName : ''}}</span>
            <v-btn v-if='this.$store.getters.isAuthenticated' flat @click.stop='userLogout'>
            <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>
        </v-toolbar> -->

        <v-content>
        <router-view/>
        </v-content>

        <v-footer :fixed='fixed' app>
        <span>&copy; {{currMonth+' - '+currYear+': '+ver}}</span>
        </v-footer>
    </v-app>
</template>

<script>
import { USER_REQUEST } from './store/users.js'
import { AUTH_LOGOUT } from './store/auth.js'
import { mapState } from 'vuex'

export default {
    name: 'App',
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: true,
            items: [
                // {icon: 'picture_in_picture_alt', text: 'ИнтерПлан', to: { path: 'level-plan' }},
                // {icon: 'gesture','icon-alt': 'gesture',text: 'Аналитика',model: false, permition: 0,
                //     children: [
                //         {icon: 'how_to_reg',text: 'Отчет о перемещении объекта',to: { path: 'rep-mac-moving' }},
                //         {icon: 'map',text: 'Тепловая карта',to: { path: 'rep-thermal-map' }}
                //     ]
                // },
                // {icon: 'save_alt', 'icon-alt': 'save_alt', text: 'Данные', model: false, permition: 0,
                //     children: [
                //         {icon: 'storage',text: 'Размещение устройств',to: { path: 'mac-pool' }}
                //     ]
                // },
                // {icon: 'settings','icon-alt': 'settings',text: 'Справочники', model: false,permition: 2,
                //     children: [
                //         {icon: 'library_add',text: 'Входной буфер',to: { path: 'buffer', params: { pageName: 'Это буфер' } }},
                //         {icon: 'wifi_tethering',text: 'Точки сканирования',to: { path: 'all-routers' }},
                //         {icon: 'memory',text: 'Контролируемые устройства',to: { path: 'all-macs' }},
                //         {icon: 'location_city',text: 'Помещения',to: { path: 'all-rooms' }},
                //         {icon: 'texture',text: 'Зоны',to: { path: 'all-zones' }},
                //         {icon: 'store_mall_directory',text: 'Подразделения',to: { path: 'departs' }},
                //         {icon: 'perm_identity',text: 'Владельцы устройства',to: { path: 'all-users' } },
                //         {icon: 'device_hub',text: 'Соподчинение',to: { path: 'subordination' }}
                //     ]
                // },
                // {icon: 'settings_applications','icon-alt': 'settings_applications',text: 'Настройки',model: false,permition: 2,
                //     children: [
                //     ]
                // }
            ],
            right: false,
            rightDrawer: false,
            miniVariant: false,
            title: 'Медиа хранилище',
            currMonth: new Date().getMonth()+1,
            currYear: new Date().getFullYear(),
            ver: 'ver. 0.0.01'
        }
    },
    created() {
        // Объявление слушателя menu-drawer
        this.$eventHub.$on('menu-drawer', this.menuDrawer)

        // if (this.$store.getters.isAuthenticated) {
        //     this.$store.dispatch(USER_REQUEST).then(() => this.$router.push('/'))
        // } else {
        //     this.$router.push('/login')
        // }
    },
    methods: {
        // userLogout() {
        //     this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
        // },
        // menuDrawer(mode) {
        //     return (this.drawer = mode)
        // }
    },
    computed: mapState({
        // masterUser: state => state.users.masterUser
    })
}
</script>

<style scoped>
.master-user-name {
  margin-top: 21px
}
</style>
