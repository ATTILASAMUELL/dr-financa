export enum StatusNotaFiscal {
  PENDENTE_EMISSAO = 'PENDENTE_EMISSAO',
  EMITIDA = 'EMITIDA',
  CANCELADA = 'CANCELADA'
}

export interface NotaFiscal {
  id: string;
  cnpjTomador: string;
  municipioPrestacao: string;
  estadoPrestacao: string;
  valorServico: number;
  dataDesejadaEmissao: string;
  descricaoServico: string;
  status: StatusNotaFiscal;
  dataCriacao: string;
  dataAtualizacao: string;
  numeroNF?: string;
  dataEmissao?: string;
}

