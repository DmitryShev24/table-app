import {Button} from "@material-ui/core";
import React, {useState} from "react";

interface responseData {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  },
  description: string
}

export function TableNew(props: any) {
  const {data} = props;

  const {items, requestSort, sortConfig} = useSortableData(data);
  const [filteredData, setFilteredData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);
  const [selectRow, setSelectRow] = useState<responseData>();
  const [q, setQ] = useState("");

  //фильтрация

  const filtered = (e: any) => {
    const filtered =
      items &&
      items.filter((item) => {
        return item.firstName.toLowerCase().startsWith(e.toLowerCase());
      });
    setFilteredData(filtered);
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  //пагинатор
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const Pagination = (postsPerPage: number, totalPosts: number, paginate: any) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderTableBody = () => {
    if (filteredData && filteredData.length > 0) {
      return (
        filteredData
      )
    }
    return (
      currentPosts)
  }

  const renderChooseRow = () => {
    return (
      <div style={{color: "black"}}>
        <div>Выбран пользователь <b>{selectRow?.firstName}</b><br />
          <p>Описание:</p><br />
          <textarea placeholder={selectRow?.description}>
          </textarea><br />
          <p>Адрес проживания: <b>{selectRow?.address.streetAddress}</b></p><br />
          <p> Город: <b>{selectRow?.address.city}</b></p><br />
          <p>Провинция/штат: <b>{selectRow?.address.state}</b></p><br />
          <p> Индекс: <b>{selectRow?.address.zip}</b></p><br />
        </div>
      </div>
    )
  }

  return (
    <>
      <input
        type="search"
        placeholder="Поиск"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          filtered(e.target.value);
        }}
      />
      <div style={{width: '100%'}}>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th><Button className={getClassNamesFor('id')} onClick={() => requestSort('id')}>ID</Button></th>
            <th> <Button className={getClassNamesFor('firstName')} onClick={() => requestSort('firstName')}>First Name</Button></th>
            <th><Button className={getClassNamesFor('lastName')} onClick={() => requestSort('lastName')}>Last Name</Button></th>
            <th> <Button className={getClassNamesFor('email')} onClick={() => requestSort('email')}>E-mail</Button></th>
            <th><Button className={getClassNamesFor('phone')} onClick={() => requestSort('phone')}>Phone</Button></th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody().map((item: responseData) => (
            <tr key={`${item.id}+${item.firstName}`} onClick={() => setSelectRow(item)}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Pagination(postsPerPage, items.length, paginate)}
      {renderChooseRow()}
    </>
  )
}

//сортировка

const useSortableData = (items: any, config = null,) => {
  const [sortConfig, setSortConfig] = React.useState<any>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({key, direction});
  }

  return {items: sortedItems, requestSort, sortConfig};
}