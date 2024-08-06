import { Avatar } from "@nextui-org/react";
import { FunctionComponent, memo } from "react";

type TComponentProps = {
    isOnline?: boolean;
    userName?: string;
    sizeClass?: string;
    imgUrl?: string;
};
const AvatarComponent: FunctionComponent<TComponentProps> = ({
    imgUrl,
    isOnline = false,
    userName = "username",
    sizeClass = "w-[36px] h-[36px]",
}) => {
    return (
        <div className={"relative flex"}>
            <Avatar
                showFallback
                name={userName}
                src={imgUrl}
                className={sizeClass}
            />
            {isOnline && (
                <div className=" w-3 h-3 bg-green-500 rounded-full outline outline-2 outline-white absolute bottom-0 right-0" />
            )}
        </div>
    );
};

export default memo(AvatarComponent);
