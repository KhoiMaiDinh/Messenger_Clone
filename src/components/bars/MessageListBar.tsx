import React, { useEffect, useState } from "react";
import MessageListHeader from "./MessageListHeader";
import MessageItem from "@/components/contents/MessageListItem";
import { fetchChats } from "@/api/chat";
import { useAuth } from "@/contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { fetch } from "@/app/features/chat/chatSlice";
import { IChat } from "@/types/Chat";
import { useNavigate } from "react-router-dom";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageListBar = ({ isNewChat, setIsNewChat }: TScreenProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const chats = useSelector((state: RootState) => state.chats.chats);
    const dispatch = useDispatch();

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const getOpponent = (chat: IChat) => {
        return chat.people.find((p) => p.person.username != user?.email);
    };
    const getSelf = (chat: IChat) => {
        return chat.people.find((p) => p.person.username == user?.email);
    };

    function handleClick(id: number) {
        navigate(`/${id}`);
    }
    useEffect(() => {
        const getChats = async () => {
            const fetchedChats = await fetchChats(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                user?.email!,
                user?.uid!
            );
            dispatch(fetch(fetchedChats.data));
        };

        getChats().catch(console.error);
    }, []);
    return (
        <div className="flex flex-col w-[88px] md:w-[360px] bg-white rounded-xl md">
            <MessageListHeader
                setIsNewChat={setIsNewChat}
                isScrolled={isScrolled}
            />
            <div
                onScroll={handleScroll}
                className="flex flex-1 flex-col overflow-y-auto px-[6px]"
            >
                {isNewChat && (
                    <MessageItem
                        userName="Tin nhắn mới"
                        isOnline={false}
                        setIsNewChat={setIsNewChat}
                    />
                )}
                {chats.map((chat) => (
                    <MessageItem
                        chatId={chat.id}
                        isOnline={getOpponent(chat)?.person.is_online!}
                        imgUrl={getOpponent(chat)?.person.avatar!}
                        key={chat.id}
                        lastMessage={chat.last_message}
                        userName={getOpponent(chat)?.person.username!}
                        lastReadMessageId={getSelf(chat)?.last_read!}
                        onClick={() => handleClick(chat.id)}
                    />
                ))}

                {/* {[...Array(10).keys()].map(() => (
                    <MessageItem userName="Anh Quốc" isOnline={false} />
                ))} */}
            </div>
        </div>
    );
};

export default MessageListBar;
