"use client";

import { useState } from "react";
import { registrationSchema } from "@/validations/registrationSchema";
import { api } from "@/utils/axiosInstance";
import { AuthService } from "@/services/auth.service";

export function useRegistration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signup(data: any) {
        try {
            setLoading(true);
            const res = await AuthService.signup(data);
            return res;
        } catch (err: any) {
            setError(err.response?.data?.detail || "Signup failed");
            return false;
        } finally {
            setLoading(false);
        }
    }
    
    async function sendOtp(data: any) {
        try {
            setError("");
            const validated = registrationSchema.parse(data);

            setLoading(true);
            const res = await api.post("/auth/send-otp", validated);

            return res.data;
        } catch (err: any) {
            if (err?.issues) setError(err.issues[0].message);
            else setError(err.response?.data?.detail || "Failed");
        } finally {
            setLoading(false);
        }
    }

    async function verifyOtp(contact: string, otp: string) {
        try {
            setError("");
            setLoading(true);

            const res = await api.post("/auth/verify-otp", { contact, otp });

            return res.data;
        } catch (err: any) {
            setError(err.response?.data?.detail || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    }

    return {signup, sendOtp, verifyOtp, loading, error };
}
