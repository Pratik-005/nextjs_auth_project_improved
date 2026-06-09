'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


const LoginPagePage = () => {


    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (user.email.trim().length < 0 || user.password.trim().length < 0) {
            setDisabled(true)
        } else {
            setDisabled(false);
        }
    }, [user]);

    const login = async () => {
        try {
            setDisabled(true);
            const res = await axios.post('/api/users/login', user);
            toast.success(res.data.message);
            router.push('/profile');
        } catch (error: any) {
            toast.success(error.response.data.message);
        }
        finally {
            setDisabled(false);
        }
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
                    onClick={login}
                    className='bg-black text-white px-2 py-1 cursor-pointer rounded-sm'>
                    Submit
                </button>

                <p className='text-xs text-center' >New user ?
                    <span className='text-blue-500 ml-2' >
                        <Link href={'/signup'} >Signup</Link></span> </p>
            </div>
        </div>
    )
}

export default LoginPagePage;