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
import { updateEmoji } from "@/app/features/emoji/emojiSlice";
import { updateTheme } from "@/app/features/theme/themeSlice";
import ThemeSets from "@/app/features/theme/themeConstance";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageListBar = ({ isNewChat, setIsNewChat }: TScreenProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const chats = useSelector((state: RootState) => state.chats.chats);
    const avatars = useSelector((state: RootState) => state.chats.avatars);
    const dispatch = useDispatch();

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    useEffect(() => {
        const getChats = async () => {
            const fetchedChats = await fetchChats(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                user?.email!,
                user?.uid!
            );
            dispatch(
                fetch({ chats: fetchedChats.data, self_username: user?.email! })
            );
            let custom_json = {};
            if (fetchedChats.data.at(0)?.custom_json) {
                custom_json = JSON.parse(
                    fetchedChats.data.at(0)?.custom_json || ""
                );
            }
            console.log({ custom_json });
            if (custom_json && "theme" in custom_json) {
                dispatch(
                    updateTheme({
                        newTheme:
                            ThemeSets[
                                custom_json.theme as keyof typeof ThemeSets
                            ],
                    })
                );
            }
            if (custom_json && "emoji" in custom_json) {
                dispatch(
                    updateEmoji({ newEmojiCode: custom_json.emoji as any })
                );
            }
        };

        getChats().catch(console.error);
    }, []);
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
    const getAvatar = (chat: IChat) => {
        return avatars.find(
            (a) => a.username == getOpponent(chat)?.person.username
        )?.avatar_url;
    };
    function handleClick(id: number) {
        navigate(`/${id}`);
    }

    return (
        <div className="flex flex-col w-[88px] flex-1 bg-white rounded-xl md ">
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
                        imgUrl={getAvatar(chat)}
                        key={chat.id}
                        lastMessage={chat.last_message}
                        userName={getOpponent(chat)?.person.first_name!}
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
