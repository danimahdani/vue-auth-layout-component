<template>
  <div class="max-w-4xl mx-auto">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Button from 'primevue/button'

const isDark = ref(false)
</script>

<style>

</style>