import { createFileRoute } from '@tanstack/react-router';

const Ch01 = () => {
  return <div className="p-2">Hello from Ch01!</div>;
};

export const Route = createFileRoute('/ch01')({
  component: Ch01,
});
