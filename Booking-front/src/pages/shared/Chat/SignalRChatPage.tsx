import { createSignalRContext } from "react-signalr";
import ChatPage from "pages/shared/Chat/ChatPage.tsx";
import { useAppSelector } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import { useContext, useEffect } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

export const SignalRContext = createSignalRContext();

const SignalRChatPage = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage(undefined);
    });

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