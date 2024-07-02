import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MessageItem, { TMessageStatus } from "@/components/contents/MessageItem";
import { RootState } from "@/app/store";
import { getLatestChats } from "@/api/message";
import { useAuth } from "@/contexts/authContext";
import { fetchMessages } from "@/app/features/message/messageSlice";
import { IMessage } from "@/types/Message";

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
    // sau -> trc

    const getMessageStatus: (
        messages: IMessage[],
        index: number
    ) => TMessageStatus = (messages, index) => {
        const current = messages[index];
        if (messages.length == 1) return "alone";
        // const date = new Date(current.created);
        // console.log(date);
        // return "start";
        const timeOfCurrent = new Date(current.created);
        if (index == 0) {
            const next = messages[index + 1];
            const timeOfNext = new Date(next.created);
            const timeDiff = Math.abs(
                timeOfNext.getTime() - timeOfCurrent.getTime()
            );
            const diffMinutes = Math.floor(timeDiff / (1000 * 60));
            if (
                diffMinutes > 3 ||
                current.sender.username != next.sender.username
            )
                return "alone";
            return "end";
        }
        if (index == messages.length - 1) {
            const prev = messages[index - 1];
            const timeOfPrev = new Date(prev.created);
            const timeDiff = Math.abs(
                timeOfCurrent.getTime() - timeOfPrev.getTime()
            );
            const diffMinutes = Math.floor(timeDiff / (1000 * 60));
            if (
                diffMinutes > 3 ||
                current.sender.username != prev.sender.username
            )
                return "alone";
            return "start";
        }
        const prev = messages[index - 1];
        const timeOfPrev = new Date(prev.created);
        //

        const next = messages[index + 1];
        const timeOfNext = new Date(next.created);

        const timeDiffwP = Math.abs(
            timeOfCurrent.getTime() - timeOfPrev.getTime()
        );
        const diffMinuteswP = Math.floor(timeDiffwP / (1000 * 60));

        const timeDiffwN = Math.abs(
            timeOfCurrent.getTime() - timeOfNext.getTime()
        );
        const diffMinuteswN = Math.floor(timeDiffwN / (1000 * 60));
        if (diffMinuteswP > 3 && diffMinuteswN > 3) return "alone";

        if (
            current.sender.username != prev.sender.username &&
            current.sender.username == next.sender.username
        )
            return "end";
        else if (
            current.sender.username == prev.sender.username &&
            current.sender.username == next.sender.username
        ) {
            if (diffMinuteswP > 3) return "end";
            if (diffMinuteswN > 3) return "start";
            return "middle";
        } else if (
            current.sender.username == prev.sender.username &&
            current.sender.username != next.sender.username
        )
            return "start";
        return "alone";
    };
    return (
        <div className="flex flex-col-reverse flex-1 relative overflow-y-scroll z-10 gap-[2px]">
            {isNewChat ? null : (
                <>
                    {messages?.messages?.length &&
                        messages.messages
                            .slice(0)
                            .reverse()
                            .map((mes, index) => (
                                <MessageItem
                                    key={mes.id}
                                    text={mes.text}
                                    isSelf={mes.sender.username == self?.email}
                                    imgUrl={mes.sender.avatar}
                                    type={getMessageStatus(
                                        messages.messages.slice(0).reverse(),
                                        index
                                    )}
                                />
                            ))}
                </>
            )}
        </div>
    );
};

export default ContentBody;
