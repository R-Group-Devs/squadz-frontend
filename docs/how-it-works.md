# How SQUADZ Works

SQUADZ is built on the [shell hyperstructure](https://heyshell.xyz). 

## Launching
A new squad is created by using shell to deploy a new NFT collection contract. Shell collections have an implementation (here ShellERC721.sol) and an engine (here SquadzEngine.sol). The implementation handles typical NFT functionality like owning and transfering, while the engine handles the Squadz stuff. In addition to what's described below, the Squadz engine prevents NFTs from being transferred.

## Minting
Squadz NFTs come in two types: admin memberships and regular memberships. The owner of the collection can mint either type any time. Holders of active admin memberships can mint regular memberships at a rate set by the owner. No one else can mint anything.

## Settings
In addition to changing owners, Squadz collection have 5 settings that can be configured any time by the owner:
- `Expiry` -- the number of seconds a membership stays active after minting
- `Cooldown` -- the number of seconds an active admin must wait after minting before they can mint again
- `Bonus` -- the bonus power members receive for holding an active token (only counts once)
- `Max` -- the maximum balance of memberships an address can hold that count towards the address' power
- `SVG descriptor` -- the contract that generates the SVG images for the collection (must fit the [IPersonalizedSVG interface](https://github.com/R-Group-Devs/squadz-contracts/blob/3dc54851e993706e80e5592fb4e1a0b3f12a1b4e/src/lib/IPersonalizedSVG.sol))

## "Power"
Power is a made-up score that each member of a squad has. The exact score is determined by the settings (see above), but it is designed to favor both *current* members (holds an active token) and *long time* members (holds many tokens). 

**Power is intended to be a fair score used for voting power.**

## Forking
Forking is a special functionality provided by shell. In nearly all cases, you can ignore it! Read more [here](https://docs.heyshell.xyz/forkanomics).

Forking *shouldn't* break anything in Squadz, but tread carefully.