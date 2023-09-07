import Image from "next/image";
import Link from "next/link";
import logo from '../../../public/images/logo.png';

export default function Layout({children}) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
                <Link
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <Image
                        src={logo}
                        alt="Vercel Logo"
                        className="w-12 h-12 mr-4"
                        width={100}
                        height={24}
                    />
                    Chit Chat Cirus
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    {children}
                </div>
            </div>
        </section>
    );
}
