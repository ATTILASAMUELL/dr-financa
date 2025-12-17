import { defineStore } from 'pinia';
import { ref } from 'vue';
import { NotaFiscal } from '../../domain/entities/NotaFiscal';
import { NotaFiscalHttpRepository } from '../../infrastructure/http/NotaFiscalHttpRepository';
import { CriarSolicitacaoUseCase } from '../../domain/usecases/CriarSolicitacaoUseCase';
import { ListarSolicitacoesUseCase } from '../../domain/usecases/ListarSolicitacoesUseCase';
import { BuscarSolicitacaoUseCase } from '../../domain/usecases/BuscarSolicitacaoUseCase';
import { EmitirNotaFiscalUseCase } from '../../domain/usecases/EmitirNotaFiscalUseCase';
import { CreateNotaFiscalDTO } from '../../domain/repositories/INotaFiscalRepository';

export const useNotaFiscalStore = defineStore('notaFiscal', () => {
  const repository = new NotaFiscalHttpRepository();
  
  const criarSolicitacaoUseCase = new CriarSolicitacaoUseCase(repository);
  const listarSolicitacoesUseCase = new ListarSolicitacoesUseCase(repository);
  const buscarSolicitacaoUseCase = new BuscarSolicitacaoUseCase(repository);
  const emitirNotaFiscalUseCase = new EmitirNotaFiscalUseCase(repository);

  const notasFiscais = ref<NotaFiscal[]>([]);
  const notaFiscalAtual = ref<NotaFiscal | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function criar(data: CreateNotaFiscalDTO) {
    try {
      loading.value = true;
      error.value = null;
      const notaFiscal = await criarSolicitacaoUseCase.execute(data);
      notasFiscais.value.push(notaFiscal);
      return notaFiscal;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function listar() {
    try {
      loading.value = true;
      error.value = null;
      notasFiscais.value = await listarSolicitacoesUseCase.execute();
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function buscar(id: string) {
    try {
      loading.value = true;
      error.value = null;
      notaFiscalAtual.value = await buscarSolicitacaoUseCase.execute(id);
      return notaFiscalAtual.value;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function emitir(id: string) {
    try {
      loading.value = true;
      error.value = null;
      const notaFiscal = await emitirNotaFiscalUseCase.execute(id);
      const index = notasFiscais.value.findIndex(nf => nf.id === id);
      if (index !== -1) {
        notasFiscais.value[index] = notaFiscal;
      }
      return notaFiscal;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    notasFiscais,
    notaFiscalAtual,
    loading,
    error,
    criar,
    listar,
    buscar,
    emitir
  };
});

