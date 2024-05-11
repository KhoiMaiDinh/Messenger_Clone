import { Avatar } from "@nextui-org/react";
import { FunctionComponent } from "react";
import a from "@/assets/images/avatar.jpg";

type TComponentProps = {
    isOnline?: boolean;
    userName?: string;
    size?: number;
    imageLink?: string;
};
const AvatarComponent: FunctionComponent<TComponentProps> = ({
    imageLink,
    isOnline = false,
    userName = "username",
    size = 36,
}) => {
    const className: string = `w-[${size?.toString()}px] h-[${size?.toString()}px]`;
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
                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/428614771_3287800468185394_5573653990656611987_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-IsTc530zKgAb7VypVE&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfCmC5zipcrW-8WrsVQo7TDs1n1vJvc_R1rh8x5C-mcPvA&oe=662E98A3"
                className={`w-[${size?.toString()}px] h-[${size?.toString()}px]`}
                size="md"
            />
            {isOnline && (
                <div className=" w-3 h-3 bg-green-500 rounded-full outline outline-2 outline-white absolute bottom-0 right-0" />
            )}
        </div>
    );
};

export default AvatarComponent;
