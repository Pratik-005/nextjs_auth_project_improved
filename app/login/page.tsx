'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';


const LoginPagePage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });


    const login = async () => {
    }

    return (
        <div className='h-screen flex items-center justify-center' >
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='flex flex-col gap-4 bg-blue-50 p-5 rounded-sm' >
                <h2 className='text-center' >Login</h2>
                <input
                    placeholder='email'
                    value={user.email}
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                    className='border px-2 py-1 rounded-sm'
                />

                <input
                    placeholder='password'
                    value={user.password}
                    onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                    className='border px-2 py-1  rounded-sm'
                />

                <button
                    onClick={LoginPagePage}
                    className='bg-black text-white px-2 py-1 cursor-pointer rounded-sm'>
                    Submit
                </button>

                <p className='text-xs text-center' >new user?
                    <span className='text-blue-500 ml-2' >
                        <Link href={'/signup'} >Register</Link></span> </p>
            </div>
        </div>
    )
}

export default LoginPagePage;