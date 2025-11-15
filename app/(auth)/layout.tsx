import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image"

export default function AuthLayout({children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant:'outline',
                className:'absolute top-4 left-0'
            })}>
            <ArrowLeft className="size-4"/>
            Back</Link>
             <div className="flex w-full max-w-sm flex-col gap-6">
                 
                <Link href="/" className="text-fuchsia-500 flex gap-2  items-center self-center font-medium">
                 <Image src="/logo.svg" alt="logo" width={32}  height={32} className=""></Image>
          
                Daniel Gherasim SRL</Link>
          
            {children}
            <div className="text-balance text-center text-xs text-muted-foreground">
                By clicking continue, you agrre with our <span className="hover:text-primary hover:underline">Terms of service</span> 
                and <span className="hover:text-primary hover:underline">Privacy Policy</span>
            </div>
        </div>

        </div>
       
    )
}