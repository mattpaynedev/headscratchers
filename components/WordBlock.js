import { Box } from '@chakra-ui/react'
import Letter from './Letter'

export default function WordBlock({ word, answer = "", wordMap }) {
    const renderedWord = Array(word.length)
    const currMap = {}
    const COLORS = {
        YELLOW: "yellow.600",
        GREEN: "green.600",
        DEFAULT: null,
    }

    if (answer.length) {
        for (let i in answer) {
            let char = word[i]
            if (char === answer[i]) {
                if (!currMap[char]) currMap[char] = 0
                currMap[char]++

                renderedWord[i] = <Letter key={i} char={char} bgColor={COLORS.GREEN} />
            }
        }
    }

    for (let i in word) {
        if (renderedWord[i] === undefined) {
            let char = word[i]
            let bgColor = COLORS.DEFAULT
            if (wordMap && wordMap[char] && answer.length && (!currMap[char] || currMap[char] < wordMap[char])) {
                bgColor = COLORS.YELLOW
                if (!currMap[char]) currMap[char] = 0
                currMap[char]++
            }

            renderedWord[i] = <Letter key={i} char={char} bgColor={bgColor} />
        }
    }

    return <Box display='flex'>{renderedWord}</Box>
}