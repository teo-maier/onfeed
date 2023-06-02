export const setTokenToCookie = (token: string) => {
  document.cookie = `Cookie=ILikeCookies=${token}; SameSite=None; Secure`;
};

export const getValueFromCookie = (value: string): string => {
  const cookieValue = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${value}=`))
    ?.split('=')[1];
  if (cookieValue) {
    return cookieValue;
  }
  return '';
};
