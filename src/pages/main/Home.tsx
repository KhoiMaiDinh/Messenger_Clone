import React, { useEffect, useState } from "react";
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

function Home() {
    const { user } = useAuth();
    const [isNewChat, setIsNewChat] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { id: chat_id } = useParams();

    const project_id = import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID;
    const user_name = user?.email!;
    const user_secret = user?.uid!;
    const messagesOfId = useSelector((state: RootState) =>
        state.messages.find((message) => message.chatId == chat_id)
    );

    const socketUrl = `wss://api.chatengine.io/person/?publicKey=${project_id}&username=${user_name}&secret=${user_secret}`;

    const readChats = async (last_message_id: number | undefined) => {
        if (!chat_id || !last_message_id) return;
        const { data } = await readMessage(
            project_id,
            user_name,
            user_secret,
            chat_id,
            last_message_id
        );
        // const filteredData = data.filter(
        //     (user) => self?.email != user.email
        // );
        // setUsers(filteredData);
    };

    // const [data, setData] = useState<any>(null);

    const { readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log("opened"),
        onClose: (event) => console.log(event),
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
                    dispatch(editAndMoveToStart(data));
                    break;
                default:
                    // console.log(data);
                    break;
            }
            // setData(JSON.parse(event.data));
        },
        onError: (error) => console.log(error),
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        const lastMessageID = messagesOfId?.messages.at(-1)?.id;

        readChats(lastMessageID).catch(console.error);
    }, [chat_id]);

    // useEffect(() => {
    //     console.log(JSON.parse(data).data);
    // }, [data]);
    return (
        <div className=" w-screen flex-1 p-4 h-screen flex gap-4 bg-[#f5f5f5] -z-30">
            <Sidebar />
            {/* <SidebarButton Icon={MessageIcon} /> */}
            <MessageListBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <MessageContent isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
        </div>
    );
}

export default Home;
