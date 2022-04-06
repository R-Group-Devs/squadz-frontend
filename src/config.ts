export type NetworkName = "Mumbai" | "Goerli" | "Rinkeby"

interface Network {
  id: number;
  factoryAddress: string;
  engineAddress: string;
  subgraphEndpoint: string;
  blockchainExplorer: string;
}

export const networks: Record<NetworkName, Network> = {
  "Mumbai": {
    id: 80001,
    factoryAddress: "0x76e9f19D76Ae534cFb754AFE9D9CC52395E5fFaF",
    engineAddress: "0x39235b78626d8fa4ef6a81ba5616c58708ba4ea5",
    subgraphEndpoint: "https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mumbai",
    blockchainExplorer: "https://mumbai.polygonscan.com"
  },
  "Goerli": {
    id: 5,
    factoryAddress: "0x0Ff2BC06b7faF18f1AD0C3086DDb26738A532351",
    engineAddress: "0x7beaa4e60e0faab603e99813f0f2330704b53086",
    subgraphEndpoint: "https://api.thegraph.com/subgraphs/name/r-group-devs/shell-goerli",
    blockchainExplorer: "https://goerli.etherscan.io/"
  },
  "Rinkeby": {
    id: 4,
    factoryAddress: "0xB3a974e0A90d49674E727aeEC67E422A5ec8DB43",
    engineAddress: "0xbeea7483aef24502a27eb7a35aad55280f8e2ebc",
    subgraphEndpoint: "https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby",
    blockchainExplorer: "https://rinkeby.etherscan.io/"
  }
}