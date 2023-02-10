import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce, getData } from '../utils/FetchUtils'
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UGBIconInput } from '../Global/UGBInput';
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
    missingLabel: {
        marginRight: theme.spacing(0.625)
    },
    missingContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#757575'
    }
}));


export const ExercisesAutoComplete = ({ label, onSelectedExercise, setMissingExerciseName, disabled = false }) => {
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

            const btnData = [{
                onClickAdd: (e) => {
                    e.stopPropagation();
                    setMissingExerciseName(inputValue)
                    history.push('?tab=add-new-exercise');
                },
            }];

            if (data.data.length) {
                btnData[0].id = 'last-list-item'
                setOptions([...data.data, btnData[0]]);
            } else {
                btnData[0].id = 'add-button'
                setOptions(btnData);
            }

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

                if (newValue && newValue.id !== 'add-button' && newValue.id !== 'last-list-item') {
                    const exercise = { exercise: newValue.exercise, id: newValue.id, videoLink: newValue.videoLink };
                    onSelectedExercise(exercise);
                }

                setOpen(false);
                setIsLoading(false);
            }}
            filterOptions={(options, state) => options}
            onInputChange={debounceMemo}
            blurOnSelect={true}
            clearOnBlur={true}
            clearOnEscape={true}
            disabled={disabled}
            getOptionLabel={(option) => option?.exercise || ''}
            getOptionSelected={() => false}
            renderOption={(ex, option) => {
                if (ex.id === 'add-button' || ex.id === 'last-list-item') {
                    return (
                        <div className={styles.missingContainer}>
                            <div className={styles.missingLabel}>
                                {ex.id === 'add-button' ?
                                    'Exercise is missing. To add it'
                                    :
                                    ex.id === 'last-list-item' ?
                                        "Can't find this exercise? To add it"
                                        :
                                        null
                                }
                            </div>
                            <UGBIconButton isListItem={true} $onClick={ex.onClickAdd} >
                                Click Here
                            </UGBIconButton>
                        </div>
                    );
                }
                return (
                    <ListItem key={ex.id}>
                        <ListItemText primary={ex.exercise} />
                    </ListItem>)
            }}
            options={options}
            loading={isLoading}
            renderInput={(params) => (
                <UGBIconInput
                    placeholder='Find Exercise'
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress className={styles.icon} size={20} /> : <SearchIcon className={styles.icon} />}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}