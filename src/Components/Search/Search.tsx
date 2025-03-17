import { 
  JSX, 
  useState, 
  ChangeEvent, 
  MouseEvent} from "react";


type Props = {}

const Search: React.FC = (props: Props): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  }
  
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };
  return (

    <div>
      <input value={search} onChange={(e) => handleChange(e)}></input>
      <button onClick={(e) => onClick(e)}/>
    </div>
  )
}

export default Search