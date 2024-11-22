import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { useDeleteCountryMutation, useGetAllCountriesQuery } from "services/country.ts";
import { API_URL } from "utils/getEnvData.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import showToast from "utils/toastShow.ts";

const CountriesPage: React.FC = () => {
    useEffect(instantScrollToTop, []);

    const { data: countriesData, isLoading, error, refetch } = useGetAllCountriesQuery();
    const [deleteCountry] = useDeleteCountryMutation();
    const navigate = useNavigate();

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити цю країну?")) {
            try {
                await deleteCountry(id).unwrap();
                refetch();
            } catch (err) {
                console.error("Помилка при видаленні країни:", err);
                showToast("Не вдалося видалити країну", "error");
            }
        }
    };

    return (
        <div className="container mx-auto mt-5 max-w-4xl mx-auto">
            <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                Список Країн
            </h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/countries/create")} className="border">
                    Додати нову Країну
                </Button>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
                <table className="text-sm font-bold min-w-full bg-white border text-left">
                    <thead className="text-xs uppercase bg-slate-200">
                    <tr>
                        {/*<th className="px-6 py-3">id</th>*/}
                        <th className="px-6 py-3">Назва</th>
                        <th className="px-6 py-3">Зображення</th>
                        <th className="px-6 py-3" colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {countriesData?.map((country) => (
                        <tr key={country.id} className="bg-white border-b hover:bg-gray-50 ">
                            {/*<td className="px-6 py-4">{country.id}</td>*/}
                            <td className="px-6 py-4">{country.name}</td>
                            <td className="px-6 py-4">
                                {country.image && (
                                    <img
                                        src={API_URL + `/images/800_${country.image}`}
                                        alt={country.name}
                                        className="h-20 w-20 object-cover"
                                    />
                                )}
                            </td>
                            <td className="px-6 py-3 text-center">
                                <button
                                    onClick={() => navigate(`/admin/countries/edit/${country.id}`)}
                                    // variant="icon"
                                    // size="iconmd"
                                    title="Редагувати"
                                >
                                    <IconEdit className="text-blue-500" />
                                </button>
                            </td>
                            <td className="px-6 py-3 text-center">
                                <button
                                    onClick={() => handleDelete(country.id)}
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

export default CountriesPage;
