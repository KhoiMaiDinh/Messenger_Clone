import React from "react";
import MessageListHeader from "./MessageListHeader";
import MessageItem from "@/components/contents/MessageListItem";

const MessageListBar = () => {
    return (
        <div className="flex flex-col w-[88px] md:w-[360px] bg-white rounded-xl md">
            <MessageListHeader />
            <div className="flex flex-1 overflow-y-scroll px-[6px]">
                <MessageItem />
                {/* {Array(5).map((item) => (
                    <MessageItem />
                ))} */}
            </div>
        </div>
    );
};

export default MessageListBar;
