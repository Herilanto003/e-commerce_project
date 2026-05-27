const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  console.log(`${API_URL}${path}`);
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  console.log("ress :: ", res);

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    console.log(res);
    throw new ApiError(res.status, message);
  }

  return await res.json();
}
