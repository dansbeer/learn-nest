import { ResponseDto } from 'src/models/dto';

export function setMetadataResponse<T>(
  startTime: number,
  data: T,
  status = 'success',
  code = 200,
): ResponseDto<T> {
  const duration = `${Date.now() - startTime}ms`;
  return new ResponseDto<T>(data, status, code, duration);
}
