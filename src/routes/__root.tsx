import { createRootRoute, createRouter, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { routeTree } from '../routeTree.gen';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex bg-red-300">
        <Link to="/home">Home</Link>
        <Link to="/ch01">Ch01</Link>
        <Link to="/ch02">Ch02</Link>
      </div>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
