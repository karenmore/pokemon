import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import './styles/PokemonPage.css'
import { useNavigate } from 'react-router-dom';

const PokemonPage = () => {

  const { id } = useParams()
  const [pokemonId, setPokemonId] = useState(parseInt(id, 10));

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  const [pokemon, getPokemon] = useFetch(url)

  const handleNextClick = () => {
    setPokemonId(prevId => prevId + 1);
  };

  const handlePrevClick = () => {
    if (pokemonId > 1) {
      setPokemonId(prevId => prevId - 1);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const navigateHome = useNavigate();
  const GoHome = () => {
    navigateHome('/');
  };



  useEffect(() => {
    getPokemon()
  }, [pokemonId])

  console.log(pokemon)

  return (
    <div className='pokemon__container__card'>

      <header className='pokemon__header'>
        <div className='pokemon'></div>
        <img onClick={GoHome} className='pokemon__ima__header' src="/International_Pokémon_logo.svg.png" alt="" />
        <img onClick={GoHome} className='pokemon__img' src="/images.jpg" alt="" />
      </header>

      <div className='btn__goback__continer'>
      <button className='btn__goback' onClick={handleGoBack}>Go Back</button>
      </div>

      <div className='card__info'>

        <div className={`header__card__info ${pokemon?.types[0].type.name}`}>
          <button className='btn__preview' onClick={handlePrevClick}></button>
          <img className='pokemon__imagen' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          <button className='btn__netx' onClick={handleNextClick}></button>
        </div>

        <div className='body__cadar'>

          <div>

            <section className='pokemon__detail'>

              <div className='pokemon__id'>
                <p>{pokemon?.id}</p>
              </div>

              <hr className='pokemon__hr' />
              <h2 className='pokemon__name'>{pokemon?.name}</h2>
              <ul className='pokemon__list__carter'>
                <li className='pokemon__list'>
                  <span>weight:</span>
                  <span className='pokemon__weigth'>{pokemon?.weight}</span>
                </li>
                <li className='pokemon__list'>
                  <span>height:</span>
                  <span className='pokemon__weigth'>{pokemon?.height}</span>
                </li>
              </ul>
              <ul className='pokemon__type__habilities'>
                <li className='pokemon__habilities'>
                  <span>Type:</span>
                  <span className='pokemon__type__habilities'>{pokemon?.types[0].type.name}</span>
                </li>
                <li className='pokemon__list'>
                  <span>Abilities:</span>
                  <span className='pokemon__habilities__name'>{pokemon?.abilities[0].ability.name}</span>
                </li>
                  {
                    pokemon?.abilities[1] && (
                      <li className='pokemon__list'>
                        <span className='pokemon__habilities__name'>{pokemon?.abilities[1].ability.name}
                </span>
                    </li>
                    )}
              </ul>
            </section>

            <section className='pokemon__stats'>
              <hr className='pokemon__stats_hr' />
              <h2 className='pokemon__stats_name'>States</h2>
              <ul>
                {
                  pokemon?.stats.map(Infstats => (
                    <li className='pokemon__stats__info' key={Infstats.stat.url} >
                      {Infstats?.stat.name}
                      <span className={`progreso ${pokemon?.types[0].type.name}`} style={{ width: `${(Infstats?.base_stat / 255) * 1000}%` }} >{Infstats?.base_stat}</span>
                      <span className='progreso__value'>100%</span>
                    </li>
                  ))
                }
              </ul>
            </section>
            <section className='pokemon__movies'>
              <hr className='pokemon__movies__hr' />
              <h2 className='pokemon__movies_name'>Movementens</h2>
              <ul className='pokemon__movies__ul'>
                {
                  pokemon?.moves.map(moveInfo => (
                    <li className='pokemon__movies__list' key={moveInfo?.move.name}>
                      {moveInfo?.move.name}
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
          <ul>
            <li></li>
          </ul>
        </div>

      </div>

    </div>
  )
}

export default PokemonPage
