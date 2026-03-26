# 🎮 Pokédex (React)

An interactive Pokédex application built with React that allows users to search for Pokémon and view detailed information about them.

## Features

- **Search by Name or ID** — Find any Pokémon using its name or national Pokédex ID
- **Detailed Information** — View comprehensive Pokémon stats including:
  - Official artwork image
  - Height and weight
  - Base experience points
  - Abilities
  - Full stat breakdown (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- **Type-Based Color Coding** — Each Pokémon is color-coded based on its primary type
- **Visual Stat Bars** — Stats are displayed with proportional bar graphs
- **Error Handling** — User-friendly error messages when Pokémon are not found
- **Keyboard Support** — Press Enter to search, or click the search button

## How It Works

1. Enter a Pokémon name (e.g., "pikachu") or ID number (e.g., "25") in the search box
2. Click **Buscar** or press **Enter**
3. The app fetches data from the PokeAPI and displays a detailed card with:
   - Pokémon image and ID
   - Type badges with corresponding colors
   - Physical measurements (height/weight)
   - Base experience value
   - All abilities
   - Complete stat breakdown with visual bars

## Type Colors

Each Pokémon type has a distinct color, displayed as badges on the Pokémon card.

## Technologies Used

- **React** — Component-based UI framework
- **Vite** — Fast build tool and dev server
- **CSS** — Responsive design with styled stat bars
- **JavaScript (ES6+)** — API integration and event handling

## API

- **PokeAPI** — `https://pokeapi.co/api/v2/pokemon/{name or id}`

## Error Handling

If a Pokémon is not found, the app displays a helpful error message.

## Setup - React + Vite

This project is built with React and Vite. For more information about the setup, see the [Vite React documentation](https://vitejs.dev/).

---

**Search your favorite Pokémon and explore their stats! 🔍📊**
