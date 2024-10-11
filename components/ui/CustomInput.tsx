import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './form'
// import { Input } from './form'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput{
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    style?: React.CSSProperties; // Add style prop
    className?: string;          // Optional: Add className prop for flexibility
}


const CustomInput = ({ control, name, label, placeholder, style, className }) => {
    return (
      <div style={style} className={className}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className="form-item">
              <FormLabel className="form-label">
                {label}
              </FormLabel>
              <div className="flex w-full flex-col">
                <FormControl>
                  <input
                    placeholder={placeholder}
                    className="input-class"
                    type={name === 'password' ? 'password' : 'text'}
                    {...field}
                    style={style} // Apply style to input (optional)
                  />
                </FormControl>
                {/* <FormMessage className="form-message mt-2" /> */}
              </div>
            </div>
          )}
        />
      </div>
    );
};


export default CustomInput
