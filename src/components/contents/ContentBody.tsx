import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MessageItem, { TMessageStatus } from "@/components/contents/MessageItem";
import { RootState } from "@/app/store";
import { getLatestChats } from "@/api/message";
import { useAuth } from "@/contexts/authContext";
import { fetchMessages } from "@/app/features/message/messageSlice";
import { IMessage } from "@/types/Message";
import { getTime } from "@/utils/time";

type TComponentProps = {
    isNewChat: boolean;
    onClick: () => void;
};

const ContentBody: FunctionComponent<TComponentProps> = ({
    isNewChat,
    onClick,
}) => {
    const { id: chat_id } = useParams();
    const { user: self } = useAuth();
    const dispatch = useDispatch();

    const messages = useSelector((state: RootState) =>
        state.messages.find((mes) => mes.chatId.toString() == chat_id)
    );
    const opponent = useSelector((state: RootState) =>
        state.chats.chats
            .find((chat) => {
                return chat.id.toString() == chat_id!;
            })
            ?.people.find((p) => p.person.username != self?.email)
    );
    const avatars = useSelector((state: RootState) => state.chats.avatars);
    const getAvatar = () => {
        return avatars.find((a) => a.username == opponent?.person.username)
            ?.avatar_url;
    };
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
        ) {
            if (diffMinuteswN > 3) return "alone";

            return "end";
        } else if (
            current.sender.username == prev.sender.username &&
            current.sender.username == next.sender.username
        ) {
            if (diffMinuteswP > 3) return "end";
            if (diffMinuteswN > 3) return "start";
            return "middle";
        } else if (
            current.sender.username == prev.sender.username &&
            current.sender.username != next.sender.username
        ) {
            if (diffMinuteswP > 3) return "alone";
            return "start";
        }
        return "alone";
    };

    const getDiffMinutesWithPre = (messages: IMessage[], index: number) => {
        const current = messages[index];
        const timeOfCurrent = new Date(current.created);

        if (index == messages.length - 1) {
            return 4;
        }

        const next = messages[index + 1];
        const timeOfNext = new Date(next.created);

        const timeDiffwN = Math.abs(
            timeOfCurrent.getTime() - timeOfNext.getTime()
        );
        const diffMinuteswN = Math.floor(timeDiffwN / (1000 * 60));
        return diffMinuteswN;
    };

    const getTimeString = (isoString: string) => {
        const date = new Date(isoString);
        const now = new Date();
        const distance = (now.getTime() - date.getTime()) / 1000;
        let hour = date.getHours();
        const hourString = hour > 9 ? "" + hour : "0" + hour;
        let minute = date.getMinutes();
        const minuteString = minute > 9 ? "" + minute : "0" + minute;
        let dayString = "";
        let distanceAsDay = Math.round(distance / (60 * 60 * 24));
        if (distanceAsDay >= 1 && distanceAsDay <= 7) {
            const dayOfWeek = date.getDay(); // Trả về một số từ 0 (Chủ Nhật) đến 6 (Thứ Bảy)

            // Chuyển đổi số thành tên thứ trong tiếng Anh
            const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            dayString = days[dayOfWeek];
        }
        if (distanceAsDay > 7) {
            dayString =
                date.getDate() +
                " Tháng " +
                date.getMonth() +
                ", " +
                date.getFullYear();
        }
        return hourString + ":" + minuteString + " " + dayString;
    };
    return (
        <div
            onClick={onClick}
            className="flex flex-col-reverse flex-1  overflow-y-scroll z-10 gap-[2px]"
        >
            {messages?.messages.at(-1)?.id! > 9999 &&
                opponent?.last_read != messages?.messages.at(-1)?.id && (
                    <div className="flex justify-end h-4 pr-2">
                        <span className="text-white dark:text-[#65676B] text-[12px] ">
                            {`Đã gửi ${getTime(
                                messages?.messages.at(-1)?.created!
                            ).toLowerCase()} ${
                                getTime(
                                    messages?.messages.at(-1)?.created!
                                ).toLowerCase() != "bây giờ"
                                    ? "trước"
                                    : ""
                            }`}
                        </span>
                    </div>
                )}
            {isNewChat ? null : (
                <>
                    {messages?.messages?.length &&
                        messages.messages
                            .slice(0)
                            .reverse()
                            .map((mes, index) => (
                                <div key={index}>
                                    {getDiffMinutesWithPre(
                                        messages.messages.slice(0).reverse(),
                                        index
                                    ) > 3 && (
                                        <div className="flex w-full h-[43px] items-center justify-center font-medium  text-white dark:text-[#65676B] text-[0.75rem]">
                                            {getTimeString(mes.created)}
                                        </div>
                                    )}
                                    <MessageItem
                                        key={mes.id}
                                        id={mes.id}
                                        text={mes.text}
                                        isSelf={
                                            mes.sender.username == self?.email
                                        }
                                        isSeen={opponent?.last_read == mes.id}
                                        opponentImgUrl={
                                            // opponent?.last_read == mes.id
                                            true ? getAvatar() : undefined
                                        }
                                        imgUrl={
                                            avatars.find(
                                                (a) =>
                                                    mes.sender.username ==
                                                    a.username
                                            )?.avatar_url
                                        }
                                        type={getMessageStatus(
                                            messages.messages
                                                .slice(0)
                                                .reverse(),
                                            index
                                        )}
                                    />
                                </div>
                            ))}
                </>
            )}
        </div>
    );
};

export default ContentBody;
