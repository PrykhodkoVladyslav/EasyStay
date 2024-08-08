import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import React, { useState, useEffect } from "react";
// import axios from "axios";

const AdminPanelPage: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [newHotel, setNewHotel] = useState<Hotel>({ id: 0, name: "", description: "" });
    const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

    const fetchHotels = async () => {
        try {
            const response = await axios.get<Hotel[]>(`${API_URL}/hotels`);
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHotel({
            ...newHotel,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateOrUpdateHotel = async () => {
        try {
            if (editingHotelId) {
                await axios.put(`${API_URL}/hotels/${editingHotelId}`, newHotel);
            } else {
                await axios.post(`${API_URL}/hotels`, newHotel);
            }
            setNewHotel({ id: 0, name: "", description: "" });
            setEditingHotelId(null);
            fetchHotels();
        } catch (error) {
            console.error("Error creating or updating hotel:", error);
        }
    };

    const handleEditHotel = (hotel: Hotel) => {
        setNewHotel(hotel);
        setEditingHotelId(hotel.id);
    };

    const handleDeleteHotel = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/hotels/${id}`);
            fetchHotels();
        } catch (error) {
            console.error("Error deleting hotel:", error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            <div>
                <h2>{editingHotelId ? "Edit Hotel" : "Create Hotel"}</h2>
                <Input
                    name="name"
                    value={newHotel.name}
                    onChange={handleInputChange}
                    placeholder="Hotel Name"
                />
                <Input
                    name="description"
                    value={newHotel.description}
                    onChange={handleInputChange}
                    placeholder="Hotel Description"
                />
                <Button onClick={handleCreateOrUpdateHotel}>
                    {editingHotelId ? "Update Hotel" : "Create Hotel"}
                </Button>
            </div>

            <div>
                <h2>Hotel List</h2>
                {hotels.map((hotel) => (
                    <div key={hotel.id}>
                        <p>{hotel.name}</p>
                        <p>{hotel.description}</p>
                        <Button onClick={() => handleEditHotel(hotel)}>Edit</Button>
                        <Button onClick={() => handleDeleteHotel(hotel.id)}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanelPage;
