import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'

export const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between nx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-4xl font-bold mx-10'>Medi<span className='text-[#008cff]'>Co</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-semibold items-center gap-5'>
                        <li>Add</li>
                        <li>List of Products</li>
                    </ul>
                    {/* {
                        !user ? (
                            <div className='flex items-center gap-2'>
                            </div>
                        ) : ( */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <div className='flex gap-4 space-y-2'>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>User</h4>
                                    <p className='text-sm text-muted-foreground'>User</p>
                                </div>
                            </div>
                            <div className='flex flex-col text-gray-600'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2 />
                                    <Button variant="link">View Profile</Button>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor=pointer'>
                                    <LogOut />
                                    <Button variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {/* )
                    } */}
                </div>
            </div>
            <div className='flex w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto h-12 my-20'>
                <input type="text"
                    placeholder='Add products and ingredients'
                    className='outline-none border-none w-full items-center' />
            </div>
        </div>
    )
}
export default Navbar