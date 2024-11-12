export default interface IMessage {
    id: number;
    text: string;
    createdAtUtc: Date;
    updatedAtUtc?: Date;
    chatId: number;
    authorId: number;
}
