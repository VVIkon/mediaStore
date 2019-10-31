<template>
    <!-- <v-container fluid>
        <v-treeview
        v-model="tree"
        :open="open"
        :items="items"
        activatable
        item-key="name"
        open-on-click
    >
        <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
            {{ files[item.file] }}
        </v-icon>
        </template>
    </v-treeview>
  </v-container> -->

  <v-card height="850px">
    <v-navigation-drawer
      absolute
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" @click=''>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
// export default {
//     data: () => ({
//       open: ['public'],
//       files: {
//         html: 'mdi-language-html5',
//         js: 'mdi-nodejs',
//         json: 'mdi-json',
//         md: 'mdi-markdown',
//         pdf: 'mdi-file-pdf',
//         png: 'mdi-file-image',
//         txt: 'mdi-file-document-outline',
//         xls: 'mdi-file-excel',
//       },
//       tree: [],
//       items: [
//         {
//           name: '.git',
//         },
//         {
//           name: 'node_modules',
//         },
//         {
//           name: 'public',
//           children: [
//             {
//               name: 'static',
//               children: [{
//                 name: 'logo.png',
//                 file: 'png',
//               }],
//             },
//             {
//               name: 'favicon.ico',
//               file: 'png',
//             },
//             {
//               name: 'index.html',
//               file: 'html',
//             },
//           ],
//         },
//         {
//           name: '.gitignore',
//           file: 'txt',
//         },
//         {
//           name: 'babel.config.js',
//           file: 'js',
//         },
//         {
//           name: 'package.json',
//           file: 'json',
//         },
//         {
//           name: 'README.md',
//           file: 'md',
//         },
//         {
//           name: 'vue.config.js',
//           file: 'js',
//         },
//         {
//           name: 'yarn.lock',
//           file: 'txt',
//         },
//       ],
//     }),
//   }

 export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
      }
    },
  }
</script>>


<style scoped>
.navigator-card {
    margin-top: 300px;
}
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
