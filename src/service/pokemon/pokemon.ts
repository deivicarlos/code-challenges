export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (params: {
  limit: number;
  offset: number;
  signal: AbortSignal;
}): Promise<PokemonListResponse> => {
  const { limit, offset, signal } = params;
  const url = `${BASE_URL}/pokemon?limit=${limit}?offset=${offset}`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw Error(`PokeAPI error ${response.status}`);
  }

  return response.json();
};
