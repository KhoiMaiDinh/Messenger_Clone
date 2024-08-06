import { Button } from "@nextui-org/react";
import { FunctionComponent, useMemo } from "react";

import AvatarComponent from "@/components/others/Avatar";
import defaultAvt from "@/assets/images/default_avt.png";
import { IC_X } from "@/assets/icons";
import { useParams } from "react-router-dom";
import { ILastMessage } from "@/types/Chat";
import { getTime } from "@/utils/time";
import { useAuth } from "@/contexts/authContext";
import { convertIconInString } from "@/utils/string";
import parse from "html-react-parser";
import { brRegex } from "@/const/regex";

type TComponentProps = {
    userName: string;
    imgUrl?: string;
    lastMessage?: ILastMessage;
    isOnline: boolean;
    chatId?: number;
    lastReadMessageId?: number | null;
    setIsNewChat?: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: () => void;
};
const MessageItem: FunctionComponent<TComponentProps> = ({
    userName,
    imgUrl = defaultAvt,
    lastMessage,
    isOnline,
    chatId,
    lastReadMessageId,
    setIsNewChat,
    onClick,
}) => {
    const { id: current_id } = useParams();
    const { user } = useAuth();
    const StringToElement = parse(
        convertIconInString(lastMessage?.text.replace(brRegex, "\n")!)
    );
    const avatarMemo = imgUrl;
    return (
        <div className=" w-full h-[68px] py-[1px] px-[4px] rounded-sm group">
            {/* <div className=" flex flex-1 flex-row h-full "> */}
            <Button
                onClick={onClick}
                className={`${
                    current_id == chatId ? "bg-[#f5f5f5]" : "bg-white"
                } hover:bg-[#f5f5f5] flex flex-1 flex-row h-full w-full rounded-md  border-none focus:outline-none p-[10px] gap-0`}
            >
                <AvatarComponent
                    sizeClass={"w-[48px] h-[48px]"}
                    isOnline={isOnline}
                    imgUrl={avatarMemo}
                />

                <div className="flex flex-1 flex-col text-start pl-[10px]">
                    <span className="text-[15px] font-medium">{userName}</span>
                    {/* <div className="block w-full h-2" /> */}
                    {lastMessage?.text && (
                        <div className={`flex`}>
                            {lastMessage && (
                                <p className=" w-full min-w-0 text-[13px] leading-4 flex items-center ">
                                    <span
                                        className={`${
                                            lastReadMessageId == lastMessage.id
                                                ? "font-normal"
                                                : "font-bold"
                                        } inline-block overflow-hidden break-words  truncate lg:max-w-[200px] md:max-w-[100px]`}
                                    >
                                        {lastMessage.sender_username ==
                                        user?.email
                                            ? "Bạn: "
                                            : ``}

                                        {StringToElement}
                                    </span>
                                    <span className="inline px-[2px]">·</span>
                                    <span className="inline">
                                        {getTime(lastMessage.created)}
                                    </span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
                {setIsNewChat && (
                    <div className="opacity-0 group-hover:opacity-100">
                        <div
                            className=" rounded-full w-6 h-6 p-0 min-w-6 bg-[#00000066] justify-center items-center flex hover:border-1 hover:border-black"
                            onClick={() => setIsNewChat(false)}
                        >
                            <IC_X />
                        </div>
                    </div>
                )}
            </Button>
            {/* </div> */}
        </div>
    );
};

export default MessageItem;
