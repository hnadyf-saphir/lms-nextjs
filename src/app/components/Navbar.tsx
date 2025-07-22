import Link from 'next/link'
import React from 'react'
import BtnPrimary from './BtnPrimary'

export default function Navbar({logo, menuItem, CTA}) {
    
    
    return (
        <nav className='border-b border-gray-200 bg-white'>
            <div className='bg-secondaryGreen text-xl text-textColor py-5 flex justify-end pr-28 space-x-5 '>
                <Link href="#"> Qui sommes-nous </Link>
                <Link href="#"> Actualités </Link>
                <Link href="/mon-compte" className="hover:underline flex items-center space-x-1">
                    <span>👤</span>
                    <span>Mon compte</span>
                </Link>
            </div>
            <div className='flex items-center justify-center space-x-36 m-8 ml-12'>
                <div className='flex items-center'>
                    <img src={`http://localhost:1337${logo.logo.url}`} alt={logo.alt} className='h-[100px] w-[100px] ' />
                </div>

                <div className='text-xl text-black py-5 flex  space-x-5'>
                    {menuItem.map((item) =>(
                        <Link key={item.id} href={item.href} className='hover:border-b-4 border-primaryGreen'> {item.text} </Link>
                    ))}
                   
                </div>
                <div className="flex space-x-3">
                    <BtnPrimary />
                    <button className='bg-btnColor text-white px-4 py-2 rounded'>
                       {CTA.text}
                    </button>
                </div>

            </div>

        </nav>

    )
} 
