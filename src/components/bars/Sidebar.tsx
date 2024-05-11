import React from "react";
import SidebarButton from "@/components/buttons/SidebarButton";
import { IC_Image, IC_Message } from "@/assets/icons";

const Sidebar = () => {
    return (
        <div className="flex flex-col">
            <SidebarButton Icon={IC_Message} />
            <SidebarButton Icon={IC_Image} />
        </div>
    );
};

export default Sidebar;
