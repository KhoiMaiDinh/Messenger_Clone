import { FunctionComponent, HTMLProps } from "react";
import AvatarComponent from "../others/Avatar";

type TComponentProps = {
    text: string;
    imgUrl?: string;
    isSelf: boolean;
};

const OpponentMessage: FunctionComponent<TComponentProps> = ({
    text,
    imgUrl,
    isSelf,
}) => {
    const startLeftClassName = "";
    const StandAloneClassName = "rounded-[18px]";
    const left = "justify-start";
    const right = "justify-end ";
    return (
        <div className={`flex flex-1 pl-3 gap-2 pr-2 ${isSelf ? right : left}`}>
            {!isSelf && <AvatarComponent imgUrl={imgUrl} />}
            <div
                className={
                    "flex max-w-1/2 md:max-w-[67%] bg-blue-500 w-fit px-3 py-2 " +
                    StandAloneClassName
                }
            >
                <p className="w-full break-words text-[15px]">{text}</p>
            </div>
        </div>
    );
};

export default OpponentMessage;
