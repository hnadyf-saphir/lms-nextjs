import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export const Footer = ({ menuFooter, logoFooter }) => {
    return (
        <footer className="bg-neutral-900 text-white px-6 py-12 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo */}
                <div>
                    <img src={`http://localhost:1337${logoFooter.url}`} alt={logoFooter.alternativeText} className="w-28 mb-4" />
                </div>

                {
                    menuFooter.map((item) => (
                        <div>
                            <h4 className="text-[#7EC321] font-bold mb-3 text-lg">{item.textItem}</h4>
                            {
                                item.submenu.map((submenu, i) => (
                                    <ul className="space-y-2 text-sm pb-3">
                                        <Link href={submenu.subLink}>
                                            <li>{submenu.subText}</li>

                                        </Link>

                                    </ul>
                                ))
                            }

                        </div>
                    ))
                }


            </div>

            {/* Bas de page */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6 text-sm">
                <p>© 2024 LES MENUS SERVICES. Tous droits réservés.</p>

                <div className="flex gap-4 mt-4 md:mt-0 text-[#7EC321] text-xl">
                    <FaFacebookF />
                    <FaInstagram />
                    <FaLinkedinIn />
                    <FaYoutube />
                </div>
            </div>
        </footer>
    );
}