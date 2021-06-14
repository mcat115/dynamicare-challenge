import React from "react"

const PastSearches = (props) => {
  if (props.pastSearches.length > 0) {
    let searches = []
    let i = 1
    props.pastSearches.forEach((search) => {
      const click = () => {
        props.fetchWeather(search)
        props.fetchMap(search)
      }
      searches.push(
        <li onClick={click} key={i} className="search">
          {search}
        </li>
      )
      i++
    })

    return (
      <div>
        <h3>Past searches. Click to access again!</h3>
        <ul>{searches}</ul>
      </div>
    )
  } else {
    return null
  }
}

export default PastSearches
