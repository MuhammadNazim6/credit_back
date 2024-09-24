
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateFields = (body: any, requiredFields: string[]): ValidationResult => {
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        isValid: false,
        message: `${field} is required`,
      };
    }
  }
  return { isValid: true };
};