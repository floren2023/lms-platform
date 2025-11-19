import Navbar from "@/app/(public)/_components/Navbar";
import react from 'react'

export default function LayoutPublic({children}:{children:react.ReactNode}){
    return(
        <div>
            <Navbar/>
            <main className="container mx-auto px-4 md:px-6 lg:px-8 ">{children}</main>
        </div>
    )
}