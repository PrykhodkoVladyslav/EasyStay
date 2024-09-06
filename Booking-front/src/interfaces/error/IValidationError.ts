export default interface IValidationError {
    status: number;
    data: Array<{
        PropertyName: string;
        ErrorMessage: string;
    }>;
}
