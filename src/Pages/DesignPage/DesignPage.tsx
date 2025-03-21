import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { TestDataCompany, testIncomeStatementData } from '../../Components/Table/testData'

type Props = {}

const data = TestDataCompany;

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
]

const DesignPage = (props: Props) => {
  return (
    <>
    <h1>FinShark Design Page</h1>
    <h2>This is Finshark's Design page. This is where we will house various design aspects of the app.</h2>
    <RatioList data={testIncomeStatementData} config={tableConfig}/>
    <Table />
    </>
  )
}

export default DesignPage