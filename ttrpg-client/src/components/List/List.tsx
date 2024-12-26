import { Typography } from '@mui/material'

import { useList } from 'hooks/useList'
import { Panel } from 'components/Layout'

export const List = () => {
  const { output } = useList()

  return (
    <Panel>
      <Typography variant="h1">List Generator</Typography>
      <Typography variant="body1">{output}</Typography>
    </Panel>
  )
}
