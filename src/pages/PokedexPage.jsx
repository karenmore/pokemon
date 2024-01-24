import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { useEffect, useRef, useState } from 'react'
import PokeCard from '../components/PokedexPage/PokeCard'
import SelectType from '../components/PokedexPage/SelectType'
import './styles/PokedexPage.css'
import { Pagination, PaginationItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/Modal/CustomModal';

const PokedexPage = () => {

    const [inputValue, setInpuValue] = useState('')
    const [typeSelected, setTypeSelected] = useState('allPokemons')

    const trainerName = useSelector(states => states.trainer)
    const [showValidNameMessage, setShowValidNameMessage] = useState(false);

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0'

    const [pokemons, getPokemons, getTypePokemon] = useFetch(url)

    useEffect(() => {
      if(typeSelected === 'allPokemons'){
        getPokemons()
      }else {
        getTypePokemon(typeSelected)
      }
    }, [typeSelected])

    const inputName = useRef()

    const handlSearch = e => {
      e.preventDefault();
      const inputValue = inputName.current.value.trim().toLowerCase();
      if (pokemons.results.some(pokemon => pokemon.name.includes(inputValue))) {
        setInpuValue(inputValue);
        setShowValidNameMessage(false);
        inputName.current.value = '';
      } else {
        setShowValidNameMessage(true);
        inputName.current.value = '';
      }
    }

    
    const handleOpen = () => {
      setShowValidNameMessage(true);
    };

    const handleClose = () => {
      setShowValidNameMessage(false);
    };
    

    console.log(pokemons)

    const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

      const [page, setPage] = useState(1);
      const handleChange = (e, value) => {
        e.preventDefault();
        setPage(value);
      };


    let start = (page -1)*12;
    let end = start + 12;
    let total = pokemons?.results.slice(start,end) || [];

    const navigateHome = useNavigate();
    const GoHome = () => {
      navigateHome('/');
    };


  return (
    <div className='Pokedex__conteiner'>

        
      <header className='pokedex__header'>
        <div className='pokedex'></div>
        <img onClick={GoHome} className='pokedex__ima__header' src="/International_Pokémon_logo.svg.png" alt="" />
        <img onClick={GoHome} className='pokedex__img' src="/images.jpg" alt="" />
      </header>
      

      
      <article className='pokedex__article'>
        <h2 className='pokedex__welcome'>Hi <span className='pokedex__trainer'>{trainerName}</span>, here you can find your favoritoe pokemon</h2>
          <form className='pokedex__form' onSubmit={handlSearch}>
            <input className='pokedex__input' ref={inputName} type='text`'/>
            <button className='pokedex__btn'>Search</button>
          </form>
          <div>
      <CustomModal open={showValidNameMessage} handleClose={handleClose} />
          </div>
      <SelectType setTypeSelected={setTypeSelected}  />
      </article>
      
      <dir className='pokedex__container'>
        {
            total.filter(cbFilter).map( pokeInfo => (
                <PokeCard
                key={pokeInfo.url}
                url={pokeInfo.url}
                />
            ))
        }
      </dir>

      <div className='pokedex__pagination'>
      <Pagination 
        count={12} page={page} onChange={handleChange} 
        renderItem={(item) => (
          <PaginationItem {...item} sx={{ color: '#000', 
          backgroundColor: '#fe1936', 
          borderRadius: '10%', 
          width: '40px', 
          height: '40px', 
          border: '3px solid #000',
          margin: '10px'}} />
        )}
      />
      </div>

    </div>
  )
}

export default PokedexPage
