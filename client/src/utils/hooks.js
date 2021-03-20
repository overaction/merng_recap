import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const onChange = (e) => {
        setValues({...values ,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            await callback();
        } catch(e) {
            console.log(e)
        }
    }

    return {
        onChange,
        onSubmit,
        values
    }
}