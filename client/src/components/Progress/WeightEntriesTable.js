import * as React from 'react';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import UGBAlert from '../Global/UGBAlert';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { parseDate, getTime } from '../utils/utilFunc'
import Pagination from '@material-ui/lab/Pagination';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#28A745',
            light: 'red',
            dark: '#218838',
            contrastText: 'white',
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

const useStyles = makeStyles((theme) => ({
    muiInputAdornmentRoot: {
        "& .MuiButtonBase-root": {
            '&:hover': {
                background: 'none',
                color: 'black'
            }
        }
    },
    unsortableHead: {
        color: 'white'
    },
    container: {
        "& .MuiTableContainer-root": {
            minHeight: theme.spacing(72.125),
            borderRadius: '5px 5px 0 0',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        },
        "& .MuiTableHead-root": {
            background: '#28A745',
            "& .MuiButtonBase-root": {
                color: 'white'
            },
            "& .MuiSvgIcon-root": {
                color: 'white !important',
                fontSize: theme.spacing(2.5),
            },
            "& .MuiTableCell-root": {
                borderBottom: '1px solid #1B1B1B',
            }
        },
        "& .MuiTableBody-root": {
            "& .MuiTableRow-root": {
                '&:nth-child(even)': {
                    background: '#DFF2E3',
                },
                "& .MuiTableCell-root": {
                    borderBottom: '1px solid #1B1B1B',
                    borderTop: '1px solid #1B1B1B',
                },
                '&:last-child': {
                    borderBottom: '3px solid #28A745',
                }
            }
        }
    },
    textField: {
        "& .MuiFormControl-root": {
            width: theme.spacing(11.5),
        },
        "& .MuiFormLabel-root": {
            color: "#868686"
        },
        "& .MuiInput-underline": {
            '&::before': {
                transition: 'none',
                borderBottom: '1px solid #868686 !important'
            },
            '&::after': {
                transition: 'none',
                borderBottom: '1px solid black !important'
            },
        },
    },
    pagination: {
        marginTop: theme.spacing(1.25),
        display: 'flex',
        justifyContent: 'center'
    }
}));

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'dateRange') {
        const aDate = getTime(new Date(a.startDate));
        const bDate = getTime(new Date(b.startDate));
        if (bDate < aDate) {
            return 1;
        }
        if (bDate > aDate) {
            return -1;
        }
        return 0;
    }
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

const TableTextField = ({ onBlur, onClickIconButton, row, cellIndex, headCell, index, rowData, helperText }) => {
    const styles = useStyles();
    const [shrink, setShrink] = useState(false);

    return (
        <TextField
            type='number'
            step='.01'
            onBlur={(event) => onBlur(event, row, cellIndex, setShrink)}
            label={row[headCell.id] ? `${row[headCell.id]}kg` : ''}
            key={headCell.id + "_" + cellIndex}
            InputLabelProps={{ shrink: shrink }}
            helperText={helperText}
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
    const styles = useStyles();
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
                            {index >= 1 && index <= 7 ?
                                <div className={styles.unsortableHead}>{headCell.label}</div>
                                :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    IconComponent={orderBy === headCell.id ? ExpandLessIcon : ExpandMoreIcon}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

export const WeightEntriesTable = ({ rows, headCells, page, setPage, setRows, setChanges }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [message, setMessage] = useState('');

    const [offsetDateAsTime, setOffsetDateAsTime] = useState(getTime(new Date()));
    const [limitDateAsTime, setLimitDateAsTime] = useState(getTime(new Date()));

    useEffect(() => {
        if (rows.length) {
            const lastRow = rows[rows.length - 1];
            const tempLimitDate = new Date(lastRow.endDate);

            let counter = 0;
            for (let i = 7; i >= 1; i--) {
                if (lastRow[i]) {
                    tempLimitDate.setDate(tempLimitDate.getDate() - counter);
                    break;
                }
                counter++;
            }
            setLimitDateAsTime(getTime(tempLimitDate));
            // console.log(getTime(tempLimitDate), tempLimitDate);

            const firstRow = rows[0];
            const tempOffsetDate = new Date(firstRow.startDate);

            counter = 0;
            for (let i = 1; i <= 7; i++) {
                if (firstRow[i]) {
                    tempOffsetDate.setDate(tempOffsetDate.getDate() + counter);
                    break;
                }
                counter++;
            }
            setOffsetDateAsTime(getTime(tempOffsetDate));
            // console.log(getTime(tempOffsetDate), tempOffsetDate);
        }
    }, [rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

            const date = new Date(rowData.startDate);
            date.setDate(date.getDate() + cellIndex - 1)
            setChanges(changes => (changes[parseDate(date)] = inputValue, { ...changes }))
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
        const date = new Date(rowData.startDate);
        date.setDate(date.getDate() + headCell.id - 1)
        setChanges(changes => (changes[parseDate(date)] = null, { ...changes }))
        const tempRows = [...rows];
        tempRows[rows.indexOf(rowData)][headCell.id] = null;
        calculateRowAvgWeight(tempRows[rows.indexOf(rowData)]);
        calculateWeightChanges();
        setRows(tempRows);
    }

    return (
        <div className={styles.container}>
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
                            .slice((page - 1) * 5, (page - 1) * 5 + 5)
                            .map((row, index) => {
                                return (
                                    <TableRow key={`${row.startDate}-${row.endDate}-${index}`}>
                                        {headCells.map((headCell, cellIndex) => {
                                            const CellRender = headCell.CellRender;
                                            let title = headCell.label;
                                            let helperText = '';
                                            let displayCell = true;

                                            if (headCell && headCell.id >= 1 && headCell.id <= 7) {
                                                title = "Edit cell";
                                                const date = new Date(row.startDate);
                                                date.setDate(date.getDate() + headCell.id - 1);
                                                helperText = date.toDateString().slice(0, -4);
                                                const parsedDate = getTime(date);
                                                displayCell = row[headCell.id] || row[headCell.id] === null ? true : false;
                                            }
                                            return (
                                                <TableCell
                                                    className={styles.textField}
                                                    key={`${row.startDate}-${row.endDate}-${headCell.id}-${index}-${cellIndex}`}
                                                    align="left"
                                                    data-toggle="tooltip"
                                                    title={helperText ? title : ''}
                                                >
                                                    {
                                                        CellRender ?
                                                            <CellRender key={`${row.startDate}-${row.endDate}-${headCell.id}-${index}-${cellIndex}`} cellData={row[headCell.id]} rowData={row} />
                                                            :
                                                            cellIndex >= 1 && cellIndex <= 7 ?
                                                                !displayCell ?
                                                                    ''
                                                                    :
                                                                    <TableTextField
                                                                        onBlur={handleOnBlur}
                                                                        onClickIconButton={onClickIconButton}
                                                                        row={row}
                                                                        cellIndex={cellIndex}
                                                                        headCell={headCell}
                                                                        index={index}
                                                                        rowData={row}
                                                                        helperText={helperText}
                                                                    />
                                                                :
                                                                row[headCell.id]
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={styles.pagination}>
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={Math.ceil(rows.length / 5)}
                        page={page}
                        shape="rounded"
                        onChange={handleChangePage}
                        showFirstButton={true}
                        showLastButton={true}
                        siblingCount={0}
                        color="secondary"
                    />
                </ThemeProvider>
            </div>
        </div >
    );
}
