import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Sidebar from "@/components/bars/Sidebar";
import MessageListBar from "@/components/bars/MessageListBar";
import MessageContent from "@/components/contents/MessageContent";
import { useAuth } from "@/contexts/authContext";

function Home() {
    const { user } = useAuth();
    const [isNewChat, setIsNewChat] = useState<boolean>(false);
    return (
        <div className=" w-screen flex-1 p-4 h-screen flex gap-4 bg-[#f5f5f5] -z-30">
            <Sidebar />
            {/* <SidebarButton Icon={MessageIcon} /> */}
            <MessageListBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <MessageContent isNewChat={isNewChat} />
        </div>
    );
}

export default Home;
