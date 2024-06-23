/* eslint-disable react/prop-types */
import { XCircleIcon } from "@heroicons/react/24/outline";
export default function InputError({ message, className = "", ...props }) {
    return message ? (
        <p
            {...props}
            className={
                "flex items-center font-semibold text-sm text-red-600 dark:text-red-400 " +
                className
            }
        >
            <XCircleIcon className="h-5 w-5 mr-2 text-red-500" />
            {message}
        </p>
    ) : null;
}
