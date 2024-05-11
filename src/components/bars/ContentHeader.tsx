import React from "react";
import AvatarComponent from "@/components/others/Avatar";

const ContentHeader = () => {
    return (
        <div className="flex flex-row w-full h-14 backdrop-blur-sm px-3 py-[4px] border-b-1 border-[gray]">
            <div className="flex flex-row h-full items-center gap-3 hover:bg-[#1313130f] px-2 rounded-md">
                <AvatarComponent userName="Khoi" isOnline={false} size={36} />
                <div>
                    <span className=" text-[15px] font-semibold text-white">
                        Dinh Khoi
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
