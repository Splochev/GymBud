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
import useStyles from './styles'
import UGBAlert from '../Global/UGBAlert';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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


const TableTextField = ({ onBlur, onClickIconButton, row, cellIndex, headCell, index, rowData }) => {
    const styles = useStyles();
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
                        <InputAdornment className={styles.muiInputAdornmentRoot} position="end">
                            <IconButton
                                disableFocusRipple
                                disableRipple
                                onClick={e => onClickIconButton(index, headCell, rowData)}
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


function EnhancedTableHead({ headCells, order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => {
                    return (
                        <TableCell
                            key={`${headCell.id}-${index}`}
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                IconComponent={orderBy === headCell.id ? ArrowDropUpIcon : ArrowDropDownIcon}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

export default function DataTable({ rows, headCells, page, setPage, setRows, }) {
    const styles = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
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

    const handleOnBlur = (event, rowData, cellIndex, setShrink) => {
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

    const calculateWeightChanges = () => {
        const tempRows = rows;
        for (let i = 0; i < tempRows.length; i++) {
            if (i === 0) {
                tempRows[i].weightChange = 0;
            } else {
                const calculation = !tempRows[i].avgWeight ? 0 : Math.round(((tempRows[i].avgWeight - tempRows[i - 1].avgWeight) / tempRows[i - 1].avgWeight * 100) * 100) / 100;
                const calculationToString = calculation.toString();
                if (isNaN(calculationToString) || calculationToString.includes('Infinity')) {
                    tempRows[i].weightChange = 0;
                } else {
                    tempRows[i].weightChange = calculation;
                }
            }
        }
        setRows([...tempRows])
    }

    const calculateRowAvgWeight = (rowData) => {
        const numbers = [];
        for (let i = 1; i < 8; i++) {
            if (rowData[i] && !isNaN(Number(rowData[i]))) {
                numbers.push(Number(rowData[i]))
            }
        }
        const avgWeight = (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2).toString();
        rowData.avgWeight = isNaN(avgWeight) ? 0 : avgWeight;
    }

    const onClickIconButton = (index, headCell, rowData) => {
        const tempRows = [...rows];
        tempRows[rows.indexOf(rowData)][headCell.id] = null;
        calculateRowAvgWeight(tempRows[rows.indexOf(rowData)]);
        calculateWeightChanges();
        setRows(tempRows);
    }

    return (
        <Box sx={{ width: '100%', position: 'relative' }} className={styles[`tableContainerRoot${rowsPerPage}`]}>
            <UGBAlert open={open} setOpen={setOpen} message={message} />
            <TableContainer>
                <Table size={'medium'}>
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
                                    <TableRow key={`${row.startDate}-${row.endDate}`}>
                                        {headCells.map((headCell, cellIndex) => {
                                            let title = headCell.label;
                                            if (headCell && headCell.id >= 1 && headCell.id <= 7) {
                                                title = "Edit cell"
                                            }
                                            const CellRender = headCell.CellRender;
                                            return (
                                                <TableCell
                                                    className={styles.textField}
                                                    key={`${row.startDate}-${row.endDate}-${headCell.id}`}
                                                    align="left"
                                                    data-toggle="tooltip"
                                                    title={title}
                                                >
                                                    {cellIndex >= 1 && cellIndex <= 7 ?
                                                        <TableTextField
                                                            onBlur={handleOnBlur}
                                                            onClickIconButton={onClickIconButton}
                                                            row={row}
                                                            cellIndex={cellIndex}
                                                            headCell={headCell}
                                                            index={index}
                                                            rowData={row}
                                                        />
                                                        :
                                                        CellRender ?
                                                            <CellRender key={`cellRender-${row.startDate}-${row.endDate}-${headCell.id}`} cellData={row[headCell.id]} rowData={row} />
                                                            :
                                                            row[headCell.id]
                                                    }
                                                </TableCell>);
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
