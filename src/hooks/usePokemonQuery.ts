import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '../service/pokemon/pokemon';

type Params = {
  limit: number;
  offset: number;
};

const usePokemonQuery = (params: Params) => {
  return useQuery({
    queryKey: ['pokemon', params],
    queryFn: ({ signal }) => getPokemon({ ...params, signal }),
    placeholderData: (prev) => prev,
  });
};

export { usePokemonQuery };
