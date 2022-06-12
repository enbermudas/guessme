import disneyPrincess from './disney-princess';
import naruto from './naruto';
import pokemon from './pokemon';

const data = {
  disneyPrincess,
  naruto,
  pokemon,
};

export const messages = {
  disneyPrincess: {
    title: "Princesas de Disney",
    description: "¡Escribe nombres de princesas, rápido!",
  },
  pokemon: {
    title: "Pokémon",
    description: "¡Escribe nombres de pokémon, rápido!"
  },
  naruto: {
    title: "Naruto",
    description: "¡Escribe nombres de personajes, rápido!"
  }
}

export default data;
