import { createSignalRContext } from "react-signalr";
import ChatPage from "pages/shared/Chat/ChatPage.tsx";
import { useAppSelector } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import { useContext, useEffect } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { API_URL } from "utils/getEnvData.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";

export const SignalRContext = createSignalRContext();

const SignalRChatPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage(undefined);
    }, []);

    const token = useAppSelector(getToken);

    return (
        <SignalRContext.Provider
            connectEnabled={true}
            accessTokenFactory={() => token ?? ""}
            url={`${API_URL}/hubs/chat`}
            withCredentials={true}
        >
            <ChatPage />
        </SignalRContext.Provider>
    );
};

export default SignalRChatPage;