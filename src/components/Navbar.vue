<template>
  <nav
      class="
      navbar navbar-light
      bg-white
      navbar-expand-lg
      border-bottom
      fixed-top
    "
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><strong>Vue</strong>Drive</a>
      <div id="search-form"></div>
      <div class="form-inline mt-2 mt-md-0">
        <template v-if="!loggedIn">
          <router-link :to="{ name: 'login'}" class="btn btn-outline-secondary color-danger me-2">Login</router-link>
          <router-link :to="{ name: 'register'}" href="#" class="btn btn-success me-2">Register</router-link>
        </template>
        <a href="#" @click.prevent="logout" v-else class="btn btn-outline-secondary color-danger">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { loggedIn, setUser, setToken } from "@/store"
import router from "@/router";

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })

  const logout = () => {
    setToken(null)
    setUser(null)
    router.push({ name: 'login' })
  }

</script>