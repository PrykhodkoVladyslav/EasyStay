import IChatUserInfo from "interfaces/chat/IChatUserInfo.ts";
import IMassage from "interfaces/message/IMassage.ts";

export default interface IChat {
    id: number;
    customerId: number;
    customer: IChatUserInfo;
    realtorId: number;
    realtor: IChatUserInfo;
    lastMassage?: IMassage;
}
