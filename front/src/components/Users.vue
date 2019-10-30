<template>
    <v-container fluid class="grey lighten-4"> 
        <v-layout row wrap>
        <v-toolbar flat color="white">
            <v-subheader>
            <h2>{{pageName}}</h2>
            </v-subheader>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
            <v-btn slot="activator" color="primary" dark class="mb-2">Новый владелец</v-btn>
            <v-card>
                <v-card-title> 
                <span class="headline">{{ pageName }}</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs2>
                        <v-text-field v-model="editedItem.id" label="Id" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs10>
                        <v-text-field v-model="editedItem.uName" label="ФИО"></v-text-field>
                    </v-flex>
                    
                    <v-flex xs6>
                        <v-text-field v-model="editedItem.uLogin" label="Логин"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field v-model="editedItem.uPassword" label="Пароль если введёт, будет перезаписан" type="password"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-combobox v-model="editedItem.permition" :items="userPermitions" item-value="id" item-text="role" label="Привелегии"></v-combobox>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="editedItem.email" label="yours@mail.ru" :rules="[rules.email]"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-combobox v-model="editedItem.departs" :items="allDeparts" item-value="id" item-text="dName" label="Подразделения"></v-combobox>
                    </v-flex>
                    <v-flex xs12>
                        <v-switch v-model="editedItem.active" label="Активность"></v-switch>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Выход</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-toolbar>

        <v-flex xs12>
            <v-data-table :headers="headers" :items="allUsers" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.uName }}</td>
                <td class="text-xs-center">{{ props.item.permition.role }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.departs.dName }}</td>
                <td class="text-xs-center">{{ act[props.item.active]}}</td>
                <td class="justify-center layout px-0"><v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon></td>
            </template>
            </v-data-table>
        </v-flex>
        </v-layout>    
    </v-container>
</template>

<script>

import {mapState} from 'vuex'
import {MAC_OWNERS_REQUEST, SET_USER} from '../store/users.js'
import {DEPARTS_LOAD} from '../store/departs.js'

export default {
    name: 'users-table',
    data () {
        return {
        headers: [ 
            { text: 'Id',         value: 'id' ,     align: 'c', sortable: false},
            { text: 'ФИО',        value: 'uName',   align: 'c', sortable: false},
            { text: 'Привелегии', value: 'permitionId',align: 'c', sortable: false},
            { text: 'eMail'     , value: 'email',  align: 'c', sortable: false},
            { text: 'Подразделение', value: 'departId',  align: 'c', sortable: false},
            { text: 'Активность', value: 'active',  align: 'c', sortable: false},
            { text: 'Операция',   value: 'oper',    align: 'c', sortable: false}
        ],
        pageName:'Владельцы устройств',
        editedIndex: -1,
        editedItem: {
            id: 0,
            uName: '',
            uLogin:'',
            uPassword:'',
            permitionId:0,
            permition:{id: 0, role: ''},
            departId:1,
            departs:{id: 1, dName: ''},
            email:'',
            active: 0
        },
        defaultItem: {
            id: 0,
            uName: '',
            uLogin:'',
            uPassword:'',
            permitionId:0,
            permition: {id: 0, role: ''},
            departId:1,
            departs:{id: 1, dName: ''},
            email:'',
            active: 0
        },
        dialog: false,
        act:['Нет', 'Да'],
        rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Не верный eMail.'
            }
        }  
        }    
    },
    computed: mapState({
        userPermitions: state => state.permitions.userPermitions,
        allDeparts: state => state.departs.Items,
        allUsers: state => {
        let permitions = state.permitions.userPermitions
        let departs = state.departs.Items
        let users =  state.users.macOwners
        let outU = users.map(item => {
            let roleFound = permitions.find(role => {
            if (role.id == item.permitionId){
                return item
            }
            })
            item.permition = roleFound ? roleFound : {id:0, role: null }

            let departFound = departs.find(depart => {
            if (depart.id == item.departId){
                return item
            }
            })
            item.departs = departFound ? departFound : {id:1, dName: null }

            return item
        })
        return outU
        }
    }),
    methods: {
        loadUsers () {
        this.$store.dispatch(MAC_OWNERS_REQUEST)
        },
        loadDeparts () {
        this.$store.dispatch(DEPARTS_LOAD)
        },
        editItem (item) {
        this.editedIndex = this.allUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.uPassword = null
        this.dialog = true
        },
        close () {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        }, 300)
        },
        save () {
        this.editedItem.active = this.editedItem.active ? 1 : 0
        this.editedItem.permitionId = this.editedItem.permition ? this.editedItem.permition.id : 0
        this.editedItem.departId = this.editedItem.departs ? this.editedItem.departs.id : 0
        if (this.editedIndex > -1) {
            Object.assign(this.allUsers[this.editedIndex], this.editedItem)
        } 
        this.$store.dispatch(SET_USER, [this.editedItem , this.editedIndex])
        this.close()
        }
    },
    mounted () {
        this.loadDeparts()
        this.loadUsers()
    }
}  
</script>

<style scoped>
  #page-name {
    margin-left: 5px;
  }

</style>