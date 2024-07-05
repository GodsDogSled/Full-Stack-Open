interface couresName {
  name: string;
}

const Header = (props: couresName): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header