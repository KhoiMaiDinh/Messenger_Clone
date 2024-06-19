import React, {
    FunctionComponent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import AvatarComponent from "@/components/others/Avatar";
import defaultAvt from "@/assets/images/default_avt.png";
import { fetchUsers } from "@/api/user";
import { useAuth } from "@/contexts/authContext";
import { IUser } from "@/types/User";
import { Button } from "@nextui-org/react";
import { createChat } from "@/api/chat";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/app/features/chat/chatSlice";
import { IChat } from "@/types/Chat";
import { RootState } from "@/app/store";

type TComponentProps = {
    isNewChat: boolean;
    userName: string;
};

const ContentHeader: FunctionComponent<TComponentProps> = ({
    isNewChat,
    userName,
}) => {
    const { user: self } = useAuth();

    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const existedChats = useSelector((state: RootState) => state.chats.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsers = async () => {
            const { data }: { data: IUser[] } = await fetchUsers();
            const filteredData = data.filter(
                (user) => self?.email != user.email
            );
            setUsers(filteredData);
        };

        getUsers().catch(console.error);
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false);
        }
    };

    const handleCreateNewChat = async (
        prj_id: string,
        usr_name: string,
        usr_secret: string,
        opponent_name: string
    ) => {
        const isExisted = existedChats.some(
            (chat) =>
                chat.is_direct_chat &&
                chat.people.some((p) => p.person.username == opponent_name)
        );
        if (isExisted) return;
        try {
            setIsLoadingCreate(true);
            const newChat = await createChat(
                prj_id,
                usr_name,
                usr_secret,
                opponent_name
            );
            dispatch(add(newChat.data));
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingCreate(false);
        }
    };

    return (
        <div className="flex flex-row w-full h-14 backdrop-blur-sm px-3 py-[4px] border-b-1 border-[gray] relative z-40">
            <div className="flex flex-row h-full items-center gap-3 hover:bg-[#1313130f] px-2 rounded-md">
                {!isNewChat && (
                    <AvatarComponent
                        userName="Khoi"
                        isOnline={false}
                        sizeClass={"w-[32px] h-[32px]"}
                        imgUrl={defaultAvt}
                    />
                )}
                <div
                // className="bg-red-300 w-[100px] flex"
                // onClick={(e) => setVisible(true)}
                // onBlur={(e) => setVisible(false)}
                // tabIndex={-1}
                >
                    <span
                        className={`text-[15px] text-white ${
                            isNewChat ? "font-normal" : "font-semibold"
                        }`}
                    >
                        {isNewChat ? "Đến: " : userName}
                    </span>
                    <input
                        className=" bg-transparent focus:outline-none text-white w-[100px] inline-block"
                        onClick={(e) => setVisible(true)}
                    />
                    <div
                        ref={ref}
                        className={`absolute w-60 overflow-hidden bg-white dark:bg-dark self-start left-2 top-12 border rounded-md border-slate-300 flex overflow-y-auto flex-col max-h-[225px] transition-all duration-300 origin-top z-50s ${
                            visible
                                ? "opacity-100"
                                : " opacity-0 invisible scale-y-0"
                        }`}
                        // onBlur={(e) => setVisible(false)}
                        tabIndex={-1}
                    >
                        {users.map((user) => (
                            <Button
                                isLoading={isLoadingCreate}
                                key={user.id}
                                className={`min-h-[45px] dark:hover:bg-button w-full text-start px-2 text-sm font-normal flex items-center gap-3 hover:outline-none rounded-sm bg-white hover:bg-[#d7d3d3]`}
                                onClick={() =>
                                    handleCreateNewChat(
                                        import.meta.env
                                            .VITE_CHAT_ENGINE_PROJECT_ID,
                                        self?.email!,
                                        self?.uid!,
                                        user.username
                                    )
                                }
                            >
                                <AvatarComponent
                                    imgUrl={user.avatar}
                                    sizeClass={"h-[24px] w-[24px]"}
                                />
                                {user.email}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
