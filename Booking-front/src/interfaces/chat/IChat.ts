import IChatUserInfo from "interfaces/chat/IChatUserInfo.ts";
import IMessage from "interfaces/message/IMessage.ts";

export default interface IChat {
    id: number;
    customerId: number;
    customer: IChatUserInfo;
    realtorId: number;
    realtor: IChatUserInfo;
    lastMassage?: IMessage;
}
