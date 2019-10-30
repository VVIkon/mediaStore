<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="login"    label="Логин"  type="text"></v-text-field>
                  <v-text-field v-model="password" prepend-icon="lock"   name="password" label="Пароль" type="password" @keyup.enter="login"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"  @click.native="login">Вход</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-snackbar v-model="snackbar" :color="color" :multi-line="mode === 'multi-line'" :timeout="timeout" :vertical="mode === 'vertical'" :bottom='true' :right='true' >
      {{ text }}
      <v-btn dark flat @click="snackbar = false" > Закрыть </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import {AUTH_REQUEST} from '../store/auth.js'

export default {
  props: {
    source: String
  },
  data: () => ({
    // drawer: null,
    username: '',
    password: '',
    
    snackbar: false,
    color: 'error',
    mode: 'vertical',
    timeout: 3000,
    text: ''
    

  }),
  methods: {
    login() {
      const { username, password } = this
      this.$store.dispatch( AUTH_REQUEST , { username, password }).then((res) => {
        // console.log('res: '+ JSON.stringify(res,'', 4))
        if (res && res.data.success){
          this.$eventHub.$emit('menu-drawer', true)
          this.$router.push('/')
        }else if (res && !res.data.success){
          this.text = res.data.errorMessage
          this.snackbar = true
          this.$eventHub.$emit('menu-drawer', false)
        }
      })
    }
  }
}
</script>