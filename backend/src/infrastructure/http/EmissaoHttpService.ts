import axios, { AxiosError } from 'axios';
import { IEmissaoService, EmissaoInput, EmissaoOutput } from '../../application/services/IEmissaoService';
import { ExternalServiceError, ValidationError, UnauthorizedError } from '../../application/errors/AppError';

export class EmissaoHttpService implements IEmissaoService {
  private readonly apiUrl = process.env.EMISSAO_API_URL || 'https://api.drfinancas.com/testes/notas-fiscais';
  private readonly authToken = process.env.EMISSAO_AUTH_TOKEN || '87451e7c-48bc-48d1-a038-c16783dd404c';

  async emitir(input: EmissaoInput): Promise<EmissaoOutput> {
    try {
      const response = await axios.post(this.apiUrl, input, {
        headers: {
          'Authorization': this.authToken,
          'Content-Type': 'application/json'
        }
      });

      return {
        numeroNF: response.data.numeroNF,
        dataEmissao: response.data.dataEmissao
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 400:
              throw new ValidationError('Dados inválidos para emissão. Verifique os campos e tente novamente.');
            case 401:
              throw new UnauthorizedError('Falha na autenticação com o serviço de emissão. Contate o suporte.');
            case 500:
              throw new ExternalServiceError('O serviço de emissão está temporariamente indisponível. Tente novamente em alguns instantes.');
            default:
              throw new ExternalServiceError(`Erro ao comunicar com o serviço de emissão (código ${axiosError.response.status}). Tente novamente.`);
          }
        }
        
        if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ENOTFOUND') {
          throw new ExternalServiceError('Não foi possível conectar ao serviço de emissão. Verifique sua conexão.');
        }
        
        if (axiosError.code === 'ETIMEDOUT') {
          throw new ExternalServiceError('O serviço de emissão demorou muito para responder. Tente novamente.');
        }
      }
      
      throw new ExternalServiceError('Erro inesperado ao emitir nota fiscal. Tente novamente.');
    }
  }
}

