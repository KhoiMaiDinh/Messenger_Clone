import React, { useEffect, useState } from "react";
import MessageListHeader from "./MessageListHeader";
import MessageItem from "@/components/contents/MessageListItem";
import { fetchChats } from "@/api/chat";
import { useAuth } from "@/contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { fetch } from "@/app/features/chat/chatSlice";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageListBar = ({ isNewChat, setIsNewChat }: TScreenProps) => {
    const { user } = useAuth();
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
                    <MessageItem userName="Tin nhắn mới" isOnline={false} />
                )}
                {chats.map(() => (
                    <MessageItem userName="Anh Quốc" isOnline={false} />
                ))}
                {/* {[ ...Array(10).keys() ].map(() => (
                    <MessageItem userName="Anh Quốc" isOnline={false} />
                ))} */}
            </div>
        </div>
    );
};

export default MessageListBar;
