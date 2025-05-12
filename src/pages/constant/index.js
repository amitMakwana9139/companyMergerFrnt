export const Constant = {
    GSTREGEX: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    mobileNumer: /^[0-9]{10}$/,
    inputTypeNumber: /^\d*$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const companyType = ["new_company", "existing_company"];


export const message = {
    emailMessage: "Please enter a valid email address!",
    passwordMessage: "Password must be at least 5 characters!"
}