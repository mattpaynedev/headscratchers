import { Heading, Container } from '@chakra-ui/react'

export default function Letter({ char, bgColor }) {
    return (
        <Container bg={bgColor} centerContent borderWidth='1px' borderRadius='lg' p={3} m={2} minH={14} minW={12}>
            <Heading size='md'>{char}</Heading>
        </Container>
    )
}
