import React, { useMemo } from "react";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.css"; // custom styles or Tailwind

function CustomTable(props) {
  const memoColumns = useMemo(() => props.columns, [props.columns]);
  const memoRows = useMemo(() => props.data, [props.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: memoColumns,
      data: memoRows,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="table-div">
      <div className="table-top">
        <div className="table-heading">
          <h2>{props.heading}</h2>
        </div>
        <div className="table-search-input">
          <AiOutlineSearch />
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <div className="table-main">
        <div className="table-inner">
          {rows.length === 0 ? (
            <p style={{
              textAlign: "center",
              padding: "20px 10px",
              borderBottom: "1px solid var(--primary-border)",
            }}>
              No data available
            </p>
          ) : (
            <table {...getTableProps()} className="table-body">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        const cellValue = cell.value;
                        return (
                          <td {...cell.getCellProps()}>
                            {typeof cellValue === 'number'
                              ? Number.isInteger(cellValue)
                                ? cellValue
                                : cellValue.toFixed(3)
                              : cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="table-bottom">
          <div className="tb-left">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
          <div className="tb-right">
            <label>Total Entries: {rows.length}</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
