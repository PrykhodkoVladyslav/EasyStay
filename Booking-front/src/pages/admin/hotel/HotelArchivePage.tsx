import { useSelector } from "react-redux";
import { RootState } from "store";
import { getToken } from "store/slice/userSlice";
import { IconEdit, IconTrash, IconArchiveOff } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { API_URL } from "utils/getEnvData.ts";
import { useNavigate } from "react-router-dom";
import {
    useGetAllHotelsQuery,
    useGetRealtorHotelsPageQuery,
    useDeleteHotelMutation,
    useSetArchiveStatusHotelMutation,
} from "services/hotel.ts";
import showToast from "utils/toastShow.ts";

const ArchivedHotelsPage: React.FC = () => {
    const token = useSelector((state: RootState) => getToken(state));
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const role = payload ? payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
    const realtorId = payload ? payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;

    const { data: hotelsData, isLoading, error, refetch } = role === 'Admin'
        ? useGetAllHotelsQuery()
        : useGetRealtorHotelsPageQuery({ RealtorId: realtorId });

    const [deleteHotel] = useDeleteHotelMutation();
    const [setArchiveStatusHotel] = useSetArchiveStatusHotelMutation();
    const navigate = useNavigate();

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити цей готель?")) {
            try {
                await deleteHotel(id).unwrap();
                showToast("Готель видалено", "success");
                refetch();
            } catch (err) {
                alert("Не вдалося видалити готель");
            }
        }
    };

    const handleSetArchiveStatus = async (id: number) => {
        if (confirm("Ви впевнені, що хочете розархівувати цей готель?")) {
            try {
                await setArchiveStatusHotel({ id, isArchived: false }).unwrap();
                showToast("Готель розархівовано", "success");
                refetch();
            } catch (err) {
                console.error("Помилка при розархівуванні готелю:", err);
                showToast("Готель не було розархівовано", "error");
            }
        }
    };

    const hotels = role === 'Admin' ? hotelsData?.filter(hotel => hotel.isArchived) : hotelsData?.data?.filter(hotel => hotel.isArchived);

    return (
        <div className="container mx-auto mt-5 max-w-4xl mx-auto">
            <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                Архівовані Готелі
            </h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/hotels/list")} className="border">
                    Назад до списку Готелів
                </Button>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
                <table className="text-sm font-bold min-w-full bg-white border text-left">
                    <thead className="text-xs uppercase bg-slate-200">
                    <tr>
                        <th className="px-6 py-3">id</th>
                        <th className="px-6 py-3">Назва</th>
                        <th className="px-6 py-3">Зображення</th>
                        <th className="px-6 py-3">Категорія</th>
                        {role !== 'Admin' && (
                            <th className="px-6 py-3 text-center" colSpan="3">Дії</th>
                        )}
                        </tr>
                    </thead>
                    <tbody>
                    {hotels?.map((hotel) => (
                        <tr key={hotel.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{hotel.id}</td>
                            <td className="px-6 py-4">{hotel.name}</td>
                            <td className="px-6 py-4">
                                {hotel.photos && hotel.photos.length > 0 && (
                                    <div className="flex flex-wrap gap-2 max-w-full">
                                        {hotel.photos.map((photo, index) => (
                                            <div key={index} className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={`${API_URL}/images/800_${photo.name}`}
                                                    alt={`${hotel.name} фото ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">{hotel.category.name}</td>
                            {role !== 'Admin' && (
                                <>
                                    <td className="px-6 py-3 text-center">
                                        <Button
                                            onClick={() => navigate(`/admin/hotels/edit/${hotel.id}`)}
                                            variant="icon"
                                            size="iconmd"
                                            title="Редагувати"
                                        >
                                        <IconEdit className="text-blue-500"/>
                                    </Button>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <Button
                                            onClick={() => handleDelete(hotel.id)}
                                            variant="icon"
                                            size="iconmd"
                                            title="Видалити"
                                        >
                                            <IconTrash className="text-red-500"/>
                                        </Button>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <Button
                                            onClick={() => handleSetArchiveStatus(hotel.id)}
                                            variant="icon"
                                            size="iconmd"
                                            title="Розархівувати"
                                        >
                                            <IconArchiveOff className="text-yellow-500"/>
                                        </Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArchivedHotelsPage;
