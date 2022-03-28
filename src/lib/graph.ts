import memoize from 'lodash/memoize'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated-graphql'
import { NetworkName, networks } from '../config'

/** get a type graphQL client for the shell subgraph */
export const getGraphClient = memoize((network?: NetworkName) => {
  if (network === undefined) throw new Error();
  const url = networks[network].subgraphEndpoint;
  if (!url) {
    throw new Error(`no subgraph for network: ${network}`);
  }
  const client = new GraphQLClient(url);
  const sdk = getSdk(client);
  return sdk;
});