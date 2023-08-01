import { heroes } from "../data/heroes";

export const getHeroeById = (id) => {
  return heroes.find((hero) => hero.id === id);
};
