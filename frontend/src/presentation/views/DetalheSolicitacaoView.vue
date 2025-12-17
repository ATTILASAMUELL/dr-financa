<template>
  <div class="detalhe-solicitacao">
    <h1>Detalhes da Solicitação</h1>
    
    <div v-if="store.loading" class="loading">Carregando...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    
    <div v-else-if="store.notaFiscalAtual" class="detalhe-card">
      <div class="status-header">
        <h2>{{ store.notaFiscalAtual.descricaoServico }}</h2>
        <span :class="['status', store.notaFiscalAtual.status]">
          {{ store.notaFiscalAtual.status }}
        </span>
      </div>

      <div class="detalhe-grid">
        <div class="detalhe-item">
          <strong>ID:</strong>
          <span>{{ store.notaFiscalAtual.id }}</span>
        </div>

        <div class="detalhe-item">
          <strong>CNPJ do Tomador:</strong>
          <span>{{ store.notaFiscalAtual.cnpjTomador }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Município:</strong>
          <span>{{ store.notaFiscalAtual.municipioPrestacao }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Estado:</strong>
          <span>{{ store.notaFiscalAtual.estadoPrestacao }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Valor do Serviço:</strong>
          <span>R$ {{ store.notaFiscalAtual.valorServico.toFixed(2) }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Data Desejada de Emissão:</strong>
          <span>{{ formatDate(store.notaFiscalAtual.dataDesejadaEmissao) }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Data de Criação:</strong>
          <span>{{ formatDate(store.notaFiscalAtual.dataCriacao) }}</span>
        </div>

        <div class="detalhe-item">
          <strong>Última Atualização:</strong>
          <span>{{ formatDate(store.notaFiscalAtual.dataAtualizacao) }}</span>
        </div>

        <div v-if="store.notaFiscalAtual.numeroNF" class="detalhe-item">
          <strong>Número da NF:</strong>
          <span>{{ store.notaFiscalAtual.numeroNF }}</span>
        </div>

        <div v-if="store.notaFiscalAtual.dataEmissao" class="detalhe-item">
          <strong>Data de Emissão:</strong>
          <span>{{ formatDate(store.notaFiscalAtual.dataEmissao) }}</span>
        </div>
      </div>

      <div class="actions">
        <button 
          v-if="store.notaFiscalAtual.status === 'PENDENTE_EMISSAO'"
          @click="handleEmitir"
          class="btn btn-success"
          :disabled="emitindo"
        >
          {{ emitindo ? 'Emitindo...' : 'Emitir Nota Fiscal' }}
        </button>
        <router-link to="/listar" class="btn btn-secondary">Voltar</router-link>
      </div>

      <div v-if="emissaoError" class="error">{{ emissaoError }}</div>
      <div v-if="emissaoSuccess" class="success">Nota fiscal emitida com sucesso!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNotaFiscalStore } from '../store/notaFiscalStore';

const route = useRoute();
const store = useNotaFiscalStore();
const emitindo = ref(false);
const emissaoError = ref<string | null>(null);
const emissaoSuccess = ref(false);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
};

const handleEmitir = async () => {
  try {
    emitindo.value = true;
    emissaoError.value = null;
    emissaoSuccess.value = false;
    
    const id = route.params.id as string;
    await store.emitir(id);
    await store.buscar(id);
    
    emissaoSuccess.value = true;
  } catch (error) {
    emissaoError.value = (error as Error).message;
  } finally {
    emitindo.value = false;
  }
};

onMounted(() => {
  const id = route.params.id as string;
  store.buscar(id);
});
</script>

<style scoped>
.detalhe-solicitacao {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.loading {
  background: #ecf0f1;
}

.error {
  padding: 1rem;
  background: #e74c3c;
  color: white;
  border-radius: 4px;
  margin-top: 1rem;
}

.success {
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border-radius: 4px;
  margin-top: 1rem;
}

.detalhe-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

h2 {
  margin: 0;
  color: #2c3e50;
}

.status {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
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

.detalhe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detalhe-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detalhe-item strong {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.detalhe-item span {
  color: #2c3e50;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
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

.btn-success {
  background: #2ecc71;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #27ae60;
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>

