import { createFileRoute } from '@tanstack/react-router';

export const Home = () => {
  return (
    <div>
      <h3>Welcome Home!!!</h3>
    </div>
  );
};

export const Route = createFileRoute('/home')({
  component: Home,
});
