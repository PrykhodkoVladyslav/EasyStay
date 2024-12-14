import IGuestInfo from "interfaces/guestInfo/IGuestInfo.ts";
import IBedInfo from "interfaces/bedInfo/IBedInfo.ts";

export default interface IRoomVariantCreate {
    price: number;
    discountPrice?: number;
    roomId: number;
    guestInfo: IGuestInfo;
    bedInfo: IBedInfo;
}