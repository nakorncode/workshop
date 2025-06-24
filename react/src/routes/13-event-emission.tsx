import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/13-event-emission')({
  component: RouteComponent,
})

function RouteComponent() {
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [skip, setSkip] = useState(0)
  const [lastTyped, setLastTyped] = useState('')
  function whenSkip() {
    setSkip(skip + 1)
  }
  function whenSuccess(typedWord: string) {
    setCorrect(correct + 1)
    setLastTyped(typedWord)
  }
  function whenFailed(typedWord: string) {
    setIncorrect(incorrect + 1)
    setLastTyped(typedWord)
  }
  return (
    <>
      <h1 className="text-xl font-bold">Typing Test</h1>
      <ul className="list-disc pl-5 my-4">
        <li>Correct: {correct}</li>
        <li>Incorrect: {incorrect}</li>
        <li>Skipped: {skip}</li>
        <li>Last Typed: {lastTyped}</li>
      </ul>
      <TypingTest
        onSkip={whenSkip}
        onSuccess={whenSuccess}
        onFailed={whenFailed}
      ></TypingTest>
    </>
  )
}

interface TypingTestProps {
  onSuccess?: (typedWord: string, currentWord: string) => void
  onFailed?: (typedWord: string, currentWord: string) => void
  onSkip?: () => void
}

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'quince', 'raspberry', 'strawberry', 'watermelon']

function randomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function TypingTest(props: TypingTestProps) {
  const [text, setText] = useState('')
  const [currentWord, setCurrentWord] = useState(randomWord())
  function onTypeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (currentWord === text) {
      props.onSuccess?.(text, currentWord)
    } else {
      props.onFailed?.(text, currentWord)
    }
    setText('')
    setCurrentWord(randomWord())
  }
  function onSkipWord () {
    setCurrentWord(randomWord())
    props.onSkip?.()
  }
  return (
    <div>
      <p className="font-bold mb-2">Current word: "{currentWord}"</p>
      <form onSubmit={onTypeSubmit} className="flex items-center gap-1">
        <input type="text" value={text} onChange={e => setText(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Submit</button>
        <button type="button" onClick={onSkipWord} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded cursor-pointer">Skip word</button>
      </form>
    </div>
  )
}
