import { Popover, Transition } from "@headlessui/react"
import {
    NewspaperIcon,
} from "@heroicons/react/24/solid"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

const appNavigation = [
    { name: "Dashboard", href: "/app" },
    { name: "My Flights", href: "/app/flights" },
    { name: "My Profile", href: "/app/profile" },
]

const policyDocsMap = [
    {
        name: "Privacy Policy",
        description: "Last updated on September 24th, 2022.",
        href: "/docs/privacy",
        icon: NewspaperIcon,
    },
    {
        name: "Terms of Service",
        description: "Last updated on September 24th, 2022.",
        href: "/docs/terms",
        icon: NewspaperIcon,
    },
    {
        name: "Cookie Policy",
        description: "Last updated on September 24th, 2022.",
        href: "/docs/cookie",
        icon: NewspaperIcon,
    },
    {
        name: "Acceptable Use Policy",
        description: "Last updated on September 24th, 2022.",
        href: "/docs/acceptable-use",
        icon: NewspaperIcon,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

const HeaderSection: NextPage = () => {

    return (
        <Popover className="sticky top-0 z-20 bg-white border-b border-gray-100">
            <div className="px-6 mx-auto max-w-7xl sm:px-8">
                <div
                    className={`flex items-center py-4 border-gray-100 min-h-80 justify-center md:space-x-2`}>
                    <div
                        className={`flex justify-center`}>
                        <Link
                            passHref
                            href={"/"}>
                            <div className="cursor-pointer contents">
                                <span className="sr-only">DevFest Logo</span>
                                <Image
                                    src={`/devfest-chennai.svg`}
                                    height={74}
                                    width={200}
                                    alt="Logo"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
                    <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
                        <div className="px-5 py-6 space-y-6">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <Link
                                    href="mailto:support@avgeek.io"
                                    className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Contact
                                </Link>
                                {policyDocsMap.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default HeaderSection
