import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Input from "../../components/Input/Input"; // Import the Input component
import Link from "next/link";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
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
                    <div className="w-full max-w-md bg-white backdrop-blur-md py-14 p-8 rounded-t-4xl shadow-2xl animate-fade-in h-[70vh] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-sm text-center text-gray-500 mb-6">Let’s get started </p>

                        {/* Form */}
                        <form>
                            {/* Username Field with Icon */}
                            <Input
                                id="username"
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                icon={FaUser}
                                required
                            />

                            {/* Password Field with Icon and Toggle */}
                            <div className="relative mt-6">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    icon={FaLock}
                                    required
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-3 top-8 text-gray-400 cursor-pointer"
                                    />
                                ) : (
                                    <FaEye
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-3 top-8 text-gray-400 cursor-pointer"
                                    />
                                )}
                            </div>

                            <div className="text-right text-sm text-indigo-600 mb-4 mt-2 cursor-pointer hover:underline">
                                Forgot Password?
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-2 rounded-full font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out"
                            >
                                Login
                            </button>
                            {/* Google Login */}
                            <button className="w-full border border-gray-300 py-2 mt-4 rounded-full flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-100 transition mb-4">
                                <FaGoogle className="text-red-500" />
                                Continue with Google
                            </button>
                        </form>

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
