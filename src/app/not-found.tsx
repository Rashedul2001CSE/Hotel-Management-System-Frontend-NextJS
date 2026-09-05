'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../styles/notfound.css';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const starContainer = document.getElementById('star-container');
        if (!starContainer) return;

        const numStars = 150;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1;

            star.className = 'star';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;

            fragment.appendChild(star);
        }

        starContainer.appendChild(fragment);

        return () => {
            starContainer.innerHTML = '';
        };
    }, []);

    return (
        <div className="relative flex justify-center items-center bg-slate-100 dark:bg-[#0d0d1a] m-0 min-h-screen overflow-hidden font-sans transition-colors duration-300">
            {/* Dynamic Star Field */}
            <div id="star-container" className="absolute inset-0 pointer-events-none" />

            {/* Background Floating Planets */}
            <div className="top-[10%] left-[15%] planet planet-small" style={{ animationDelay: '0s' }} />
            <div className="right-[10%] bottom-[5%] planet planet-medium" style={{ animationDelay: '2s' }} />
            <div className="top-[60%] left-[5%] planet planet-large" style={{ animationDelay: '4s' }} />
            <div className="top-[25%] right-[20%] planet planet-small" style={{ animationDelay: '1s' }} />
            <div className="bottom-[20%] left-[25%] planet planet-medium" style={{ animationDelay: '3s' }} />

            {/* Main Container */}
            <div className="z-20 flex flex-col justify-center items-center p-4 text-center">
                <div className="relative mx-auto mb-8 w-full max-w-md">
                    <div className="top-1/2 left-1/2 z-10 absolute w-25 sm:w-30 md:w-50 h-25 sm:h-30 md:h-50 -translate-x-1/2 -translate-y-1/2 astronaut-container">
                        {/* Place Astronaut Icon/Image here */}
                    </div>
                    <div
                        className="top-1/4 right-1/4 z-9 absolute w-12.5 sm:w-15 md:w-25 h-12.5 sm:h-15 md:h-25 -translate-y-1/2 translate-x-1/2 rocket-container"
                        style={{ transform: 'rotate(45deg)' }}
                    >
                        {/* Place Rocket Icon/Image here */}
                    </div>
                    <div
                        className="top-[65%] left-1/2 z-8 absolute w-37.5! h-37.5! -translate-x-1/2 -translate-y-1/2 planet planet-large"
                        style={{ background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #e63946)' }}
                    />
                </div>

                {/* Big 404 Watermark Text */}
                <div className="top-1/2 left-1/2 z-5 absolute font-bold text-[6rem] text-slate-300/40 sm:text-[8rem] md:text-[15rem] dark:text-gray-500/30 transition-colors -translate-x-1/2 -translate-y-1/2 duration-300 pointer-events-none select-none">
                    404
                </div>

                {/* Content Headings */}
                <h1 className="z-20 mt-16 mb-4 font-bold text-slate-900 dark:text-white text-5xl md:text-6xl transition-colors duration-300">
                    OOPS!
                </h1>
                <p className="z-20 mb-8 text-slate-600 dark:text-gray-300 text-xl md:text-2xl transition-colors duration-300">
                    PAGE NOT FOUND
                </p>

                {/* Action Buttons */}
                <div className="z-20 flex space-x-4">
                    <Link
                        href="/"
                        className="bg-slate-900 hover:bg-slate-800 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition duration-300 ease-in-out transform"
                    >
                        GO HOME
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="bg-slate-900 hover:bg-slate-800 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition duration-300 ease-in-out transform"
                    >
                        GO BACK
                    </button>
                </div>
            </div>
        </div>
    );
}