import React, { useContext, useCallback, useEffect } from 'react';
import Markdown from "react-markdown";
import { Context } from '../context/Context';
import Loader from "../components/Loader.jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    CodeRoundedIcon,
    LightbulbIcon,
    SchoolRoundedIcon,
    DriveFileRenameOutlineIcon,
} from "../utils/Icons.js";

// Extract code blocks and their languages
const ExtractCodeFromString = (message) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks = [];
    let match;

    while ((match = regex.exec(message)) !== null) {
        blocks.push({
            language: match[1] || 'javascript', // Default to 'javascript' if no language is specified
            code: match[2]
        });
    }

    // Split the remaining text into normal text blocks
    const textBlocks = message.split(regex).filter(Boolean);

    return { codeBlocks: blocks, textBlocks };
};

const ChatPageMain = () => {
    const { recentPrompt, setRecentPrompt, setText, resultData, btn, showResult, GetFirstName, loading } = useContext(Context);

    const handlePromptClick = useCallback((prompt) => {
        setText(prompt);
    }, [setRecentPrompt]);

    const SuggestionDataArray = [
        {
            text: "How to improve readability of code",
            ClickFuntion: () => {
                handlePromptClick("How to improve readability of code");
            },
            icon: <CodeRoundedIcon className="text-pink-400" />
        },
        {
            text: "Tips to write professional email",
            ClickFuntion: () => {
                handlePromptClick("Tips to write professional email");
            },
            icon: <SchoolRoundedIcon className="text-[#76D0EB]" />
        },
        {
            text: "Plan a daily routine for you",
            ClickFuntion: () => {
                handlePromptClick("Plan a daily routine for you");
            },
            icon: <LightbulbIcon className="text-[#E2C541]" />
        },
        {
            text: "Message to comfort a friend",
            ClickFuntion: () => {
                handlePromptClick("Message to comfort a friend");
            },
            icon: <DriveFileRenameOutlineIcon className="text-[#CB8BD0]" />
        },
    ];

    const { codeBlocks, textBlocks } = ExtractCodeFromString(resultData);

    useEffect(() => {
        console.log("Recent prompt updated:", recentPrompt);
        setText(recentPrompt);
    }, [recentPrompt]);

    return (
        <>
            {!showResult ? (
                <>
                    <div className="md:h-full md:mb-0 mb-2 w-full">
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-center">
                                <img src="./images/logo.png" className="md:size-20 lg:size-24 sm:size-16 size-12" alt="robot-logo" />
                            </div>
                            <div className="md:text-3xl lg:text-4xl lg:my-2 sm:text-2xl text-xl w-full flex items-center flex-col">
                                <h1 className="font-bold bg-gradient-to-r from-[#EC008C] to-[#00aeef] bg-clip-text text-transparent md:pb-2">Hello, {GetFirstName()}</h1>
                                <h1 className="font-bold sm:text-center text-[#C4C7C5] dark:text-[#3f4e97]">How can I help you today?</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-[#0c1649] md:my-5 lg:my-0  overflow-y-auto flex items-center justify-center flex-wrap">
                        {SuggestionDataArray.map((obj, index) => (
                            <span
                                key={index}
                                onClick={obj.ClickFuntion}
                                className="dark:border-gray-700 bg-[#f0f4f9] hover:bg-[#DDE3EA] dark:bg-transparent dark:bg-[#0d1540] dark:hover:bg-[#192151] cursor-pointer md:my-0 my-3 h-[130px] rounded-xl dark:border mx-3 w-[170px] flex flex-col"
                            >
                                <span className="px-2 pt-2">
                                    {obj.icon}
                                </span>
                                <span className="dark:text-white text-gray-600 px-3 pt-2">{obj.text}</span>
                            </span>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#c4c7c5] overflow-x-hidden dark:scrollbar-thumb-slate-700 dark:scrollbar-track-[#0c1649] scrollbar-track-[#F0F4F9] overflow-y-auto text-white flex justify-center">
                        <div className="w-[90%] sm:w-[80%] h-full">
                            <div className="flex justify-end my-5">
                                <div className="flex text-gray-600 dark:text-white rounded-xl bg-zinc-300 dark:bg-slate-700 p-3 max-w-full w-auto items-center">
                                    <span className="mx-1 w-full">
                                        <pre className="whitespace-pre-wrap break-words">
                                            <p className="text-justify overflow-hidden break-words">
                                                {recentPrompt}
                                            </p>
                                        </pre>
                                    </span>
                                </div>
                            </div>

                            {loading ? (
                                <Loader />
                            ) : (
                                <div className="flex flex-col sm:flex-row my-5 items-start">
                                    <img
                                        src={`${btn ? "./images/logo_white.png" : "./images/logo_black.png"}`}
                                        className="w-10 h-10 rounded-full border border-zinc-500 p-[5px] mx-2"
                                        alt="Icon"
                                    />
                                    <div className="ml-2 max-w-full overflow-x-hidden text-black dark:text-white">
                                        {textBlocks.map((text, index) => (
                                            <React.Fragment key={index}>
                                                <Markdown className="result break-words">
                                                    {text}
                                                </Markdown>
                                                {codeBlocks[index] && (
                                                    <div className="overflow-x-auto w-full">
                                                        <SyntaxHighlighter
                                                            key={index}
                                                            className="break-words rounded-xl"
                                                            style={btn ? dracula : coldarkCold}
                                                            language={codeBlocks[index].language}
                                                        >
                                                            {codeBlocks[index].code}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default ChatPageMain;
