import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../Components/api";
import CardList from "../../Components/CardList/CardList";
import Navbar from "../../Components/Navbar/Navbar";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddApi, portfolioDeleteApi, portfolioGetApi } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(()=> {
    getPortfolio();
  }, [])

  const getPortfolio = () => {
    portfolioGetApi()
    .then((res) => {
      if(res?.data)
      {
        setPortfolioValues(res?.data)
      }
    }).catch((e) => {
      toast.warning("could not get portfolio values!")
    });
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddApi(e.target[0].value).then(
      (res) => {
        if(res?.status === 204) {
          toast.success("Stock added to portfolio!")
          getPortfolio();
        }
      }
    ).catch((e)=> {
      toast.warning("could not create portfolio item!");
    })
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteApi(e.target[0].value)
    .then((res) => {
      if(res?.status == 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    })
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    // console.log(searchResult);
  };
  return (
    <div className="App">
      {/* <Hero /> */}
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>Unable to connect to API</h1>}
    </div>
  );
};

export default SearchPage;
