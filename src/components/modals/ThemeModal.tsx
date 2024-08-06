import ThemeSets from "@/app/features/theme/themeConstance";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import MessageItem from "../contents/MessageItem";
import ThemeListItem from "../contents/ThemeListItem";
import { ThemeState, updateTheme } from "@/app/features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateChat } from "@/api/chat";
import { useAuth } from "@/contexts/authContext";
import { useParams } from "react-router-dom";

type TComponentProps = {
    isOpen: boolean;
    onOpenChange: (val: boolean) => void;
};

export default function ThemeModal({ isOpen, onOpenChange }: TComponentProps) {
    const text = [
        "Có rất nhiều chủ đề để bạn lựa chọn và những chủ đề này đều khác nhau đôi chút.",
        "Tin nhắn mà bạn gửi cho người khác sẽ có màu này.",
        "Tin nhắn của bạn bè sẽ tương tự như thế này",
    ];
    const { id: chat_id } = useParams();
    const theme: any = ThemeSets;
    const { user: self } = useAuth();

    const currentTheme = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    const [selectedTheme, setSelectedTheme] = useState<ThemeState>(
        ThemeSets.SPACE_THEME
    );

    useEffect(() => {
        setSelectedTheme(currentTheme);
    }, [currentTheme]);

    const onClickItem = (theme: any) => {
        setSelectedTheme(theme);
    };

    const onClickAccept = async (onClose: () => void) => {
        // selectedTheme && dispatch(updateTheme({ newTheme: selectedTheme }));
        const JsonTheme = {
            theme: selectedTheme.key,
        };
        try {
            const res = await updateChat(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                chat_id!,
                {
                    custom_json: JSON.stringify(JsonTheme),
                }
            );
            // console.log(res);
        } catch (err) {
            console.log(err);
        }

        onClose();
    };

    const onClickCancel = (onClose: () => void) => {
        onClose();
    };
    return (
        <Modal
            className="h-3/4"
            size={"2xl"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 items-center text-lg">
                            Xem trước và chọn chủ đề
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-row flex-1">
                                <div className="flex flex-col w-[88px] flex-1 bg-white rounded-xl md ">
                                    {Object.keys(ThemeSets).map((key) => {
                                        return (
                                            <ThemeListItem
                                                themeName={theme[key].name}
                                                isPicked={false}
                                                start={theme[key].startColor}
                                                middle={theme[key].middleColor}
                                                end={theme[key].endColor}
                                                onClick={() =>
                                                    onClickItem(theme[key])
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    className={`flex flex-col flex-1 gap-[2px] rounded-xl p-1 pt-4 bg-contain ${selectedTheme?.backgroundImage}`}
                                >
                                    <MessageItem
                                        text={text[0]}
                                        isSelf
                                        type="start"
                                        id={10000}
                                        themeProp={selectedTheme}
                                    />
                                    <MessageItem
                                        text={text[1]}
                                        isSelf
                                        type="end"
                                        id={10000}
                                        themeProp={selectedTheme}
                                    />
                                    <div className="flex w-full h-[43px] items-center justify-center font-medium  text-white dark:text-[#65676B] text-[0.75rem]">
                                        03:41 15/2/19
                                    </div>
                                    <MessageItem
                                        text={text[2]}
                                        isSelf={false}
                                        type="alone"
                                        id={10000}
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-4 text-[12px]">
                            <Button
                                className="bg-white text-black font-medium w-1/2"
                                variant="light"
                                onClick={() => onClickCancel(onClose)}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="bg-[#0a7cff] text-white font-medium w-1/2"
                                onClick={() => onClickAccept(onClose)}
                            >
                                Chọn
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
