'use client';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerifyProfile = () => {

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();

    const verifyUser = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifytoken', { token });
            setVerified(true);
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = searchParams.get('token');
        setToken(urlToken || "");
    }, [searchParams]);

    useEffect(() => {
        if (token.length > 0) {
            verifyUser();
        }
    }, [token]);

    return (
        <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>

            <div className='w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl text-white text-center'>

                {/* Heading */}
                <h1 className='text-3xl font-bold mb-6'>
                    Email Verification
                </h1>

                {/* Loading */}
                {loading && (
                    <div className='space-y-4'>
                        <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto'></div>

                        <p className='text-gray-400 text-lg'>
                            Verifying your account...
                        </p>
                    </div>
                )}

                {/* Success */}
                {!loading && verified && (
                    <div className='space-y-5'>

                        <div className='w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto'>
                            <span className='text-4xl'>✅</span>
                        </div>

                        <div>
                            <h2 className='text-2xl font-semibold text-green-400'>
                                Verified Successfully
                            </h2>

                            <p className='text-gray-400 mt-2'>
                                Your account has been verified successfully.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/login')}
                            className='w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 py-3 rounded-xl font-semibold cursor-pointer'
                        >
                            Go to Login
                        </button>

                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className='space-y-5'>

                        <div className='w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto'>
                            <span className='text-4xl'>❌</span>
                        </div>

                        <div>
                            <h2 className='text-2xl font-semibold text-red-400'>
                                Verification Failed
                            </h2>

                            <p className='text-gray-400 mt-2'>
                                {error}
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/signup')}
                            className='w-full bg-red-500 hover:bg-red-600 transition-all duration-200 py-3 rounded-xl font-semibold cursor-pointer'
                        >
                            Back to Signup
                        </button>

                    </div>
                )}

            </div>
        </div>
    )
}

export default VerifyProfile;