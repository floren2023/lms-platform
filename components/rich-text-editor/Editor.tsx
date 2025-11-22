'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from './Menubar'
import TextAlign from "@tiptap/extension-text-align"

const RichTextEditor = ({field}:{field:any}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },}),
        TextAlign.configure({
            types:["heading","paragraph"]
        })
    ],
  
   editorProps:{
    attributes:{
      class:"min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
    },

   },
   onUpdate:({editor})=>{
    field.onChange(JSON.stringify(editor.getJSON()))

   },
   content:field.value?JSON.parse(field.value):"<p>Hello</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return (
    <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30'>
    <Menubar editor={editor}/>
    <EditorContent editor={editor}/>
    </div>
  )
}

export default RichTextEditor
