import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";

import AvatarComponent from "@/components/others/Avatar";
import defaultAvt from "@/assets/images/default_avt.png";

type TComponentProps = {
    userName: string;
    imgUrl?: string;
    lastMessage?: string;
    isOnline: boolean;
};
const MessageItem: FunctionComponent<TComponentProps> = ({
    userName,
    imgUrl = defaultAvt,
    lastMessage,
    isOnline,
}) => {
    return (
        <div className="w-full h-[68px] p-[4px] rounded-sm">
            {/* <div className=" flex flex-1 flex-row h-full "> */}
            <Button className="hover:bg-[#f5f5f5] flex flex-1 flex-row h-full w-full rounded-md bg-white border-none focus:outline-none p-[10px] gap-0">
                <AvatarComponent
                    sizeClass={"w-[48px] h-[48px]"}
                    isOnline={isOnline}
                    imgUrl={imgUrl}
                />
                <div className="flex flex-1 flex-col text-start pl-[10px]">
                    <span className="text-[15px] font-medium">{userName}</span>
                    {/* <div className="block w-full h-2" /> */}
                    <div className="flex text-[13px] leading-4 font-normal">
                        <span className="inline">
                            Mai mình đi chơi đâu ấy nhờ
                        </span>
                        <span className="inline px-[2px]">·</span>
                        <span className="inline">1 ngày</span>
                    </div>
                </div>
            </Button>
            {/* </div> */}
        </div>
    );
};

export default MessageItem;
