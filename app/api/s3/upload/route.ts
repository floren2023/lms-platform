import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"
import {z} from "zod"
import { v4 as uuidv4 } from 'uuid';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { s3 } from "@/lib/s3client";

export const fileUploadSchema=z.object({
    fileName:z.string().min(1,{message:"Filename is required!"}),
    contentType:z.string().min(1,{message:"ContentType is required!"}),
    size:z.number().min(1,{message:"Size is required!"}),
    isImage:z.boolean()
})

//generate presigned url
export async function POST(request:Request){
    try{
       const body=await request.json()
       const validation=fileUploadSchema.safeParse(body)
       if(!validation.success){
        return NextResponse.json({error:"Invalid request body"}, {status:400})
       }
       
       const {fileName,contentType,size}=validation.data
       const uniqueKey=`${uuidv4()}-${fileName}`
       const command=new PutObjectCommand({
          Bucket:process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
          ContentType:contentType,
          ContentLength:size,
          Key:uniqueKey
        })
        const presignedUrl=await getSignedUrl(s3,command,{
            //URL expire time is 6 min
            expiresIn:360,
        })
        const response={
            presignedUrl,
            key:uniqueKey
        }
        return NextResponse.json(response)
    }catch{
             return NextResponse.json({
                error:"failed to generate presigned URL"},{status:500
             })
    }


}