export class SupabaseError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public details?: string,
    public hint?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'SupabaseError';
  }
}
