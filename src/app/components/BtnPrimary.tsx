import React from 'react'

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    variant: 'btn_red' | 'btn_white';

}

const BtnPrimary = ({type, title, variant} : ButtonProps) => {
    return (
        <button className={`rounded-lg  ${variant}`} type={type}>
           <label className='font-medium text-lg uppercase '>{title}</label> 
        </button>
    )
}


export default BtnPrimary