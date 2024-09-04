import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { useGetAllCustomersQuery, useDeleteUserMutation } from "services/user.ts";
import { API_URL } from "utils/getEnvData.ts";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "store/index.ts";
import {getToken} from "store/slice/userSlice.ts";

// Доступ тільки для Адміна

const CustomersListPage: React.FC = () => {
    const { data: usersData, isLoading, error, refetch } = useGetAllCustomersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => getToken(state));
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userRole = payload ? payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;

    const isAdmin = userRole === "Admin";

    if (!isAdmin) {
        return <p>Ви не маєте доступу до цієї сторінки. Тільки адміністратори можуть переглядати список користувачів.</p>;
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    const handleDelete = async (id: string) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            try {
                await deleteUser(id).unwrap();
                refetch();
            } catch (err) {
                console.error("Помилка при видаленні користувача:", err);
                alert("Не вдалося видалити користувача.");
            }
        }
    };

    const users = usersData?.data || [];

    return (
        <div className="container mx-auto mt-5 max-w-4xl mx-auto">
            <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                Список Користувачів
            </h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => navigate("/admin/users/create")} className="border">
                    Додати нового Користувача
                </Button>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
                <table className="text-sm font-bold min-w-full bg-white border text-left">
                    <thead className="text-xs uppercase bg-slate-200">
                    <tr>
                        <th className="px-6 py-3">Ім'я</th>
                        <th className="px-6 py-3">Прізвище</th>
                        <th className="px-6 py-3">Електронна пошта</th>
                        <th className="px-6 py-3">Фото</th>
                        <th className="px-6 py-3" colSpan="2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((user) => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{user.firstName}</td>
                            <td className="px-6 py-4">{user.lastName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                {user.photo && (
                                    <img
                                        src={`${API_URL}/images/800_${user.photo}`}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="h-20 w-20 object-cover"
                                    />
                                )}
                            </td>
                            <td className="px-6 py-3 text-center">
                                <Button
                                    onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                                    variant="icon"
                                    size="iconmd"
                                    title="Редагувати"
                                >
                                    <IconEdit className="text-blue-500" />
                                </Button>
                            </td>
                            <td className="px-6 py-3 text-center text-red-800">
                                <Button
                                    onClick={() => handleDelete(user.id)}
                                    variant="icon"
                                    size="iconmd"
                                    title="Видалити"
                                >
                                    <IconTrash className="text-red-500" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomersListPage;
