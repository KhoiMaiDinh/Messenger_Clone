import { Avatar } from "@nextui-org/react";
import { FunctionComponent } from "react";
import a from "@/assets/images/avatar.jpg";

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
    // const className: string = `w-[${size?.toString()}px] h-[${size?.toString()}px]`;
    return (
        <div
            className={
                "relative flex"
                // `w-[${size?.toString()}px] h-[${size?.toString()}px]`
            }
        >
            <Avatar
                showFallback
                name={userName}
                src={imgUrl}
                className={sizeClass}

                // size="sm"
            />
            {isOnline && (
                <div className=" w-3 h-3 bg-green-500 rounded-full outline outline-2 outline-white absolute bottom-0 right-0" />
            )}
        </div>
    );
};

export default AvatarComponent;
