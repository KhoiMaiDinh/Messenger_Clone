import * as Yup from "yup";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { createMessage } from "@/api/message";
import { addNewMessage } from "@/app/features/message/messageSlice";
import { IC_Send, IC_Smile } from "@/assets/icons";
import { useAuth } from "@/contexts/authContext";

const ContentBottom = () => {
    const { id: current_id } = useParams();
    const { user: self } = useAuth();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: (values, onSubmitProps) => {
            handleCreateMessage(values.text).then(() =>
                onSubmitProps.resetForm()
            );
        },
        validationSchema: Yup.object({
            text: Yup.string().required(),
        }),
    });

    const handleCreateMessage = async (text: string) => {
        try {
            const { data } = await createMessage(
                import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                self?.email!,
                self?.uid!,
                current_id!,
                text
            );
            dispatch(addNewMessage({ chatId: current_id!, message: data }));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-row w-full min-h-[60px] py-3 items-center gap-2 px-2 bg-blue-400">
            <Textarea
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
                        <IC_Smile />
                    </button>
                }
            />
            <button
                type="button"
                onClick={(e) => formik.handleSubmit(e as any)}
                className="flex p-0 rounded-full h-[36px] w-[36px] items-center justify-center bg-[#f9f9f9c5] hover:bg-white"
            >
                <IC_Send />
            </button>
        </div>
    );
};

export default ContentBottom;
