import { Container, ListItem, Typography } from '@mui/material'

export const TwoColumnListItem: React.FC<{
  label: string
  value: React.ReactNode
}> = ({ label, value }) => {
  return (
    <ListItem>
      <Container sx={{ textAlign: 'left' }}>
        <Typography fontWeight={'fontWeightBold'}>{label}</Typography>
      </Container>
      <Container sx={{ textAlign: 'right' }}>{value}</Container>
    </ListItem>
  )
}
