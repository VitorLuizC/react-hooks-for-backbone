class ObjectAsyncMethodError extends Error {
  constructor(name: string, cause: unknown) {
    const message = `"${name}" failed without an error object as cause.`;

    super(message, { cause });

    this.name = 'ObjectAsyncMethodError';
    this.cause = cause;
    this.stack = super.stack;
    this.message = message;
  }
}

export default ObjectAsyncMethodError;
