import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}
const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Acces a wide range of carefully curated course designed by industry experts",
    icon: "📖",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes and asigments to increase your learning experience. ",
    icon: "🖥",
  },
  {
    title: "Progress tracking",
    description:
      "Monitor your progess and achievments with detailed analytics and personalized dashboards.",
    icon: "📈",
  },
  {
    title: "Comunity Support",
    description:
      "Join a vibrant comunity of learners and instructors to collaborate and share knowledege.",
    icon: "👨‍👩‍👦‍👦",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-14 z-10">
        <div className="flex flex-col items-center space-y-6">
          <Badge
            variant="outline"
            className="bg-purple-200 text-purple-800 text-md p-1 px-2 z-10"
          >
            The Future of Online Education
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-purple-600">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground text-xl">
            Discover a new way to learn with our modern,interactive learning
            management system. Access high-quality courses anytime, anywhere{" "}
          </p>
          <div className="flex flex-col sm:flex-row mt-9 gap-4">
            <Link className={buttonVariants({ size: "lg" })} href="/courses">
              Explore Courses
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card
            key={index}
            className=" hover:scale-105 border-none shadow-sm hover:shadow-lg shadow-violet-400"
          >
            <CardHeader>
              <CardTitle className="text-md text-purple-700 flex ">
                <span className=" text-2xl mr-4">{feature.icon}</span>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-md text-muted-foreground justify-center text-center">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
