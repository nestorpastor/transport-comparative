var { request, GraphQLClient, gql } = require('graphql-request');

module.exports = async function getRoutePrices(from, to) {
  const endpoint = 'https://cabify-sandbox.com/api/v3/graphql';

  const client = new GraphQLClient(endpoint)

  const query = gql`query EstimatesQuery($estimateInput: EstimatesInput) {
  estimates(estimateInput: $estimateInput){
    eta {
      min,
      max
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
        en
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
      requesterId: 'f7f551c4130b11ec84f99e152e4c0dfb',
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
    authorization: 'Bearer R4PFnWnzBKWByKpgC-kMlwUp7vvGNh'
  }
  const data = await client.request(query, variables, requestHeaders).then((data) => {
    return {
      app: 'cabify',
      low_estimate: getValorMasBajo(data.estimates),
      high_estimate: getValorMasAlto(data.estimates),
      duration: ((data.estimates[0].eta.min + data.estimates[0].eta.max) / 2),
      route: data.estimates[0].route
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

  return valormasBajo
}

function getValorMasAlto(precios) {
  let valorMasAlto = precios[0].priceBase.amount;

  for (estimado of precios) {
    if (estimado.priceBase.amount > valorMasAlto) {
      valorMasAlto = estimado.priceBase.amount
    }
  }

  return valorMasAlto
}