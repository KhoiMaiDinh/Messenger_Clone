/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CHAT_ENGINE_PROJECT_ID: string;
    VITE_CHAT_ENGINE_PRIVATE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
