export type ServiceMessage = { message: string};

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

type ServiceResponseSucessType = 'SUCCESSFUL' | 'CREATE';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage  
}

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSucessType,
  data: T | ServiceMessage
}

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
