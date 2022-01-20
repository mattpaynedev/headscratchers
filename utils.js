import { words5Letter } from "./words";

export function chooseWord() {
    let idx = Math.floor(Math.random() * words5Letter.length)

    return words5Letter[idx].toUpperCase()
}