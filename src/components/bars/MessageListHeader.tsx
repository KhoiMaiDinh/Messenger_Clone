import React from "react";
import { Button } from "@nextui-org/react";
import { IC_AddMessage } from "@/assets/icons";
import SearchBar from "@/components/others/SearchBar";

const MessageListHeader = () => {
    return (
        <div className="flex flex-col w-full relative border-b-1 border-gray-400">
            <div className="flex flex-row w-full h-14 px-4 py-[4px] ">
                <div className="flex flex-row h-full items-center w-full justify-between">
                    <span className="text-[24px] font-bold text-black">
                        Đoạn chat
                    </span>
                    <Button
                        isIconOnly
                        variant="solid"
                        className="w-[36px] h-[36px] bg-[#0000000a] focus:outline-none border-none p-0"
                        radius="full"
                        size="sm"
                    >
                        <IC_AddMessage />
                    </Button>
                </div>
            </div>
            <SearchBar />
        </div>
    );
};

export default MessageListHeader;
