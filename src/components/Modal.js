import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    Button,
    useDisclosure,
    Text,
    Box,
    InputLeftAddon,
    Input,
    InputGroup,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { getImage, postComment } from '../api/api'

function ModalImage(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comments, setComments] = useState([])
    const [url, setUrl] = useState([])
    const [id, setId] = useState([])
    const [name, setName] = useState([])
    const [comment, setComment] = useState([])
    const [error, setError] = useState(false)

    useEffect( async () => {
        const imageData = await getImage(props.id)
        setUrl(imageData.url)
        setId(imageData.id)
        setComments(imageData.comments)
      }, [])

    const handleNameInput = (event) => {
        setName(event.target.value)
    }

    const handleCommentInput = (event) => {
        setComment(event.target.value)
    }

    const submitComment = () => {
        if (comment.length && name.length) {
            postComment(id, name, comment)
            // Hire Me
            setComments([...comments, {name, comment}])
            setError(false)
            setName('')
            setComment('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <Image 
              onClick={onOpen}
              borderRadius='10px' 
              margin={2} 
              key={props.id} 
              src={props.url} 
            />
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody paddingTop={9}>
                      <Image src={url}/>
                      <Box>
                          {comments.length ? 
                            comments.map((comment) => {
                                return (
                                    <Box borderRadius='5px' key={Date.now() + Math.random() * 100} borderWidth={2} m="1rem 0" p={1}>
                                        <Text fontWeight='800'>{comment.name}</Text>
                                        <Text fontSize="0.8em">{comment.comment}</Text>
                                    </Box>
                                )
                            }) : <Text m="1rem 0" >No Comments</Text>
                          }
                            <InputGroup mb={2}>
                                <InputLeftAddon children="Name" />
                                <Input value={name} onChange={handleNameInput} borderLeftRadius="0" />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children="Body" />
                                <Input value={comment} onChange={handleCommentInput} borderLeftRadius="0" />
                            </InputGroup>
                            <Button onClick={submitComment} display='block' colorScheme='twitter' margin='1rem auto'>Submit</Button>
                            <Alert display={error ? 'flex' : 'none'} status="warning">
                                <AlertIcon />
                                Your Comment is empty
                            </Alert>

                      </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalImage
