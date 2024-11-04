import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { IBookingBedSelection } from "pages/customer/BookingPage/BookingPage.tsx";

const BedInfoBlock = (props: { selectedBeds: IBookingBedSelection }) => {
    const { selectedBeds } = props;

    return <div className="bed-info-block">
        <p className="bed-info-title">Обраний тип ліжка</p>

        <div className="bed-infos">
            {selectedBeds.isSingleBed && <div className="bed-info">
                <p>односпальне ліжко</p>
                <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
            </div>}
            {selectedBeds.isDoubleBed && <div className="bed-info">
                <p>двоспальне ліжко</p>
                <img src={getPublicResourceUrl("icons/roomSvg/double-bed.svg")} alt="bed-icon" />
            </div>}
            {selectedBeds.isExtraBed && <div className="bed-info">
                <p>диван</p>
                <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
            </div>}
            {selectedBeds.isSofa && <div className="bed-info">
                <p>додаткове ліжко</p>
                <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
            </div>}
            {selectedBeds.isKingsizeBed && <div className="bed-info">
                <p>кінгсайз ліжко</p>
                <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
            </div>}
        </div>
    </div>;
};

export default BedInfoBlock;