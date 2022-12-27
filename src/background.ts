const isWaster = (regexp: string): boolean => {
  const re = new RegExp(regexp, 'i');
  const host = window.location.hostname;
  return re.test(host);
}
