export default async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint).then((data) => data.json());
  return results;
}