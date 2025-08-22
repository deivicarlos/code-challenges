import { Outlet } from '@tanstack/react-router';

function RootLayout() {
  return (
    <div>
      <header>
        <h1> Code Challenges</h1>
        <nav>
          <link to="/">Home</link>
          <link to="/ch01">Ch01</link>
          <link to="/ch02">Ch02</link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
