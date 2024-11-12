import { createSignalRContext } from "react-signalr";
import ChatPage from "pages/shared/Chat/ChatPage.tsx";
import { useAppSelector } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";

export const SignalRContext = createSignalRContext();

const SignalRChatPage = () => {
    const token = useAppSelector(getToken);

    return (
        <SignalRContext.Provider
            connectEnabled={true}
            accessTokenFactory={() => token ?? ""}
            url={"http://localhost:5292/hubs/chat"}
            withCredentials={true}
        >
            <ChatPage />
        </SignalRContext.Provider>
    );
};

export default SignalRChatPage;