import SearchIcon from "@/assets/icons/searchIcon";
import { Input } from "@nextui-org/react";
import { FunctionComponent } from "react";

type TComponentProps = {};
const SearchBar: FunctionComponent<TComponentProps> = ({}) => {
    return (
        <div className="w-full h-[36px] px-4 mb-2">
            <Input
                isClearable
                size="sm"
                radius="full"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-sm",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                        "h-full",
                    ],
                    base: "h-full",
                }}
                placeholder="Type to search..."
                startContent={<SearchIcon />}
            />
            {/* <div className=" flex flex-1 flex-row h-full bg-[#646b741a] rounded-full">
                <div className="flex w-[38px] items-center justify-end">
                    <SearchIcon />
                </div>
            </div> */}
        </div>
    );
};

export default SearchBar;
