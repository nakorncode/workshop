import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'

export const Route = createFileRoute('/14-preserve-reset-state')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ChatWithPreserve />
      <hr className="my-4"/>
      <ChatWithReset />
    </>
  )
}

const friends = ['John', 'Joe', 'Jane']

function ChatBox(props: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.onSendMessage(message)
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." className="border border-gray-300 px-2 py-1 rounded"/>
        <button className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Send</button>
      </form>
    </div>
  )
}

function ChatList(props: { onChangeFriend: (friend: string) => void }) {
  return <ul className="list-disc pl-5">
    {friends.map(friend => (
      <li key={friend}>
        <button type="button" onClick={() => props.onChangeFriend(friend)} className="underline cursor-pointer text-blue-600">{friend}</button>
      </li>
    ))}
  </ul>
}

function ChatWithPreserve() {
  const [friendSelected, setFriendSelected] = useState('')
  return (
    <div>
      <h1 className="font-bold mb-1">(Preserve) Chat online ({friendSelected ? `Send message to ${friendSelected}` : 'No friend selected'})</h1>
      <ChatList onChangeFriend={setFriendSelected} />
      <div className="mt-2">
        <ChatBox onSendMessage={message => alert(`Send message to ${friendSelected}: ${message}`)} />
      </div>
    </div>
  )
}

function ChatWithReset() {
  const [friendSelected, setFriendSelected] = useState('')
  return (
    <div>
      <h1 className="font-bold mb-1">(Reset) Chat online ({friendSelected ? `Send message to ${friendSelected}` : 'No friend selected'})</h1>
      <ChatList onChangeFriend={setFriendSelected} />
      <div className="mt-2">
        {/* แทรก Unique key เพื่อให้มีการ Reset state */}
        <ChatBox key={friendSelected} onSendMessage={message => alert(`Send message to ${friendSelected}: ${message}`)} />
      </div>
    </div>
  )
}
