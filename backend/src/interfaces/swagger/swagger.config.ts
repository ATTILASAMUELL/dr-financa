import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dr. Finanças - API de Gestão de Notas Fiscais',
    version: '1.0.0',
    description: 'API REST para gestão de solicitações de Notas Fiscais',
    contact: {
      name: 'Dr. Finanças'
    }
  },
  servers: [
    {
      url: 'http://localhost:3002',
      description: 'Servidor de desenvolvimento'
    }
  ],
  tags: [
    {
      name: 'Solicitações',
      description: 'Endpoints para gestão de solicitações de Notas Fiscais'
    }
  ],
  components: {
    schemas: {
      NotaFiscal: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Identificador único da solicitação'
          },
          cnpjTomador: {
            type: 'string',
            description: 'CNPJ do tomador do serviço'
          },
          municipioPrestacao: {
            type: 'string',
            description: 'Município da prestação do serviço'
          },
          estadoPrestacao: {
            type: 'string',
            description: 'Estado da prestação do serviço',
            maxLength: 2
          },
          valorServico: {
            type: 'number',
            description: 'Valor do serviço'
          },
          dataDesejadaEmissao: {
            type: 'string',
            format: 'date-time',
            description: 'Data desejada de emissão (ISO 8601)'
          },
          descricaoServico: {
            type: 'string',
            description: 'Descrição do serviço'
          },
          status: {
            type: 'string',
            enum: ['PENDENTE_EMISSAO', 'EMITIDA', 'CANCELADA'],
            description: 'Status da solicitação'
          },
          dataCriacao: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação da solicitação'
          },
          dataAtualizacao: {
            type: 'string',
            format: 'date-time',
            description: 'Data da última atualização'
          },
          numeroNF: {
            type: 'string',
            description: 'Número da Nota Fiscal (apenas quando emitida)'
          },
          dataEmissao: {
            type: 'string',
            format: 'date-time',
            description: 'Data de emissão da Nota Fiscal (apenas quando emitida)'
          }
        }
      },
      CriarSolicitacaoRequest: {
        type: 'object',
        required: ['cnpjTomador', 'municipioPrestacao', 'estadoPrestacao', 'valorServico', 'dataDesejadaEmissao', 'descricaoServico'],
        properties: {
          cnpjTomador: {
            type: 'string',
            example: '12345678901234'
          },
          municipioPrestacao: {
            type: 'string',
            example: 'São Paulo'
          },
          estadoPrestacao: {
            type: 'string',
            maxLength: 2,
            example: 'SP'
          },
          valorServico: {
            type: 'number',
            example: 1000.50
          },
          dataDesejadaEmissao: {
            type: 'string',
            format: 'date-time',
            example: '2024-12-31T00:00:00.000Z'
          },
          descricaoServico: {
            type: 'string',
            example: 'Serviço de consultoria'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensagem de erro'
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/interfaces/routes/*.ts', './src/interfaces/controllers/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);

