import axios from 'axios';
import { INotaFiscalRepository, CreateNotaFiscalDTO } from '../../domain/repositories/INotaFiscalRepository';
import { NotaFiscal } from '../../domain/entities/NotaFiscal';
import { handleApiError } from '../utils/errorHandler';

export class NotaFiscalHttpRepository implements INotaFiscalRepository {
  private readonly baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  async create(data: CreateNotaFiscalDTO): Promise<NotaFiscal> {
    try {
      const response = await axios.post(`${this.baseUrl}/solicitacoes`, data);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  }

  async findAll(): Promise<NotaFiscal[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/solicitacoes`);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  }

  async findById(id: string): Promise<NotaFiscal> {
    try {
      const response = await axios.get(`${this.baseUrl}/solicitacoes/${id}`);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  }

  async emitir(id: string): Promise<NotaFiscal> {
    try {
      const response = await axios.post(`${this.baseUrl}/solicitacoes/${id}/emitir`);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  }
}

