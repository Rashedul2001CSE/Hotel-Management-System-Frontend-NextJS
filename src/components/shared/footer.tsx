// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-background  border-t border-gray-200 dark:border-border">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-wrap gap-8">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-2">
                            <Image
                                className="w-6 h-6 text-black"
                                src="/favicon.png"
                                alt="Logo"
                                width={24}
                                height={24}
                            />
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                                Hotel_Rose
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Hotel Rose is a premier hotel management system that helps you manage your hotel operations efficiently and effectively.
                        </p>
                        <div className="flex space-x-4 text-gray-600">
                            <Link href="#" aria-label="Instagram" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FaInstagram size={18} />
                            </Link>
                            <Link href="#" aria-label="Facebook" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FaFacebookF size={18} />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FaTwitter size={18} />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FaLinkedinIn size={18} />
                            </Link>
                            <Link href="#" aria-label="GitHub" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FaGithub size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Overview</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Pricing</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Marketplace</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Features</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Integrations</Link></li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">About</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Team</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Blog</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Careers</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Help center</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Documentation</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Status</Link></li>
                            <li><Link href="#" className="dark:hover:text-gray-300 hover:text-gray-700">Community</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 dark:bg-gray-500 border-t border-gray-300/5">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-100">
                    <p>© 2026 Hote Rose. All rights reserved.</p>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <Link href="#" className="dark:hover:text-white hover:text-gray-900">Terms and Conditions</Link>
                        <Link href="#" className="dark:hover:text-white hover:text-gray-900">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}