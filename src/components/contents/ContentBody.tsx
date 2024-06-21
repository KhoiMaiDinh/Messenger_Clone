import { FunctionComponent, useEffect } from "react";
import OpponentMessage from "./OpponentMessage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getLatestChats } from "@/api/message";
import { useAuth } from "@/contexts/authContext";
import { fetchMessages } from "@/app/features/message/messageSlice";

type TComponentProps = {
    isNewChat: boolean;
};

const ContentBody: FunctionComponent<TComponentProps> = ({ isNewChat }) => {
    const { id: chat_id } = useParams();
    const { user: self } = useAuth();
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) =>
        state.messages.find((mes) => mes.chatId.toString() == chat_id)
    );

    useEffect(() => {
        const fetch20NewestChats = async () => {
            return await getLatestChats(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                chat_id!,
                20
            );
        };

        fetch20NewestChats()
            .then((response) =>
                dispatch(
                    fetchMessages({ chatId: chat_id!, messages: response.data })
                )
            )
            .catch(console.error);
    }, [chat_id]);
    return (
        <div className="flex flex-col-reverse flex-1 relative overflow-y-scroll z-10">
            {isNewChat ? null : (
                <>
                    {messages?.messages?.length &&
                        messages.messages
                            .slice(0)
                            .reverse()
                            .map((mes) => (
                                <OpponentMessage
                                    key={mes.id}
                                    text={mes.text}
                                    isSelf={mes.sender.username == self?.email}
                                    imgUrl={mes.sender.avatar}
                                />
                            ))}
                </>
            )}
        </div>
    );
};

export default ContentBody;
