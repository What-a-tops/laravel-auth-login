/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import {
    TrashIcon,
    PencilSquareIcon,
    UserPlusIcon,
    MagnifyingGlassIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import TextInput from "../Components/TextInput";
import { useStateContext } from "../Context/contextProvider";

function users() {
    let { user } = useStateContext();
    const users = (() => {
        try {
            return JSON.parse(user);
        } catch {
            return user;
        }
    })();

    let num = 1;
    const [page, setPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [page]);

    const onDeleteClick = async (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        await axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };

    const getUsers = async (search = "") => {
        setLoading(true);
        await axiosClient
            .get(`/users?page=${page}&search=${search}`)
            .then(({ data }) => {
                setLoading(false);
                setContacts(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const fetchNextPrevTasks = async (link) => {
        const url = new URL(link);
        await setPage(url.searchParams.get("page"));
    };

    return (
        <>
            <div className="flex justify-center relative overflow-x-auto">
                <div className="grid grid-cols-1 container">
                    <div className="w-full">
                        <div className=" mx-auto px-4 border rounded-md shadow mt-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <caption className="py-5 text-lg font-semibold text-left rtl:text-right text-gray-800 bg-white dark:text-gray ">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-3xl font-bold">
                                            Contacts
                                        </h1>

                                        <div className="flex space-x-2">
                                            <Link
                                                className="px-4 py-2 rounded-lg bg-gray-800 shadow text-white border border-white hover:bg-gray-600 inline-flex items-center"
                                                to="/users/new"
                                            >
                                                <UserPlusIcon className="h-6 w-6 text-white mr-2" />
                                                Add Contact
                                            </Link>
                                            <div className="">
                                                <label
                                                    htmlFor="table-search"
                                                    className="sr-only"
                                                >
                                                    Search
                                                </label>
                                                <div className="relative mt-1">
                                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    </div>
                                                    <TextInput
                                                        type="search"
                                                        id="table-search"
                                                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-gray-700 dark:focus:border-gray-700"
                                                        onChange={(e) =>
                                                            getUsers(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoComplete="search"
                                                        placeholder="Search"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </caption>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-200 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="p-2">ID</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Company</th>
                                        <th className="p-2">Phone</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center p-2 text-gray-900"
                                            >
                                                Loading...
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className="table-group-divider">
                                        {contacts?.data?.map((u, key) => (
                                            <tr
                                                key={key}
                                                className="bg-white text-lg text-gray-800 border-b dark:border-gray-700  hover:text-white dark:hover:bg-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <td className="p-4">
                                                    {num++}.
                                                </td>
                                                <td>{u.name}</td>
                                                <td>{u.company}</td>
                                                <td>{u.phone}</td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <div className="flex space-x-2 justify-center">
                                                        {u.id === users.id ? (
                                                            <>
                                                                <Link
                                                                    type="button"
                                                                    className="px-3 py-1 text-gray-900 hover:bg-blue-500 rounded-md hover:shadow hover:text-white transition-colors duration-200"
                                                                    to={`/users/edit/${u.id}`}
                                                                >
                                                                    <PencilSquareIcon className="size-6 text-dark-500" />
                                                                </Link>
                                                                <button
                                                                    type="button"
                                                                    className="px-3 py-1 text-gray-900 hover:bg-red-500 rounded-md hover:rounded hover:shadow hover:text-white transition-colors duration-200"
                                                                    onClick={() =>
                                                                        onDeleteClick(
                                                                            u
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashIcon className="size-6 text-dark-500" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <Link
                                                                type="button"
                                                                className="px-3 py-1 text-gray-900 hover:bg-gray-500 rounded-md hover:shadow hover:text-white transition-colors duration-200"
                                                                to={`/users/view/${u.id}`}
                                                            >
                                                                <EyeIcon className="size-6 text-dark-500" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {contacts.data?.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center p-2"
                                                >
                                                    <h1>Empty Value</h1>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                            <div className="flex justify-center items-center my-2">
                                {contacts.meta?.links && (
                                    <Pagination
                                        links={contacts.meta?.links}
                                        fetchNextPrevTasks={fetchNextPrevTasks}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default users;
