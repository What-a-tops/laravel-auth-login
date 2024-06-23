/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../Context/contextProvider";
import TextInput from "../Components/TextInput";
import InputError from "../Components/InputError";
import InputLabel from "../Components/InputLabel";
import { Link } from "react-router-dom";

function login() {
    const [errors, setErrors] = useState(null);
    const email = useRef();
    const password = useRef();

    const { setUser, setToken } = useStateContext();

    const submit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email.current.value,
            password: password.current.value,
        };
        await axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setErrors(data);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6 border p-6 rounded-md shadow-sm"
                    onSubmit={submit}
                >
                    <div className="mt-4">
                        <InputLabel htmlFor="user_email" value="Email" />
                        <TextInput
                            ref={email}
                            id="user_email"
                            type="email"
                            name="email"
                            className="mt-1 block w-full"
                            isFocused={true}
                            placeholder="Enter Email"
                        />
                        {errors?.email && (
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="user_password" value="Password" />
                        <TextInput
                            ref={password}
                            id="user_password"
                            type="password"
                            name="password"
                            className="mt-1 block w-full"
                            placeholder="Enter Password"
                        />
                        {errors?.password && (
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        )}
                    </div>

                    {errors?.message && (
                        <InputError message={errors.message} className="mt-2" />
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not registered?{" "}
                    <Link
                        to="/register"
                        className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
                    >
                        Create account.
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default login;
