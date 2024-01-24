import  { useRef } from 'react'
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'

const HomePage = () => {

    const inputTrainer = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handlSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerG(inputTrainer.current.value.trim()))
        navigate('/pokedex')
    }


  return (
    <div className='home__continer'>
      <header>
        <img className='home__imagen' src="/International_Pokémon_logo.svg.png" alt="" />
      </header>
        <h1 className='home__trainer'>Hi Trainer!</h1>
        <p className='home__description'>To start this app, give me your trainer name</p>
        <form className='home__form' onSubmit={handlSubmit}>
            <input className='home__input' ref={inputTrainer} type="text" />
            <button className='home__btn'>Catch them all</button>
        </form>
        <footer className='home__footer'>
          <div className='home__footer2'></div>
          <img className='home__img__footer' src="/images.jpg" alt="" />
        </footer>
    </div>
  )
}

export default HomePage
