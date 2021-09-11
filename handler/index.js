var getRoutePricesCabify = require('../cabify/routes');
var getRoutePrices = require('../uber/price.estimator');

module.exports = async function compare(from, to) {
  let response = [];

  let cabify = await getRoutePricesCabify(from, to);
  if (!cabify.error) {
    response.push(cabify);
  }

  let uber = await getRoutePrices();
  if (uber) {
    response.push(uber);
  }

  return response;
}