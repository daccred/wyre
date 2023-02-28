import React from 'react'
import {
    Pagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator
  } from "@ajna/pagination";
import { Text } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const TablePagination = ({data} : {data: unknown[]}) => {
    const outerLimit = 2;
    const innerLimit = 2;

    const {
        pages,
        pagesCount,
        currentPage,
        setCurrentPage,
        isDisabled,
      } = usePagination({
        total: data?.length,
        limits: {
          outer: outerLimit,
          inner: innerLimit
        },
        initialState: {
          pageSize: 10,
          isDisabled: false,
          currentPage: 1
        }
      });

      const handlePageChange = (nextPage: number): void => {
        // -> request new data using the page number
        setCurrentPage(nextPage);
      };

  return (
    <Pagination
    pagesCount={pagesCount}
    currentPage={currentPage}
    isDisabled={isDisabled}
    onPageChange={handlePageChange}
  >
    <PaginationContainer
      align="center"
      justify="space-between"
      py={2}
      w="full"
    >
      <PaginationPrevious
        variant={"outline"}
        h="40px"
        px="12px"
        leftIcon={<FiArrowLeft/>}
        iconSpacing={3}
        border={"1px solid #D0D5DD"}
        borderRadius="8px"
        boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
      >
        <Text>Previous</Text>
      </PaginationPrevious>
      <PaginationPageGroup
        isInline
        align="center"
        separator={
          <PaginationSeparator
            bg="#EAECF0"
            fontSize="sm"
            boxSize="10"
            jumpSize={11}
          />
        }
      >
        {pages.map((page: number) => (
          <PaginationPage
            w={7}
            bg="white"
            key={`pagination_page_${page}`}
            page={page}
            fontSize="sm"
            boxSize="10"
            fontWeight='bold'
            _hover={{
              bg: "#EAECF0",
            }}
            _current={{
              bg: "#EAECF0",
              
            }}
          />
        ))}
      </PaginationPageGroup>
      <PaginationNext
      variant={"outline"}
      h="40px"
      px="12px"
      rightIcon={<FiArrowRight/>}
      iconSpacing={3}
      border={"1px solid #D0D5DD"}
      borderRadius="8px"
      boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
      >
        <Text>Next</Text>
      </PaginationNext>
    </PaginationContainer>
  </Pagination>
  )
}

export default TablePagination