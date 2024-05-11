import OpponentMessage from "./OpponentMessage";

const ContentBody = () => {
    return (
        <div className="flex flex-col flex-1 relative overflow-y-scroll">
            <OpponentMessage />
        </div>
    );
};

export default ContentBody;
