import * as React from 'react';
import { Box } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { ClearAll } from '@material-ui/icons';
import { Add } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import UGBAlert from '../Global/UGBAlert';
import AddAlertIcon from '@material-ui/icons/AddAlert';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({ headCells, order, orderBy, onRequestSort, setRows, setPage }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const handleDeleteAllRows = () => {
        setPage(0);
        setRows([]);
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <IconButton data-toggle="tooltip" title="Delete all rows" onClick={handleDeleteAllRows}>
                        <ClearAll color='action' />
                    </IconButton>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function DataTable({ rows, headCells, page, setPage, setRows, disableAdd, setDisableAdd }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddNewRow = () => {
        rows = [...rows, { id: rows.length + 1, week: rows.length + 1, avgWeight: '0', weightChange: '0.00%' }]
        calculateWeightChanges()
        setRows([...rows])
        setDisableAdd(true);
    };

    const handleSave = () => {

    }

    const handleOnBlur = (event, rowData, cellIndex) => {
        let inputValue = event.target.value
        if (!/^([1-9]\d*)(\.?)(\d+)?$/g.test(inputValue) && inputValue.length > 0) {
            if (Number(inputValue) === 0) {
                setOpen(true);
                setMessage('Incorrrect entry. Zero is not allowed.')
            } else {
                setOpen(true);
                setMessage('Incorrrect entry. Only numbers allowed.')
            }
            event.target.value = null;
        } else if (inputValue) {
            if (inputValue.charAt(inputValue.length - 1) === '.') {
                inputValue = inputValue.substring(0, inputValue.length - 1)
            }
            rowData[cellIndex] = inputValue;
            let nums = [];

            if (!Number.isNaN(Number(rowData['1']))) {
                nums.push(Number(rowData['1']))
            }
            if (!Number.isNaN(Number(rowData['2']))) {
                nums.push(Number(rowData['2']))
            }
            if (!Number.isNaN(Number(rowData['3']))) {
                nums.push(Number(rowData['3']))
            }
            if (!Number.isNaN(Number(rowData['4']))) {
                nums.push(Number(rowData['4']))
            }
            if (!Number.isNaN(Number(rowData['5']))) {
                nums.push(Number(rowData['5']))
            }
            if (!Number.isNaN(Number(rowData['6']))) {
                nums.push(Number(rowData['6']))
            }
            if (!Number.isNaN(Number(rowData['7']))) {
                nums.push(Number(rowData['7']))
            }

            rowData.avgWeight = (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2).toString()
            calculateWeightChanges()
            setRows([...rows])
            event.target.value = null
        }
    }


    const calculateWeightChanges = () => {
        for (let i = 0; i < rows.length; i++) {
            if (i === 0) {
                rows[i].weightChange = '0.00%'
            } else {
                const calculation = Math.round(((rows[i].avgWeight - rows[i - 1].avgWeight) / rows[i - 1].avgWeight * 100) * 100) / 100;
                const calculationToString = calculation.toString();
                if (calculationToString === 'NaN' || calculationToString.includes('Infinity')) {
                    rows[i].weightChange = '0.00%'
                } else {
                    rows[i].weightChange = calculation + '%';
                }
            }
        }
    }

    const handleDelete = (rowData) => {
        rows = rows.filter(x => x.id !== rowData.id)
        calculateWeightChanges()
        setRows([...rows])
    }


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 5 - rows.length;

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <UGBAlert open={open} setOpen={setOpen} message={message} />
            <TableContainer >
                <Table
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        setRows={setRows}
                        rows={rows}
                        setPage={setPage}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <IconButton data-toggle="tooltip" title="Delete row" onClick={(e) => {
                                                handleDelete(row)
                                            }}>
                                                <Delete
                                                    style={{ color: '#DC3545' }}
                                                />
                                            </IconButton>
                                        </TableCell>
                                        {headCells.map((headCell, cellIndex) => {
                                            const CellRender = headCell.CellRender;
                                            return <TableCell
                                                label="Incorrect entry."
                                                key={headCell.id + cellIndex} align="left" data-toggle="tooltip" title="Edit cell">
                                                {cellIndex >= 1 && cellIndex <= 7 ?
                                                    <TextField type='text'
                                                        onBlur={(event) => { handleOnBlur(event, row, cellIndex) }}
                                                        label={row[headCell.id] ? `${row[headCell.id]}kg` : ''} key={headCell.id + cellIndex}
                                                    />
                                                    :
                                                    CellRender ?
                                                        <CellRender key={headCell.id + cellIndex} cellData={headCell.id === 'week' ? `Week ${row[headCell.id]}` : row[headCell.id]} rowData={row} />
                                                        :
                                                        headCell.id === 'week' ? `Week ${row[headCell.id]}` : row[headCell.id]
                                                }
                                            </TableCell>
                                        })}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className={classes.actions} >
                <IconButton data-toggle="tooltip" title="Add a new row"
                    disabled={disableAdd}
                    onClick={handleAddNewRow}>
                    <Add color={disableAdd ? 'disabled' : 'action'} />
                </IconButton>
                <IconButton data-toggle="tooltip" title="Force add a new row"
                    disabled={!disableAdd}
                    onClick={handleAddNewRow}>
                    <AddAlertIcon color={!disableAdd ? 'disabled' : 'action'} />
                </IconButton>
                <IconButton data-toggle="tooltip" title="Save"
                    onClick={handleSave}>
                    <SaveOutlinedIcon color={'action'} />
                </IconButton>
            </div>
        </Box>
    );
}
