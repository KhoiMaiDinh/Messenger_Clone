import { Button } from "@nextui-org/react";
import React from "react";

type TComponentProps = {
    Icon?: React.ComponentType<{
        className?: string;
    }>;
    isIconOnly?: boolean;
    buttonClassName?: string;
    url?: string | null;
    onClick?: () => void;
};

const SidebarButton = ({
    Icon,
    isIconOnly = true,
    buttonClassName = "",
    url,
    onClick,
}: TComponentProps) => {
    return (
        <Button
            onClick={onClick}
            isIconOnly={isIconOnly}
            variant="solid"
            className={
                "w-[44px] h-[44px] focus:outline-none focus:bg-[#0000000f] hover:bg-[#0000000f] bg-transparent  border-none " +
                buttonClassName
            }
            radius="sm"
        >
            {url && <img src={url} alt="Avt" referrerPolicy="no-referrer" />}
            {Icon && <Icon />}
        </Button>
    );
};

export default SidebarButton;
