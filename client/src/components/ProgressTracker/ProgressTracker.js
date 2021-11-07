import MUIDataTable from "mui-datatables";
import useStyles from './styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from "react";
import UGBModal from "../Global/UGBModal";

const columns = [
    {
        name: "week",
        label: "Week",
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
    }
})

const ProgressTracker = () => {
    const classes = useStyles();
    const [data, setData] = useState([
        {
            week: "Week 1",
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
            week: "Week 2",
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
            week: "Week 3",
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
            week: "Week 4",
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
            week: "Week 5",
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
    ])
    const [showFillCellDialog, setShowFillCellDialog] = useState(false);

    function addNewRow(e) {
        setData([...data, {
            week: `Week ${data.length + 1}`,
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            avgWeight: '0',
            weightChange: '0.00%',
            id: `${data.length + 1}`
        }])
    }

    function onCellClick(colData, cellMeta) {
        setShowFillCellDialog(true);
        console.log(colData)
        console.log(cellMeta)
    }

    const options = {
        print: false,
        responsive: 'simple',
        page: data.length,
        rowsPerPage: 7,
        rowsPerPageOptions: [],
        tableBodyHeight: '450px',
        search: false,
        onCellClick: onCellClick,
        filterType: 'checkbox',
    };

    return (
        <div className={classes.container}>
            {showFillCellDialog ?
                <UGBModal width='sm' handleClose={setShowFillCellDialog}>

                </UGBModal>
                : null}
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Weight Tracker"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
            <button data-toggle="tooltip" title="Add a new row" onClick={addNewRow} className={classes.addButton}><i class={"fas fa-plus-circle " + classes.icon}></i></button>
        </div >
    );
}

export default ProgressTracker;