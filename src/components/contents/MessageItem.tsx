import { FunctionComponent, HTMLProps } from "react";
import AvatarComponent from "../others/Avatar";

export type TMessageStatus = "start" | "middle" | "end" | "alone";

type TComponentProps = {
    text: string;
    id: number;
    imgUrl?: string;
    opponentImgUrl?: string;
    isSelf: boolean;
    isSeen?: boolean;
    type: TMessageStatus;
};

const MessageItem: FunctionComponent<TComponentProps> = ({
    text,
    id,
    imgUrl,
    opponentImgUrl,
    isSelf,
    isSeen = false,
    type,
}) => {
    const startLeftClassName = "rounded-[18px] rounded-bl-[4px] ";
    const middleLeftClassName = "rounded-[18px] rounded-l-[4px] ";
    const endLeftClassName = "rounded-[18px] rounded-tl-[4px] ";

    const startRightClassName = "rounded-[18px] rounded-br-[4px] ";
    const middleRightClassName = "rounded-[18px] rounded-r-[4px] ";
    const endRightClassName = "rounded-[18px] rounded-tr-[4px] ";
    const StandAloneClassName = "rounded-[18px]";
    const left = "justify-start";
    const right = "justify-end ";
    // console.log(text);s

    const getClassName = (isSelf: boolean, type: string) => {
        if (type == "alone") return StandAloneClassName;
        if (isSelf) {
            // right
            if (type == "start") return startRightClassName;
            if (type == "middle") return middleRightClassName;
            if (type == "end") return endRightClassName;
        } else {
            //left
            if (type == "start") return startLeftClassName;
            if (type == "middle") return middleLeftClassName;
            if (type == "end") return endLeftClassName;
        }
    };
    const stringWithBrTags = text.replace(/\[nl\]/g, "\n");
    return (
        <div className="flex flex-col">
            <div className={`flex pl-3 gap-2 pr-2 ${isSelf ? right : left}`}>
                {!isSelf && (
                    <AvatarComponent
                        imgUrl={imgUrl}
                        sizeClass={`w-[28px] h-[28px] ${
                            type == "end" || type == "alone" ? "" : "invisible"
                        }`}
                    />
                )}
                <div
                    className={
                        `flex max-w-1/2 md:max-w-[67%] ${
                            isSelf
                                ? "bg-gradient-to-b from-[#FFBCD1] via-[#BD95EB] to-[#10DDFF] bg-fixed "
                                : "bg-[#F0F0F0]"
                        } w-fit px-3 py-2  ` + getClassName(isSelf, type)
                    }
                >
                    <p
                        className={`w-full break-words text-[15px] whitespace-pre  ${
                            isSelf ? "text-white" : "text-black"
                        }`}
                    >
                        {stringWithBrTags}
                    </p>
                </div>
            </div>
            {isSeen && (
                <div className="flex justify-end h-[21px] pr-2 items-center">
                    <AvatarComponent
                        imgUrl={opponentImgUrl}
                        sizeClass="w-[14px] h-[14px]"
                    />
                </div>
            )}
            {id <= 9999 && (
                <div className="flex justify-end h-4 pr-2">
                    {/* {isSeen && <AvatarComponent imgUrl={imgUrl} />} */}
                    <span className="text-white dark:text-[#65676B] text-[12px] ">
                        Đang gửi
                    </span>
                </div>
            )}
        </div>
    );
};

export default MessageItem;
