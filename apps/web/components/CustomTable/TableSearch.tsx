import {Grid, GridItem, HStack, Input, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const TableSearch = ({
  searchOptions,
  setDefaultTableData,
  setTableData,
  defaultTableData

}: {
  searchOptions: string[] | undefined;
  setDefaultTableData?: Dispatch<SetStateAction<unknown[]>>
  setTableData?:Dispatch<SetStateAction<unknown[]>>
  defaultTableData?: unknown[];
}) => {
    const [filterTerm, setFilterTerm] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    console.log('heeey', defaultTableData)

    useEffect( () => {
         // @ts-ignore
        const searchData = defaultTableData?.filter(data=>data?.name?.toLowerCase().includes(searchTerm?.toLowerCase()))
        // @ts-ignore
        setTableData(searchData as unknown[])
        // @ts-ignore
        // const filterData = defaultTableData?.filter(data=>data?.department?.toLowerCase().includes(filterTerm?.toLowerCase()))
        // // @ts-ignore
        // setTableData(filterData as unknown[])
    }, [defaultTableData, filterTerm, searchTerm, setTableData])
    
  return (
    <Grid templateColumns="30% 25%" justifyContent="space-between" my={6}>
      <GridItem>
        <HStack gap="1">
          <FiSearch fontSize={"24px"} />
          <Input
            variant={"unstyled"}
            border={"0"}
            borderBottom="1px solid"
            borderRadius={0}
            h={12}
            fontSize={"sm"}
            placeholder="Search Employee"
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </HStack>
      </GridItem>
      <GridItem>
        <Select  onChange={(e)=>setFilterTerm(e.target.value)}>
          {searchOptions?.map((option: string) => (
            <option key={option} value={filterTerm} defaultValue={option}>
              {option}
            </option>
          ))}
        </Select>
      </GridItem>
    </Grid>
  );
};

export default TableSearch;
