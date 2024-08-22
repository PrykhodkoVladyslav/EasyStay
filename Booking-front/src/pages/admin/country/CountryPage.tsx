import { useGetAllCountriesQuery } from "services/country.ts";
import { Button } from "components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";
// import { isImageFile } from "utils/fileUtils.ts";
import {API_URL} from "utils/getEnvData.ts";
// import { Country } from "interfaces/Country";
import {useEffect} from "react";

// interface CountryTableProps {
//     countries: Country[] | undefined;
// }

// const CountryPage: React.FC<CountryTableProps> = (props) => {
const CountryPage: React.FC = () => {
        const { data: countriesData, isLoading, error } = useGetAllCountriesQuery();
        // const { countries } = props;
        const navigate = useNavigate();
    useEffect(() => {
        console.log("Countries Data: ", countriesData);
    }, [countriesData]);
        // if (isLoading) return <p>Завантаження...</p>;
        // if (error) return <p>Помилка завантаження даних</p>;

        return (
            <div className="container mx-auto mt-5">
                <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                    Список Країн
                </h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => navigate("/admin/countries/create")}>
                        Додати нову країну
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Назва</th>
                            <th className="py-2 px-4 border-b">Зображення</th>
                            <th className="py-2 px-4 border-b">Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{countries?.map((country) => (*/}
                        {countriesData?.map((country) => (
                            <tr key={country.id} className="bg-white border-b hover:bg-gray-50 ">
                                <td className="px-6 py-4">{country.id}</td>
                                <td className="py-2 px-4">{country.name}</td>
                                <td className="py-2 px-4">
                                    {country.image && (
                                        <img
                                            src={API_URL + `/images/800_${country.image}`}
                                            alt={country.name}
                                            className="h-12 w-12 object-cover"
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Button
                                        onClick={() => navigate(`/admin/countries/edit/${country.id}`)}
                                    >
                                        Редагувати
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}

export default CountryPage;
