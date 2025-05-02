import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';

type SuccessStatusCodes = 200 | 201 | 202 | 204;

interface ErrorResponse {
  status: HttpStatus;
  description: string;
}

interface SwaggerDecoratorOptions<T> {
  summary: string;
  status: SuccessStatusCodes;
  description: string;
  type?: Type<T> | Type<T>[];
  errors?: ErrorResponse[];
  mergeErrors?: boolean;
}

export function Swagger<T>(options: SwaggerDecoratorOptions<T>) {
  const { summary, status, description, type, errors, mergeErrors } = options;
  const errorResponses = mergeErrorsWithDefaults(errors || [], mergeErrors);

  const decorators = [
    ApiOperation({ summary }),
    ApiResponse({
      status,
      description,
      ...(Array.isArray(type)
        ? { schema: { oneOf: type.map((t) => ({ $ref: getSchemaPath(t) })) } }
        : { type }),
    }),
    ...errorResponses.map((err) =>
      ApiResponse({
        status: err.status,
        description: err.description,
      }),
    ),
  ];

  return applyDecorators(...decorators);
}

function mergeErrorsWithDefaults(
  customErrors: ErrorResponse[],
  mergeErrors: boolean | undefined,
): ErrorResponse[] {
  const defaultErrors = [
    {
      status: HttpStatus.BAD_REQUEST,
      description:
        'Client specified an invalid argument, request body or query param',
    },
    {
      status: HttpStatus.UNAUTHORIZED,
      description: 'Client not authenticated',
    },
    {
      status: HttpStatus.FORBIDDEN,
      description:
        'Client does not have sufficient permissions to perform this action',
    },
    {
      status: HttpStatus.NOT_FOUND,
      description: 'A specified resource is not found',
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error',
    },
    {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      description: 'Service unavailable',
    },
  ];

  if (!mergeErrors) {
    return customErrors || defaultErrors;
  }

  const errorMap = new Map(defaultErrors.map((error) => [error.status, error]));

  customErrors.forEach((error) => {
    errorMap.set(error.status, error);
  });

  return Array.from(errorMap.values());
}
