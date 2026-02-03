export function isAuthenticated(): boolean {
  return !!localStorage.getItem('userToken');
}

export function loginUser(token = 'mock-token'): void {
  localStorage.setItem('userToken', token);
}

export function logoutUser(): void {
  localStorage.removeItem('userToken');
}

export function getNextFromSearch(search: string): string | null {
  const params = new URLSearchParams(search);
  const next = params.get('next');
  return next;
}
