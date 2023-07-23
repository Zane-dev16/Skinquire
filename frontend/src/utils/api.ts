// utils/api.ts
const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const authToken = getAuthToken();
  
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
  };
  