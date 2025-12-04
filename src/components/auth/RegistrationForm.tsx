"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import GoogleButton from "./GoogleButton";
import VerifyUsingSelector from "./VerifyUsingSelector";

import { useRegistration } from "@/hooks/useRegistration";
import Link from "next/link";
import { registrationSchema, RegistrationSchemaType } from "@/validations/registrationSchema";

export default function RegistrationForm() {
    const {signup, sendOtp, verifyOtp, loading, error } = useRegistration();

    const [step, setStep] = useState<"form" | "otp" | "done">("form");
    const [method, setMethod] = useState("email");
    const [contact, setContact] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationSchemaType>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            method: "email",
            contact: "",
        },
    });

    // Sync method selection with validator
    const handleMethodChange = (m: string) => {
        setMethod(m);
        setValue("method", m as any);
    };

    async function onSubmit(data: RegistrationSchemaType) {
        console.log("Submitting data:", data);
        const res = await sendOtp(data);
        if (res) {
            setContact(data.contact);
            setStep("otp");
        }
    }

    // OTP Logic
    const [otp, setOtp] = useState("");

    async function handleVerifyOtp(e: any) {
        e.preventDefault();
    
        const verified = await verifyOtp(contact, otp);
        if (!verified) return;
    
        const formData = watch(); // all fields
        console.log(formData,'formData')
        const signupPayload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            password: formData.password,
            method: method,
            email: method === "email" ? formData.contact : null,
            phone: method === "phone" ? formData.contact : null,
        };
        console.log("Data",signupPayload)
        const signupRes = await signup(signupPayload);
        if (signupRes) {
            setStep("done");
        }
    }
    

    return (
        <>
            {/* ---------------- FORM STEP ---------------- */}
            {step === "form" && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <Input
                            label="First name"
                            {...register("firstName")}
                            error={errors.firstName?.message}
                        />

                        <Input
                            label="Last name"
                            {...register("lastName")}
                            error={errors.lastName?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            {...register("password")}
                            error={errors.password?.message}
                         />
                        <VerifyUsingSelector method={method} setMethod={handleMethodChange} />

                        <Input
                            label={method === "email" ? "Email" : "Phone number"}
                            {...register("contact")}
                            error={errors.contact?.message}
                        />

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <Button type="submit" loading={loading}>
                            Continue
                        </Button>
                    </form>

                    <Divider />

                    <GoogleButton />

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-600 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </>
            )}

            {/* ---------------- OTP STEP ---------------- */}
            {step === "otp" && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">

                    <Input
                        label="Enter OTP"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        error={otp.length < 4 ? "OTP must be 4–6 digits" : ""}
                    />

                    <Button type="submit" loading={loading}>
                        Verify OTP
                    </Button>
                </form>
            )}

            {/* ---------------- DONE STEP ---------------- */}
            {step === "done" && (
                <div className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold text-slate-800">You're all set 🎉</h2>
                    <p className="text-sm text-slate-500">
                        Registration complete. You can now login.
                    </p>
                    <Link href="/login" className="text-emerald-600 font-medium underline">
                        Go to Login
                    </Link>
                </div>
            )}
        </>
    );
}
