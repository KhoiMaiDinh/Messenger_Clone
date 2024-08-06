import { FunctionComponent } from "react";
import AvatarComponent from "../others/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ThemeState } from "@/app/features/theme/themeSlice";
import ThemeSets from "@/app/features/theme/themeConstance";
import data from "@emoji-mart/data/sets/15/facebook.json";
import { init } from "emoji-mart";
import parse from "html-react-parser";
import { convertIconInString } from "@/utils/string";
import { brRegex, iconRegex } from "@/const/regex";
import { IC_SmallLike } from "@/assets/icons";

export type TMessageStatus = "start" | "middle" | "end" | "alone";

type TComponentProps = {
    text: string;
    id: number;
    imgUrl?: string;
    opponentImgUrl?: string;
    isSelf: boolean;
    isSeen?: boolean;
    type: TMessageStatus;
    themeProp?: ThemeState;
};

const MessageItem: FunctionComponent<TComponentProps> = ({
    text,
    id,
    imgUrl,
    opponentImgUrl,
    isSelf,
    isSeen = false,
    type,
    themeProp,
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

    init({ data });
    const stringWithBrTags = text.replace(brRegex, "\n");
    const StringToElement = parse(convertIconInString(stringWithBrTags));
    const IconsAlone = parse(convertIconInString(stringWithBrTags, 32));
    const theme = themeProp ?? useSelector((state: RootState) => state.theme);

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

    const stopClickPropagation = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
    };

    const allIsIcon = (str: string) => {
        return str.match(iconRegex)?.join("") == str ? true : false;
    };

    if (stringWithBrTags == "*like*")
        return (
            <div className="flex flex-col">
                <div
                    onClick={stopClickPropagation}
                    className={`flex pl-3 gap-2 pr-2 ${isSelf ? right : left}`}
                >
                    <div className="w-[28px] h-[28px] invisible mr-1" />
                    <IC_SmallLike
                        width={32}
                        height={32}
                        fill={theme.endColor}
                    />
                </div>
            </div>
        );

    if (allIsIcon(stringWithBrTags))
        return (
            <div className="flex flex-col">
                <div
                    onClick={stopClickPropagation}
                    className={`flex pl-3 gap-1 pr-2 ${isSelf ? right : left}`}
                >
                    <div className="w-[28px] h-[28px] invisible mr-1" />
                    {IconsAlone}
                </div>
            </div>
        );

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
                    onClick={stopClickPropagation}
                    className={
                        `flex max-w-1/2 md:max-w-[67%] ${
                            isSelf
                                ? `bg-gradient-to-b 
                                ${
                                    theme.key == ThemeSets.SPACE_THEME.key
                                        ? "from-[#FFBCD1] via-[#BD95EB] to-[#10DDFF]"
                                        : ""
                                }
                                ${
                                    theme.key == ThemeSets.DEFAULT_THEME.key
                                        ? "from-[#9F03F5] via-[#503FF5] to-[#0478F5]"
                                        : ""
                                }
                                ${
                                    theme.key == ThemeSets.LEMON_THEME.key
                                        ? "from-[#F1D400] via-[#6CDF05] to-[#0ADFA9]"
                                        : ""
                                }
                                bg-fixed `
                                : "bg-[#F0F0F0]"
                        } w-fit px-3 py-2  ` + getClassName(isSelf, type)
                    }
                >
                    <p
                        className={`w-full text-wrap break-words text-[15px] whitespace-pre  ${
                            isSelf ? "text-white" : "text-black"
                        }`}
                    >
                        {StringToElement}
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
