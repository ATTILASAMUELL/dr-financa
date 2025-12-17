<template>
  <div class="home">
    <h1>Dr. Finanças - Gestão de Notas Fiscais</h1>
    <div class="actions">
      <router-link to="/criar" class="btn btn-primary">
        Criar Solicitação
      </router-link>
      <router-link to="/listar" class="btn btn-secondary">
        Listar Solicitações
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover {
  background: #359268;
}

.btn-secondary {
  background: #3498db;
  color: white;
}

.btn-secondary:hover {
  background: #2980b9;
}
</style>

