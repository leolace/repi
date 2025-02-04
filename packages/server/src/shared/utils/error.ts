export class AppError extends Error {
  statusCode = 500;
  message: string = "Something went wrong";

  constructor(
    message: string = "Something went wrong",
    statusCode: number = 500,
  ) {
    super(message);
    this.statusCode = statusCode;
  }

  static NotFoundException(message?: string) {
    return new AppError(message, 404);
  }

  static UnauthorizedException(message?: string) {
    return new AppError(message, 401);
  }

  static BadRequestException(message?: string) {
    return new AppError(message, 400);
  }

  static ForbiddenException(message?: string) {
    return new AppError(message, 403);
  }

  static ConflictException(message?: string) {
    return new AppError(message, 409);
  }
}
