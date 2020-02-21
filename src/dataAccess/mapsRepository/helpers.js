const init = {
  method: "GET"
};

const getLocation = async geocode => {
  const result = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=bba1493e-0207-4492-ae53-d0fc56618a8e&format=json&geocode=${geocode}`,
    init
  );
  const json = await result.json();
  return json.response.GeoObjectCollection.featureMember[0].GeoObject;
};
export default getLocation;
