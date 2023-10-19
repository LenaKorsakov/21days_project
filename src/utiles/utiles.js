import { StatusCodes } from 'http-status-codes';

const statusErrors = new Set([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]);

export const shouldDisplayError = (response) =>
  statusErrors.has(response.status);
