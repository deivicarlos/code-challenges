import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getPokemon } from '../service/pokemon/pokemon';
import { usePokemonQuery } from '../hooks/usePokemonQuery';

export const Home = () => {
  const { data, isFetching, isPending, error } = usePokemonQuery({ limit: 10, offset: 20 });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error.message}</div>;
  }

  if (!data) return <div>Empty!!!</div>;

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-xl font-semibold mb-2">Pokemon</h3>
      <div>
        {data.results.map(({ name, url }) => (
          <div key={name}>
            <div>Name: {name}</div>
            <div>Url: {url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/home')({
  component: Home,
});
