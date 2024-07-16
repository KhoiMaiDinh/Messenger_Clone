import React from "react";
import ContentHeader from "../bars/ContentHeader";
import ContentBottom from "../bars/ContentBottom";
import ContentBody from "./ContentBody";
import { useParams } from "react-router-dom";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageContent = ({ isNewChat, setIsNewChat }: TScreenProps) => {
    const { id } = useParams();
    return (
        <div className="flex flex-col flex-[2_2_0%] rounded-xl bg-[url('@/assets/images/background_1st.jpg')] bg-cover relative overflow-hidden ">
            <ContentHeader isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <ContentBody isNewChat={isNewChat} />
            {id != undefined ? <ContentBottom /> : null}
        </div>
    );
};

export default MessageContent;
