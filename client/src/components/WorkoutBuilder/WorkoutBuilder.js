import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../utils/RouteUtils';
import { List } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { InputAdornment, makeStyles } from '@material-ui/core';
import { ExercisesAutoComplete } from '../Autocompletes/ExercisesAutocomplete';
import { UGBIconButton } from '../Global/UGBButton';
import UGBLabel from '../Global/UGBLabel';
import { UGBSelect } from '../Global/UGBSelect';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ListItemText } from '@material-ui/core';
import { UGBButton } from '../Global/UGBButton';
import { useEffect } from 'react';
import UGBModal from '../Global/UGBModal';

const useStyles = makeStyles((theme) => ({
    titleSection: {
        marginBottom: '16px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px'
    },
    select: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        gap: 10,
        '& .MuiInputBase-root': {
            maxWidth: '300px'
        },
        '@media (max-width: 500px)': {
            gap: 0,
            flexDirection: 'column',
            alignItems: 'start',
            '& .MuiInputBase-root': {
                maxWidth: 'none',
            },
        },
        '& .MuiAutocomplete-root': {
            width: '100%'
        }
    },
    exerciseMapping: {
        marginTop: '8px'
    },
    alternativeNamesList: {
        height: '340px',
        overflow: 'auto',
    },
    saveAndResetActions: {
        marginTop: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'baseline', '@media (max-width: 365px)': {
            gap: '8px',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%',
            '& .MuiButtonBase-root': {
                width: '100%',
            },
            '& .MuiButton-root': {
                width: '100%',
            }
        },
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: '93px'
        }
    },
}));

const AddNewWorkoutJournal = ({ onClose }) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Add a new workout journal
                </UGBLabel>
            </div>
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </>
    );
}

const AddNewWorkoutSession = ({ onClose }) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Add a new workout session
                </UGBLabel>
            </div>
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </>
    );
}

const AddNewExercise = ({ onClose }) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Add a new exercise
                </UGBLabel>
            </div>

            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </>
    );
}

const WorkoutBuilder = () => {
    const styles = useStyles();
    const history = useHistory();
    const { tab } = useQuery();

    const [exercises, setExercises] = useState([]);
    const [showAddNewWorkoutJournal, setShowAddNewWorkoutJournal] = useState(false);
    const [showAddNewWorkoutSession, setShowAddNewWorkoutSession] = useState(true);
    const [showAddNewExercise, setShowAddNewExercise] = useState(true);

    useEffect(() => {
        switch (tab) {
            case 'add-new-workout-journal':
                setShowAddNewWorkoutJournal(true);
                break;
            case 'add-new-workout-session':
                setShowAddNewWorkoutSession(true);
                break;
            case 'add-new-exercise':
                setShowAddNewExercise(true);
                break;
            default:
                setShowAddNewWorkoutJournal(false);
                setShowAddNewWorkoutSession(false);
                setShowAddNewExercise(false);
                break;
        }
    }, [tab])

    function resetToDefault() {
    }
    function saveChanges() {
    }

    return (
        <>
            <>
                <UGBModal
                    open={showAddNewWorkoutJournal}
                    onClose={() => {
                        history.push(window.location.pathname);
                    }}
                    maxWidth='xs'
                >
                    <AddNewWorkoutJournal
                        onClose={() => {
                            history.push(window.location.pathname);
                        }}
                    />
                </UGBModal>
                <UGBModal
                    open={showAddNewWorkoutSession}
                    onClose={() => {
                        history.push(window.location.pathname);
                    }}
                    maxWidth='xs'
                >
                    <AddNewWorkoutSession
                        onClose={() => {
                            history.push(window.location.pathname);
                        }}
                    />
                </UGBModal>
                <UGBModal
                    open={showAddNewExercise}
                    onClose={() => {
                        history.push(window.location.pathname);
                    }}
                    maxWidth='xs'
                >
                    <AddNewExercise
                        onClose={() => {
                            history.push(window.location.pathname);
                        }}
                    />
                </UGBModal>
            </>
            <div className={styles.container}>
                <div className={styles.titleSection}>
                    <UGBLabel variant='h5' type='title'>
                        Workout Builder
                    </UGBLabel>
                    <UGBLabel variant='subtitle1' type='title'>
                        Click the "ADD" button to add a new journal, session or exercise
                    </UGBLabel>
                </div>
                <div className={styles.select}>
                    <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                        Workout Journal
                    </UGBLabel>
                    <UGBSelect
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <UGBIconButton isEnd={false} $onClick={() => history.push('?tab=add-new-workout-journal')} >
                                        ADD
                                    </UGBIconButton>
                                </InputAdornment>
                            ),
                            labelWidth: 70
                        }}
                    />
                </div>
                <div className={styles.select}>
                    <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                        Workout Session
                    </UGBLabel>
                    <UGBSelect
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <UGBIconButton isEnd={false} $onClick={() => history.push('?tab=add-new-workout-session')} >
                                        ADD
                                    </UGBIconButton>
                                </InputAdornment>
                            ),
                            labelWidth: 70
                        }}
                    />
                </div>
                <div className={styles.exerciseMapping}>
                    <div className={styles.addedExercises}>
                        <UGBLabel variant='subtitle1' type='title' minWidth='107px'>
                            Exercises for the following workout session:
                        </UGBLabel>
                        <List className={styles.alternativeNamesList}>
                            {exercises.map(ex => {
                                return (
                                    <ListItem key={ex.id}>
                                        <ListItemIcon>
                                            <IconButton onClick={() => setExercises(exercises.filter(exx => exx.id !== ex.id))}>
                                                <HighlightOffIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={ex.name} />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <div className={styles.select}>
                            <UGBLabel variant='subtitle2' type='title' minWidth='53px'>
                                Exercise
                            </UGBLabel>
                            <ExercisesAutoComplete setShowAddNewExercise={setShowAddNewExercise} />
                        </div>
                    </div>
                    <div className={styles.exercisesContent}>

                    </div>
                    <div className={styles.saveAndResetActions}>
                        <UGBButton className={styles.defaultButton} onClick={resetToDefault} btnType='outlinedPrimary' variant='outlined'>Reset To Default</UGBButton>
                        <UGBButton className={styles.submitButton} onClick={saveChanges} btnType='primary' >Save Changes</UGBButton>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorkoutBuilder;