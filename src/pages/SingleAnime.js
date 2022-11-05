import React from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const SingleAnime = () => {
  const { animeInfo, loading } = useGlobalContext()
  if (loading) {
    return <Loading />
  }
  if (!animeInfo) {
    return <h3 className='section-title'>no animes to display</h3>
  } else {
    const { name, role, imageUrl, status, originplanet, specie } = animeInfo
    return (
      <section className='section anime-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h3 className='section-title'>{name}</h3>
        <div className='details'>
          <img src={imageUrl} alt={name}></img>

          <div className='details-info'>
            <p>
              <span className='details-data'>name :</span> {name}
            </p>
            <p>
              <span className='details-data'>role :</span> {role}
            </p>
            <p>
              <span className='details-data'>originplanet :</span>
              {originplanet}
            </p>
            <p>
              <span className='details-data'>specie:</span> {specie}
            </p>
            <p>
              <span className='details-data'>status :</span>
              {status}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleAnime
