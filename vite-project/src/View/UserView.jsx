/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../Components/TextInput";
import InputLabel from "../Components/InputLabel";
import { BackwardIcon } from "@heroicons/react/24/outline";
function UserView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: "",
        company: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                setLoading(true);
                try {
                    const { data } = await axiosClient.get(`/users/${id}`);
                    setUser(data);
                } catch (err) {
                    const response = err.response;
                    if (response && response.status === 404) {
                        navigate("*");
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, [id, navigate]);

    return (
        <div className="card animate-[wiggle_1s_ease-in-out_infinite]">
            {loading && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center py-5">Loading...</div>
                </div>
            )}
            {!loading && (
                <div className="py-2">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-">
                        <div className="bg-white overflow-hidden border shadow-sm sm:rounded-lg">
                            <div className="pl-4 py-2 text-center bg-gray-800 text-white">
                                <h3>View User: {user.name}</h3>
                            </div>
                            <div className="p-4 sm:p-8 bg-white sm:rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="name"
                                                value="Name"
                                            />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={user.name}
                                                className="mt-1 block w-full cursor-not-allowed"
                                                isFocused={true}
                                                disabled
                                                readOnly
                                                aria-label="disabled input"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        name: ev.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                className="mt-1 block w-full cursor-not-allowed"
                                                placeholder="Enter Email"
                                                disabled
                                                readOnly
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        email: ev.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="company"
                                                value="Company"
                                            />
                                            <TextInput
                                                id="company"
                                                type="text"
                                                name="company"
                                                value={user.company}
                                                className="mt-1 block w-full cursor-not-allowed"
                                                placeholder="Enter Company"
                                                disabled
                                                readOnly
                                                aria-label="disabled input"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        company:
                                                            ev.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="phone"
                                                value="Phone"
                                            />
                                            <TextInput
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={user.phone}
                                                className="mt-1 block w-full cursor-not-allowed"
                                                placeholder="Enter Phone"
                                                disabled
                                                readOnly
                                                aria-label="disabled input"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        phone: ev.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-center">
                                        <Link
                                            to="/users"
                                            className="px-6 py-3.5 flex items-center rounded-lg bg-red-600 text-white focus:ring-red-300 shadow transition-all hover:bg-red-500"
                                        >
                                            <BackwardIcon className="h-6 w-6 text-white mr-2" />
                                            Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserView;
