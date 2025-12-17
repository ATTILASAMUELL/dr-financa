import { BuscarSolicitacao } from './BuscarSolicitacao';
import { InMemoryNotaFiscalRepository } from '../../infrastructure/repositories/InMemoryNotaFiscalRepository';
import { StatusNotaFiscal } from '../entities/NotaFiscal';
import { v4 as uuidv4 } from 'uuid';

describe('BuscarSolicitacao', () => {
  it('deve buscar uma solicitação por id', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const useCase = new BuscarSolicitacao(repository);

    const id = uuidv4();
    await repository.create({
      id,
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

    const result = await useCase.execute(id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(id);
  });

  it('deve retornar null quando solicitação não existe', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const useCase = new BuscarSolicitacao(repository);

    const result = await useCase.execute('id-inexistente');

    expect(result).toBeNull();
  });
});

