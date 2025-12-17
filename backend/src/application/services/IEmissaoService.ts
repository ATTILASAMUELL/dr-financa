export interface EmissaoInput {
  cnpjTomador: string;
  municipioPrestacao: string;
  estadoPrestacao: string;
  valorServico: number;
  dataDesejadaEmissao: string;
  descricaoServico: string;
}

export interface EmissaoOutput {
  numeroNF: string;
  dataEmissao: string;
}

export interface IEmissaoService {
  emitir(input: EmissaoInput): Promise<EmissaoOutput>;
}

