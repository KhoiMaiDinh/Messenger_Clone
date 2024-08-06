import { Button } from "@nextui-org/react";
import { FunctionComponent, useMemo } from "react";

import AvatarComponent from "@/components/others/Avatar";
import defaultAvt from "@/assets/images/default_avt.png";
import { IC_X } from "@/assets/icons";
import { useParams } from "react-router-dom";
import { ILastMessage } from "@/types/Chat";
import { getTime } from "@/utils/time";
import { useAuth } from "@/contexts/authContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ThemeSets from "@/app/features/theme/themeConstance";

type TComponentProps = {
    themeName: string;
    start: string;
    middle: string;
    end: string;
    themeDescription?: string;
    isPicked?: boolean;
    id?: number;

    onClick?: () => void;
};
const ThemeListItem: FunctionComponent<TComponentProps> = ({
    start = "#000000",
    middle = "#333333",
    end = "#ffffff",
    themeName,
    themeDescription,
    isPicked = false,
    onClick,
}) => {
    const { id: current_id } = useParams();
    const { user } = useAuth();
    const themes = ThemeSets;

    const getStart = (start: string) => {
        return `from-[${start}]`;
    };

    const getMiddle = (middle: string) => {
        return `via-[${middle}]`;
    };

    const getEnd = (end: string) => {
        return `to-[${end}]`;
    };
    console.log("aa", getMiddle(middle));
    return (
        <div className=" w-full h-[68px] py-[1px] px-[4px] rounded-sm group">
            {/* <div className=" flex flex-1 flex-row h-full "> */}
            <Button
                onClick={onClick}
                className={`${
                    isPicked ? "bg-[#f5f5f5]" : "bg-white"
                } hover:bg-[#f5f5f5] flex flex-1 flex-row h-full w-full rounded-md  border-none focus:outline-none p-[10px] gap-0`}
            >
                <div
                    className={`w-[48px] h-[48px] bg-gradient-to-b ${
                        start && getStart(start)
                    } ${middle && getMiddle(middle)} ${
                        end && getEnd(end)
                    } rounded-full flex`}
                ></div>

                <div className="flex flex-1 flex-col text-start pl-[10px]">
                    <span className="text-[15px] font-medium">{themeName}</span>
                    {/* <div className="block w-full h-2" /> */}
                    {themeDescription?.length && (
                        <div className={`flex`}>
                            {themeDescription && (
                                <p className=" w-full min-w-0 text-[13px] leading-4 flex items-center ">
                                    <span
                                        className={`
                                                font-normal inline-block overflow-hidden break-words  truncate lg:max-w-[200px] md:max-w-[100px]`}
                                    >
                                        {themeDescription}
                                    </span>
                                    <span className="inline px-[2px]">·</span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </Button>
            {/* </div> */}
        </div>
    );
};

export default ThemeListItem;
