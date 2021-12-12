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
import TextField from '@material-ui/core/TextField';
import UGBAlert from '../Global/UGBAlert';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import useStyles from './styles'

function EnhancedTableHead({ headCells, order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id + "_" + index}
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'desc'}
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

const TableTextField = ({ onBlur, onClickIconButton, row, cellIndex, headCell, index }) => {
    const classes = useStyles();
    const [shrink, setShrink] = React.useState(false);

    return (
        <TextField
            type='text'
            onBlur={(event) => onBlur(event, row, cellIndex, setShrink)}
            label={row[headCell.id] ? `${row[headCell.id]}kg` : ''}
            key={headCell.id + "_" + cellIndex}
            InputLabelProps={{ shrink: shrink }}
            InputProps={row[headCell.id] ?
                {
                    onFocus: () => { setShrink(true) },
                    endAdornment:
                        <InputAdornment className={classes.muiInputAdornmentRoot} position="end">
                            <IconButton
                                disableFocusRipple
                                disableRipple
                                onClick={e => onClickIconButton(index, headCell)}
                                data-toggle="tooltip" title="Clear cell"
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }}
                                edge="end"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                } : null}
        />
    );
}

export default function DataTable({ rows, headCells, page, setPage, setRows, order, setOrder, orderBy, setOrderBy }) {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const calculateRowAvgWeight = (rowData) => {
        const nums = [];
        if (rowData['1'] && !Number.isNaN(Number(rowData['1']))) {
            nums.push(Number(rowData['1']))
        }
        if (rowData['2'] && !Number.isNaN(Number(rowData['2']))) {
            nums.push(Number(rowData['2']))
        }
        if (rowData['3'] && !Number.isNaN(Number(rowData['3']))) {
            nums.push(Number(rowData['3']))
        }
        if (rowData['4'] && !Number.isNaN(Number(rowData['4']))) {
            nums.push(Number(rowData['4']))
        }
        if (rowData['5'] && !Number.isNaN(Number(rowData['5']))) {
            nums.push(Number(rowData['5']))
        }
        if (rowData['6'] && !Number.isNaN(Number(rowData['6']))) {
            nums.push(Number(rowData['6']))
        }
        if (rowData['7'] && !Number.isNaN(Number(rowData['7']))) {
            nums.push(Number(rowData['7']))
        }

        const avgWeight = (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2).toString();
        rowData.avgWeight = avgWeight === 'NaN' ? 0 : avgWeight;
    }

    const calculateWeightChanges = () => {
        const tempRows = rows;
        for (let i = 0; i < tempRows.length; i++) {
            if (i === 0) {
                tempRows[i].weightChange = 0;
            } else {
                const calculation = Math.round(((tempRows[i].avgWeight - tempRows[i - 1].avgWeight) / tempRows[i - 1].avgWeight * 100) * 100) / 100;
                const calculationToString = calculation.toString();
                if (calculationToString === 'NaN' || calculationToString.includes('Infinity')) {
                    tempRows[i].weightChange = 0;
                } else {
                    tempRows[i].weightChange = calculation;
                }
            }
        }
        setRows([...tempRows])
    }

    const onBlur = (event, rowData, cellIndex, setShrink) => {
        const element = event.target;
        let inputValue = element.value
        if (!/^([1-9]\d*)(\.?)(\d+)?$/g.test(inputValue) && inputValue.length > 0) {
            if (Number(inputValue) === 0) {
                setOpen(true);
                setMessage('Incorrect entry. Zero is not allowed.')
            } else {
                setOpen(true);
                setMessage('Incorrect entry. Only numbers allowed.')
            }
            element.value = '';
        } else if (inputValue) {
            if (inputValue.charAt(inputValue.length - 1) === '.') {
                inputValue = inputValue.substring(0, inputValue.length - 1)
            }
            rowData[cellIndex] = Number(inputValue).toFixed(1);
            calculateRowAvgWeight(rowData)
            calculateWeightChanges()
            setRows([...rows])
            element.value = ''
        }
        setShrink(false)
    }

    const onClickIconButton = (index, headCell) => {
        const tempRows = [...rows];
        tempRows[index][headCell.id] = null;
        calculateRowAvgWeight(tempRows[index]);
        calculateWeightChanges();
        setRows(tempRows);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 5 - rows.length;

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <UGBAlert open={open} setOpen={setOpen} message={message} />
            <TableContainer >
                <Table
                    aria-labelledby="weight-tracker-table"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                        rowCount={rows.length}
                        setRows={setRows}
                        rows={rows}
                        setPage={setPage}
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow
                                    key={row.week + '_' + index}
                                >
                                    {headCells.map((headCell, cellIndex) => {
                                        const CellRender = headCell.CellRender;
                                        return <TableCell
                                            className={classes.textField}
                                            key={headCell.id + "_" + cellIndex} align="left" data-toggle="tooltip" title="Edit cell">
                                            {cellIndex >= 1 && cellIndex <= 7 ?
                                                <TableTextField
                                                    onBlur={onBlur}
                                                    onClickIconButton={onClickIconButton}
                                                    row={row}
                                                    cellIndex={cellIndex}
                                                    headCell={headCell}
                                                    index={index}
                                                />
                                                :
                                                CellRender ?
                                                    <CellRender key={headCell.id + "_" + cellIndex} cellData={row[headCell.id]} rowData={row} />
                                                    :
                                                    row[headCell.id]
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
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
            />
        </Box>
    );
}
