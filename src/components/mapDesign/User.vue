<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from '../AppHeader'

  export default {
    name: 'user',
    components: { AppHeader }
  }
</script>
