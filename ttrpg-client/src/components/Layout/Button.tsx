import { ButtonProps, Button as MUIButton } from '@mui/material'

export const Button: React.FC<ButtonProps> = (props) => {
  return <MUIButton variant="contained" {...props} />
}
