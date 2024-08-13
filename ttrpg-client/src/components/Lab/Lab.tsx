import { Typography } from '@mui/material'

import { Panel } from 'components/Layout'
import { useCharacter } from 'hooks/useCharacter'

export const Lab = () => {
  // TODO: Move this id to a query param
  const { character } = useCharacter({ id: '1' })

  return (
    <Panel>
      <Typography variant="h1">Experimental Tests</Typography>
      <Typography variant="h2">Character</Typography>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </Panel>
  )
}
