import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex bg-red-300">
        <Link to="/home">Home</Link>
        <Link to="/ch01">Ch01</Link>
        <Link to="/ch02">Ch02</Link>
      </div>

      <div className="flex h-full w-full bg-blue-300">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
