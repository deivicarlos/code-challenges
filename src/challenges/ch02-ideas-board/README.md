# Ch02 — Ideas Board (Optimistic CRUD + Conflict Handling)

## Overview
Build a minimal ideas board with **optimistic create/update/delete** and **conflict resolution**. Demonstrate **rollback on error** and a thoughtful **retry policy** for writes.

## Skills Assessed
- `useMutation` lifecycle: `onMutate` → snapshot → optimistic update → `onError` rollback → `onSuccess` finalize
- Precise cache edits vs. invalidation
- Conflict (409) handling & UX
- Reasoned retry/backoff for writes
- Pending state indicators

## API Contract (mock or real)
```
GET /ideas -> { data: Idea[] }
POST /ideas -> Idea
PATCH /ideas/:id body { changes, version } -> Idea
409 Conflict -> { server: Idea } // server has newer version
DELETE /ideas/:id -> 204

type Idea = {
id: string;
title: string;
body: string;
version: number; // increments on each server update
updatedAt: string; // ISO timestamp
}
```

If mocking, ensure PATCH sometimes returns a 409 with a newer `server.version`.

## Requirements & Acceptance Criteria
- [ ] **List** via `useQuery({ queryKey: ['ch02','ideas'] })`.
- [ ] **Create (optimistic)**:
  - [ ] Cancel `['ch02','ideas']`, snapshot previous.
  - [ ] Insert temp idea `{ id:'temp-*' }` at the top.
  - [ ] On success: replace temp with server item.
  - [ ] On error: rollback snapshot; show toast/message.
- [ ] **Update (optimistic + conflict)**:
  - [ ] Send `version` in PATCH.
  - [ ] On 409: show a merge dialog (server vs. local). Options: Overwrite (retry with server.version), Merge fields, or Discard (use server).
  - [ ] Non-409 errors: rollback snapshot.
- [ ] **Delete (optimistic)**: remove immediately; rollback on error.
- [ ] **Pending indicators**: per-row badge while a mutation is in flight for that row.
- [ ] **Retry policy**:
  - [ ] `POST`: no auto-retry (or use a client de-dup id if you do).
  - [ ] `PATCH`: safe to retry when you always send the latest `version`.
- [ ] **A11y**: Keyboard reachable merge dialog; focus trapped.

## Stretch Goals (choose any)
- [ ] **Offline-aware queue**: queue mutations while `!navigator.onLine`, flush on reconnect.
- [ ] **Activity log**: record optimistic actions and their final status.
- [ ] **Soft delete + undo**: snackbar offering undo that cancels DELETE if still pending.
- [ ] **Prefetch**: hover a row to prefetch its details.

## Suggested Mutation Pattern (create)
```ts
onMutate: async (input) => {
  await qc.cancelQueries({ queryKey: ['ch02','ideas'] });
  const prev = qc.getQueryData<Idea[]>(['ch02','ideas']);
  qc.setQueryData(['ch02','ideas'], (old = []) => [
    { id:'temp-'+Date.now(), ...input, version:0, updatedAt:new Date().toISOString() },
    ...old
  ]);
  return { prev };
},
onError: (_e, _vars, ctx) => ctx?.prev && qc.setQueryData(['ch02','ideas'], ctx.prev),
onSuccess: (server) => {
  qc.setQueryData<Idea[]>(['ch02','ideas'], (old = []) =>
    old.map(i => String(i.id).startsWith('temp-') && i.title === server.title ? server : i)
  );
},


