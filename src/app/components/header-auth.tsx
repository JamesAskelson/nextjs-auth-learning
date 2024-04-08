'use client'

import { auth } from "@/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Button, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import * as actions from '@/actions';
import { useSession } from "next-auth/react";

export default function HeaderAuth(){
    const session = useSession();

    let authContent: React.ReactNode;

    if(session.status === 'loading'){
        authContent = null;
    } else if(session.data?.user){
        authContent = <Popover placement='bottom'>
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ""}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.signOut}>
                        <Button type='submit'>
                            Sign Out
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>

    } else {
        authContent = <>
            <form action={actions.signIn}>
                <NavbarItem>
                    <Button type='submit' color='secondary' variant='bordered'>Sign In</Button>
                </NavbarItem>
            </form>

            <form action={actions.signIn}>
                <NavbarItem>
                    <Button type='submit' color='primary' variant='flat'>Sign Up</Button>
                </NavbarItem>
            </form>
        </>
    }


    return authContent
}
