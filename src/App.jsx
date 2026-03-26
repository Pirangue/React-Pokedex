import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const typeColors = {
    normal: '#a8a878',
    fire: '#f08030',
    water: '#6890f0',
    electric: '#f8d030',
    grass: '#78c850',
    ice: '#98d8d8',
    fighting: '#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#ee99ac',
  }

  const formatStatName = (name) => {
    const names = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'Atq. Esp.',
      'special-defense': 'Def. Esp.',
      speed: 'Velocidade',
    }
    return names[name] || name
  }

  const searchPokemon = async () => {
    const name = input.trim().toLowerCase()
    if (!name) return

    setLoading(true)
    setError('')
    setPokemon(null)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if (!response.ok) {
        throw new Error('Pokémon não encontrado')
      }
      const data = await response.json()
      setPokemon(data)
    } catch (error) {
      setError(`❌ Pokémon "${name}" não encontrado. Verifique o nome ou ID.`)
      console.error('Erro na API:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPokemon()
    }
  }

  const getMainType = () => {
    if (pokemon && pokemon.types.length > 0) {
      return pokemon.types[0].type.name
    }
    return 'normal'
  }

  const mainTypeColor = typeColors[getMainType()] || '#777'

  return (
    <div className="container">
      <h1>Pokédex</h1>

      <div className="search-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o nome ou ID do Pokémon"
        />
        <button onClick={searchPokemon}>Buscar</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {loading && <p className="error-msg">Carregando...</p>}

      {pokemon && (
        <div className="pokemon-card">
          <div className="card-header" style={{ backgroundColor: mainTypeColor }}>
            <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
            <img
              src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-img"
            />
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="types">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="type-badge"
                  style={{ backgroundColor: typeColors[t.type.name] || '#777' }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="card-body">
            <div className="info-row">
              <div className="info-item">
                <span className="info-label">Altura</span>
                <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="info-item">
                <span className="info-label">Peso</span>
                <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className="info-item">
                <span className="info-label">XP Base</span>
                <span className="info-value">{pokemon.base_experience || '—'}</span>
              </div>
            </div>

            <div className="section">
              <h3>Habilidades</h3>
              <p className="abilities">
                {pokemon.abilities.map((a) => a.ability.name.replace('-', ' ')).join(', ')}
              </p>
            </div>

            <div className="section">
              <h3>Stats</h3>
              <div className="stats">
                {pokemon.stats.map((s) => {
                  const percent = Math.min((s.base_stat / 255) * 100, 100)
                  return (
                    <div key={s.stat.name} className="stat">
                      <span className="stat-name">{formatStatName(s.stat.name)}</span>
                      <div className="stat-bar-bg">
                        <div
                          className="stat-bar"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: mainTypeColor,
                          }}
                        ></div>
                      </div>
                      <span className="stat-value">{s.base_stat}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
