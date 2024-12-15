import IGuestInfo from "interfaces/guestInfo/IGuestInfo.ts";
import IBedInfo from "interfaces/bedInfo/IBedInfo.ts";

export interface IRoomVariantUpdate {
    id: number;
    price: number;
    discountPrice?: number;
    guestInfo: IGuestInfo;
    bedInfo: IBedInfo;
}
