"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { errorToast, successToast } from "@/components/ui/toast"
import { apiFetch } from "@/lib/api"
import { useAuth } from "@/providers/AuthContext"

export interface RegisterFormValues {
    FullName: string
    Email: string
    Password: string
    ConfirmPassword: string
    AcceptTerms: boolean
}

interface RegisterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToLogin: () => void
}

export function RegisterModal({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) {
    const { refreshUser } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        mode: "onBlur",
        defaultValues: {
            FullName: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            AcceptTerms: false,
        },
    })

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined in the environment variables.");
    }

    const onSubmit = async (values: RegisterFormValues) => {
        
        try {
            const response = await apiFetch("/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        values
                    ),
                }
            );

            const data = await response.json();


            if (!response.ok) {
                errorToast(data.message ?? "Registration failed.", "Please try again.");
                return;
            }
            // this will make the browser know that the user is logged in and will refresh the user context
            await refreshUser();

            successToast(data.message, "You have successfully registered.");
            onOpenChange(false)
            reset()
        } catch {
            errorToast("Unable to connect to the server.", "Please try again.");
        }
    }




    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                onOpenChange(nextOpen)
                if (!nextOpen) reset()
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join Us</DialogTitle>
                    <h2 className="text-xl">Create a Hotel_Rose Account</h2>
                    <DialogDescription>
                        Make a great choice and feel the comfort.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="register-userName" className="sr-only">
                            Your name
                        </Label>
                        <Input
                            id="register-userName"
                            type="text"
                            placeholder="Your Name"
                            autoComplete="name"
                            {...register("FullName", { required: "Enter your name." })}
                        />
                        {errors.FullName && (
                            <p className="text-red-500 text-sm">{errors.FullName.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="register-email" className="sr-only">
                            Email
                        </Label>
                        <Input
                            id="register-email"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            aria-invalid={!!errors.Email}
                            {...register("Email", {
                                required: "Enter your email.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address.",
                                },
                            })}
                        />
                        {errors.Email && (
                            <p className="text-red-500 text-sm">{errors.Email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="register-password" className="sr-only">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                autoComplete="new-password"
                                aria-invalid={!!errors.Password}
                                className="pr-10"
                                {...register("Password", {
                                    required: "Enter a password.",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters.",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="right-0 absolute inset-y-0 flex justify-center items-center w-10 text-gray-400 hover:text-gray-200"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-4 h-4" />
                                ) : (
                                    <EyeIcon className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.Password && (
                            <p className="text-red-500 text-sm">{errors.Password.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="register-confirmPassword" className="sr-only">
                            Confirm password
                        </Label>
                        <Input
                            id="register-confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            aria-invalid={!!errors.ConfirmPassword}
                            {...register("ConfirmPassword", {
                                required: "Confirm your password.",
                                validate: (value) =>
                                    value === watch("Password") || "Passwords don't match.",
                            })}
                        />
                        {errors.ConfirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.ConfirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="flex items-start gap-2 text-gray-300 text-sm">
                            <input
                                type="checkbox"
                                className="mt-0.5 border-gray-600 rounded focus-visible:ring-2 focus-visible:ring-ring w-4 h-4 text-primary"
                                aria-invalid={!!errors.AcceptTerms}
                                {...register("AcceptTerms", {
                                    required: "You must accept the terms to continue.",
                                })}
                            />
                            <span>
                                I agree to Hotel_Rose&apos;s{" "}
                                <a href="#" className="text-blue-500 hover:underline">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-blue-500 hover:underline">
                                    Privacy Policy
                                </a>
                                .
                            </span>
                        </label>
                        {errors.AcceptTerms && (
                            <p className="text-red-500 text-sm">
                                {errors.AcceptTerms.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up…" : "Sign up"}
                    </Button>
                </form>

                <SocialAuthButtons />

                <p className="text-gray-300 text-sm text-center">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-blue-500 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    )
}
