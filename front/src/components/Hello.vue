<template>
  <div id="hello">
    <h4>{{pageName}}</h4>  
    <h4>{{ msg }}</h4>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Cтраница находится в разработке',
      pageName: 'Тест'
    }
  }
}
</script>

<style scoped>
  #id,h4{
    text-align: center;
    margin-top: 55px;
  }
</style>