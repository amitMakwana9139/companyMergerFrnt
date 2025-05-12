import Input from "@/components/Input/Input";
import Selector from "@/components/Select/Select";
import { userSignup } from "@/redux/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaBuilding, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { companyType, Constant, message } from "../constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader";
import useAuthRedirect from "@/components/common/authVerification";

export default function Register() {
    useAuthRedirect({ protectedRoute: false });
    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        company_action: "new_company",
        company_name: ""
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields((prev) => ({
            ...prev,
            [name]: value
        }))
        if (value) {
            setError({ ...error, [name]: "" });
        }
    };

    const handleClear = () => {
        setFields({
            name: "",
            email: "",
            password: "",
            company_action: "new_company",
            company_name: ""
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
            setLoading(true);
            dispatch(userSignup(fields))
                .unwrap()
                .then((response) => {
                    if (response && response?.status === 200) {
                        toast.success(response?.message || "success");
                        handleClear();
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    toast.error(err.message || "Operation failed.");
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    }

    return (
        <div className="min-h-screen flex flex-wrap bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 px-6 md:px-20">
            {loading && <Loader />}
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
                <div className="w-full max-w-md bg-white backdrop-blur-lg px-8 py-10 rounded-t-3xl shadow-2xl animate-fade-in min-h-[70vh] flex flex-col justify-center border border-white/20">
                    <h2 className="text-3xl font-bold text-center text-black mb-2">Create Account</h2>
                    <p className="text-sm text-center text-gray-400 mb-6">Start your journey with us today.</p>

                    <div className="space-y-4">
                        <div>
                            <Input
                                id="name"
                                name="name"
                                label="Full Name"
                                placeholder="Enter your name"
                                required
                                icon={FaUser}
                                value={fields.name}
                                onChange={handleChange}
                                error={!!error.name}
                            />
                            {/* {error.name && <span className="text-red-500">{error.name}</span>} */}
                        </div>

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

                            {/* {error.email && <span className="text-red-500">{error.email}</span>} */}
                        </div>

                        <div className="relative flex justify-center items-center gap-1">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                required
                                icon={FaLock}
                                value={fields.password}
                                onChange={handleChange}
                                error={!!error.password}
                            />
                            {/* {error.password && <span className="text-red-500">{error.password}</span>} */}
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
                        <div>
                            <Selector
                                id="company_action"
                                name="company_action"
                                label="Company Type"
                                icon={FaBuilding}
                                value={fields.company_action}
                                onChange={handleChange}
                                required
                                options={companyType || []}
                                error={!!error.company_action}
                            />
                            {/* {error.company_action && <span className="text-red-500">{error.company_action}</span>} */}
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
                            {/* {error.company_name && <span className="text-red-500">{error.company_name}</span>} */}
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                    </div>

                    <p className="mt-3 text-sm text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
