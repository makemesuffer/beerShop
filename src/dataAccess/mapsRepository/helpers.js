const init = {
  method: "GET",
  mode: "no-cors"
};

const getLocation = geocode => {
  return fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=bba1493e-0207-4492-ae53-d0fc56618a8e&format=json&geocode=${geocode}`,
    init
  );
};
export default getLocation;
