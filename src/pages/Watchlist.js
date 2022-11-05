import React from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
const Watchlist = () => {
  const { loading, watchlist, setAnimeInfo, setWatchlist } = useGlobalContext()

  const removeFromWatchlist = (id) => {
    const newList = watchlist.filter((item) => item.id !== id)
    setWatchlist(newList)
  }
  if (loading) {
    return <Loading />
  }
  if (watchlist.length < 1) {
    return <h3 className='section-title'>no animes in the watchlist</h3>
  } else {
    return (
      <section className='section'>
        <h2 className='section-title'>watchlist</h2>
        <div className='animes-center'>
          {watchlist.map((item, index) => {
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
                    onClick={() => removeFromWatchlist(item.id)}
                  >
                    Remove watchlist
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
}

export default Watchlist
