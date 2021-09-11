var { request, GraphQLClient, gql } = require('graphql-request');

module.exports = async function getRoutePrices(from, to) {
  const endpoint = 'https://cabify.com/api/v3/graphql';

  const client = new GraphQLClient(endpoint)

  const query = gql`query EstimatesQuery($estimateInput: EstimatesInput) {
  estimates(estimateInput: $estimateInput){
    eta {
      min,
      max,
      formatted,
      lowAvailability
    }
    
    total {
      amount
      currency
    }
    
    priceBase {
      amount
      currency
    }
    
    supplements {
      description
      kind
      name
      payToDriver
      price {
        amount,
        currency,
        currencySymbol
      }
      taxCode
    }
    
    product {
      id
      icon
      description {
        es
      }
    }

    distance
    duration
    route
  }
}`
  const variables = {
    estimateInput: {
      startType: 'ASAP',
      requesterId: '6a0323ce131b11ecac2c0242ac110004',
      startAt: null,
      stops: [{
        loc: from
      },
      {
        loc: to
      }]
    }
  }

  const requestHeaders = {
    authorization: 'Bearer NXHLn_7F-GsXZOxP2D5BIFaTAitVu8'
  }
  const data = await client.request(query, variables, requestHeaders).then((data) => {
    return {
      app: 'cabify',
      low_estimate: getValorMasBajo(data.estimates),
      high_estimate: getValorMasAlto(data.estimates),
      duration: (((data.estimates[0].eta.min + data.estimates[0].eta.max) / 2) / 60),
      route: data.estimates[0].route,
      currency: data.estimates[0].priceBase.currency
    }
  }).catch((err) => { return { error: { message: err.response.errors[0].friendly_message } } })
  return data;
}


function getValorMasBajo(precios) {
  let valormasBajo = precios[0].priceBase.amount;

  for (estimado of precios) {
    if (estimado.priceBase.amount < valormasBajo) {
      valormasBajo = estimado.priceBase.amount
    }
  }

  return valormasBajo / 100
}

function getValorMasAlto(precios) {
  let valorMasAlto = precios[0].priceBase.amount;

  for (estimado of precios) {
    if (estimado.priceBase.amount > valorMasAlto) {
      valorMasAlto = estimado.priceBase.amount
    }
  }

  return valorMasAlto / 100
}