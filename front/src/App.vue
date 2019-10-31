<template>
  <v-app>

     <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer>   -->

    <v-toolbar app >
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.smAndUp">
            <v-btn icon>
            <v-icon>mdi-export-variant</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
        </template>
      <!-- <v-toolbar-title v-text="resttime"></v-toolbar-title>
      <v-toolbar-items class="aaa">
        <span class="text">{{resttime}}</span>
        <v-text-field v-model="resttime" type="text"></v-text-field>
      </v-toolbar-items> -->
    </v-toolbar>
    
    <v-content style="padding: 0;">
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; {{currMonth}} - {{currYear}}: {{ver}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            right: false,
            rightDrawer: false,
            miniVariant: false,
            title: 'Медиа хранилище',
            currMonth: new Date().getMonth()+1,
            currYear: new Date().getFullYear(),
            ver: 'ver. 0.0.01'
        }
    },
    
}
</script>

<style scoped>
.master-user-name {
  margin-top: 21px
}
</style>
