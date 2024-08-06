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
import { RootState } from "@/app/store";
import { useNavigate, useParams } from "react-router-dom";
import { IC_Less, IC_More } from "@/assets/icons";

type TComponentProps = {
    isNewChat: boolean;
    isOpenInfo: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenInfo: (value: boolean) => void;
};

const ContentHeader: FunctionComponent<TComponentProps> = ({
    isNewChat,
    isOpenInfo,
    setIsNewChat,
    setIsOpenInfo,
}) => {
    const { user: self } = useAuth();
    const { id: chat_id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [newUsername, setNewUsername] = useState<string>();

    const ref = useRef<HTMLDivElement>(null);

    const opponent = useSelector((state: RootState) =>
        state.chats.chats
            .find((chat) => {
                return chat.id.toString() == chat_id!;
            })
            ?.people.find((p) => p.person.username != self?.email)
    );
    const existedChats = useSelector((state: RootState) => state.chats.chats);
    const avatars = useSelector((state: RootState) => state.chats.avatars);
    const theme = useSelector((state: RootState) => state.theme);

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

    useEffect(() => {
        if (isNewChat == false) setNewUsername(undefined);
    }, [isNewChat]);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false);
        }
    };

    const getAvatar = () => {
        return avatars.find((a) => a.username == opponent?.person.username)
            ?.avatar_url;
    };

    const handleClickNewChat = (username: string) => {
        handleCreateNewChat(
            import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
            self?.email!,
            self?.uid!,
            username
        );
        setNewUsername(username);
    };

    const handleCreateNewChat = async (
        prj_id: string,
        usr_name: string,
        usr_secret: string,
        opponent_name: string
    ) => {
        const theExistedChat = existedChats.find(
            (chat) =>
                chat.is_direct_chat &&
                chat.people.some((p) => p.person.username == opponent_name)
        );
        if (theExistedChat != undefined) navigate(`/${theExistedChat.id}`);
        try {
            setIsLoadingCreate(true);
            const newChat = await createChat(
                prj_id,
                usr_name,
                usr_secret,
                opponent_name
            );
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingCreate(false);
            setVisible(false);
        }

        setIsNewChat(false);
    };

    return (
        <div className="flex flex-row w-full h-14 backdrop-blur-sm px-3 py-[4px] border-b-1 border-[gray] relative z-40 justify-between items-center">
            <div className="flex flex-row h-full items-center gap-3 hover:bg-[#1313130f] px-2 rounded-md">
                {!isNewChat && (
                    <AvatarComponent
                        userName="avt"
                        isOnline={false}
                        sizeClass={"w-[32px] h-[32px]"}
                        imgUrl={getAvatar() || defaultAvt}
                    />
                )}
                <div>
                    <span
                        className={`text-[15px] 
                            ${theme.isTextWhite ? "text-white " : "text-black "}
                            ${isNewChat ? "font-normal" : "font-semibold"}`}
                    >
                        {isNewChat ? "Đến: " : opponent?.person.first_name}
                    </span>
                    {isNewChat && (
                        <input
                            className=" bg-transparent focus:outline-none text-white w-[100px] inline-block"
                            onClick={(e) => setVisible(true)}
                        />
                    )}
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
                                isLoading={
                                    isLoadingCreate &&
                                    newUsername == user.username
                                }
                                key={user.id}
                                className={`min-h-[45px] dark:hover:bg-button w-full text-start px-2 text-sm font-normal flex items-center justify-start gap-3 hover:outline-none rounded-sm bg-white hover:bg-[#d7d3d3]`}
                                onClick={() =>
                                    handleClickNewChat(user.username)
                                }
                            >
                                <AvatarComponent
                                    imgUrl={getAvatar()}
                                    sizeClass={"h-[24px] w-[24px]"}
                                />
                                {user.username}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <Button
                    radius="full"
                    size="sm"
                    className="min-w-0 py-0 px-[6px] w-9 h-9 border border-[#ffffffe6] bg-transparent hover:bg-[#ffffff]"
                    onClick={() => setIsOpenInfo(!isOpenInfo)}
                >
                    {isOpenInfo ? (
                        <IC_More color={theme.startColor} />
                    ) : (
                        <IC_Less color={theme.startColor} />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ContentHeader;
