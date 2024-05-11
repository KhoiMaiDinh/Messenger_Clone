import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Sidebar from "@/components/bars/Sidebar";
import MessageListBar from "@/components/bars/MessageListBar";
import MessageContent from "@/components/contents/MessageContent";

function Home() {
    return (
        <div className=" w-screen flex-1 p-4 h-screen flex gap-4 bg-[#f5f5f5]">
            <Sidebar />
            {/* <SidebarButton Icon={MessageIcon} /> */}
            <MessageListBar />
            <MessageContent />
        </div>
    );
}

export default Home;
