/* eslint-disable react/prop-types */
export default function Pagination({ links, fetchNextPrevTasks }) {
    return (
        <nav className="text-center mt-4 shadow-sm w-full p-5">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={(e) => {
                        if (link.url) {
                            fetchNextPrevTasks(link.url);
                        }
                        e.preventDefault();
                    }}
                    className={`inline-block py-2 px-3 rounded-lg text-xs hover:text-white transition-colors duration-200 ${
                        link.active
                            ? "bg-gray-950 hover:bg-gray-950 text-white"
                            : "hover:bg-gray-950 text-gray-600"
                    } ${!link.url ? "!text-gray-300 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
