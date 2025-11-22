"use client"
import  {useCallback, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { RenderEmptyState } from './RenderState'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

interface UploaderState{
   id: string|null 
   file: File|null
   uploading: boolean
   progress: number
   key?: string
   isDeleting: boolean
   error: boolean
   objectUrl?: string
   fileType:"image"|"video"
}

const Uploader = () => {
    const [fileState,setFileState]=useState<UploaderState>({
        error:false,
        file:null,
        id:null,
        uploading:false,
        progress:0,
        isDeleting:false,
        fileType:"image",


    })
    async function uploadFile(file:File){
        setFileState((prev)=>({
            ...prev,
            uploadFile:true,
            progress:0
        }))
        try{
            //1. get our presigned Url
            const presignedResponse=await fetch('/api/s3/upload', 
              {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                  fileName:file.name,
                  contentType:file.type,size:file.size,isImage:true
                })
              },
            )
  if(!presignedResponse.ok){
    toast.error("Failed to get presigned Url")
     setFileState((prev)=>({
            ...prev,
            uploading:false,
            progress:0,
            error:true
        }))
        return 

  }
  const {presignedUrl, key}=await presignedResponse.json()
  await new Promise((resolve,reject)=>{
    const xhr=new XMLHttpRequest()
    xhr.upload.onprogress=()=>{
      
    }
  })
        }catch{}

    }
      const onDrop = useCallback((acceptedFiles:File[] )=> {
    // Do something with the files
   // console.log('accepted',acceptedFiles)
     if(acceptedFiles.length>0){
        const file=acceptedFiles[0]
        setFileState({
            file:file,
            uploading:false,
            progress:0,
            objectUrl:URL.createObjectURL(file),
            error:false,
            id:uuidv4(),
            isDeleting:false,
            fileType:"image"
        })

     }
  }, [])


/* const maxLength = 20;

function nameLengthValidator(file:File) {
  if (file.name.length > maxLength) {
    return {
      code: "name-too-large",
      message: `Name is larger than ${maxLength} characters`
    };
  } 
    return null
}*/

  
  function rejectedFiles(fileRejections:FileRejection[])
  {
    console.log('rejected:',fileRejections.length)
    if(fileRejections.length>1){
        const toManyFiles=fileRejections.find((rejection)=>{
            rejection.errors[0].code==="too-many-files"
        })

     const fileSizeToBig  = fileRejections.find((rejection)=>{
            rejection.errors[0].code==="file-too-large"
        })
       if(toManyFiles) {
        toast.error('Too many files selected, max is 1')
       }
        if(fileSizeToBig) {
        toast.error('File size exceeds the limit, max 5M')
       }

        
    }

}
     const {getRootProps, getInputProps,  acceptedFiles,
    fileRejections, isDragActive} = useDropzone({onDrop,
        accept:{"image/*":[]}, //accept only images
        maxFiles:1, //1 file
        multiple:false,
        maxSize:5*1024*1024,//5M        
        onDropRejected:rejectedFiles
     })
    
     
      
  return (
    
         <Card {...getRootProps()} className={cn("relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64 "
        ,isDragActive?'border-primary bg-primary/10 border-solid':'border-border hover:border-primary'
    )}>
        <CardContent className='flex items-center justify-center h-full w-full p-4'>
               <input {...getInputProps()} />
               <RenderEmptyState isDragActive={isDragActive}/>
             
        </CardContent>
      
      
    </Card>
    
   
  )
}

export default Uploader


