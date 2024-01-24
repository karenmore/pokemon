import { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/SelectType.css'

const SelectType = ({setTypeSelected}) => {

    const url = 'https://pokeapi.co/api/v2/type'
    const [ type, getTypes ] = useFetch(url)

    useEffect(() => {
        getTypes()
    }, [])

    const typeRef = useRef()

    const  handlChange = () => {
        setTypeSelected(typeRef.current.value)
    }

    return (
        <div className='Select'>
            <select className='select__type' ref={typeRef} onChange={handlChange}>
            <option className='select__option' value={'allPokemons'} >All Pokemons</option>
            {
                type?.results.map(type => (
                    <option className='select__option' key={type.url} value={type.url}>{type.name}</option>
                ))
            }
        </select>
        </div>
    )
}

export default SelectType
