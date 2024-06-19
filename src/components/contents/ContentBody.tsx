import { FunctionComponent } from "react";
import OpponentMessage from "./OpponentMessage";

type TComponentProps = {
    isNewChat: boolean;
};

const ContentBody: FunctionComponent<TComponentProps> = ({ isNewChat }) => {
    return (
        <div className="flex flex-col flex-1 relative overflow-y-scroll z-10">
            {isNewChat ? null : <OpponentMessage />}
            <OpponentMessage />
        </div>
    );
};

export default ContentBody;
