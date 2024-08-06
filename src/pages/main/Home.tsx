import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import useWebSocket from "react-use-websocket";

import Sidebar from "@/components/bars/Sidebar";
import MessageListBar from "@/components/bars/MessageListBar";
import MessageContent from "@/components/contents/MessageContent";
import { useAuth } from "@/contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "@/app/features/message/messageSlice";
import {
    addToBeginning,
    editAndMoveToStart,
    editChat,
} from "@/app/features/chat/chatSlice";
import { readMessage } from "@/api/message";
import { useParams } from "react-router-dom";
import { RootState } from "@/app/store";
import InfoAndSettingBar from "@/components/bars/InfoAndSettingBar";
import { IChat } from "@/types/Chat";
import { updateTheme } from "@/app/features/theme/themeSlice";
import ThemeSets from "@/app/features/theme/themeConstance";
import { updateEmoji } from "@/app/features/emoji/emojiSlice";

function Home() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { id: chat_id } = useParams();

    const project_id = import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID;
    const user_name = user?.email!;
    const user_secret = user?.uid!;

    const [isNewChat, setIsNewChat] = useState<boolean>(false);
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);

    const messagesOfId = useSelector((state: RootState) =>
        state.messages.find((message) => message.chatId == chat_id)
    );
    const chats = useSelector((state: RootState) => state.chats.chats);
    const theme = useSelector((state: RootState) => state.theme);
    const getChatById = (chats: IChat[]) => {
        return chats.find((chat) => chat.id.toString() == chat_id);
    };
    const getSelfInfo = async (chat: IChat | undefined) => {
        return chat?.people.find((p) => p.person.username == user?.email);
    };

    const socketUrl = `wss://api.chatengine.io/person/?publicKey=${project_id}&username=${user_name}&secret=${user_secret}`;

    const readChats = async (last_message_id: number | undefined) => {
        let chatOfId = getChatById(chats);
        let selfInfo = await getSelfInfo(chatOfId);
        console.log(last_message_id, selfInfo?.last_read);
        if (!chat_id || !last_message_id) return;
        if (last_message_id == selfInfo?.last_read) return;
        try {
            const res = await readMessage(
                project_id,
                user_name,
                user_secret,
                chat_id,
                last_message_id
            );
            return res;
        } catch (e) {
            return e;
        }
    };

    const { readyState } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("opened");
        },
        onClose: (event) => {
            console.log("closed");
        },
        onMessage: (event) => {
            console.log(event?.data);
            const { action, data } = JSON.parse(event.data);
            console.log({ action, data });
            // const action = data.action;
            switch (action) {
                case "new_chat":
                    dispatch(addToBeginning(data));
                    break;
                case "new_message":
                    if (data.message.sender_username == user_name) break;
                    dispatch(
                        addNewMessage({
                            chatId: data.id,
                            message: data.message,
                        })
                    );
                    if (chat_id == data.id)
                        readChats(data.message.id).catch(console.error);
                    break;
                case "edit_chat":
                    dispatch(editChat(data));
                    if (data.id == chat_id && "custom_json" in data) {
                        const jsonString = data.custom_json;
                        const json = JSON.parse(jsonString);
                        if ("theme" in json && json.theme != theme.key)
                            console.log(
                                ThemeSets[json.theme as keyof typeof ThemeSets]
                            );
                        dispatch(
                            updateTheme({
                                newTheme:
                                    ThemeSets[
                                        json.theme as keyof typeof ThemeSets
                                    ],
                            })
                        );
                        dispatch(
                            updateEmoji({
                                newEmojiCode: json.emoji,
                            })
                        );
                    }
                    break;
                default:
                    // console.log(data);
                    break;
            }
        },
        onError: (error) => console.log(error),
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        const lastMessageID = messagesOfId?.messages.at(-1)?.id;
        const chatOfID = getChatById(chats);
        if (chatOfID != undefined && "custom_json" in chatOfID) {
            dispatch(
                updateTheme({
                    newTheme:
                        ThemeSets[
                            JSON.parse(chatOfID.custom_json)
                                .theme as keyof typeof ThemeSets
                        ],
                })
            );
            dispatch(
                updateEmoji({
                    newEmojiCode: JSON.parse(chatOfID.custom_json).emoji,
                })
            );
        }

        readChats(lastMessageID).catch(console.error);
    }, [chat_id]);

    return (
        <div className=" w-screen flex-1 p-4 h-screen flex gap-4 bg-[#f5f5f5] -z-30">
            <Sidebar />
            {/* <SidebarButton Icon={MessageIcon} /> */}
            <MessageListBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <MessageContent
                isNewChat={isNewChat}
                setIsNewChat={setIsNewChat}
                setIsOpenInfo={setIsOpenInfo}
                isOpenInfo={isOpenInfo}
            />
            {isOpenInfo && <InfoAndSettingBar />}
        </div>
    );
}

export default Home;
