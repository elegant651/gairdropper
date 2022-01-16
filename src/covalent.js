const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async (app) => {

  const API_KEY = process.env.COVALENT_KEY
  const chainId = 137; //matic

  app.getNFTTokenIdsForContract = async (contractAddress) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_token_ids/?&key=${API_KEY}`, {
      headers: {
        'content-type': 'application/json',
      }
    })
    console.log(response.data.data.items)
    return response.data
  }

  app.getNFTTransactionsForContract = async (contractAddress, tokenId) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_transactions/${tokenId}/?&key=${API_KEY}`, {
      headers: {
        'content-type': 'application/json',
      }
    })
    console.log(response.data.data.items)
    return response.data
  }

  app.getNFTExternalMetadataForContract = async (contractAddress, tokenId) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?&key=${API_KEY}`, {
      headers: {
        'content-type': 'application/json',
      }
    })
    console.log(response.data.data.items)
    return response.data
  }

  app.getNFTMarketGlobalView = async (chain) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chain}/nft_market/?&key=${API_KEY}`, {
      headers: {
        'content-type': 'application/json',
      }
    })
    console.log(response)
  }

  app.getHistoricalDataForNFTCollection = async (chain, collectionAddress) => {
    const response = await axios.get(`https://api.covalenthq.com/v1/${chain}/nft_market/collection/${collectionAddress}/?&key=${API_KEY}`, {
      headers: {
        'content-type': 'application/json',
      }
    })
    console.log(response)
  }

}