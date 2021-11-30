import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const headCells = [
    {
        id: 'week',
        numeric: false,
        label: 'Week',
        CellRender: ({ cellData }) => {
            return 'Week ' + cellData
        }
    },
    {
        id: 1,
        numeric: true,
        label: 'Day 1',
    },
    {
        id: 2,
        numeric: true,
        label: 'Day 2',
    },
    {
        id: 3,
        numeric: true,
        label: 'Day 3',
    },
    {
        id: 4,
        numeric: true,
        label: 'Day 4',
    },
    {
        id: 5,
        numeric: true,
        label: 'Day 5',

    },
    {
        id: 6,
        numeric: true,
        label: 'Day 6',

    },
    {
        id: 7,
        numeric: true,
        label: 'Day 7',
    },
    {
        id: 'avgWeight',
        numeric: false,
        label: 'Average Weight',

    },
    {
        id: 'weightChange',
        numeric: false,
        label: 'Weight Change(%)',
        CellRender: ({ cellData }) => {
            return cellData + '%';
        }
    }
];

const ProgressTracker = () => {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([{
        week: 1,
        1: 68.0,
        2: 67.3,
        3: 67.3,
        4: null,
        5: 67.3,
        6: 67.7,
        7: 67.7,
        avgWeight: 67.55,
        weightChange: 0,
    },
    {
        week: 2,
        1: 67.7,
        2: 67.3,
        3: 67.1,
        4: 67.0,
        5: 66.6,
        6: null,
        7: 66.4,
        avgWeight: 67.02,
        weightChange: -0.79,
    }



    ]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    return (
        <DataTable
            rows={rows}
            headCells={headCells}
            page={page}
            setPage={setPage}
            setRows={setRows}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            order={order}
            setOrder={setOrder}
        ></DataTable>
    );
}

export default ProgressTracker;