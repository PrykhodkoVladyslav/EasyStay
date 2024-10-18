import IGuestInfo from "interfaces/guestInfo/IGuestInfo.ts";
import IBedInfo from "interfaces/bedInfo/IBedInfo.ts";

export default interface IRoomVariant {
    id: number;
    price: number;
    discountPrice?: number;
    roomId: number;
    guestInfo: IGuestInfo;
    bedInfo: IBedInfo;
}