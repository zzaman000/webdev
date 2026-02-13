import { useState } from "react";

export default function Form({ onSubmitData }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function validate() {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Valid email required";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        if (typeof onSubmitData === "function") {
            onSubmitData(formData);
        }

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: ""
        });

        setErrors({});
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "420px", width: "100%" }}>
                
                <h3 className="text-center mb-4 fw-semibold">
                    Registration Form
                </h3>

                <form onSubmit={handleSubmit} noValidate>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.password}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.confirmPassword}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="form-label fw-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            placeholder="1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.phone}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-semibold"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
}
