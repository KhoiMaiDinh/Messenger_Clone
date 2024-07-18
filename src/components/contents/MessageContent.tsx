import React, { useRef } from "react";
import ContentHeader from "../bars/ContentHeader";
import ContentBottom from "../bars/ContentBottom";
import ContentBody from "./ContentBody";
import { useParams } from "react-router-dom";

type TScreenProps = {
    isNewChat: boolean;
    isOpenInfo: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenInfo: (value: boolean) => void;
};

const MessageContent = ({
    isNewChat,
    isOpenInfo,
    setIsNewChat,
    setIsOpenInfo,
}: TScreenProps) => {
    const { id } = useParams();
    const bottomRef = useRef<HTMLTextAreaElement>(null);
    const onBodyClick = () => {
        bottomRef.current?.focus();
    };

    return (
        <div className="flex flex-col flex-[2_2_0%] rounded-xl bg-[url('@/assets/images/background_1st.jpg')] bg-cover relative overflow-hidden ">
            <ContentHeader
                isNewChat={isNewChat}
                setIsNewChat={setIsNewChat}
                setIsOpenInfo={setIsOpenInfo}
                isOpenInfo={isOpenInfo}
            />
            <ContentBody isNewChat={isNewChat} onClick={onBodyClick} />
            {id != undefined ? <ContentBottom inputRef={bottomRef} /> : null}
        </div>
    );
};

export default MessageContent;
