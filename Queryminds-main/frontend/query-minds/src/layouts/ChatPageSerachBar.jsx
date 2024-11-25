import React, { useContext, useState, useRef, useEffect } from 'react'
import { Context } from '../context/Context';
import {
    SendIcon
} from "../utils/Icons.js"

const ChatPageSerachBar = () => {
    const [height, setHeight] = useState('auto');
    const [isExpanding, setIsExpanding] = useState(false);
    const { text, setText, HandleSubmit } = useContext(Context)
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        // Reset height to auto to allow shrinking
        textarea.style.height = 'auto';

        // Set the height based on the scrollHeight, limited to a maximum of 120px
        const newHeight = Math.min(textarea.scrollHeight, 120);
        setHeight(`${newHeight}px`);

        // Check if the textarea is expanding (greater than 40px in this case)
        setIsExpanding(newHeight > 40);
    };


    useEffect(() => {
        adjustTextareaHeight();
    }, [text]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await HandleSubmit(); // Call the HandleSubmit function from Context

        // Clear the text after submitting
        setText('');
    };

    return (
        <>
            <div className="bg-white dark:bg-[#040B35] w-full flex flex-col items-center justify-center">
                <div className={`md:w-[80%] w-[90%] bg-[#F0F4F9] dark:bg-[#0c1649] md:py-2 flex justify-between flex-row rounded-full items-center ${isExpanding ? 'rounded-full' : 'rounded-full px-0'}`}>
                    <form className='w-full flex justify-between flex-row rounded-full' onSubmit={handleSubmit}>
                        <textarea
                            ref={textareaRef}
                            rows="1"
                            className={`bg-transparent w-[85%] mx-5 outline-none dark:text-white px-2 py-2 resize-none text-gray-600 transition-all duration-300`}
                            placeholder="Enter a prompt"
                            style={{ height }}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        {
                            text && <div className='flex text-gray-700 dark:text-white'>
                                <button type='submit' className='md:p-3 p-1 mr-3 cursor-pointer dark:hover:bg-gray-700 rounded-full flex justify-center items-center'>
                                    <SendIcon />
                                </button>
                            </div>
                        }

                    </form>
                </div>
                <p className='md:text-sm text-[12px] leading-4 text-gray-600 dark:text-white py-3'>QueryMinds can make mistakes, <span className='sm:hidden'>So check again</span> <span className='hidden sm:inline'>so double-check its responses.</span></p>
            </div>
        </>
    )
}

export default ChatPageSerachBar