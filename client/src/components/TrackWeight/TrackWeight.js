import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { UGBDatePicker } from '../Global/UGBDatePicker';
import { UGBInput } from '../Global/UGBInput';
import { postData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc';
import { useStoreContext } from '../store/Store';

const useStyles = makeStyles((theme) => ({
    weightSubmission: {
        display: 'flex',
        alignItems: 'baseline',
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(7),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: '93px'
        }
    }
}));

const TrackWeight = ({ refreshTableData, setRefreshTableData, onClose }) => {
    const styles = useStyles();
    const [store, setStore] = useStoreContext();
    const [defaultSelectedDate] = useState(new Date());
    const [maxSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [selectedDate, setSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [minSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate() - 30)));
    const weight = useState('')

    function onSubmitWeight(e) {
        e.preventDefault();
        const parsedDate = parseDate(selectedDate);
        const parsedWeight = Number(weight[0]);

        if (!parsedWeight || !parsedDate) {
            console.log("invalid weight or date")
            return;
        }

        postData(process.env.REACT_APP_HOST + `/api/weight-tracker/submit-weight`, {
            date: parsedDate,
            weight: Number(weight[0])
        }).then(data => {
            weight[1]('')
            if (window.location.pathname === '/progress-tracker') {
                setRefreshTableData(true);
            }
        }, error => {
            console.log(error)
        })
    }

    return (
        <>
            <form onSubmit={onSubmitWeight}>
                <UGBInput
                    type='number'
                    $value={weight}
                    placeholder='Weight'
                    min='1'
                    iconStart='fas fa-balance-scale'
                />
                <UGBDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    minDate={minSelectedDate}
                    maxDate={maxSelectedDate}
                />
                <div className={styles.actions}>
                    <button type="button" onClick={() => onClose()} className="btn btn-danger" >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success" >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default TrackWeight;