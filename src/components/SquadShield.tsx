import { Shield } from '@areatechnology/shields-react'

interface SquadShieldProps {
  member: string;
  collection: string;
  tokenId: number;
}

export default (props: SquadShieldProps) => {
  const { fieldId, colors, hardwareId, frameId } = getShieldProps(props)
  return (
    <Shield
      fieldId={fieldId}
      colors={colors}
      hardwareId={hardwareId}
      frameId={frameId}
    />
  )
}

interface ShieldProps {
  fieldId: number; // 0-299
  colors: string[]; // array of 4 hex colors
  hardwareId: number; // 0-120
  frameId: number; // 0-5
}

function getShieldProps({ member, collection, tokenId }: SquadShieldProps): ShieldProps {
  const memberNum = parseInt(member.slice(2, 10), 16)
  const collectionNum = parseInt(member.slice(2, 10), 16)
  const maxNum = parseInt("ffffffff", 16)


  const colors: string[] = []
  colors[0] = collection.slice(2, 8)
  colors[1] = collection.slice(8, 14)
  colors[2] = collection.slice(14, 20)
  colors[3] = collection.slice(20, 26)

  const fieldId = Math.floor(collectionNum / maxNum * 299)
  const hardwareId = Math.floor(memberNum / maxNum * 120)

  let frameId = 1
  if (tokenId > 10) {
    frameId = 1
  } else if (tokenId > 20) {
    frameId = 2
  } else if (tokenId > 50) {
    frameId = 3
  } else if (tokenId > 100) {
    frameId = 4
  } else if (tokenId > 1000) {
    frameId = 5
  }
  return {
    fieldId,
    colors,
    hardwareId,
    frameId
  }
}