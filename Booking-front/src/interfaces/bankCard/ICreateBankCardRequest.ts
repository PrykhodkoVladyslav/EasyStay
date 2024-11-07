export default interface ICreateBankCardRequest {
    number: string;
    expirationDate: string;
    cvv: string;
    ownerFullName: string;
}