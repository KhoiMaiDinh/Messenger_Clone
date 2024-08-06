import { RootState } from "@/app/store";
import { IC_Smile } from "@/assets/icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import data from "@emoji-mart/data/sets/15/facebook.json";
import EmojiPicker from "@emoji-mart/react";

type TComponentProps = {
    handleIconClick: (val: any) => void;
};
const IconPickerDropdown: FunctionComponent<TComponentProps> = ({
    handleIconClick,
}) => {
    const theme = useSelector((state: RootState) => state.theme);
    return (
        <Popover showArrow placement="top-end" classNames={{ content: "p-0" }}>
            <PopoverTrigger>
                <button className="flex p-0 rounded-full self-end">
                    <IC_Smile color={theme.endColor} />
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <EmojiPicker
                    set="facebook"
                    data={data}
                    onEmojiSelect={handleIconClick}
                    previewPosition="none"
                    emojiSize={30}
                    perLine={8}
                    locale="vi"
                />
            </PopoverContent>
        </Popover>
    );
};

export default IconPickerDropdown;
