import React, { useState } from "react"

const Form = (props) => {
  const [formZip, setFormZip] = useState("")

  const handleInput = (event) => {
    setFormZip(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.onSubmission(formZip)
    setFormZip("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="zip">
        What zip code would you like to see a map of and know the weather for?
      </label>
      <input id="zip" type="text" value={formZip} onChange={handleInput} />
      <input type="submit" />
    </form>
  )
}

export default Form
