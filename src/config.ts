export type NetworkName = "Mumbai"

interface Network {
  id: number
}

export const networks: Record<NetworkName, Network> = {
  "Mumbai": {
    "id": 80001
  },
  /*
  "Polygon Mainnet": {
    "id": 137
  }
  */
}

export const contractAddresses: { [name: string]: Record<NetworkName, string> } = {
  "ShellFactory": {
    "Mumbai": "0x76e9f19D76Ae534cFb754AFE9D9CC52395E5fFaF"
  },
  "SquadzEngine": {
    "Mumbai": "0xa58048953425945f1f728a523cb5be17d654db12"
  }
}