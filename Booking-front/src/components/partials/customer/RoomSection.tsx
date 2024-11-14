import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import RoomCard from "components/partials/customer/RoomCard.tsx";

interface IRoomSectionProps {
    rooms: IRoom[];
    freePeriod: IFreePeriod;
    hotelBreakfast: boolean;
    selectedDays: number;
    hotelId: number;
}

const RoomSection = (props: IRoomSectionProps) => {
    const { rooms, freePeriod, hotelBreakfast, selectedDays, hotelId } = props;

    return (
        <table className="room-table">
            <thead>
            <tr>
                <th>Тип номера</th>
                <th>Кількість гостей</th>
                <th>Тип ліжка</th>
                <th>Додаткова інформація</th>
                <th>Ціна</th>
                <th>Оберіть варіанти</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {rooms.map((room, index) => (
                <RoomCard key={index} room={room} freePeriod={freePeriod} hotelBreakfast={hotelBreakfast} selectedDays={selectedDays} hotelId={hotelId} />
            ))}
            </tbody>
        </table>
    );
};

export default RoomSection;
