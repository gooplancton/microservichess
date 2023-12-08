export function getCookie(key: string) {
  const cookieRow = document.cookie
    .split('; ')
    .find((row) => row.startsWith(key + "="))

  if (!cookieRow) return undefined

  return cookieRow.split('=')[1];
}

