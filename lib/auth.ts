import "server-only"
import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { resend } from "@/lib/resend";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { emailOTP } from "better-auth/plugins/email-otp";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          
        } else if (type === "email-verification") {
          // Send the OTP for email verification
         
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});


/*  async function sendOtp(email:string) {
  await fetch("/api/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

async function verifyOtp(email:string, otp:Number) {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });

  return res.json();
}
 */