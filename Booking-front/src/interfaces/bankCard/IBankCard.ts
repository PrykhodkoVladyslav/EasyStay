export default interface IBankCard {
    id: number;
    number: string;
    expirationDate: Date;
    cvv: string;
    ownerFullName: string;
}
