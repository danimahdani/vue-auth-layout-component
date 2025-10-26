<template>
  <Card class="w-96">
      <template #title>My Account</template>
      <template #content>
        <div class="flex justify-between">
          <span>userame</span>
          <span>{{ localStoageData.username }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <span>Last Login</span>
          <span>{{ localStoageData.loggedInAt }}</span>
        </div>
        <div class="w-full mt-5  text-right">
          <Button label="Logout" severity="danger" @click="handleLogout" />
        </div>
      </template>
    </Card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["logout"]);

const localStoageData = localStorage.getItem('userData') != null ? JSON.parse(localStorage.getItem('userData') as string) : null;

const handleLogout = () => emit('logout');

</script>

<style>

</style>