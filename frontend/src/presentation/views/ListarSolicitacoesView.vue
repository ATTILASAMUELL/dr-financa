<template>
  <div class="listar-solicitacoes">
    <h1>Solicitações de Notas Fiscais</h1>
    
    <div v-if="store.loading" class="loading">Carregando...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    
    <div v-else class="solicitacoes-list">
      <div v-if="store.notasFiscais.length === 0" class="empty">
        Nenhuma solicitação encontrada.
      </div>
      
      <div v-for="nf in store.notasFiscais" :key="nf.id" class="solicitacao-card">
        <div class="card-header">
          <h3>{{ nf.descricaoServico }}</h3>
          <span :class="['status', nf.status]">{{ nf.status }}</span>
        </div>
        
        <div class="card-body">
          <p><strong>CNPJ:</strong> {{ nf.cnpjTomador }}</p>
          <p><strong>Valor:</strong> R$ {{ nf.valorServico.toFixed(2) }}</p>
          <p><strong>Local:</strong> {{ nf.municipioPrestacao }} - {{ nf.estadoPrestacao }}</p>
          <p v-if="nf.numeroNF"><strong>Número NF:</strong> {{ nf.numeroNF }}</p>
        </div>
        
        <div class="card-actions">
          <router-link :to="`/solicitacao/${nf.id}`" class="btn btn-info">
            Ver Detalhes
          </router-link>
        </div>
      </div>
    </div>
    
    <div class="actions">
      <router-link to="/" class="btn btn-secondary">Voltar</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNotaFiscalStore } from '../store/notaFiscalStore';

const store = useNotaFiscalStore();

onMounted(() => {
  store.listar();
});
</script>

<style scoped>
.listar-solicitacoes {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.loading,
.error,
.empty {
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.loading {
  background: #ecf0f1;
}

.error {
  background: #e74c3c;
  color: white;
}

.empty {
  background: #ecf0f1;
}

.solicitacoes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.solicitacao-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  gap: 1rem;
}

h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  white-space: nowrap;
}

.status.PENDENTE_EMISSAO {
  background: #f39c12;
  color: white;
}

.status.EMITIDA {
  background: #2ecc71;
  color: white;
}

.status.CANCELADA {
  background: #e74c3c;
  color: white;
}

.card-body p {
  margin: 0.5rem 0;
  color: #555;
}

.card-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.actions {
  text-align: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}

.btn-info {
  background: #3498db;
  color: white;
}

.btn-info:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>

