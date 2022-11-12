import { CheckCircleIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"

const AppStart: NextPage = () => {

    const [isApiCall, setIsApiCall] = useState<boolean>(false)
    const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [timeTaken, setTimeTaken] = useState<number>(0)

    async function sendAgenda(event: React.SyntheticEvent) {
        event.preventDefault()
        if (!isApiCall) {
            setIsApiCall(true)
            const target = event.target as typeof event.target & {
                email: { value: string }
                name: { value: string }
            }
            setEmail(target.email.value);
            const startTime = new Date().getTime()
            try {
                var response = await axios.post("/api/agendaRequest", {
                    email: target.email.value,
                    name: target.name.value,
                })
                const endTime = new Date().getTime()
                const ms = endTime - startTime;
                setTimeTaken(ms);
                if (response.status === 200) {
                    setIsRequestSuccess(true);
                }
            } catch {} finally {
                setIsApiCall(false)
            }
        }
    }

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>DevFest Chennai 2022</title>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon.png"></link>
                <link rel="shortcut icon" href="/favicon.png"></link>
                <meta name="theme-color" content="#000000"></meta>
            </Head>
            <main>
                <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-center text-gray-900">
                            வணக்கம் சென்னை!
                        </h2>
                        <p className="mt-2 mb-4 text-sm text-center text-gray-600">
                            Get the agenda for GDG Chennai DevFest 2022
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="px-8 py-8 md:shadow sm:bg-white sm:rounded-lg sm:px-10">
                            {   isRequestSuccess ? <div className="items-center self-center justify-center text-center">
                                <CheckCircleIcon className="w-6 h-6 p-0 m-auto text-green-600" />
                                <p className="mt-2 text-sm font-medium text-gray-600">
                                    Sending email to {email}<br></br>Request processed in {timeTaken} ms ({(timeTaken / 1000).toFixed(1)} seconds)
                                </p>
                            </div>
                            :   <form
                            className="space-y-6"
                            onSubmit={sendAgenda}
                            action="#">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        minLength={1}
                                        required
                                        className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        pattern="(?![_.-])((?![_.-][_.-])[\w.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                                        autoComplete="email"
                                        required
                                        className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm`}
                                    />
                                </div>
                            </div>
                            <div>
                                {!isApiCall ? (
                                    <button
                                        type="submit"
                                        className="flex justify-center w-full px-4 py-2 mt-8 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none">
                                        Send me the agenda
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="flex justify-center w-full px-4 py-2 mt-8 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-not-allowed focus:outline-none"
                                        disabled>
                                        <svg
                                            className="w-5 h-5 mr-3 animate-spin"
                                            viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25 fill-blue-700"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Please wait
                                    </button>
                                )}
                            </div>
                        </form>
                            }
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AppStart
