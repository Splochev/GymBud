import useStyles from './styles'
import { useState } from "react";
import UGBModal from "../Global/UGBModal";
import Table from './Table'

const FillCellDialog = ({ cellMeta, colData, setShowFillCellDialog, data, setData }) => {
    const classes = useStyles();

    function fillCellWeightInput(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = formData.get('weight');
        if (cellMeta.colIndex > 0) {
            let dataIndex = cellMeta.dataIndex;
            let colIndex = cellMeta.colIndex;
            data[dataIndex][colIndex] = weight;
            setData(data);
            setShowFillCellDialog(false);
            // set alert for min and max weight must be between 1 and 250
        }
    }

    function fillCellWeekInput(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = formData.get('week');
    }

    return (
        <UGBModal width='sm' handleClose={setShowFillCellDialog}>
            <form onSubmit={fillCellWeightInput}>
                {colData ? <p>Please provide a new value of your morning weight "{colData}".<br></br>It should be before eating or drinking and after going to the bathroom. </p>
                    : <p>Please provide your morning weight before eating or drinking and after going to the bathroom. </p>}
                <div className={"input-group-prepend " + classes.cellInput}>
                    <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-balance-scale " + classes.icon}></i></div>
                    <input type="tel" className={"form-control " + classes.cornerless} name='weight' placeholder="Your weight" required></input>
                </div>
                <div className="d-flex justify-content-between">
                    <button className={"btn btn-danger " + classes.submit} onClick={() => { setShowFillCellDialog(false) }}>Cancel</button>
                    <button type='submit' className="btn btn-success">Submit</button>
                </div>
            </form>
        </UGBModal>
    );
}


const ProgressTracker = () => {
    const [data, setData] = useState([
        {
            week: "Week 1",
            1: 68,
            2: 67.3,
            3: 67.3,
            4: 67.3,
            5: 67.3,
            6: 67.7,
            7: 67.7,
            avgWeight: 67.5,
            weightChange: 0.0,
            id: 1
        },
        {
            week: "Week 2",
            1: 67.7,
            2: 67.3,
            3: 67.1,
            4: 67.0,
            5: 66.6,
            6: null,
            7: 66.4,
            avgWeight: 67.0,
            weightChange: -0.74,
            id: 2
        },
        {
            week: "Week 3",
            1: null,
            2: 67.1,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            avgWeight: 67.1,
            weightChange: 0.12,
            id: 3
        },
        {
            week: "Week 4",
            1: null,
            2: 67.1,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            avgWeight: 67.1,
            weightChange: 0.12,
            id: 4
        },
        {
            week: "Week 5",
            1: null,
            2: 67.1,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            avgWeight: 67.1,
            weightChange: 0.12,
            id: 5
        },
    ])
    const [showFillCellDialog, setShowFillCellDialog] = useState(false);
    const [colData, setColData] = useState(null);
    const [cellMeta, setCllMeta] = useState(null);


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
                display: "excluded",
                filter: false
            }
        },
        {
            name: "weightChange",
            label: "Weight Change(%)",
            options: {
                sort: false,
                display: "excluded",
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

    function addNewRow(e) {
        setData([...data, {
            week: `Week ${data.length + 1}`,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            avgWeight: 0,
            weightChange: 0,
            id: `${data.length + 1}`
        }])
    }

    function onRowsDelete(rowsDeleted) {
        setData(data.filter((x, index) => index !== rowsDeleted.data[0].dataIndex))
        return true;
    }

    function onCellClick(colData, cellMeta) {
        setShowFillCellDialog(true);
        setColData(colData);
        setCllMeta(cellMeta);
    }

    const options = {
        print: false,
        responsive: 'simple',
        page: data.length % 7,
        rowsPerPage: 7,
        rowsPerPageOptions: [],
        tableBodyHeight: '450px',
        search: false,
        onCellClick: onCellClick,
        onRowsDelete: onRowsDelete,
        filterType: 'checkbox',
        selectableRows: 'single'
    };

    return (
        <div>
            {showFillCellDialog ? <FillCellDialog
                cellMeta={cellMeta}
                colData={colData}
                setShowFillCellDialog={setShowFillCellDialog}
                setData={setData}
                data={data}
            /> : null}
            <Table addNewRow={addNewRow} columns={columns} options={options} data={data} />
        </div >
    );
}

export default ProgressTracker;