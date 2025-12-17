<template>
  <div class="criar-solicitacao">
    <h1>Criar Solicitação de Nota Fiscal</h1>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>CNPJ do Tomador</label>
        <input v-model="form.cnpjTomador" type="text" required />
      </div>

      <div class="form-group">
        <label>Município da Prestação</label>
        <input v-model="form.municipioPrestacao" type="text" required />
      </div>

      <div class="form-group">
        <label>Estado da Prestação</label>
        <input v-model="form.estadoPrestacao" type="text" required maxlength="2" />
      </div>

      <div class="form-group">
        <label>Valor do Serviço</label>
        <input 
          v-model="valorFormatado" 
          @input="handleValorInput"
          type="text" 
          placeholder="R$ 0,00"
          required 
        />
      </div>

      <div class="form-group">
        <label>Data Desejada de Emissão</label>
        <input v-model="form.dataDesejadaEmissao" type="date" required />
      </div>

      <div class="form-group">
        <label>Descrição do Serviço</label>
        <textarea v-model="form.descricaoServico" required rows="4"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
          {{ store.loading ? 'Criando...' : 'Criar Solicitação' }}
        </button>
        <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
      </div>

      <div v-if="store.error" class="error">{{ store.error }}</div>
      <div v-if="success" class="success">Solicitação criada com sucesso!</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotaFiscalStore } from '../store/notaFiscalStore';
import { formatCurrencyInput, parseCurrency } from '../../infrastructure/utils/currencyMask';

const store = useNotaFiscalStore();
const router = useRouter();
const success = ref(false);

const form = ref({
  cnpjTomador: '',
  municipioPrestacao: '',
  estadoPrestacao: '',
  valorServico: 0,
  dataDesejadaEmissao: '',
  descricaoServico: ''
});

const valorFormatado = ref('');

const handleValorInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) {
    valorFormatado.value = '';
    form.value.valorServico = 0;
    return;
  }
  
  valorFormatado.value = formatCurrencyInput(numbers);
  form.value.valorServico = parseCurrency(valorFormatado.value);
};

const handleSubmit = async () => {
  try {
    success.value = false;
    const dataISO = new Date(form.value.dataDesejadaEmissao).toISOString();
    await store.criar({
      ...form.value,
      dataDesejadaEmissao: dataISO
    });
    success.value = true;
    setTimeout(() => {
      router.push('/listar');
    }, 1500);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.criar-solicitacao {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #2c3e50;
}

input,
textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #359268;
}

.btn-primary:disabled {
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

.error {
  padding: 1rem;
  background: #e74c3c;
  color: white;
  border-radius: 4px;
}

.success {
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border-radius: 4px;
}
</style>

