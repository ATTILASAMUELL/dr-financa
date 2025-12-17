import { CriarSolicitacaoNotaFiscal } from './CriarSolicitacaoNotaFiscal';
import { InMemoryNotaFiscalRepository } from '../../infrastructure/repositories/InMemoryNotaFiscalRepository';
import { StatusNotaFiscal } from '../entities/NotaFiscal';

describe('CriarSolicitacaoNotaFiscal', () => {
  it('deve criar uma solicitação com status PENDENTE_EMISSAO', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const useCase = new CriarSolicitacaoNotaFiscal(repository);

    const input = {
      cnpjTomador: '12345678901234',
      municipioPrestacao: 'São Paulo',
      estadoPrestacao: 'SP',
      valorServico: 1000,
      dataDesejadaEmissao: '2024-01-01T00:00:00.000Z',
      descricaoServico: 'Serviço de consultoria'
    };

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.cnpjTomador).toBe(input.cnpjTomador);
    expect(result.status).toBe(StatusNotaFiscal.PENDENTE_EMISSAO);
    expect(result.dataCriacao).toBeDefined();
    expect(result.dataAtualizacao).toBeDefined();
  });
});

