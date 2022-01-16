const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const http = require('http').createServer(app);
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')

const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

require(`${basePath}/src/nftport`)(app);
require(`${basePath}/src/covalent`)(app);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// already deployed contract via nftport
const contractAddress = '0xC2735cF747E832E78F55C08Fcb34F95b35F2a39A';
const mintToAddress = '0x4D89C4Bf04425AEEc5e7FE3e9428Aee559dCa9ee';

(async () => {
  // deploy NFT Contract
  // app.deployNFTContract('GAirdrop', 'GA')

  buildSetup();
  startCreating();
  
  await sleep(2000)

  fs.readFile(`${basePath}/build/json/_metadata.json`, 'utf8', async (err, data) => {
    const metaObj = JSON.parse(data);
    console.log('ss', metaObj)

    //nftport
    let i=0;
    for await(const item of metaObj) {
      console.log('item', item)
      const ipfsResp = await app.uploadFileToIPFS(`${basePath}/build/images/${i}.png`);
      console.log('ipfsResp', ipfsResp)
      const ipfs_url = ipfsResp.ipfs_url;

      const { name, description } = item;

      const metaResp = await app.uploadMetadataToIPFS(name, description, ipfs_url)
      const metadata_uri = metaResp.metadata_uri;
      console.log('metadata_uri', metadata_uri);

      await app.mintNFT(contractAddress, metadata_uri, mintToAddress)

      i++;
    }

  //   //covalent  
  //   // app.getNFTTokenIdsForContract(contractAddress)

  //   // const tokenId = 0;
  //   // app.getNFTTransactionsForContract(contractAddress, tokenId)

  //   // app.getNFTExternalMetadataForContract(contractAddress, tokenId)
  });
  
  
  // app.getNFTTokenIdsForContract(contractAddress)

  // const ipfsResp = await app.uploadFileToIPFS(`${basePath}/build/images/1.png`);
  // console.log(ipfsResp)
  // const ipfs_url = ipfsResp.ipfs_url;
  // const resp = await app.uploadMetadataToIPFS('t', 'test', 'https://ipfs.io/ipfs/bafkreih3pw4wupn5gfsg5urctfaf2lwopdg67uwo6y7zw5zvtcbw3bmihu')
  // console.log(resp.metadata_uri)

})();

http.listen(4500, function(){
  console.log('server is running on port 4500')
});