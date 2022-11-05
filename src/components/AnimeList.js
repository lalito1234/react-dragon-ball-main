import React from 'react'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'

const AnimeList = () => {
  const { animes, loading, setAnimeInfo, watchlist, setWatchlist, searchTerm } =
    useGlobalContext()

  const addToWatchlist = (item) => {
    const newArray = [...watchlist, item]
    setWatchlist([...new Set(newArray)])
  }

  if (loading) {
    return <Loading />
  }
  if (animes.length < 1) {
    return (
      <h2 className='section-title'>No animes matched your search criteria</h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Animes</h2>
      <div className='animes-center'>
        {animes
          .filter((value) => {
            if (searchTerm === '') {
              return ''
            } else if (value.name.toLowerCase().includes(searchTerm)) {
              console.log(value)
              return value
            }
          })
          .map((item, index) => {
            return (
              <article className='anime' key={index}>
                <div className='img-container'>
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className='anime-footer'>
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                  <Link
                    to={`/anime/${item.id}`}
                    className='btn btn-primary btn-details'
                    onClick={() => setAnimeInfo(item)}
                  >
                    details
                  </Link>

                  <button
                    className='btn btn-primary btn-details'
                    onClick={() => addToWatchlist(item)}
                  >
                    Add to watchlist
                  </button>
                </div>
              </article>
            )
          })}
      </div>
    </section>
  )
}

export default AnimeList
