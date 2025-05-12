import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaExclamationCircle, FaEnvelope, FaBuilding } from 'react-icons/fa';
import Input from "../../components/Input/Input"; // Import the Input component
import Link from "next/link";
import { Constant, message } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader";
import useAuthRedirect from "@/components/common/authVerification";

export default function Home() {
    useAuthRedirect({ protectedRoute: false });
    const { loading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [fields, setFields] = useState({
        company_name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const handleClear = () => {
        setFields({
            company_name: "",
            email: "",
            password: ""
        });
    }

    const validation = () => {
        let flag = true;
        let errors = {};
        for (let key in fields) {
            if (!fields[key]) {
                errors[key] = "This field is required!";
                flag = false;
            }
            else if (key === "email" && !Constant.emailRegex.test(fields[key])) {
                errors[key] = "Please enter a valid email address!";
                flag = false;
            }
            else if (key === "password" && fields[key].length < 5) {
                errors[key] = "Password must be at least 5 characters!";
                flag = false;
            }
        }
        setError(errors);
        return flag;
    }

    const handleSubmit = () => {
        const response = validation();
        if (response) {
            dispatch(userLogin(fields))
                .unwrap()
                .then((response) => {
                    if (response && response?.status === 200) {
                        toast.success(response?.message || "success");
                        handleClear();
                        localStorage.setItem("token", response.data.token);
                        router.push("/dashboard");
                    }
                })
                .catch((err) => {
                    toast.error(err.message || "Operation failed.");
                });
        }
    }
    return (
        <>
            {loading && <Loader />}
            {/* Right Panel */}
            <div className="min-h-screen flex flex-wrap bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 px-6 md:px-20">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 text-white flex flex-col justify-center px-4 md:px-16 py-10 md:py-0">
                    <div className="mb-6">
                        <div className="text-3xl font-semibold flex items-center space-x-2">
                            <span>🔗</span>
                            <span>Company Merger</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 drop-shadow-md animate-fade-in">Exciting New Chapter Ahead!</h1>
                    <p className="text-lg mb-2">We’re Merging for a Stronger Future!</p>
                    <p className="text-sm text-white/70">
                        We're thrilled to announce that our company is merging with an industry leader to expand our reach, enhance our capabilities, and offer better solutions to our clients.
                    </p>
                </div>


                {/* Right Panel */}
                <div className="w-full md:w-1/2 flex items-end justify-end py-10 md:py-0">
                    <div className="w-full max-w-md bg-white backdrop-blur-md py-14 p-8 rounded-t-4xl shadow-2xl animate-fade-in h-[80vh] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-sm text-center text-gray-500 mb-6">Let’s get started </p>

                        {/* Form */}
                        <div className="space-y-4">
                            <div className="flex justify-center items-center gap-1">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    required
                                    icon={FaEnvelope}
                                    value={fields.email}
                                    onChange={handleChange}
                                    error={!!error.email}
                                />
                                {error.email === message.emailMessage && (
                                    <div className="cursor-pointer text-red-500">
                                        <FaExclamationCircle title="Invalid email format" />
                                    </div>
                                )}

                            </div>
                            <div>
                                <Input
                                    id="company_name"
                                    name="company_name"
                                    label="Company Name"
                                    placeholder="Enter your company name"
                                    required
                                    icon={FaBuilding}
                                    value={fields.company_name}
                                    onChange={handleChange}
                                    error={!!error.company_name}
                                />
                            </div>
                            <div className="relative flex justify-center items-center gap-1">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    value={fields.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    icon={FaLock}
                                    required
                                    error={!!error.password}
                                />
                                {showPassword ? (
                                    <FaEye
                                        onClick={() => setShowPassword(false)}
                                        className={`absolute ${error.password === message.passwordMessage ? "right-7" : "right-4"} top-9 text-gray-400 cursor-pointer`}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => setShowPassword(true)}
                                        className={`absolute ${error.password === message.passwordMessage ? "right-7" : "right-4"} top-9 text-gray-400 cursor-pointer`}
                                    />
                                )}
                                {error.password === message.passwordMessage && (
                                    <div className="cursor-pointer text-red-500">
                                        <FaExclamationCircle title={message.passwordMessage} />
                                    </div>
                                )}
                            </div>

                            <div className="text-right text-sm text-indigo-600 mb-4 mt-2 cursor-pointer hover:underline">
                                Forgot Password?
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-indigo-500 text-white py-2 rounded-full font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                            {/* Google Login */}
                            <button className="cursor-pointer w-full border border-gray-300 py-2 mt-4 rounded-full flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-100 transition mb-4">
                                <FaGoogle className="text-blue-500" />
                                Continue with Google
                            </button>
                        </div>

                        <p className="mb-6 text-sm text-center text-gray-600">
                            Don’t have an account?{' '}
                            <Link href="/register" className="text-indigo-500 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
