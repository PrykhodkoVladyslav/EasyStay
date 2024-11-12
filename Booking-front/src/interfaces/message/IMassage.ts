export default interface IMassage {
    id: number;
    text: string;
    createdAtUtc: Date;
    updatedAtUtc?: Date;
    chatId: number;
    authorId: number;
}
