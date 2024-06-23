/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "rounded-lg border border-[#e0e0e0] bg-white py-3 px-3 text-base font-small text-gray-600 outline-none focus:border-gray-800 focus:shadow-md transition-colors duration-200" +
                className
            }
            ref={input}
        />
    );
});
