import { IC_Smile } from "@/assets/icons";
import { Button, Input } from "@nextui-org/react";

const ContentBottom = () => {
    return (
        <div className="flex flex-row w-full bg-red-300 h-[60px] py-3 items-center gap-2 px-2">
            <Input
                className="h-[36px] overflow-hidden"
                placeholder="Aa"
                radius="full"
                classNames={{
                    inputWrapper:
                        "data-[hover=true]:bg-default-100 min-h-[36px] pr-1",
                    base: ["h-[36px]"],
                }}
                endContent={
                    <button className="flex p-0 rounded-full">
                        <IC_Smile />
                    </button>
                }
            />
        </div>
    );
};

export default ContentBottom;
