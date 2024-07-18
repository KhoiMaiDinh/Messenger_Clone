import {
    FunctionComponent,
    KeyboardEvent,
    MutableRefObject,
    useEffect,
} from "react";
import * as Yup from "yup";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { createMessage } from "@/api/message";
import {
    addNewMessage,
    replaceTempMessage,
} from "@/app/features/message/messageSlice";
import { IC_Send, IC_Smile } from "@/assets/icons";
import { useAuth } from "@/contexts/authContext";
import { IMessage } from "@/types/Message";

type TComponentProps = {
    inputRef: MutableRefObject<HTMLTextAreaElement | null>;
};
const ContentBottom: FunctionComponent<TComponentProps> = ({ inputRef }) => {
    const { id: current_id } = useParams();
    const { user: self } = useAuth();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: (values, onSubmitProps) => {
            let text = values.text;
            onSubmitProps.resetForm();
            text = text.replace(/\n/g, "[nl]").trim();

            handleCreateMessage(text).catch((e) => console.error(e));
        },
        validationSchema: Yup.object({
            text: Yup.string().required(),
        }),
    });

    const handleCreateMessage = async (text: string) => {
        try {
            const tempId: number = Math.floor(1000 + Math.random() * 9000);
            const tempMessage: IMessage = {
                text,
                id: tempId,
                created: new Date().toISOString(),
                sender: {
                    avatar: self?.photoURL!,
                    username: self?.email!,
                    first_name: self?.displayName!,
                },
            };
            dispatch(
                addNewMessage({ chatId: current_id!, message: tempMessage })
            );
            const { data } = await createMessage(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                current_id!,
                text
            );
            dispatch(
                replaceTempMessage({
                    chatId: current_id!,
                    message: data,
                    tempMessageId: tempId,
                })
            );
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            console.log("Enter key pressed!");
            formik.handleSubmit(event as any);
            event.preventDefault();
        }
    };
    return (
        <div className="flex flex-row w-full min-h-[60px] py-3 items-center gap-2 px-2 border-t-1 border-[#10DDFF] mt-[2px] ">
            <Textarea
                ref={inputRef}
                onKeyDown={handleKeyPress}
                id="text"
                onChange={formik.handleChange}
                value={formik.values.text}
                // className="min-h-[36px] overflow-x-hidden overflow-y-auto"
                placeholder="Aa"
                radius="full"
                minRows={1}
                maxRows={6}
                classNames={{
                    innerWrapper: "items-center",
                    inputWrapper:
                        "data-[hover=true]:bg-default-100 min-h-[36px] py-0 pr-1 items-center justify-center ",
                    base: ["min-h-[36px] p-0"],
                }}
                endContent={
                    <button className="flex p-0 rounded-full self-end">
                        <IC_Smile color="#10DDFF" />
                    </button>
                }
            />
            <button
                type="button"
                onClick={(e) => formik.handleSubmit(e as any)}
                className="flex p-0 rounded-full h-[36px] w-[36px] items-center justify-center bg-transparent hover:bg-white"
            >
                <IC_Send color="#10DDFF" />
            </button>
        </div>
    );
};

export default ContentBottom;
