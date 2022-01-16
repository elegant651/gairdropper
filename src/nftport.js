const axios = require('axios')
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const dotenv = require('dotenv')
dotenv.config()

module.exports = async (app) => {

  const API_KEY = process.env.NFTPORT_KEY

  app.deployNFTContract = async (name, symbol) => {
    const response = await axios.post('https://api.nftport.xyz/v0/contracts', {
      "chain": "polygon",
      "name": name,
      "symbol": symbol,
      "owner_address": "0x4D89C4Bf04425AEEc5e7FE3e9428Aee559dCa9ee"
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)
  }

  app.retrieveDeployedContract = async (txHash) => {
    const response = await axios.get(`https://api.nftport.xyz/v0/contracts/${txHash}?chain=polygon`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)
  }

  app.uploadFileToIPFS = async (uri) => {
    const form = new FormData();
    // const fileStream = fs.createReadStream('./data/image.png');
    const fileStream = fs.createReadStream(uri);
    form.append('file', fileStream);
    
    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": API_KEY,
      },
    };

    const resp = await fetch("https://api.nftport.xyz/v0/files", options)
    return await resp.json();
  }

  app.uploadMetadataToIPFS = async (name, desc, file_url) => {
    const response = await axios.post('https://api.nftport.xyz/v0/metadata', {
      "name": name,
      "description": desc,
      "file_url": file_url,
      // "external_url": external_url,
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)
    return response.data
  }

  app.mintNFT = async (ca, metadata_uri, mint_to_address) => {
    const response = await axios.post('https://api.nftport.xyz/v0/mints/customizable', {
      "chain": "polygon",
      "contract_address": ca,
      "metadata_uri": metadata_uri,
      "mint_to_address": mint_to_address,
      "token_id": 1
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)   
    return response.data
  }

  app.getTokenIDOfMintedNFT = async (tx_hash) => {
    const response = await axios.get(`https://api.nftport.xyz/v0/mints/${tx_hash}?chain=polygon`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)
  }

  app.updateMetadataAtNFT = async (ca, token_id, metadata_uri, freeze_metadata) => {
    const response = await axios.put(`https://api.nftport.xyz/v0/mints/customizable`, {
      "chain": "polygon",
      "contract_address": ca,
      "metadata_uri": metadata_uri,
      "token_id": token_id,
      "freeze_metadata": freeze_metadata
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY
      }
    })
    console.log(response)
  }

}