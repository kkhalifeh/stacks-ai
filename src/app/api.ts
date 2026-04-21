export interface CreateStackInput {
  id: string;
  name: string;
  template: 'a4' | 'slide-16x9';
}

export interface KbFile {
  name: string;
  size: number;
  modified: number;
  isDir: boolean;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Server returned ${res.status}`);
  }
  return res.json();
}

export async function createStack(input: CreateStackInput): Promise<{ id: string }> {
  const res = await fetch('/__api/stacks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function listKb(stackId: string): Promise<{ files: KbFile[] }> {
  const res = await fetch(`/__api/stacks/${encodeURIComponent(stackId)}/kb`);
  return handle(res);
}

export async function uploadKb(stackId: string, file: File): Promise<{ name: string; size: number }> {
  const res = await fetch(`/__api/stacks/${encodeURIComponent(stackId)}/kb/${encodeURIComponent(file.name)}`, {
    method: 'POST',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
  return handle(res);
}

export async function deleteKb(stackId: string, filename: string): Promise<{ deleted: string }> {
  const res = await fetch(`/__api/stacks/${encodeURIComponent(stackId)}/kb/${encodeURIComponent(filename)}`, {
    method: 'DELETE',
  });
  return handle(res);
}

export async function renameStack(stackId: string, name: string): Promise<{ id: string; name: string }> {
  const res = await fetch(`/__api/stacks/${encodeURIComponent(stackId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return handle(res);
}

export async function renameBinder(stackId: string, binderId: string, label: string): Promise<{ label: string }> {
  const res = await fetch(
    `/__api/stacks/${encodeURIComponent(stackId)}/binders/${encodeURIComponent(binderId)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label }),
    },
  );
  return handle(res);
}

export async function renameDocument(
  stackId: string,
  binderId: string,
  docId: string,
  label: string,
): Promise<{ label: string }> {
  const res = await fetch(
    `/__api/stacks/${encodeURIComponent(stackId)}/binders/${encodeURIComponent(binderId)}/documents/${encodeURIComponent(docId)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label }),
    },
  );
  return handle(res);
}

export async function deleteStack(stackId: string): Promise<{ id: string; deleted: true }> {
  const res = await fetch(`/__api/stacks/${encodeURIComponent(stackId)}`, { method: 'DELETE' });
  return handle(res);
}

export async function openTerminal(stackId: string): Promise<{ ok: true }> {
  const res = await fetch('/__api/terminal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: stackId }),
  });
  return handle(res);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}
