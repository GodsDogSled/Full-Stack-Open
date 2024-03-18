import { useState } from 'react'

// const Display = ({ counter }) => <div>{counter}</div>


const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const StatisticLine = ({ text, number }) => {
  if (text === "Percent Positive Feedback") {
    return (
      <tr>
        <td>{text} </td>
        <td>{number}% </td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text} </td>
      <td>{number} </td>
    </tr>
  )
}

const Statistics = ({ good, mid, bad }) => {
  const totalVotes = good + bad + mid;
  const voteAverage = (good - bad) / totalVotes
  const percentage = good * (100 / totalVotes)

  if (totalVotes === 0) {
    return (
      <h4>No Data</h4>
    )
  }

  return (
    <>
      <h3>Vote Statistics</h3>
      <table>
        <tbody>
          <StatisticLine text={"Number of Votes"} number={totalVotes} />
          <StatisticLine text={"Average"} number={voteAverage} />
          <StatisticLine text={"Percent Positive Feedback"} number={percentage} />
        </tbody>
      </table>



    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [mid, setMid] = useState(0)
  const [bad, setBad] = useState(0)



  // const [allClicks, setAllClicks] = useState([]);
  // const [totalClicks, setTotalClicks] = useState(0);

  // const handleLeftClick = () => {
  //   setAllClicks(allClicks.concat("L"))
  //   setClicks({ ...clicks, left: clicks.left + 1, })
  //   setTotalClicks(clicks.left + clicks.right);
  // };
  // const handleRightClick = () => {
  //   setAllClicks(allClicks.concat("R"))
  //   setClicks({ ...clicks, right: clicks.right + 1, })
  //   setTotalClicks(clicks.left + clicks.right);
  // };



  const handleClick = (text) => {
    return () => {
      switch (text) {
        case "good":
          setGood(good + 1);
          break;
        case "mid":
          setMid(mid + 1);
          break;
        case "bad":
          setBad(bad + 1);
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <h1>Give me some feedback on my head</h1>
      <Button text={"good"} onClick={handleClick("good")} />
      <Button text={"mid"} onClick={handleClick("mid")} />
      <Button text={"bad"} onClick={handleClick("bad")} />

      <h3>Current Stats</h3>
      <ul>

        <li>Good: {good}</li>
        <li>Mid: {mid}</li>
        <li>Bad: {bad}</li>

      </ul>

      <Statistics good={good} mid={mid} bad={bad} />

    </>
  )
}

export default App