/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
const serialize = obj => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  return str.join('&');
};

const filterCountries = item =>
  ![
    'likhtenshteyn',
    'islandiya',
    'armeniya',
    'lyuksemburg',
    'azerbaydzhan',
    'gruziya',
    'moldova',
    'kirgiziya',
    'uzbekistan',
    'kazakhstan'
  ].includes(item.slug);

const countryWithCities = () => {
  return ['polsha', 'chekhiya', 'germaniya', 'estoniya', 'litva', 'slovakiya', 'ukraina'];
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export { filterCountries, countryWithCities, capitalize };
export default serialize;
