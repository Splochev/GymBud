import useStyles from './Styles.js'

const ProgressTracker = () => {
    const classes = useStyles();
    return (
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Date Range</th>
                    <th scope="col">Day 1</th>
                    <th scope="col">Day 2</th>
                    <th scope="col">Day 3</th>
                    <th scope="col">Day 4</th>
                    <th scope="col">Day 5</th>
                    <th scope="col">Average Weight</th>
                    <th scope="col">Weight Change(%)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">10/18/2021<br></br>- 10/23/2021</th>
                    <td><input type="text" class={"form-control" + " " + classes.progressTrackerInput} placeholder="Weight"></input></td>
                    <td><input type="text" class={"form-control" + " " + classes.progressTrackerInput} placeholder="Weight"></input></td>
                    <td><input type="text" class={"form-control" + " " + classes.progressTrackerInput} placeholder="Weight"></input></td>
                    <td><input type="text" class={"form-control" + " " + classes.progressTrackerInput} placeholder="Weight"></input></td>
                    <td><input type="text" class={"form-control" + " " + classes.progressTrackerInput} placeholder="Weight"></input></td>
                    <td className={classes.progressTrackerInput}>XX</td>
                    <td>XX</td>
                </tr>
            </tbody>
        </table>

    );
}

export default ProgressTracker;