import { Button } from "@nextui-org/react";
import React from "react";

type TComponentProps = {
    Icon: React.ComponentType<{
        className?: string;
    }>;
};

const SidebarButton = ({ Icon }: TComponentProps) => {
    return (
        // <div className="">
        <Button
            isIconOnly
            variant="solid"
            className="w-[44px] h-[44px] focus:outline-none focus:bg-[#0000000f] hover:bg-[#0000000f] bg-transparent  border-none"
            radius="sm"
        >
            <Icon />
        </Button>
        // </div>
    );
};

export default SidebarButton;
