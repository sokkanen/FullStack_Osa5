import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  let reset = () => {
    setValue('')
  }

  return {
    reset,
    type,
    value,
    onChange
  }
}

export default useField