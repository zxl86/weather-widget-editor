const windDegToDirection = (deg) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.ceil((deg - 11.25) / 22.5);

  return index > 15 ? directions[0] : directions[index];
};

export default windDegToDirection;
