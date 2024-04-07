"use client";

import { signIn } from 'next-auth/react';
import { useState } from "react";
import LoginForm from '@components/LoginForm';
import SignUpForm from '@components/SignUpForm';

const AuthorizationPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackURL: "http://localhost:3000" });
  }

  const handleGithubSignIn = () => {
    signIn("github", { callbackURL: "http://localhost:3000" });
  }

  let googleButton = (
    <button
      onClick={handleGoogleSignIn}
      aria-label="Sign in with Google"
      className="flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3 w-full justify-center"
    >
      <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
        <div className="flex justify-center items-center h-[20px] w-[20px]">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="64" height="64"><defs><path id="A" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="B"><use xlinkHref="#A" /></clipPath><g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)"><path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" /><path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335" /><path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853" /><path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4" /></g></svg>
        </div>
      </div>
      <span className="text-sm text-google-text-gray tracking-wider">Sign in with Google</span>
    </button>
  )

  let githubButton = (
    <button
      onClick={handleGithubSignIn}
      aria-label="Sign in with GitHub"
      className="flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3 w-full justify-center"
    >
      <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
        <div className="flex justify-center items-center h-[20px] w-[20px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z" /></svg>
        </div>
      </div>


      <span className="text-sm text-google-text-gray tracking-wider">Sign in with GitHub</span>
    </button>
  )

  return (
    <section className="w-[100%] flex justify-center items-center flex-col">

      <h2 className="lg:text-3xl sm:text-2xl text-center pb-8">
        Welcome! Login or Sign Up to {<br />}access all features of the marketplace !
      </h2>

      <div className="w-full max-w-[560px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 " >

        {
          isNewUser ?
            <SignUpForm />
            :
            <LoginForm />
        }

        <div className="pt-[12px] text-m font-medium text-gray-500 dark:text-gray-300">
          Not registered? {" "}
          <a
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-gray-800 hover:underline dark:text-gray-900">
            Create account!
          </a>
        </div>

        <div className="flex gap-4 mt-4 flex-col w-full">
          {googleButton}
          {githubButton}
        </div>
      </div>

    </section>
  )
}

export default AuthorizationPage