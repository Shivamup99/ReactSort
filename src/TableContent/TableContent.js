import { TableCell, TableContainer, TableRow } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import React from 'react'
import TableHeader from '../TableHead/TableHeader'


const rowInformation = [
    {"name":"Shivam", age:21},
    {"name":"Rahul", age:23}
]

function descendingComparator(a,b,orderBy){
    if(b[orderBy]<a[orderBy]){
        return -1
    }
    if(b[orderBy]>a[orderBy]){
        return 1
    }
    return 0
}

function getComparator(order,orderBy){
  return order ==='desc'? (a,b) => descendingComparator(a,b,orderBy) : (a,b)=> -descendingComparator(a,b,orderBy)
}
const sortedRowInformation = (rowArray,comparator)=>{
   const stablizedRowArray = rowArray.map((el,index)=>[el,index])
   stablizedRowArray.sort((a,b)=>{
       const order = comparator(a[0],b[0])
       if(order!==0) return order
       return a[1] - b[1]
   })
   return stablizedRowArray.map((el)=>el[0])
}


export default function TableContent() {

    const [orderDirection , setOrderDirection] = React.useState('asc')
    const [valueToOrderBy , setValueToOrderBy] = React.useState('name')
    const [page , setPage] = React.useState(0)
    const [rowsPerPage, setRowPerPage] = React.useState(1)

    const handleRequestSort = (event,property) =>{
        const isAscending = (valueToOrderBy===property && orderDirection==='asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc':'asc')
    }



    return (
        <>
        <TableContainer>
            <Table>
                <TableHeader 
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .map((person,index)=>{
                        <TableRow Key={index}>
                            <TableCell>
                                {person.name}
                            </TableCell>
                            <TableCell>
                                {person.age}
                            </TableCell>
                        </TableRow>
                    })
                }
            </Table>
        </TableContainer>
        </>
    )
}


//https://www.youtube.com/watch?v=sW6HEiNDJ_s