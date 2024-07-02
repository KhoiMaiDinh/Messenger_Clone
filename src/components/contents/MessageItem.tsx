import { FunctionComponent, HTMLProps } from "react";
import AvatarComponent from "../others/Avatar";

export type TMessageStatus = "start" | "middle" | "end" | "alone";

type TComponentProps = {
    text: string;
    imgUrl?: string;
    isSelf: boolean;
    type: TMessageStatus;
};

const MessageItem: FunctionComponent<TComponentProps> = ({
    text,
    imgUrl,
    isSelf,
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
    return (
        <div className={`flex pl-3 gap-2 pr-2 ${isSelf ? right : left}`}>
            {!isSelf && <AvatarComponent imgUrl={imgUrl} />}
            <div
                className={
                    `flex max-w-1/2 md:max-w-[67%] ${
                        isSelf ? "bg-blue-500" : "bg-[#F0F0F0]"
                    } w-fit px-3 py-2 ` + getClassName(isSelf, type)
                }
            >
                <p className="w-full break-words text-[15px]">{text}</p>
            </div>
        </div>
    );
};

export default MessageItem;
