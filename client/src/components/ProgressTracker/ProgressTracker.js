import MUIDataTable from "mui-datatables";
import useStyles from './styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const columns = [
    {
        name: "date",
        label: "Date",
        options: {
            sort: false,
        }
    },
    {
        name: "1",
        label: "Day 1",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "2",
        label: "Day 2",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "3",
        label: "Day 3",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "4",
        label: "Day 4",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "5",
        label: "Day 5",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "6",
        label: "Day 6",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "7",
        label: "Day 7",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "avgWeight",
        label: "Average Weight",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "weightChange",
        label: "Weight Change(%)",
        options: {
            sort: false,
            filter: false
        }
    },
    {
        name: "id",
        label: "id",
        options: {
            sort: false,
            display: "excluded",
            filter: false
        }
    },
];

const data = [
    {
        date: "09/27/2021 - 10/03/2021",
        1: '68',
        2: '67.3',
        3: '67.3',
        4: '67.3',
        5: '67.3',
        6: '67.7',
        7: '67.7',
        avgWeight: '67.5',
        weightChange: '0.00%',
        id: '1'
    },
    {
        date: "10/04/2021 - 10/10/2021",
        1: '67.7',
        2: '67.3',
        3: '67.1',
        4: '67.0',
        5: '66.6',
        6: '',
        7: '66.4',
        avgWeight: '67.0',
        weightChange: '-0.74%',
        id: '2'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    }, {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
    {
        date: "10/11/2021 - 10/17/2021",
        1: '',
        2: '67.1',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        avgWeight: '67.1',
        weightChange: '0.12%',
        id: '28105'
    },
];

const options = {
    print: false,
    responsive: 'simple',
    page: 0,    // comes from server
    count: data.length, //comes from erver
    rowsPerPage: 7,
    rowsPerPageOptions: [],
    tableBodyHeight: '450px',
    search: false,
    filterType: 'multiselect',
};

const getMuiTheme = () => createTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                color: 'black',
                '&:hover': {
                    background: '#cccccc',
                    cursor: "pointer",
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
        MuiSelect: {
            root: {
                width: '250px'
            }
        },
    }
})



const ProgressTracker = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                    serverSide={true}
                />
            </ThemeProvider>
            <button data-toggle="tooltip" title="Add new row" className={classes.addButton}><i class={"fas fa-plus-circle " + classes.icon}></i></button>
        </div >
    );
}

export default ProgressTracker;