var getRoutePricesCabify = require('../cabify/routes')


module.exports = async function compare(from, to) {
  let response = [];

  let cabify = await getRoutePricesCabify(from, to);

  if (!cabify.error) {
    response.push(cabify);
  }

  return response;
}