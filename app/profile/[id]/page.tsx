'use client';

import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = ({ params }: any) => {

    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    const logout = async () => {
        try {
            const res = await axios.post('/api/users/logout');
            toast.success(res.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const getUser = async () => {
        try {
            const res = await axios.post('/api/users/me');
            setUser(res.data.user);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl text-white'>

                <h1 className='text-3xl font-bold text-center mb-6'>
                    Profile Page
                </h1>

                <div className='space-y-4'>

                    <div className='bg-gray-800 rounded-xl p-4'>
                        <p className='text-sm text-gray-400'>
                            Email
                        </p>

                        <p className='text-lg font-medium break-all'>
                            {user?.email || 'Loading...'}
                        </p>
                    </div>

                    <div className='bg-gray-800 rounded-xl p-4'>
                        <p className='text-sm text-gray-400'>
                            Username
                        </p>

                        <p className='text-lg font-medium'>
                            {user?.username || 'Loading...'}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className='w-full bg-red-500 hover:bg-red-600 transition-all duration-200 py-3 rounded-xl font-semibold mt-4 cursor-pointer'
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage