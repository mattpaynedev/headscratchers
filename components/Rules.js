import { Popover, PopoverTrigger, Button, PopoverContent, PopoverCloseButton, PopoverHeader, PopoverBody, Text, Box, Grid, GridItem } from "@chakra-ui/react"
import Letter from "./Letter"

export default function Rules() {

    return (
        <Popover placement='top-end' returnFocusOnClose={false}>
            <PopoverTrigger>
                <Button
                    bg='none'
                    variant="outline"
                    borderWidth={2}
                    ml={2}
                    fontWeight='bold'
                    _hover={{
                        color: 'yellow.300',
                        borderColor: 'yellow.300'
                    }}
                >How to Play?</Button>
            </PopoverTrigger>
            <PopoverContent bg='gray.700'>
                <PopoverCloseButton />
                <PopoverHeader fontWeight='bold' fontSize='xl'>HOW TO PLAY:</PopoverHeader>
                <PopoverBody fontSize='md'>
                    <Text textAlign='center'>The goal is to guess the word. Start typing and press ENTER to submit.</Text>
                    <Grid
                        templateColumns='repeat(4, 1fr)'
                        gap={4}
                        alignItems='center'
                        mt={4}
                        mb={4}
                    >
                        <GridItem colSpan={1}>
                            <Letter char="GREEN" bgColor='green.600' />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Text> letters are correct and in the correct location.</Text>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Letter char="YELLOW" bgColor='yellow.600' />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Text> letters are correct but in the wrong location.</Text>
                        </GridItem>
                    </Grid>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
