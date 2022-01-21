import { Button, Heading, Container, Box, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import Rules from '../components/Rules'
import WordBlock from '../components/WordBlock'
import { chooseWord } from '../utils'

const MAX_TURNS = 6

export default function Home() {
  const [previousGuesses, setPreviousGuesses] = useState([])
  const [guessedWordsMap, setGuessedWordsMap] = useState({})
  const [currGuess, setCurrGuess] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [wordMap, setWordMap] = useState({})
  const [answer, setAnswer] = useState(chooseWord())
  const [turnCount, setTurnCount] = useState(0)
  const [invalidGuess, setInvalidGuess] = useState(false)

  const refocusToInput = useRef(null)

  useEffect(() => {
    if (answer.length) {
      for (let c of answer) {
        setWordMap(prevState => {
          let newState = { ...prevState }
          if (!newState[c]) newState[c] = 0
          newState[c]++
          return newState
        })
      }
    }
  }, [answer])

  useEffect(() => {
    if (!gameOver && turnCount < MAX_TURNS) {
      function handleKeyDown(e) {
        if (e.keyCode === 8) {
          setCurrGuess(currGuess.slice(0, currGuess.length - 1))
          setInvalidGuess(false)
        } else if (e.keyCode === 13 && currGuess.length === answer.length) {
          if (!guessedWordsMap[currGuess]) {
            // save and evaluate the guess
            setPreviousGuesses((prevState) => {
              return [...prevState, currGuess]
            })

            setGuessedWordsMap(prevState => {
              return {
                ...prevState,
                [currGuess]: true,
              }
            })

            setTurnCount(prevState => {
              let newState = prevState + 1
              if (newState === MAX_TURNS) {
                setGameOver(true)
              }
              return newState
            })

            if (currGuess === answer) {
              setGameOver(true)
              setIsWinner(true)
            }
            setCurrGuess("")
          } else {
            setInvalidGuess(true)
          }
        } else if (e.keyCode >= 65 && e.keyCode <= 90 && currGuess.length < answer.length) {
          setCurrGuess(currGuess + e.key.toUpperCase())
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => document.removeEventListener('keydown', handleKeyDown)
    }

  }, [currGuess, answer, gameOver, turnCount, guessedWordsMap])

  const handleReset = (e) => {
    e.target.blur()
    setPreviousGuesses([])
    setGuessedWordsMap({})
    setCurrGuess("")
    setGameOver(false)
    setIsWinner(false)
    setWordMap({})
    setAnswer(chooseWord())
    setTurnCount(0)
    setInvalidGuess(false)
  }

  const renderedGuesses = previousGuesses.map(word => {
    return <WordBlock key={word} word={word} answer={answer} wordMap={wordMap} />
  })

  let guessDisplay = currGuess
  for (let i = currGuess.length; i < answer.length; i++) {
    guessDisplay += " "
  }

  return (
    <Container maxW="100vw" minH="100vh" bg="gray.600" color="gray.50" centerContent>
      <Container centerContent mt={4} mb={4} textAlign='center'>
        <Heading fontFamily='title' color='yellow.300' mb={4} >HEAD SCRATCHERS</Heading>
        {!currGuess.length && !previousGuesses.length && <Text>Start typing to get started.</Text>}
      </Container>
      <Box mb={2} ref={refocusToInput}>
        {renderedGuesses}
        {!gameOver && turnCount < MAX_TURNS && <WordBlock word={guessDisplay} wordMap={wordMap} />}
      </Box>

      {invalidGuess && <Text fontSize='xl' fontWeight='bold' color='red.300'>{`You've already guessed that word!`}</Text>}

      {gameOver &&
        <Heading fontFamily='title' color={isWinner ? 'yellow.300' : 'red.300'} m={4}>{isWinner ? 'WINNER!' : 'Game Over...'}</Heading>
      }

      {gameOver && !isWinner &&
        <Text fontSize='xl' fontWeight='bold' color='red.300'>The correct word was {answer}</Text>
      }
      <Box mt={4} display='flex'>
        <Button
          colorScheme='gray'
          color='gray.600'
          onClick={handleReset}
          fontWeight='bold'
          fontSize='lg'
          borderWidth={2}
          mr={2}
        >Reset Game</Button>
        <Rules />
      </Box>
    </Container>
  )
}
