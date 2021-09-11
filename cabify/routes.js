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

  // Overrides the clients headers with the passed values
  const data = await client.request(query, variables, requestHeaders)
  return data;
}