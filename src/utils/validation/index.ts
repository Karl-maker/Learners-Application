export interface IValidation {
    is_valid: boolean;
}

export function isValidEmail(email: string): IValidation {
    // Regular expression for validating an email address
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    return {
        is_valid: emailRegex.test(email)
    };
}