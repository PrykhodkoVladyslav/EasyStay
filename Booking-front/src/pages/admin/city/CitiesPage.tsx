import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { useGetAllCitiesQuery, useDeleteCityMutation } from "services/city.ts";
import { API_URL } from "utils/getEnvData.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";

const CitiesPage: React.FC = () => {
    useEffect(instantScrollToTop, []);

    const { data: citiesData, isLoading, error, refetch } = useGetAllCitiesQuery();
    const [deleteCity] = useDeleteCityMutation();
    const navigate = useNavigate();

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити це місто?")) {
            try {
                await deleteCity(id).unwrap();
                refetch();
            } catch (err) {
                console.error("Помилка при видаленні міста:", err);
                alert("Не вдалося видалити місто.");
            }
        }
    };

    return (
        <div className="container mx-auto mt-5 max-w-4xl mx-auto">
            <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                Список Міст
            </h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/cities/create")} className="border">
                    Додати нове Місто
                </Button>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
                <table className="text-sm font-bold min-w-full bg-white border text-left">
                    <thead className="text-xs uppercase bg-slate-200">
                    <tr>
                        {/*<th className="px-6 py-3">id</th>*/}
                        <th className="px-6 py-3">Назва</th>
                        <th className="px-6 py-3">Зображення</th>
                        <th className="px-6 py-3">Країна</th>
                        <th className="px-6 py-3" colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {citiesData?.map((city) => (
                        <tr key={city.id} className="bg-white border-b hover:bg-gray-50">
                            {/*<td className="px-6 py-4">{city.id}</td>*/}
                            <td className="px-6 py-4">{city.name}</td>
                            <td className="px-6 py-4">
                                {city.image && (
                                    <img
                                        src={API_URL + `/images/800_${city.image}`}
                                        alt={city.name}
                                        className="h-20 w-20 object-cover"
                                    />
                                )}
                            </td>
                            <td className="px-6 py-4">{city.country.name}</td>
                            <td className="px-6 py-3 text-center">
                                <button
                                    onClick={() => navigate(`/admin/cities/edit/${city.id}`)}
                                    // variant="icon"
                                    // size="iconmd"
                                    title="Редагувати"
                                >
                                    <IconEdit className="text-blue-500" />
                                </button>
                            </td>
                            <td className="px-6 py-3 text-center">
                                <button
                                    onClick={() => handleDelete(city.id)}
                                    // variant="icon"
                                    // size="iconmd"
                                    title="Видалити"
                                >
                                    <IconTrash className="text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CitiesPage;
