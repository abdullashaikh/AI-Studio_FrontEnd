"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validations/loginSchema";

import Input from "../ui/Input";
import Button from "../ui/Button";
import GoogleButton from "./GoogleButton";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const [method, setMethod] = useState<"email" | "phone">("email");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      method: "email",
      email: "",
      phone: "",
      password: "",
    },
  });

  /* Switch login method */
  const handleMethodChange = (m: "email" | "phone") => {
    setMethod(m);
    setValue("method", m);
  };

  const onSubmit = async (data: LoginSchemaType) => {
    const identifier = method === "email" ? data.email : data.phone;

    const res = await login(identifier!, data.password, method);
    if (res) console.log("LOGIN SUCCESS:", res);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Toggle Login Using */}
        <div className="inline-flex w-full rounded-lg bg-slate-50 border border-slate-200 p-1 mb-2">
          <button
            type="button"
            onClick={() => handleMethodChange("email")}
            className={`flex-1 px-4 py-2 text-sm rounded-md transition
              ${method === "email" ? "bg-white shadow font-medium text-emerald-600" : "text-slate-500"}`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange("phone")}
            className={`flex-1 px-4 py-2 text-sm rounded-md transition
              ${method === "phone" ? "bg-white shadow font-medium text-emerald-600" : "text-slate-500"}`}
          >
            Mobile
          </button>
        </div>

        {/* Email OR Phone Input */}
        {method === "email" ? (
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
        ) : (
          <Input
            label="Phone number"
            placeholder="+91 98765 43210"
            {...register("phone")}
            error={errors.phone?.message}
          />
        )}

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Global error */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" loading={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <div className="text-xs text-slate-400 uppercase">or</div>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Google Login */}
      <GoogleButton />

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link href="/registration" className="text-emerald-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
