import { useState, ChangeEvent, SyntheticEvent } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './company';
import { searchCompanies } from './Components/api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';


function App() {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e : any) => {
    setSearch(e.target.value);
    const updatedPortfolio = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string"){
      setServerError(result);
    }
    else if (Array.isArray(result.data))
    {
      setSearchResult(result.data);
    };
    console.log(searchResult)
  }

  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
      <ListPortfolio portfolioValues={portfolioValues}/>
      <CardList searchResults = {searchResult} onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <h1>Unable to connect to API</h1>}
    </div>
  );
}

export default App;
