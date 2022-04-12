# SQUADZ Integrations

## Links
- [Home](README.md)
- [How it works](how-it-works.md)

## Snapshot
*snapshot.org*

Use Squadz power as voting power in a snapshot space. To do this, select the `squadz-power` strategy for your snapshot space, configured like this:
```
{
  "symbol": "SQDZ", // the token symbol for your collection
  "collectionAddress": "0xd5746787be995887c59eff90611778b9cb67f0db", // the address for your collection
}
```

*RARE: If your collection was forked onto the Squadz engine (see heyshell.xyz), you will also need to include the `forkNumber` in the parameters object.*


## Guild
*guild.xyz*

TBD -- can do NFT held or integrate with Snapshot strategy
