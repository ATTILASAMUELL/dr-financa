import { ListarSolicitacoes } from './ListarSolicitacoes';
import { InMemoryNotaFiscalRepository } from '../../infrastructure/repositories/InMemoryNotaFiscalRepository';
import { StatusNotaFiscal } from '../entities/NotaFiscal';
import { v4 as uuidv4 } from 'uuid';

describe('ListarSolicitacoes', () => {
  it('deve listar todas as solicitações', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const useCase = new ListarSolicitacoes(repository);

    await repository.create({
      id: uuidv4(),
      cnpjTomador: '12345678901234',
      municipioPrestacao: 'São Paulo',
      estadoPrestacao: 'SP',
      valorServico: 1000,
      dataDesejadaEmissao: '2024-01-01T00:00:00.000Z',
      descricaoServico: 'Serviço 1',
      status: StatusNotaFiscal.PENDENTE_EMISSAO,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    });

    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0].cnpjTomador).toBe('12345678901234');
  });
});

