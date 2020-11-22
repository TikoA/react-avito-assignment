import { 
  Box, 
  Button, 
  Image, 
  Text, 
  useColorMode,
  useDisclosure,  
} from '@chakra-ui/react';
import { useState, useEffect } from 'react'
import { getImages, postComment } from './api/api'
import Modal from './components/Modal';

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [images, setImages] = useState([])

  useEffect( async () => {
    const images = await getImages()
    setImages(images)
  }, [])
  return (
    <div className="App">
      <Box 
        textAlign='center'
      > 
        <Text 
          fontSize='3xl'
        >
          Avito Assignment
        </Text>
        <Button
          onClick={toggleColorMode} 
          colorScheme='blue'
          size='sm'
        >
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        <Box 
          display='flex'
          flexWrap='wrap'
        >
          {images.map(image => {
   
            return (
              <Box>
                <Modal 
                  key={image.id}
                  id={image.id}
                  url={image.url}
                />   
              </Box>
            )
          })}
        </Box>
      </Box>
      
    </div>
  );
}

export default App;
