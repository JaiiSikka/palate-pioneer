"use client";

import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";
import {useState} from "react";

export default function SigninForm() {

    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        await signIn("credentials", { email, password, callbackUrl: "/" });

        setIsLoading(false);
    }

    return (
        <div className={`w-full`}>
            <form onSubmit={onSubmit} className={`space-y-4 flex flex-col items-center justify-center w-full`}>
                <input
                    id={`email`}
                    name={`email`}
                    className={`input input-bordered w-full max-w-md`} placeholder={`Email`} type={`email`}/>
                <input
                    id={`password`}
                    name={`password`}
                    className={`input input-bordered w-full max-w-md`} placeholder={`Password`} type={`password`}/>
                <button className={`btn btn-primary w-full max-w-md`}>Sign In</button>
            </form>

            <hr className={`my-6 max-w-md mx-auto`}/>

            <div className={`flex w-full items-center justify-center`}>
                <button
                    disabled={isLoading}
                    onClick={
                    async () => {
                        setIsLoading(true)
                        await signIn('google', {
                            callbackUrl: '/'
                        })
                    }
                } className={`btn bg-white w-full max-w-md`}><FcGoogle className={`mr-2 text-xl`}/> Sign In with
                    Google
                </button>
            </div>
        </div>
    )
}