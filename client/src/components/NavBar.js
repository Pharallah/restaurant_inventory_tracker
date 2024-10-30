import React from 'react'
import { NavLink } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function NavBar() {

    const navigation = [
        { name: 'Dashboard', href: '/', current: true },
        { name: 'Supplier List', href: '/suppliers', current: false },
        { name: 'Restock Orders', href: '/restockorders', current: false },
      ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

  return (
    <Disclosure as="nav" className="bg-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-32 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center">
                            <img
                                alt="Your Company"
                                src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-1/340818725_256126496851858_8530473210603699355_n.jpg?stp=dst-jpg_s480x480&_nc_cat=100&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=Q8xwtThOOIIQ7kNvgFkBT0m&_nc_zt=24&_nc_ht=scontent-lga3-2.xx&_nc_gid=AfJEPODixf2Tf9o91JhkRTS&oh=00_AYBZdQYjJnuvhPNJS-ujYR0UXVLbIWL0lyNxpnMTafSruQ&oe=6727A8BC"
                                className="h-20 w-auto"
                            />
                        </div>
                        {/* Add your h1 here */}
                        <h1 className="text-3xl font-bold text-white ml-4 font-serif">Restaurant Inventory Tracker</h1>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex justify-end space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={NavLink}
                            to={item.href}
                            className={({ isActive }) =>
                                classNames(
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )
                            }
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
  )
}

export default NavBar