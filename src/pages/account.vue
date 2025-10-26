<template>
  <div class="h-screen grid place-items-center">
    <MyAccount @logout="handleLogout" />
  </div>
</template>

<route lang="yaml">
meta:
  title: "Account"
  layout: protected
</route>

<script lang="ts" setup>
import MyAccount from '@/components/MyAccount.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('authenticated');
  localStorage.removeItem('userData');
  router.push('/');
};
</script>

<style>

</style>