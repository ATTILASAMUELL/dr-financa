export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 400, code: string = 'APP_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Dados inválidos') {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'Erro no serviço externo') {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR');
  }
}

export class BusinessError extends AppError {
  constructor(message: string) {
    super(message, 422, 'BUSINESS_ERROR');
  }
}

