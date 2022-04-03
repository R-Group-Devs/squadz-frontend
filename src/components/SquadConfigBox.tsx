import { useState } from 'react'

import SquadConfigView from './SquadConfigView'
import EditConfigForm from './EditConfigForm'
import { SquadConfig } from "../hooks/useSquadConfigOf"

export interface SquadConfigBoxProps {
  owner?: string;
  user?: string;
  squadConfig?: SquadConfig;
}

export default ({ owner, squadConfig, user }: SquadConfigBoxProps) => {
  const [editing, setEditing] = useState<boolean>(false)

  return (
    <>
      {editing ?
        <EditConfigForm owner={owner} squadConfig={squadConfig} user={user} setEditing={setEditing} />
        :
        <SquadConfigView owner={owner} squadConfig={squadConfig} user={user} setEditing={setEditing} />
      }
    </>
  )
}