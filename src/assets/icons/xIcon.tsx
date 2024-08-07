export default function XIcon({
    width = 12,
    height = 12,
}: {
    width?: number;
    height?: number;
}) {
    return (
        <svg
            viewBox="6 6 24 24"
            fill="currentColor"
            width={width}
            height={height}
            overflow="visible"
        >
            <path d="m12.631 25.138 5.196-5.189a.25.25 0 0 1 .353 0l5.197 5.189a1.241 1.241 0 0 0 1.76 0 1.241 1.241 0 0 0 0-1.761L19.95 18.18a.25.25 0 0 1 0-.354l5.188-5.196a1.241 1.241 0 0 0 0-1.76 1.241 1.241 0 0 0-1.76 0l-5.197 5.188a.25.25 0 0 1-.353 0l-5.196-5.189a1.241 1.241 0 0 0-1.76 0 1.241 1.241 0 0 0 0 1.761l5.188 5.196a.25.25 0 0 1 0 .354l-5.189 5.196a1.241 1.241 0 0 0 0 1.76 1.241 1.241 0 0 0 1.761 0z"></path>
        </svg>
    );
}
