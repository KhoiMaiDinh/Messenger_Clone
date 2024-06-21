import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
        <div className="flex flex-row w-full h-[60px] py-3 items-center gap-2 px-2">
            <Input
                id="text"
                onChange={formik.handleChange}
                value={formik.values.text}
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
