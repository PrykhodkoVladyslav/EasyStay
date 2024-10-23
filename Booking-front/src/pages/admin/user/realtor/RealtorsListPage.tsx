import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useGetAllRealtorsQuery, useBlockUserMutation, useUnlockUserMutation } from "services/user.ts";
import { API_URL } from "utils/getEnvData.ts";
import ModalComponent from "components/ModalComponent";
import { useState } from "react";
import showToast from "utils/toastShow.ts";

const RealtorsListPage: React.FC = () => {
    const { data: realtorsData, isLoading, error, refetch } = useGetAllRealtorsQuery();
    const [blockUser, { isLoading: isBlockLoading }] = useBlockUserMutation();
    const [unlockUser, { isLoading: isUnblockLoading }] = useUnlockUserMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    const handleBlockUserClick = (id: number) => {
        setSelectedUserId(id);
        setModalOpen(true);
    };

    const handleBlockUser = async (date: Date) => {
        if (selectedUserId) {
            try {
                const utcDate = new Date(date.toISOString());
                await blockUser({ id: selectedUserId, lockoutEndUtc: utcDate }).unwrap();
                showToast("Користувача заблоковано", "success");
                refetch();
            } catch (err) {
                showToast("Не вдалося заблокувати користувача", "error");
            } finally {
                setModalOpen(false);
            }
        }
    };

    const handleUnlockUser = async (id: number) => {
        if (confirm("Ви впевнені, що хочете розблокувати цього користувача?")) {
            try {
                await unlockUser({ id }).unwrap();
                showToast("Користувача розаблоковано", "success");
                refetch();
            } catch (err) {
                showToast("Не вдалося розблокувати користувача", "error");
            }
        }
    };

    const realtors = realtorsData?.data ?? [];

    return (
        <div className="container mx-auto mt-5 max-w-4xl mx-auto">
            <h1 className="pb-5 text-2xl text-center text-black font-main font-bold">
                Список Ріелторів
            </h1>
            <div className="overflow-x-auto sm:rounded-lg">
                <table className="text-sm font-bold min-w-full bg-white border text-left">
                    <thead className="text-xs uppercase bg-slate-200">
                    <tr>
                        <th className="px-6 py-3">Ім'я</th>
                        <th className="px-6 py-3">Прізвище</th>
                        <th className="px-6 py-3">Електронна пошта</th>
                        <th className="px-6 py-3">Фото</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {realtors.map(user => (
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
                            <td className="px-6 py-3">
                                {user.isLocked ? (
                                    <button
                                        onClick={() => handleUnlockUser(user.id)}
                                        // variant="icon"
                                        // size="iconmd"
                                        title="Розблокувати"
                                        disabled={isUnblockLoading}
                                    >
                                        <IconLock className="text-red-500" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBlockUserClick(user.id)}
                                        // variant="icon"
                                        // size="iconmd"
                                        title="Заблокувати"
                                        disabled={isBlockLoading}
                                    >
                                        <IconLockOpen className="text-green-500" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ModalComponent
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleBlockUser}
            />
        </div>
    );
};

export default RealtorsListPage;
