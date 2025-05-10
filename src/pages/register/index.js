// pages/register.tsx

import Input from "@/components/Input/Input";
import Selector from "@/components/Select/Select";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaBuilding, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        company_action: "new_company",
        company_name: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
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
                <div className="w-full max-w-md bg-white backdrop-blur-lg px-8 py-10 rounded-t-3xl shadow-2xl animate-fade-in min-h-[70vh] flex flex-col justify-center border border-white/20">
                    <h2 className="text-3xl font-bold text-center text-black mb-2">Create Account</h2>
                    <p className="text-sm text-center text-gray-400 mb-6">Start your journey with us today.</p>

                    <form className="space-y-4">
                        <Input
                            id="name"
                            name="name"
                            label="Full Name"
                            placeholder="Enter your name"
                            required
                            icon={FaUser}
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            required
                            icon={FaEnvelope}
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                required
                                icon={FaLock}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {showPassword ? (
                                <FaEyeSlash
                                    onClick={() => setShowPassword(false)}
                                    className="absolute right-4 top-9 text-gray-400 cursor-pointer"
                                />
                            ) : (
                                <FaEye
                                    onClick={() => setShowPassword(true)}
                                    className="absolute right-4 top-9 text-gray-400 cursor-pointer"
                                />
                            )}
                        </div>

                        <Selector
                            id="company_action"
                            name="company_action"
                            label="Company Type"
                            icon={FaBuilding}
                            value={formData.company_action}
                            onChange={handleChange}
                            required
                            options={[
                                { value: "new_company", label: "New Company" },
                                { value: "existing_company", label: "Join Existing Company" },
                            ]}
                        />

                        <Input
                            id="company_name"
                            name="company_name"
                            label="Company Name"
                            placeholder="Enter your company name"
                            required
                            icon={FaBuilding}
                            value={formData.company_name}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
                        >
                            Register
                        </button>
                    </form>

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
