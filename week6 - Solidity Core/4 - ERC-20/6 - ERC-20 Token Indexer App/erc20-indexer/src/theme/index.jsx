import { extendTheme } from '@chakra-ui/react'

const Theme = extendTheme({
  colors: {
    white: "#fdf3f3",
    black: "#151515"
  },
  fonts: {
    heading: `'Encode Sans Expanded', sans-serif`,
    body: `'Encode Sans Expanded', sans-serif`,
  },
})

export default Theme