import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const AppContext = React.createContext()

const getLocalStorage = () => {
  let watchlist = localStorage.getItem('watchlist')
  if (watchlist) {
    return JSON.parse(localStorage.getItem('watchlist'))
  } else {
    return []
  }
}

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('a')
  const [watchlist, setWatchlist] = useState(getLocalStorage())
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(false)
  const [animeInfo, setAnimeInfo] = useState()

  React.useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const fetchAnimes = useCallback(async () => {
    setLoading(true)
    const response = await fetch(
      `https://dragon-ball-super-api.herokuapp.com/api/characters?`
    )
    const data = await response.json()

    if (data) {
      const newAnimes = data.map((item) => {
        const { imageUrl, name, role, specie, originplanet, status } = item

        return {
          imageUrl,
          name,
          role,
          specie,
          originplanet,
          status,
        }
      })
      setAnimes(newAnimes)
    } else {
      setAnimes([])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAnimes()
  }, [searchTerm, fetchAnimes])

  return (
    <AppContext.Provider
      value={{
        loading,
        animeInfo,
        setAnimeInfo,
        searchTerm,
        animes,
        watchlist,
        setWatchlist,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
