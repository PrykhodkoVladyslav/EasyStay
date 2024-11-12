import "../../../css/chat.scss";
import SearchInput from "components/ui/design/SearchInput.tsx";
import { useEffect, useState } from "react";
import ChatCard from "components/partials/ChatCard.tsx";
import { useAppSelector } from "store/index.ts";
import { getToken, getUser } from "store/slice/userSlice.ts";
import { SignalRContext } from "pages/shared/Chat/SignalRChatPage.tsx";
import { API_URL } from "utils/getEnvData.ts";
import get from "axios";
import { buildAxiosConfigWithToken } from "utils/axiosConfigBuilder.ts";
import showToast from "utils/toastShow.ts";
import IChat from "interfaces/chat/IChat.ts";
import IChatUserInfo from "interfaces/chat/IChatUserInfo.ts";

export interface IChatWishInterlocutor extends IChat {
    interlocutorId: number;
    interlocutor: IChatUserInfo;
}

const ChatPage = () => {
    const user = useAppSelector(getUser);
    const token = useAppSelector(getToken);
    if (user === null) throw new Error("User in not authenticated");
    const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!;
    const isCustomer = role === "Customer";

    const [search, setSearch] = useState("");

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    const [chats, setChats] = useState<IChat[]>([]);

    useEffect(() => {
        get<IChat[]>(`${API_URL}/api/chats/getAll`, buildAxiosConfigWithToken(token!))
            .then(r => setChats([...chats, ...r.data]))
            .catch(() => showToast("Помилка завантаження чатів", "error"));
    }, []);

    SignalRContext.useSignalREffect(
        "CreateChat",
        (chat: IChat) => {
            setChats([...chats, chat]);
        },
        [],
    );

    const chatsWithWishInterlocutor = chats.map(c => ({
        ...c,
        interlocutorId: isCustomer ? c.realtorId : c.customerId,
        interlocutor: isCustomer ? c.realtor : c.customer,
    }) as IChatWishInterlocutor);

    return <div className="chat-page-container">
        <div className="side-panel-container">
            <SearchInput
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Пошук користувача"
            />

            <div className="chat-list-container">
                {chatsWithWishInterlocutor.filter(c => c.interlocutor.fullName.toLowerCase().includes(search.toLowerCase()))
                    .map(item => (
                        <ChatCard
                            key={item.id}
                            isSelected={selectedChatId === item.id}
                            onClick={() => setSelectedChatId(item.id)}
                            image={item.interlocutor.photo}
                            fullName={item.interlocutor.fullName}
                            lastMassage={item.lastMassage}
                        />),
                    )}
            </div>
        </div>
    </div>;
};

export default ChatPage;