import { Typography, Button } from '@mui/material'

import { useList } from 'hooks/useList'
import { Panel } from 'components/Layout'

export const List = () => {
  const { output, refetch } = useList()

  return (
    <Panel>
      <Typography variant="h1">List Generator</Typography>
      <Button onClick={refetch}>Generate</Button>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: output || '' }}
      />
    </Panel>
  )
}
