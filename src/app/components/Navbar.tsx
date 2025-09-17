import Link from 'next/link'
import React from 'react'
import BtnPrimary from './BtnPrimary'

export default function Navbar({ logo, menu, cta }) {

    return (
        <nav className="border-b border-gray-200 bg-white w-full">

            <div className="bg-secondaryGreen text-xl text-textColor py-3">
                <div className="max-w-[1200px] mx-auto flex justify-end space-x-5 pr-5">
                    <Link href="#">Qui sommes-nous</Link>
                    <Link href="#">Actualités</Link>
                    <Link href="/mon-compte" className="hover:underline flex items-center space-x-1">
                        <span>👤</span>
                        <span>Mon compte</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 py-5">
                <div>
                    <a href="/">
                        <img
                            src={`http://localhost:1337${logo.logo.url}`}
                            alt={logo.alt}
                            className="h-[100px] w-[100px]"
                        />
                    </a>
                </div>

                <div className="flex space-x-5 text-xl text-black">
                    {menu.map((item) => (
                        <div className="group relative" key={item.text}>
                            <Link href={item.href} className="font-bold">
                                {item.text}
                                {item.menuItem?.length > 0 && (
                                    <span className="ml-1 w-5 h-5">▼</span>
                                )}
                            </Link>
                            {item.menuItem?.length > 0 && (
                                <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-md z-50 mt-2 min-w-[220px] py-2 px-2">
                                    {item.menuItem.map((menuItem, i) => (
                                        <div className="mb-2" key={i}>
                                            {/* Gamme titre avec flèche */}
                                            <div className="bg-[#ebf7cc] text-black font-semibold px-3 py-2 rounded flex items-center justify-between">
                                                <span>{menuItem.textItem}</span>
                                                {menuItem.submenu?.length > 0 && (
                                                    <span className="text-sm">▼</span>
                                                )}
                                            </div>
                                            {/* Sous-menu */}
                                            <ul className="mt-1 ml-2 border-l border-gray-300 pl-3">
                                                {menuItem.submenu?.map((sub, j) => (
                                                    <li key={j}>
                                                        <Link
                                                            href={sub.subLink}
                                                            className="block py-1 px-2 text-gray-700 hover:bg-gray-100 rounded"
                                                        >
                                                            {sub.subText}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex space-x-3">
                    <BtnPrimary
                        type="button"
                        title="Trouver une agence"
                        variant="btn_white"
                    />
                    <BtnPrimary
                        type="button"
                        title={cta.text}
                        variant="btn_red"
                    />
                </div>
            </div>
        </nav>
    )
} 
