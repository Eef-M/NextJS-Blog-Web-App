import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <div className='bg-[#516BEB] py-5 px-10 flex items-center justify-between'>
                <Link href={'/'}>
                    <h1 className='font-bold text-2xl text-white'>BLOG</h1>
                </Link>
                <div className='flex items-center justify-center gap-5'>
                    <Link href={`/`}>
                        <p className='text-white font-bold'>Home</p>
                    </Link>
                    <Link href={`/users`}>
                        <p className='text-white font-bold'>Users</p>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Navbar