export type NetworkName = "Mumbai"

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
    engineAddress: "0x0fb59325c54fd3b2d0489cf124923318a1aefea4",
    subgraphEndpoint: "https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mumbai",
    blockchainExplorer: "https://mumbai.polygonscan.com"
  }
}