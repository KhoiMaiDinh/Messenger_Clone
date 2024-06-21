import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";

import AvatarComponent from "@/components/others/Avatar";
import defaultAvt from "@/assets/images/default_avt.png";
import { IC_X } from "@/assets/icons";
import { useParams } from "react-router-dom";

type TComponentProps = {
    userName: string;
    imgUrl?: string;
    lastMessage?: string;
    isOnline: boolean;
    chatId?: number;
    setIsNewChat?: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: () => void;
};
const MessageItem: FunctionComponent<TComponentProps> = ({
    userName,
    imgUrl = defaultAvt,
    lastMessage,
    isOnline,
    chatId,
    setIsNewChat,
    onClick,
}) => {
    const { id: current_id } = useParams();
    return (
        <div className=" w-full h-[68px] p-[4px] rounded-sm group">
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
                    imgUrl={imgUrl}
                />

                <div className="flex flex-1 flex-col text-start pl-[10px]">
                    <span className="text-[15px] font-medium">{userName}</span>
                    {/* <div className="block w-full h-2" /> */}
                    {lastMessage && (
                        <div className="flex text-[13px] leading-4 font-normal">
                            <span className="inline">{lastMessage}</span>
                            <span className="inline px-[2px]">·</span>
                            <span className="inline">1 ngày</span>
                        </div>
                    )}
                </div>
                {setIsNewChat && (
                    <div className="opacity-0 group-hover:opacity-100">
                        <Button
                            isIconOnly
                            className=" rounded-full w-6 h-6 p-0 min-w-6 bg-[rgba(0, 0, 0, 0.5)]"
                            onClick={() => setIsNewChat(false)}
                        >
                            <IC_X />
                        </Button>
                    </div>
                )}
            </Button>
            {/* </div> */}
        </div>
    );
};

export default MessageItem;
