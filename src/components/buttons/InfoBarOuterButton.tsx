import { IC_Arrow } from "@/assets/icons";
import { Button } from "@nextui-org/react";
import React, { ReactNode, useState } from "react";

type TComponentProps = {
    icon?: ReactNode;
    text: string;
    children?: ReactNode;
    onClick?: () => void;
};

const InfoBarButton = ({ onClick, text, children, icon }: TComponentProps) => {
    const [childrenOpen, setChildrenOpen] = useState(false);
    const defaultClick = () => {
        setChildrenOpen(!childrenOpen);
    };
    const handleClick = onClick ?? defaultClick;
    return (
        <>
            <div className="w-full h-11 px-2 flex ">
                <Button
                    onClick={handleClick}
                    className={`w-full items-center focus:outline-none border-none ${
                        icon ? "justify-start" : "justify-between"
                    } px-2 h-full rounded-md bg-white hover:bg-[#dad7d7] transition-transform-background`}
                >
                    {icon && (
                        <div className=" w-7 h-7 bg-[#0000000a] overflow-hidden rounded-full flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <span className="text-[15px] text-[#050505] font-semibold">
                        {text}
                    </span>
                    {!icon && (
                        <div
                            className={`${
                                childrenOpen ? "rotate-90" : ""
                            } transition-transform duration-300`}
                        >
                            <IC_Arrow />
                        </div>
                    )}
                </Button>
            </div>
            {childrenOpen ? children : null}
        </>
    );
};

export default InfoBarButton;
