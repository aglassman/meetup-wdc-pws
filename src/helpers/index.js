export function encodeQueryString (params) {
  const encode = encodeURIComponent;
  return Object.keys(params)
    .map(k => encode(k) + '=' + encode(params[k]))
    .join('&');
}