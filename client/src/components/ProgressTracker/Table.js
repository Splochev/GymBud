import MUIDataTable from "mui-datatables";
import useStyles from './styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const getMuiTheme = () => createTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                color: 'black',
                '&:nth-child(-n+9)': {
                    '&:hover': {
                        background: '#cccccc',
                        cursor: "pointer",
                    }
                },
            }
        },
        MuiToolbar: {
            root: {
                background: '#343a40',
                color: 'white'
            },
        },
        MUIDataTableFooter: {
            root: {
                background: '#343a40',
            }
        },
        MUIDataTableToolbar: {
            icon: {
                color: 'white'
            }
        },
        MUIDataTableToolbarSelect: {
            deleteIcon: {
                color: '#df4759 !important'
            }
        },
        MUIDataTableFilter: {
            resetLink: {
                color: 'black'
            },
        },
    }
})

const Table = ({ addNewRow, data, columns, options }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Weight Tracker"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
            <button data-toggle="tooltip" title="Add a new row" onClick={addNewRow} className={classes.addButton}><i className={"fas fa-plus-circle " + classes.icon}></i></button>
        </div >
    );
}

export default Table;