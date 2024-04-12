'use client';

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions"
import { FLIGHT_PARAMETERS } from "next/dist/client/components/app-router-headers";

export default function SearchInput() {
    const searchParams = useSearchParams()



    return (
        <form action={actions.search}>
            <Input
            name='term'
            defaultValue={searchParams.get('term') || ''} />
        </form>
    )

}
