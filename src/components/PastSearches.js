import React from "react"

const PastSearches = (props) => {
  if (props.pastSearches.length > 0) {
    let searches = []
    props.pastSearches.forEach((search, index) => {
      const click = () => {
        props.fetchWeather(search)
        props.fetchMap(search)
      }
      searches.push(
        <li onClick={click} key={index} className="search">
          {search}
        </li>
      )
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
