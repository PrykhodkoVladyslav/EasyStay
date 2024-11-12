import "../../../css/chat.scss";
import SearchInput from "components/ui/design/SearchInput.tsx";
import { useEffect, useRef, useState } from "react";
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
import ChatHeader from "components/partials/shared/chat/ChatHeader.tsx";
import { getIconUrl } from "utils/publicAccessor.ts";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import IMessage from "interfaces/message/IMessage.ts";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

export interface IChatWishInterlocutor extends IChat {
    interlocutorId: number;
    interlocutor: IChatUserInfo;
    meId: number;
    me: IChatUserInfo;
}

const ChatPage = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const interlocutorIdParam = queryParams.get("interlocutorIdParam");
    const avatarParam = queryParams.get("avatarParam");
    const fullNameParam = queryParams.get("fullNameParam");

    const user = useAppSelector(getUser);
    const token = useAppSelector(getToken);
    if (user === null) throw new Error("User in not authenticated");
    const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!;
    const isCustomer = role === "Customer";

    const [search, setSearch] = useState("");
    const [message, setMessage] = useState<string>("");

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: "auto",
        });
    };

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    const [chats, setChats] = useState<IChat[]>([]);
    const [tempChat, setTempChat] = useState<IChat | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessage("");

        setMessages([]);
        if (selectedChatId != null) {
            get<IMessage[]>(`${API_URL}/api/Messages/GetAll?ChatId=${selectedChatId}`, buildAxiosConfigWithToken(token!))
                .then(r => setMessages(r.data))
                .catch(() => showToast("Помилка завантаження повідомлень", "error"));
        }
    }, [selectedChatId]);

    useEffect(() => {
        if (interlocutorIdParam && avatarParam && fullNameParam) {
            const interlocutor = {
                fullName: fullNameParam,
                photo: avatarParam,
            } as IChatUserInfo;

            const me = {
                fullName: `${user.firstName} ${user.lastName}`,
                photo: user.photo,
            } as IChatUserInfo;

            const tempChat = {
                id: 0,
                customerId: isCustomer ? user.id : Number(interlocutorIdParam),
                customer: isCustomer ? me : interlocutor,
                realtorId: isCustomer ? Number(interlocutorIdParam) : user.id,
                realtor: isCustomer ? interlocutor : me,
            } as IChat;

            setTempChat(tempChat);
        }

        get<IChat[]>(`${API_URL}/api/chats/getAll`, buildAxiosConfigWithToken(token!))
            .then(r => setChats(chats.concat(r.data)))
            .catch(() => showToast("Помилка завантаження чатів", "error"));
    }, []);

    SignalRContext.useSignalREffect(
        "CreateChat",
        (chat: IChat) => {
            setChats([...chats, chat]);

            if (chat[isCustomer ? "realtorId" : "customerId"] === Number(interlocutorIdParam)) {
                setSelectedChatId(chat.id);
                setTempChat(null);
            }
        },
        [],
    );

    SignalRContext.useSignalREffect(
        "ReceiveMessage",
        (chatId: number, message: IMessage) => {
            if (selectedChatId == chatId) {
                setMessages([...messages, message]);
            }
        },
        [],
    );

    const chatsWithTemp =
        tempChat && !chats.find(c => c[isCustomer ? "realtorId" : "customerId"] === Number(interlocutorIdParam))
            ? [...chats, tempChat]
            : chats;

    const chatsWithWishInterlocutor = chatsWithTemp.map(c => ({
        ...c,
        interlocutorId: isCustomer ? c.realtorId : c.customerId,
        interlocutor: isCustomer ? c.realtor : c.customer,
        meId: isCustomer ? c.customerId : c.realtorId,
        me: isCustomer ? c.customer : c.realtor,
    }) as IChatWishInterlocutor);

    const selectedChat = chatsWithWishInterlocutor.find(c => c.id === selectedChatId);

    const sendMessage = () => {
        if (!message)
            return;

        SignalRContext.invoke("SendMessage", selectedChat?.interlocutorId, message)
            ?.then(() => setMessage(""))
            .catch(() => showToast("Помилка відправки повідомлення"));
    };

    const isEnabledChat = selectedChatId !== null;

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
                            onClick={() => setSelectedChatId((selectedChatId === item.id) ? null : (item.id))}
                            image={item.interlocutor.photo}
                            fullName={item.interlocutor.fullName}
                            lastMessage={item.lastMessage}
                        />),
                    )}
            </div>
        </div>

        <div className="chat-body-container">
            <ChatHeader title={selectedChat?.interlocutor.fullName} />

            <div className="chat-messages-container">
                <div className="chat-body-content-container on-vertical-sides-chat">
                    <div className="messages-container" ref={messagesContainerRef}>
                        {messages.map((m, index) =>
                            <div key={index} className="message-container">
                                <img
                                    src={getApiImageUrl((m.authorId == user.id) ? (user.photo) : (selectedChat?.interlocutor.photo ?? ""), 200)}
                                    alt="avatar"
                                    className="message-avatar"
                                />
                                <div className="message-content-container">
                                    <div className="on-sides-of-message">
                                        <p className="message-author">{(m.authorId == user.id) ? ("Ви") : (selectedChat?.interlocutor.fullName)}</p>
                                        <p className="message-time">{format(m.createdAtUtc, "HH:mm")}</p>
                                    </div>

                                    <p className="message-content">{m.text}</p>
                                </div>
                            </div>)
                        }
                    </div>

                    <div className="chat-text-input-container">
                        <div className="input-container">
                            <input
                                className="message-input"
                                type="text"
                                placeholder="Написати повідомлення"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        sendMessage();
                                }}
                                disabled={!isEnabledChat}
                                maxLength={4000}
                            />
                            <img
                                src={getIconUrl("send.svg")}
                                alt="send"
                                className={isEnabledChat ? "pointer" : ""}
                                onClick={() => {
                                    if (isEnabledChat)
                                        sendMessage();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default ChatPage;