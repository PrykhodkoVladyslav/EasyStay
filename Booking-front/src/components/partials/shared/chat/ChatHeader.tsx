import { getIconUrl } from "utils/publicAccessor.ts";

interface IChatHeaderProps {
    title?: string;

    onDelete?: () => void;
}

const ChatHeader = (props: IChatHeaderProps) => {
    const { title, onDelete } = props;

    return <div className="chat-header">
        <div className="chat-body-content-container on-sides-chat-header">
            <p className="chat-title">{title}</p>

            <div className="chat-header-buttons-container">
                <div className="chat-header-button-container pointer" onClick={() => onDelete?.()}>
                    <img src={getIconUrl("trash.svg")} alt="trash" />
                </div>
            </div>
        </div>
    </div>;
};

export default ChatHeader;