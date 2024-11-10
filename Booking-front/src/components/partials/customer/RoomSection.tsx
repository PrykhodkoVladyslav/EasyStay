import { useState } from "react";
import IRoom, { IFreePeriod } from "interfaces/room/IRoom.ts";
import RoomCard from "components/partials/customer/RoomCard.tsx";

interface IRoomSectionProps {
    hotelId: number;
    hotelBreakfast: boolean;
    freePeriod: IFreePeriod;
    rooms: IRoom[];
}

const RoomSection = (props: IRoomSectionProps) => {
    const { hotelBreakfast, freePeriod, rooms } = props;

    const [selectedQuantities, setSelectedQuantities] = useState<{
        [roomId: number]: { [variantId: number]: number }
    }>({});

    const handleSelectChange = (roomId: number, variantId: number, selectedQuantity: number) => {
        setSelectedQuantities((prevSelectedQuantities) => {
            const roomSelections = prevSelectedQuantities[roomId] || {};
            return {
                ...prevSelectedQuantities,
                [roomId]: {
                    ...roomSelections,
                    [variantId]: selectedQuantity,
                },
            };
        });
    };

    const getRemainingQuantity = (roomId: number) => {
        const room = rooms.find((r) => r.id === roomId);
        if (!room || room.quantity == null) return 0;

        const selectedForRoom = selectedQuantities[roomId] || {};
        const usedQuantity = Object.values(selectedForRoom).reduce((sum, qty) => sum + qty, 0);

        return Math.max(room.quantity - usedQuantity, 0);
    };

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
                <RoomCard key={index} room={room} freePeriod={freePeriod} />
            ))}
            </tbody>
        </table>
    );
};

export default RoomSection;
