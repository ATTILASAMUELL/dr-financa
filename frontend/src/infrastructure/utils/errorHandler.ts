import axios, { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;
    
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data;
      const serverMessage = data?.error || data?.message;

      switch (status) {
        case 400:
          return {
            message: serverMessage || 'Dados inválidos. Verifique as informações e tente novamente.',
            code: 'BAD_REQUEST',
            statusCode: 400
          };
        case 401:
          return {
            message: serverMessage || 'Não autorizado. Faça login novamente.',
            code: 'UNAUTHORIZED',
            statusCode: 401
          };
        case 403:
          return {
            message: serverMessage || 'Acesso negado. Você não tem permissão para esta ação.',
            code: 'FORBIDDEN',
            statusCode: 403
          };
        case 404:
          return {
            message: serverMessage || 'Recurso não encontrado.',
            code: 'NOT_FOUND',
            statusCode: 404
          };
        case 409:
          return {
            message: serverMessage || 'Conflito. O recurso já existe ou está em uso.',
            code: 'CONFLICT',
            statusCode: 409
          };
        case 422:
          return {
            message: serverMessage || 'Dados inválidos. Verifique os campos preenchidos.',
            code: 'UNPROCESSABLE_ENTITY',
            statusCode: 422
          };
        case 500:
          return {
            message: serverMessage || 'Erro interno do servidor. Tente novamente mais tarde.',
            code: 'INTERNAL_SERVER_ERROR',
            statusCode: 500
          };
        case 502:
          return {
            message: 'Servidor temporariamente indisponível. Tente novamente.',
            code: 'BAD_GATEWAY',
            statusCode: 502
          };
        case 503:
          return {
            message: 'Serviço indisponível. Tente novamente mais tarde.',
            code: 'SERVICE_UNAVAILABLE',
            statusCode: 503
          };
        default:
          return {
            message: serverMessage || `Erro inesperado (código ${status}). Tente novamente.`,
            code: 'UNKNOWN_ERROR',
            statusCode: status
          };
      }
    }

    if (axiosError.request) {
      return {
        message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
        code: 'NETWORK_ERROR',
        statusCode: 0
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'CLIENT_ERROR',
      statusCode: 0
    };
  }

  return {
    message: 'Ocorreu um erro inesperado. Tente novamente.',
    code: 'UNKNOWN_ERROR',
    statusCode: 0
  };
}

export function getErrorMessage(error: unknown): string {
  return handleApiError(error).message;
}

