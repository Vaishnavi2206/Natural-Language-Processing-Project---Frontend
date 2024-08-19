// InfiniteScrollTable.js
import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import toast from 'react-hot-toast';

const InfiniteScrollTable = ({inputValue}) => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [columns, setColumns] = useState([]);
  const [displayColumns, setDisplayColumns] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    // Simulate initial data loading
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    // try {
    //   // Simulated API call or data fetching logic
    //   const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    //   const newData = await response.json();

    //   // Simulate loading delay
    //   setTimeout(() => {
    //     setData([...data, ...newData]);
    //     setPage(page + 1);
    //     setLoading(false);
    //     setHasMore(newData.length > 0);
    //   }, 1000); // Adjust delay as per your requirement
    // } catch (error) {
    //   console.error('Error fetching data: ', error);
    //   setLoading(false);
    // }
  };

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom && !loading && hasMore) {
      fetchData();
    }
  };

  const extractColumns = (data)=>{
    // data = JSON.parse(data);
    let columns = Object.keys(data[0]);
    setColumns(columns);

    let columnNames = columns.map((columnName) => {
        return columnName
          .replace(/_/g, ' ') // Replace underscores with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
      })
      setDisplayColumns(columnNames)
    console.log("columns",columns);
}

  useEffect(()=>{
    async function getData(){
    console.log("inputValue",inputValue);
    setData([]);
    if(inputValue || data.length == 0){
      console.log('YESSSS');
          setLoading(true);
    try {
        let url = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000/data";

        const payload = {
            query : inputValue
        };
        
        const response = await axios.post(url,payload)

        if(response.data){
      
          setTimeout(()=>{
            extractColumns(response.data.result);
            setData(response.data.result);
            toast.success("Data fetched successfully")
            setPage(page + 1);
            setLoading(false);
            setHasMore(response.data.length > 0);
          },500)
        }
      }

        catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
           toast.error("Error fetching data. Please try again")
          }
        }

      }
      getData()

},[inputValue])

  return (
    <TableContainer component={Paper} onScroll={handleScroll} style={{ marginTop:"50px",width:"80%",maxHeight: '600px', overflowY: 'auto' }}>
      <Table stickyHeader aria-label="infinite scrolling table">
        <TableHead>
          <TableRow>
          {displayColumns.map((column, index) => (
            <TableCell style={{fontWeight:"bold"}} key={index}>{column}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 && data.map((item) => (
             <TableRow key={item.id}>
             {columns.map((column, index) => (
               <TableCell key={index}>
                {item[column]}
                </TableCell>
             ))}
           </TableRow>

            // <TableRow key={item.id}>
            //   <TableCell>{item.id}</TableCell>
            //   <TableCell>{item.title}</TableCell>
            //   <TableCell>{item.body}</TableCell>
            // </TableRow>
          ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfiniteScrollTable;
