"use client"
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";


import router, { useRouter } from "next/navigation";
import { toast } from "sonner";
interface FeatureProps{
    title:string;
    description:string;
    icon:string;

}
const features:FeatureProps[]=[
    {
        title:"Comprehensive Courses",
        description:"Acces a wide range of carefully curated course designed by industry experts",
        icon:'📖'
    },
     {
        title:"Interactive Learning",
        description:"Engage with interactive content, quizzes and asigments to increase your learning experience. ",
        icon:'🖥'
    },
      {
        title:"Progress tracking",
        description:"Monitor your progess and achievments with detailed analytics and personalized dashboards.",
        icon:'📈'
    },
    {
        title:"Comunity Support",
        description:"Join a vibrant comunity of learners and instructors to collaborate and share knowledege.",
        icon:'👨‍👩‍👦‍👦'
    },

]


export default  function Home() {
 /*  const session = await auth.api.getSession({
        headers: await headers()
        
    }) */
   const router=useRouter()
   const {data:session}=authClient.useSession()

   const SignOut=async()=>{
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect 
      toast.success("You are successfully sign out")
    },
  },
});

   }

  return (
   <>
   <section className="relative py-14 z-10">
    <div className="flex flex-col items-center space-y-6">
        <Badge variant="outline" className="bg-purple-200 text-purple-800 text-md p-1 px-2 z-10">The Future of Online Education</Badge>
         <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-purple-600">Elevate your Learning Experience</h1>
         <p className="max-w-[700px] text-muted-foreground text-xl">Discover a new way to learn with our modern,interactive learning management system. Access high-quality courses anytime, anywhere </p>
    <div className="flex flex-col sm:flex-row mt-9 gap-4">
        <Link className={buttonVariants({size:"lg"})} href="/courses">Explore Courses</Link>
        <Link className={buttonVariants({size:"lg", variant:"outline"})} href="/login">Sign In</Link>

    </div>
    </div>
     

   </section>
   <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
    {
        features.map((feature,index)=>(
        <Card key={index} className="hover:shadow-lg shadow-transition">
            <CardHeader>
                
                <CardTitle className="text-md text-purple-700 flex ">
                    <span className=" text-2xl mr-4">{feature.icon}</span>
                 {feature.title}
               
                </CardTitle>
            </CardHeader>
            <CardContent className="text-md ext-muted-foreground">{feature.description}</CardContent>
        </Card>

        ))

        
    }

   </section>
   </>
  );
}
