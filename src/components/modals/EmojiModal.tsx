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
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/15/facebook.json";
import { IC_X } from "@/assets/icons";

type TComponentProps = {
    isOpen: boolean;
    onOpenChange: (val: boolean) => void;
};

export default function EmojiModal({ isOpen, onOpenChange }: TComponentProps) {
    const text = [
        "Có rất nhiều chủ đề để bạn lựa chọn và những chủ đề này đều khác nhau đôi chút.",
        "Tin nhắn mà bạn gửi cho người khác sẽ có màu này.",
        "Tin nhắn của bạn bè sẽ tương tự như thế này",
    ];
    const { id: chat_id } = useParams();
    const theme: any = ThemeSets;
    const { user: self } = useAuth();

    const currentChat = useSelector((state: RootState) =>
        state.chats.chats.find((c) => c.id.toString() == chat_id)
    );
    const currentEmoji = useSelector((state: RootState) => state.emoji);

    const dispatch = useDispatch();

    const onClickItem = (theme: any) => {
        // setSelectedTheme(theme);
    };

    const onClickIcon = async (onClose: () => void, emoji: string) => {
        // selectedTheme && dispatch(updateTheme({ newTheme: selectedTheme }));
        let custom_json = JSON.parse(currentChat?.custom_json!);
        custom_json = {
            ...custom_json,
            emoji,
        };
        try {
            const res = await updateChat(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                chat_id!,
                {
                    custom_json: JSON.stringify(custom_json),
                }
            );
            // console.log(res);
        } catch (err) {
            console.log(err);
        }

        onClose();
    };

    const handleClickRemove = async (onClose: () => void) => {
        let custom_json = JSON.parse(currentChat?.custom_json!);
        custom_json = {
            ...custom_json,
            emoji: null,
        };
        try {
            const res = await updateChat(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                chat_id!,
                {
                    custom_json: JSON.stringify(custom_json),
                }
            );
            // console.log(res);
        } catch (err) {
            console.log(err);
        }

        onClose();
    };
    return (
        <Modal
            className=" w-[420px]"
            size={"2xl"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                closeButton: "t-0 translate-y-1/4 ",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 items-center text-lg p-0 my-4 relative ">
                            Biểu tượng cảm xúc
                        </ModalHeader>
                        <ModalBody className="pb-0 h-full">
                            <div className="flex flex-col flex-1 ">
                                {currentEmoji != null && (
                                    <div className="flex w-full justify-between items-center">
                                        <div>
                                            <p className="font-semibold">
                                                Biểu tượng cảm xúc hiện tại
                                            </p>
                                            <em-emoji
                                                native={currentEmoji.emojiCode}
                                                size="24px"
                                                set="facebook"
                                            ></em-emoji>
                                        </div>
                                        <Button
                                            className="w-[74px] min-h-8 rounded-md text-[15px] font-semibold text-[#050505] p-1 bg-[#0000000A]"
                                            startContent={
                                                <IC_X width={18} height={18} />
                                            }
                                            onClick={() =>
                                                handleClickRemove(onClose)
                                            }
                                        >
                                            Gỡ
                                        </Button>
                                    </div>
                                )}
                                <EmojiPicker
                                    set="facebook"
                                    data={data}
                                    maxFrequentRows={0}
                                    dynamicWidth={true}
                                    previewPosition="none"
                                    navPosition="bottom"
                                    emojiSize={25}
                                    locale="vi"
                                    onEmojiSelect={(val: any) =>
                                        onClickIcon(onClose, val.native)
                                    }
                                />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
