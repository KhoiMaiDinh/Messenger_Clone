import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import useWebSocket from "react-use-websocket";

import Sidebar from "@/components/bars/Sidebar";
import MessageListBar from "@/components/bars/MessageListBar";
import MessageContent from "@/components/contents/MessageContent";
import { useAuth } from "@/contexts/authContext";
import { useDispatch } from "react-redux";
import { addNewMessage } from "@/app/features/message/messageSlice";

function Home() {
    const { user } = useAuth();
    const [isNewChat, setIsNewChat] = useState<boolean>(false);
    const dispatch = useDispatch();

    const project_id = import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID;
    const user_name = user?.email;
    const user_secret = user?.uid;

    const socketUrl = `wss://api.chatengine.io/person/?publicKey=${project_id}&username=${user_name}&secret=${user_secret}`;

    // const [data, setData] = useState<any>(null);

    const { readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log("opened"),
        onClose: (event) => console.log(event),
        onMessage: (event) => {
            console.log(event?.data);
            const data = JSON.parse(event.data);
            const action = data.action;
            switch (action) {
                case "new_message":
                    dispatch(
                        addNewMessage({
                            chatId: data.data.id,
                            message: data.data.message,
                        })
                    );
                    break;

                default:
                    break;
            }
            // setData(JSON.parse(event.data));
        },
        onError: (error) => console.log(error),
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        console.log({ readyState });
    }, [readyState]);

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
