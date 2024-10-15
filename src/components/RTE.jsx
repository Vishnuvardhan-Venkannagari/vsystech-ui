import React from 'react'
import { Controller } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react"

export default function RTE({
    name, control, label, defaultValue=""
}) {
  return (
    <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1'>{label}</label>
        }
        {
        /*What is controller 
        React Hook Form embraces uncontrolled components and native inputs, however it's hard to
         avoid working with external controlled component such as React-Select, AntD and MUI. 
         This wrapper component will make it easier for you to work with them. 
        
        What is controll obj in controller 
        control object is from invoking useForm. Optional when using FormProvider.
        
        What is render obj in controller 
        the controll object is invoking the useForm This is a render prop. The function that
        returns a react element and provides the ability to attach events and value into components
        This simplified integrating with external controlled components with non-standard -props names
        Provieds onChange, onBlur name, ref  and value to the child components and also a field state obj
        which contains specific input state */}
        <Controller 
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor 
            initialValue={defaultValue}
            init={{
                branding: false,
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}
