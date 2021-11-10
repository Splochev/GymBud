import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const headCells = [
    {
        id: 'week',
        numeric: false,
        label: 'Week',
    },
    {
        id: 1,
        numeric: true,
        label: 'Day 1',
        hoverable: true
    },
    {
        id: 2,
        numeric: true,
        label: 'Day 2',
        hoverable: true
    },
    {
        id: 3,
        numeric: true,
        label: 'Day 3',
        hoverable: true
    },
    {
        id: 4,
        numeric: true,
        label: 'Day 4',
        hoverable: true
    },
    {
        id: 5,
        numeric: true,
        label: 'Day 5',
        hoverable: true

    },
    {
        id: 6,
        numeric: true,
        label: 'Day 6',
        hoverable: true

    },
    {
        id: 7,
        numeric: true,
        label: 'Day 7',
        hoverable: true
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

    }
];


const ProgressTracker = () => {
    const [page, setPage] = useState(0);
    const [disableAdd, setDisableAdd] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (rows.length) {
            const lastRow = rows[rows.length - 1];
            if (lastRow['1'] || lastRow['2'] || lastRow['3'] || lastRow['4'] || lastRow['5'] || lastRow['6'] || lastRow['7']) {
                setDisableAdd(false);
            }
        } else {
            setDisableAdd(false)
        }
    });


    return (
        <DataTable
            rows={rows}
            headCells={headCells}
            page={page}
            setPage={setPage}
            checkboxless={false}
            setRows={setRows}
            disableAdd={disableAdd}
            setDisableAdd={setDisableAdd}
        ></DataTable>
    );
}

export default ProgressTracker;