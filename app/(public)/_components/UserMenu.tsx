import {
  
  BookOpen,

  ChevronDownIcon,
  Home,
  
  LayoutDashboardIcon,
  LogOutIcon,
  
  
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

interface iAppProps{
  name:string;
  email:string;
  image:string;
}

export default function UserMenu({name,email,image}:iAppProps) {
  const router=useRouter()
  
   const SignOut=async()=>{
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect 
      toast.success("You are successfully sign out")
    },
    onError:()=>{
      toast.error("Failed to Sign Out")
    }
  },
});

   }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="Profile image" />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/"> <Home size={16} className="opacity-60" aria-hidden="true" />
            <span>Home</span></Link>
           
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/courses">  <BookOpen size={16} className="opacity-60" aria-hidden="true" />
            <span>Courses</span></Link>
          
          </DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/dashboard">
            <LayoutDashboardIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Dashboard</span></Link>
          
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={SignOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
