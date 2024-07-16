import { RootState } from "@/app/store";
import { IC_Arrow, IC_Google, IC_Search } from "@/assets/icons";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type TScreenProps = {
    isNewChat: boolean;
    setIsNewChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoAndSettingBar = ({}) => {
    const { user: self } = useAuth();
    const { id } = useParams();
    const chatInfo = useSelector((state: RootState) =>
        state.chats.chats.find((chat) => chat.id.toString() == id)
    );
    const opponentInfo = chatInfo?.people.find(
        (person) => person.person.username != self?.email
    );
    return (
        <div className="flex flex-col max-md:w-[88px] flex-1 bg-white text-black rounded-xl items-center">
            <div className=" mt-4 mb-3 ">
                <img
                    className="w-[72px] h-[72px] rounded-full"
                    alt="Avt"
                    src={opponentInfo?.person.avatar}
                />
            </div>
            <p className="text-lg text-[#050505] font-semibold">
                {opponentInfo?.person.first_name}
            </p>
            <div className="w-full h-[100px] flex flex-row justify-center items-center">
                <div className="flex flex-col items-center w-[80px]">
                    <Button
                        isIconOnly
                        radius="full"
                        className="w-[36px] h-[36px] min-w-0"
                    >
                        <IC_Google />
                    </Button>
                    <span className="text-[13px] font-normal text-[#050505]">
                        Gmail
                    </span>
                </div>
                <div className="flex flex-col items-center w-[80px]">
                    <Button
                        isIconOnly
                        radius="full"
                        className="w-[36px] h-[36px] min-w-0"
                    >
                        <IC_Search />
                    </Button>
                    <span className="text-[13px] font-normal text-[#050505]">
                        Tìm Kiếm
                    </span>
                </div>
            </div>
            <div className="flex flex-1 w-full py-5">
                <div className="w-full h-11 px-2 flex ">
                    <Button className="w-full items-center justify-between px-2 h-full rounded-md bg-white hover:bg-[#dad7d7] transition-transform-background">
                        <span className="text-[15px] text-[#050505] font-semibold">
                            Tùy chỉnh đoạn chat
                        </span>
                        <IC_Arrow />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InfoAndSettingBar;
