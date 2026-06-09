'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const SignupPage = () => {

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

    const signup = async () => {
        try {
            setDisabled(true);
            const res = await axios.post('/api/users/signup', user);
            toast.success(res.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.success(error.response.data.message);
        } finally {
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
                <h2 className='text-center' >Signup</h2>
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
                    onClick={signup}
                    disabled={disabled}
                    className='bg-black text-white px-2 py-1 cursor-pointer rounded-sm'
                > {disabled ? 'Loading...' : 'Submit'}</button>

                <p className='text-xs text-center' >Already have an account ?
                    <span className='text-blue-500 ml-2' >
                        <Link href={'/login'} >Login</Link></span> </p>
            </div>
        </div>
    )
}

export default SignupPage;