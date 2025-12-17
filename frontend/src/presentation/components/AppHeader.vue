<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        Dr. Finanças
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/criar" class="nav-link">Criar</router-link>
        <router-link to="/listar" class="nav-link">Listar</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  background: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b983;
}
</style>

