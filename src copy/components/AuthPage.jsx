import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpinningCircles } from 'react-loading-icons';
import { FaArrowAltCircleDown, FaEye, FaEyeSlash, FaUser, FaHome } from 'react-icons/fa';
import 'typeface-fira-sans';

const AuthPage = ({ signInWithEmailAndPassword, signUpWithEmailAndPassword, signInWithGoogle, errorMessage }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    // Dont use useEffect
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate('/home');
    //     }
    // }, [isAuthenticated, navigate]);

    // Navigasi jika pengguna sudah terautentikasi
    useEffect(() => {
        if (isAuthenticated && location.pathname === '/login') {
            navigate('/home'); // Navigate to '/home' if the user is authenticated and on the login page
        }
    }, [isAuthenticated, location.pathname, navigate]);


    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isSuccess = await signInWithGoogle();
        if (isSuccess) {
            navigate('/home');
        }

        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let isSuccess;

        if (isSignIn) {
            isSuccess = await signInWithEmailAndPassword(email, password);
        } else {
            isSuccess = await signUpWithEmailAndPassword(email, password, username);
        }

        if (isSuccess) {
            navigate('/home');
        }

        setIsLoading(false);
    };


    useEffect(() => {
        const link = document.getElementById('scroll-to');
        const handleClick = (event) => {
            event.preventDefault();
            const targetElement = document.getElementById('formContainer');
            targetElement.scrollIntoView({ behavior: 'smooth' });
        };
        link.addEventListener('click', handleClick);
        return () => {
            link.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/Quran_bg.jpg)`,
                    backgroundAttachment: 'fixed',
                    filter: 'brightness(0.60)',
                    zIndex: -1
                }}
            />
            <section id='landingContainer' className='min-h-screen flex flex-col px-2'>
                <header className=''>


                    <div className='bg-transparent p-2 sm:p-2'> </div>
                    <div className='bg-[#0b0b0b] w-full rounded bg-[#FAF9F6] flex justify-between px-5 py-3'>

                        <div className='w-full flex flex-wrap items-center justify-start lg:mx-3'>
                            <a> <FaHome className='text-[#FAF9F6] class="w-[16px] md:w-[20px] lg:w-[24px] h-[16px] md:h-[20px] lg:h-[24px]"' /></a>

                        </div>
                        <div className='w-full flex flex-wrap items-center justify-end lg:mx-3'>
                            <a className='inline-flex'>
                                <p className='text-[#FAF9F6] text-sm md:text-base lg:text-lg mr-1'>Contact Developer</p>
                                <FaUser className='text-[#FAF9F6] w-[16px] md:w-[20px] lg:w-[20px] h-[16px] md:h-[20px] lg:h-[24px]' />
                            </a>
                        </div>
                    </div>
                </header>

                <div id='jumbotron' className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className=" font-bold text-4xl md:text-5xl lg:text-6xl font-fira-sans bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 brightness-150 inline-block text-transparent bg-clip-text">
                            Al-Quran Tracking
                        </h1>
                    </div>

                    <div className="flex justify-center mt-20">
                        <ul className="list-none">
                            <li className="flex mb-4 items-center">
                                <img src="/assets/images/listIcon.png" className="w-5 h-5 mr-4" alt="list icon" />
                                <span className="text-[#FAF9F6] font-medium font-fira-sans text-base md:text-lg lg:text-xl">Mark the last verse read</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <img src="/assets/images/listIcon.png" className="w-5 h-5 mr-4" alt="list icon" />
                                <span className="text-[#FAF9F6] font-medium font-fira-sans text-base md:text-lg lg:text-xl">Track your progress</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <img src="/assets/images/listIcon.png" className="w-5 h-5 mr-4" alt="list icon" />
                                <span className="text-[#FAF9F6] font-medium font-fira-sans text-base md:text-lg lg:text-xl">Read online</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center mt-10 md:mt-20 lg:mt-10">
                        <button id='scroll-to' className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 brightness-125 py-2 md:py-3 lg:py-4 px-4 md:px-5 lg:px-6 text-xl md:text-2xl lg:text-3xl font-medium font-fira-sans rounded-full flex justify-center mx-auto">
                            <span className="flex items-center text-[#FAF9F6]">
                                Continue Reading
                                <FaArrowAltCircleDown className="ml-2" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>







            <section id='formContainer' className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-transparent p-6 sm:p-8 rounded  w-full max-w-sm sm:max-w-md lg:max-w-lg te">

                    <h1 className="font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 brightness-125 inline-block text-transparent bg-clip-text text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-center">{isSignIn ? 'Login' : 'Register'}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='email' className="inline-block align-baseline font-bold text-sm text-[#31a6fe] hover:text-blue-800">
                                Email:
                            </label>
                            <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        {!isSignIn && (
                            <div className='mb-4'>
                                <label htmlFor='username' className="inline-block align-baseline font-bold text-sm text-[#31a6fe] hover:text-blue-800">
                                    Username:
                                </label>
                                <input
                                    id='username'
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                        )}
                        <div className='mb-4 relative'>
                            <label htmlFor='password' className="inline-block align-baseline font-bold text-sm text-[#31a6fe] hover:text-blue-800">
                                Password:
                            </label>
                            <div className='flex items-center'>
                                <input
                                    id='password'
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                <button
                                    type='button'
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between w-full">
                            <button type='submit' className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 brightness-125 hover:bg-blue-700 text-[#FAF9F6] font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                                {isSignIn ? 'Sign In' : 'Sign Up'}
                            </button>
                            <a
                                href='#'
                                className="inline-block align-baseline font-bold text-sm text-[#31a6fe] hover:text-blue-800 mb-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSignIn(!isSignIn);
                                }}
                            >
                                {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                            </a>

                            <button
                                onClick={handleSignInWithGoogle}
                                className='bg-red-500 text-[#FAF9F6] px-4 py-2 rounded-md flex items-center justify-center'
                            >
                                Sign In with Google
                            </button>
                        </div>


                    </form>
                    {isLoading && <div className='flex justify-center mt-4'><SpinningCircles /></div>}
                    {errorMessage && <div className='text-red-500 text-center mt-4'>{errorMessage}</div>}

                </div>
            </section>
        </div>
    );
};

export default AuthPage;
