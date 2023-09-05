import { ErrorObject } from "ajv";

export interface ValidationResponse {
    isValid: boolean;
    errors: any[];
}