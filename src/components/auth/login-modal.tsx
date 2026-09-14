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
import { SocialAuthButtons } from "./social-auth-buttons"
import { apiFetch } from "@/lib/api"
import { errorToast, successToast } from "@/components/ui/toast"
import { useAuth } from "@/providers/AuthContext"

export interface LoginFormValues {
    EmailOrUserName: string
    Password: string
    RememberMe: boolean
}

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToRegister: () => void
}

export function LoginModal({ open, onOpenChange, onSwitchToRegister, }: LoginModalProps) {

    const{refreshUser} = useAuth();

    const [showPassword, setShowPassword] = React.useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        mode: "onBlur",
        defaultValues: {
            EmailOrUserName: "",
            Password: "",
            RememberMe: false,
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const response = await apiFetch(
                "/api/auth/login?useCookies=true",
                {
                    method: "POST",
                    body: JSON.stringify(
                        values
                    ),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                errorToast(
                    data.message ?? "Invalid email or password.",
                    "Please try again."
                );

                return;
            }
            // this is the key part where we refresh the user context after a successful login
            await refreshUser();


            successToast(
                "Login successful.",
                "Welcome back!"
            );

            onOpenChange(false);
            reset();

        } catch {
            errorToast(
                "Unable to connect to the server.",
                "Please try again."
            );
        }
    };

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
                    <DialogTitle>Welcome back!</DialogTitle>
                    <h2 className="text-xl">Login to your account</h2>
                    <DialogDescription>
                        It&apos;s nice to see you again. Let&apos;s book a room.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="login-emailOrUserName" className="sr-only">
                            Email or username
                        </Label>
                        <Input
                            id="login-emailOrUserName"
                            type="text"
                            placeholder="Email or Username"
                            autoComplete="username"
                            aria-invalid={!!errors.EmailOrUserName}
                            {...register("EmailOrUserName", {
                                required: "Enter your email or username.",
                            })}
                        />
                        {errors.EmailOrUserName && (
                            <p className="text-red-500 text-sm">
                                {errors.EmailOrUserName.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="login-password" className="sr-only">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                autoComplete="current-password"
                                aria-invalid={!!errors.Password}
                                className="pr-10"
                                {...register("Password", {
                                    required: "Enter your password.",
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

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in…" : "Log In"}
                    </Button>

                    <div className="flex justify-between items-center pt-2">
                        <label className="flex items-center gap-2 text-gray-300 text-sm">
                            <input
                                type="checkbox"
                                className="border-gray-600 rounded focus-visible:ring-2 focus-visible:ring-ring w-4 h-4 text-primary"
                                {...register("RememberMe")}
                            />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-500 text-sm hover:underline">
                            Forgot password?
                        </a>
                    </div>
                </form>

                <SocialAuthButtons />

                <p className="text-gray-300 text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    )
}