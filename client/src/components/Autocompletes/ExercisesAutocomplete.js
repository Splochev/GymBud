import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce, getData } from '../utils/FetchUtils'
import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { UGBIconInput } from '../Global/UGBInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InputAdornment } from '@material-ui/core';
import { UGBIconButton } from '../Global/UGBButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    autocomplete: {
        "& .MuiAutocomplete-clearIndicatorDirty": {
            display: 'none'
        },
        "& .MuiAutocomplete-popupIndicator": {
            display: 'none'
        },
    },
}));


export const ExercisesAutoComplete = ({ label, onSelectedExercise, disabled }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setOpen(inputValue.length > 0);
        (async () => {
            if (!inputValue || !isLoading) {
                return
            };
            const data = await getData(process.env.REACT_APP_HOST + `/api/workout/get-exercises?filter=${inputValue}`);
            setIsLoading(false);
            setOptions(data.data);
        })();
    }, [inputValue, isLoading]);

    const debounceMemo = useMemo(
        () => debounce(
            (event, newInputValue) => {
                setOptions([]);
            }, (event, newInputValue) => {
                setIsLoading(newInputValue.length > 0);
                setInputValue(newInputValue);
            }, 500),
        [],
    );

    return (
        <Autocomplete
            className={styles.autocomplete}
            open={open}
            onClose={() => {
                setOpen(false);
                setOptions([]);
            }}
            value={value}
            onChange={(e, newValue) => {
                setValue('');
                setInputValue('');

                if (newValue) {
                    const exercise = { exercise: newValue.exercise, id: newValue.id, videoLink: newValue.videoLink };
                    onSelectedExercise(exercise);
                }

                setOpen(false);
                setIsLoading(false);
            }}
            onInputChange={debounceMemo}
            blurOnSelect={true}
            clearOnBlur={true}
            clearOnEscape={true}
            getOptionLabel={(option) => option?.exercise || ''}
            getOptionSelected={() => false}
            renderOption={(ex, option) => {
                return (<ListItem key={ex.id}>
                    <ListItemText primary={ex.exercise} />
                </ListItem>)
            }}
            options={options}
            loading={isLoading}
            renderInput={(params) => (
                <UGBIconInput
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <UGBIconButton disabled={disabled} isEnd={false} $onClick={() => history.push('?tab=add-new-exercise')} >
                                    ADD
                                </UGBIconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress style={{ color: '#757575' }} size={20} /> : <SearchIcon style={{ color: '#757575' }} />}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}