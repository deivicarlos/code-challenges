# Ch01 — Users Admin (Server-Driven Grid with URL Sync)

## Overview
Build a users table with **server pagination, sorting, and search**. The **URL is the source of truth** for grid state. Make navigation snappy via **keepPreviousData** and **prefetch** the next page.

## Skills Assessed
- Server state modeling with TanStack Query
- Stable query keys & cache discipline
- URL ↔ app state synchronization
- UX polish (skeletons over spinners, empty/error states)
- Reasoned staleness & retry strategy

## API Contract (mock or real)
```
GET /users?page=<number>&size=<number>&sort=<field>:<asc|desc>&q=<string>
200 -> {
data: Array<{ id: string; firstName: string; lastName: string; email: string; role: 'admin'|'member' }>,
page: number, size: number, total: number
}
```

You may mock with MSW or json-server. Keep responses deterministic for tests.

## Requirements & Acceptance Criteria
- [ ] **URL is source of truth**: `page`, `size`, `sort`, `q` encoded in the URL; deep-link restores view.
- [ ] **Query design**: `queryKey = ['ch01','users',{page,size,sort,q}]` (all server inputs in the key).
- [ ] **UX**: Use `keepPreviousData: true` to avoid jank when page changes. Prefer skeleton rows over a blocking spinner.
- [ ] **Prefetch**: When page `n` loads, prefetch page `n+1`.
- [ ] **Search**: Debounce input (~300ms). Debounced value updates URL → triggers fetch.
- [ ] **Sorting**: Clicking a column header updates URL and refetches.
- [ ] **Row link**: Clicking a row navigates to `/ch01/users/:id` (or a details panel). Prefetch details on hover.
- [ ] **Empty state**: Friendly message when no results (respects filters).
- [ ] **Errors**: Error UI with a “Retry” button (`refetch`).
- [ ] **A11y**: Real `<table>` semantics or list semantics; focus order usable while loading.

## Stretch Goals (choose any)
- [ ] **Infinite query** when `q` is non-empty.
- [ ] **Cache warming**: prefetch `{page:1}` and `{page:2}` on app start.
- [ ] **Column filters** (e.g., role) synced to URL + queryKey.
- [ ] **Staleness policy**: justify `staleTime`/`gcTime` for your data.

## Suggested Query Strategy
- `staleTime`: 15–60s to avoid refetch storms on focus.
- `retry`: keep default (queries are safe to retry).
- `select`: map/shape data for the grid to reduce render churn.

## Hints
- Keep URL state in one hook (TanStack Router search params). Derive UI from URL—don’t duplicate.
- Param changes auto-trigger fetch if they’re in the `queryKey`.
- Prefetch with `queryClient.prefetchQuery(...)` after a successful load.

## Common Pitfalls
- ❌ Doing writes inside `useQuery` (use mutations for side-effects).
- ❌ Omitting a server input from the `queryKey` (stale/mismatched data).
- ❌ Resetting scroll/selection on each fetch (preserve UI affordances).

## How to Run
- Dev server: `npm run dev`
- Open: `/ch01`

## Deliverables
- Implementation + brief notes (1–2 paragraphs) explaining:
  - Your `queryKey` design
  - `staleTime` choice and why
  - Trade-offs around `keepPreviousData` vs. skeletons

## Debrief Questions
- When would you **invalidate** vs. **setQueryData** directly?
- If the backend adds `lastModifiedAt`, how would you use it to optimize refresh?
