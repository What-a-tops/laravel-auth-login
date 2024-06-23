/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../Components/TextInput";
import InputError from "../Components/InputError";
import InputLabel from "../Components/InputLabel";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function UserForm() {
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
    const [errors, setErrors] = useState(null);

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

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        setErrors(null);

        const userData = {
            ...user,
            password: user.password || undefined, // Send password only if it's set
            password_confirmation: user.password_confirmation || undefined,
        };

        try {
            if (user.id) {
                await axiosClient.put(`/users/${user.id}`, userData);
            } else {
                await axiosClient.post("/users", userData);
            }
            navigate("/users");
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

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
                                {user.id ? (
                                    <h3>Update User: {user.name}</h3>
                                ) : (
                                    <h3>New User</h3>
                                )}
                            </div>
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white sm:rounded-lg"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="user_name"
                                                value="Name"
                                            />
                                            <TextInput
                                                id="user_name"
                                                type="text"
                                                name="name"
                                                value={user.name}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                placeholder="Enter Name"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        name: ev.target.value,
                                                    })
                                                }
                                            />
                                            {errors?.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="user_email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="user_email"
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                className="mt-1 block w-full"
                                                placeholder="Enter Email"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        email: ev.target.value,
                                                    })
                                                }
                                            />
                                            {errors?.email && (
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            )}
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
                                                className="mt-1 block w-full"
                                                placeholder="Enter Company"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        company:
                                                            ev.target.value,
                                                    })
                                                }
                                            />
                                            {errors?.company && (
                                                <InputError
                                                    message={errors.company}
                                                    className="mt-2"
                                                />
                                            )}
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
                                                className="mt-1 block w-full"
                                                placeholder="Enter Phone"
                                                onChange={(ev) =>
                                                    setUser({
                                                        ...user,
                                                        phone: ev.target.value,
                                                    })
                                                }
                                            />
                                            {errors?.phone && (
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        className="mt-1 block w-full"
                                        placeholder="Enter Password"
                                        onChange={(ev) =>
                                            setUser({
                                                ...user,
                                                password: ev.target.value,
                                            })
                                        }
                                    />
                                    {errors?.password && (
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Password Confirmation"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={user.password_confirmation}
                                        className="mt-1 block w-full"
                                        placeholder="Enter Confirm Password"
                                        onChange={(ev) =>
                                            setUser({
                                                ...user,
                                                password_confirmation:
                                                    ev.target.value,
                                            })
                                        }
                                    />
                                    {errors?.password && (
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-center">
                                        <button className="px-6 py-3.5 flex items-center bg-gray-800 text-white rounded-lg shadow transition-all hover:bg-gray-600 mr-2">
                                            <CheckCircleIcon className="h-6 w-6 text-white mr-2" />
                                            Submit
                                        </button>
                                        <Link
                                            to="/users"
                                            className="px-6 py-3.5 flex items-center rounded-lg bg-red-600 text-white focus:ring-red-300 shadow transition-all hover:bg-red-500"
                                        >
                                            <XCircleIcon className="h-6 w-6 text-white mr-2" />
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserForm;
