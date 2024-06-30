/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import InputLabel from "../Components/InputLabel";
import TextInput from "../Components/TextInput";
import InputError from "../Components/InputError";
import Modal from "../Components/Modal";
function register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const password_confirmation = useRef();

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);

    const onConfirm = async () => {
        navigate("/login");
    };
    const submit = async (e) => {
        e.preventDefault();
        const payload = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            password_confirmation: password_confirmation.current.value,
        };

        await axiosClient
            .post("/register", payload)
            // eslint-disable-next-line no-unused-vars
            .then(({ data }) => {
                setOpenModal(true);
                // navigate("/login");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 lg:px-4 overflow-hidden">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={submit}
                        className="space-y-6 border p-6 rounded-md shadow"
                        noValidate
                    >
                        <div className="mt-4">
                            <InputLabel htmlFor="user_name" value="Name" />
                            <TextInput
                                id="user_name"
                                type="text"
                                name="name"
                                ref={name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                placeholder="Enter Name"
                            />
                            {errors?.name && (
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="user_email" value="Email" />
                            <TextInput
                                id="user_email"
                                type="email"
                                name="email"
                                ref={email}
                                className="mt-1 block w-full"
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
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={password}
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

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Password Confirmation"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                className="mt-1 block w-full"
                                placeholder="Enter Confirm Password"
                                ref={password_confirmation}
                            />
                            {errors?.password_confirmation && (
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-gray-800 hover:text-gray-500"
                        >
                            Login.
                        </Link>
                    </p>
                </div>
            </div>
            <Modal
                open={openModal}
                onConfirm={onConfirm}
                onClose={handleCloseModal}
                showCloseButton={false}
                title="Success!"
                message="Thank you for registering."
            />
        </>
    );
}

export default register;
