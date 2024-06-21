import React from "react";
import ContentHeader from "../bars/ContentHeader";
import ContentBottom from "../bars/ContentBottom";
import ContentBody from "./ContentBody";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageContent = ({ isNewChat, setIsNewChat }: TScreenProps) => {
    return (
        <div className="flex flex-col flex-1 rounded-xl bg-[url('@/assets/images/background_1st.jpg')] bg-cover relative overflow-hidden ">
            <ContentHeader isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <ContentBody isNewChat={isNewChat} />
            <ContentBottom />
        </div>
    );
};

export default MessageContent;
