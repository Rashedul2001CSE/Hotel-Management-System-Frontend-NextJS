//don't know 

"use client"

import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"

export type SocialProvider = "google" | "linkedin" | "github" | "facebook"

interface SocialAuthButtonsProps {
    /**
     * Called when a provider button is clicked. Wire this up to your real
     * OAuth flow later (e.g. NextAuth's `signIn(provider)`), which is why it's
     * a plain callback rather than a link straight to an ASP.NET route.
     */
    onProviderClick?: (provider: SocialProvider) => void
}

export function SocialAuthButtons({ onProviderClick }: SocialAuthButtonsProps) {
    const handleClick = (provider: SocialProvider) => () => {
        if (onProviderClick) {
            onProviderClick(provider)
        } else {
            console.log(`TODO: wire up ${provider} OAuth`)
        }
    }

    return (
        <>
            <div className="flex items-center gap-4 my-6">
                <hr className="border-gray-700 w-full" />
                <span className="text-gray-400 text-sm">or</span>
                <hr className="border-gray-700 w-full" />
            </div>

            <button
                type="button"
                onClick={handleClick("google")}
                className="flex justify-center items-center gap-2 bg-white hover:bg-gray-100 mb-4 px-4 py-2 rounded w-full font-bold text-black transition-colors"
            >
                <FcGoogle className="w-5 h-5" aria-hidden="true" />
                Continue with Google
            </button>

            <div className="flex justify-around gap-2 mb-2">
                <button
                    type="button"
                    onClick={handleClick("linkedin")}
                    className="flex justify-center items-center gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 px-4 py-2 rounded w-full text-white transition-colors"
                >
                    <FaLinkedin className="w-5 h-5" aria-hidden="true" />
                    LinkedIn
                </button>
                <button
                    type="button"
                    onClick={handleClick("github")}
                    className="flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded w-full text-white transition-colors"
                >
                    <FaGithub className="w-5 h-5" aria-hidden="true" />
                    GitHub
                </button>
                <button
                    type="button"
                    onClick={handleClick("facebook")}
                    className="flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 px-4 py-2 rounded w-full text-white transition-colors"
                >
                    <FaFacebook className="w-5 h-5" aria-hidden="true" />
                    Facebook
                </button>
            </div>
        </>
    )
}