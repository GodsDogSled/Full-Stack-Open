import { useState } from 'react'
const Winner = ({ anecdotes, allVotes }) => {
  const highestVoteCount = Math.max(...allVotes)
  const winnerIndex = allVotes.indexOf(highestVoteCount)
  const winner = anecdotes[winnerIndex]
  if (highestVoteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  }

  return (
    <div>
      <h2>Most Voted</h2>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }


  const points = Array(anecdotes.length).fill(0)
  const [pointsCopy, setPointsCopy] = useState([...points])
  //find most voted for anecdote
  // const [mostVotes, setMostVotes] = useState({
  //   anecdote: "no votes",
  //   votes: 0,
  // })
  

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



  function handleVote(anecdoteIndex) {
    const newPointsArray = pointsCopy.map((point, i) => {
      if (i === anecdoteIndex) {
        // Increment the anecdote voted on
        return point + 1;
      } else {
        // The rest haven't changed
        return point;
      }
    })


    setPointsCopy(newPointsArray);



  }

  const [selected, setSelected] = useState(0)

  return (
    <>
      <h1>View Anecdotes</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>has {pointsCopy[selected]} votes</p>
      <button onClick={() => { setSelected(getRandomInt(anecdotes.length)) }}> Next Anecdote</button>
      <button onClick={() => handleVote(selected)}>Vote</button>
      <Winner anecdotes={anecdotes} allVotes={pointsCopy} />
    </>


  )
}

export default App