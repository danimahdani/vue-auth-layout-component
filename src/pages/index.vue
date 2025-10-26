<template>
  <div class="h-screen grid place-items-center">
    <Card class="w-96">
      <template #title>Login</template>
      <template #content>
        <LoginForm @login="handleLogin" />
      </template>
    </Card>
  </div>
</template>


<script lang="ts" setup>

import Card from 'primevue/card';
import LoginForm from '../components/LoginForm.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useDate } from '@composables/useDate';

const toast = useToast();
const router = useRouter();
const timeStamp = useDate()


  const handleLogin = async (form: { username: string; password: string }) => {

    if(form.username === 'client' && form.password === 'Password123') {
      const localStorageData = {
        username: form.username,
        loginTime: timeStamp.getTimeStampNow()
      }
      localStorage.setItem('userData', JSON.stringify(localStorageData));
      localStorage.setItem('authenticated', 'true');
      
      toast.add({
        severity: 'success',
        summary: 'Form submitted successfully!',
        detail: `Welcome, ${form.username}`,
        life: 3000
      })
      setInterval(() => {
        router.push('/account');
      }, 1500);
    } else {
      // Handle invalid credentials
      console.log('Invalid credentials');
    }
  }

</script>

<style>

</style>