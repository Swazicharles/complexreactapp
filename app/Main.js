import React from "react"
import ReactDOM from "react-dom"
import { useState } from "react"
import { useEffect } from "react"

function OurApp() {
  const [pets, setPets] = useState([])
  // Only run once, the first time this compent is rendered
  useEffect(() => {
    if (localStorage.getItem("examplePetData")) {
      setPets(JSON.parse(localStorage.getItem("examplePetData")))
    }
  }, [])
  //Run everytime our pet state changes

  useEffect(() => {
    localStorage.setItem("examplePetData", JSON.stringify(pets))
  }, [pets])
  return (
    <>
      <OurHeader />
      <LikedArea />
      <TimeArea />
      <AddPetForm setPets={setPets} />
      <ul>
        {pets.map(function (pet) {
          return <Pet id={pet.id} setPets={setPets} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />
        })}
      </ul>
      <Footer />
    </>
  )
}

function AddPetForm(props) {
  const [name, setName] = useState()
  const [species, setSpecies] = useState()
  const [age, setAge] = useState()
  function handleSubmit(e) {
    e.preventDefault()
    props.setPets((prev) => prev.concat({ name, species, age, id: Date.now() }))
    setName("")
    setSpecies("")
    setAge("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="species" />
        <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}

function LikedArea() {
  const [likeCount, setLikeCount] = useState(0)
  function increaseLikedHandler() {
    setLikeCount(function (prev) {
      return prev + 1
    })
  }

  function decreseLikeHandler() {
    setLikeCount((prev) => {
      if (prev > 0) {
        return prev - 1
      }
      return 0
    })
  }

  return (
    <>
      <button onClick={increaseLikedHandler}>Increase Likes</button>
      <button onClick={decreseLikeHandler}>Decrease Likes</button>
      <h2>This page has been liked {likeCount} times</h2>
    </>
  )
}
function Pet(props) {
  function handleDelete() {
    props.setPets((prev) => prev.filter((pet) => pet.id != props.id))
  }
  return (
    <li>
      {props.name} is a {props.species} and is {props.age} years old
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

function OurHeader() {
  return <h1>This is our App!!</h1>
}

function TimeArea() {
  const [theTime, setTheTime] = useState(new Date().toLocaleString())

  useEffect(() => {
    setInterval(() => {
      const interval = setTheTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <p>The current time is {theTime}.</p>
}

function Footer() {
  return <small>This is the copyright text</small>
}
setInterval(function () {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)

if (module.hot) {
  module.hot.accept()
}
