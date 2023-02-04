import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: '#D2D2D2',
    borderRadius:'35px',
    width:'18px',
    height:"15px",
    _checked: {
        bg: '#010C14',
      },
  },
  track: {
    bg: '#d2d2d299',
    width:'28px',
    height:"15px",
    padding:0,
    _checked: {
      bg: '#010C1499',
    },
  },
})

export default defineMultiStyleConfig({ baseStyle })