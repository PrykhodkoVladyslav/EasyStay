import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import RoomCard from "components/partials/customer/RoomCard.tsx";

interface IRoomSectionProps {
    hotelId: number;
    hotelBreakfast: boolean;
    freePeriod: IFreePeriod;
    selectedDays: number;
    rooms: IRoom[];
}

const RoomSection = (props: IRoomSectionProps) => {
    const { rooms, freePeriod, hotelBreakfast, selectedDays } = props;

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
                <RoomCard key={index} room={room} freePeriod={freePeriod} hotelBreakfast={hotelBreakfast} selectedDays={selectedDays} />
            ))}
            </tbody>
        </table>
    );
};

export default RoomSection;
