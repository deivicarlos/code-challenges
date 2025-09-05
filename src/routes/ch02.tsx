import { createFileRoute } from '@tanstack/react-router';

const Ch02 = () => {
  return <div className="p-2">Hello from Ch02!</div>;
};

export const Route = createFileRoute('/ch02')({
  component: Ch02,
});
