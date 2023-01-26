import { Button, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

const Test =()=>{
    const { colorMode, toggleColorMode } = useColorMode()
  
    useEffect(()=>{
      console.log(colorMode)
    },[colorMode])
    return(
        <>
        <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        </>
    )
}

export default Test