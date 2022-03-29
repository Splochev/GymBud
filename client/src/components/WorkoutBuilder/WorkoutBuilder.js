import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List, IconButton, ListItemIcon, ListItem, InputAdornment, makeStyles, ListItemText, Collapse, Tooltip, Popover, MenuList, MenuItem } from '@material-ui/core';
import { ExercisesAutoComplete } from '../Autocompletes/ExercisesAutocomplete';
import { UGBIconButton, UGBButton } from '../Global/UGBButton';
import { UGBCheckbox } from '../Global/UGBCheckbox';
import UGBLabel from '../Global/UGBLabel';
import { UGBMenuItem, UGBSelect } from '../Global/UGBSelect';
import UGBModal from '../Global/UGBModal';
import { UGBIconInput, UGBInput, UGBInputArea } from '../Global/UGBInput';
import UGBLink from '../Global/UGBLink';
import { deleteData, getData, postData, putData } from '../utils/FetchUtils';
import { useQuery } from '../utils/RouteUtils';
import isURL from 'validator/es/lib/isURL';
import isEmpty from 'validator/es/lib/isEmpty';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TimerIcon from '@material-ui/icons/Timer';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import fitnessTracking from '../assets/fitnessTracking.svg'
import addMarkersSvg from '../assets/mark.svg'
import tallyIcon from '../assets/tallyIcon.png';
import lifting2 from '../assets/lifting2.svg';
import muscle from '../assets/muscle.svg';
import inputIcon from '../assets/inputIcon.png';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    titleSection: {
        marginBottom: '7px',
    },
    leftSideContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px',
        minWidth: '520px',
        '@media (max-width: 1350px)': {
            minWidth: '450px',
        },
        '@media (max-width: 1150px)': {
            minWidth: '400px',
        },
        '@media (max-width: 1000px)': {
            width: '100%',
            minWidth: 'auto',
        }
    },
    select: {
        width: '100%',
        display: 'flex',
        gap: 0,
        marginTop: '5px',
        flexDirection: 'column',
        alignItems: "start",
        '& .MuiAutocomplete-root': {
            width: '100%'
        }
    },
    autocomplete: {
        marginTop: '12px',
    },
    exerciseMapping: {
        minHeight: '536px',
    },
    exercisesList: {
        height: '410px',
        overflow: 'auto',
        '& .MuiListItem-gutters': {
            paddingLeft: 0,
            paddingRight: 0,
        },
        '& .MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0
        },
        '& .MuiListItem-root': {
            paddingTop: 0,
            paddingBottom: 0
        },
    },
    clearBtn: {
        minWidth: '40px',
        '& .MuiListItemIcon-root': {
            minWidth: '40px',
        }
    },
    saveAndResetActions: {
        display: 'flex',
        gap: '16px',
        alignItems: 'baseline',
        justifyContent: 'end'
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
    changePadding: {
        padding: '3px'
    },
    sort: {
        minWidth: 'auto',
        '& .MuiSvgIcon-root': {
            color: '#757575'
        }
    },
    checkbox: {
        '& .MuiFormControlLabel-root': {
            marginLeft: '0',
            marginRight: '0',
            minWidth: 'auto',
        },
    },
    rightSideListIem: {
        display: 'flex',
        flexDirection: 'row',
        '& .MuiListItemIcon-root': {
            minWidth: 'auto',
        },
    },
    sorts: {
        display: 'flex',
        flexDirection: 'row'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
        }
    },
    toolbarTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    mergeBtn: {
        height: '42px',
        width: '187px',
        minWidth: '187px',
        '@media (max-width: 600px)': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            width: '100%'
        }
    },
    checkboxAndExpand: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& .MuiListItemIcon-root': {
            minWidth: 'auto'
        }
    },
    rightSideSupersetListIem: {
        display: 'flex',
        flexDirection: 'row',
    },
    nested: {
        paddingLeft: '20px',
    },
    nestedListItem: {
        '& .MuiTypography-root': {
            color: '#28A745',
        }
    },
    collapsed: {
        width: '0px',
        height: '0px',
    },
    collapseContent: {
        overflow: 'hidden',
        transition: 'width 0.2s',
        transitionTimingFunction: 'ease-in'
    },
    collapseContentTransition: {
        overflow: 'unset',
        width: '100%',
        height: '100%',
    },
    collapseExercisesContentTransition: {
        overflow: 'unset',
        width: '100%',
        height: '100%',
        minHeight: '530px',
    },
    contentBox: {
        display: 'initial'
    },
    tooltipImg: {
        height: '100%',
        width: '250px'
    },
    tooltipPopper: {
        background: '#1B1B1B',
        paddingTop: '8px'
    },
    exercisesContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '16px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        borderRadius: 30,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    exercisesContent: {
        width: '220px',
        height: '220px',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    svg: {
        width: '100%',
        height: 'auto',
    },
    exercisesContentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    },
    exercisesContentHeaderAlign: {
        alignItems: 'baseline',
    },
    addSet: {
        display: 'flex',
        alignItems: 'end',
        gap: '8px'
    },
    addSetBtn: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '3px',
        marginTop: '3px',
    },
    addSetAndMarkersContainer: {
        marginTop: '10px',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        height: '430px',
        overflow: 'auto',
    },
    rightSideContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 1000px)': {
            display: 'none'
        }
    },
    pageContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '30px',
        paddingRight: '30px',
        '@media (max-width: 550px)': {
            paddingLeft: '0px',
            paddingRight: '0px',
        },
    },
    editButton: {
        padding: theme.spacing(1),
        color: '#28A745',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    },
    deleteButton: {
        padding: theme.spacing(1),
        color: '#DC3545',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    },
    selectAndEditContainer: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(1),
    },
    showMoreIcon: {
        padding: theme.spacing(0.7),
        marginRight: theme.spacing(-2.25),
    },
    svgInputIcon: {
        color: '#757575'
    },
    addMarker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: theme.spacing(1),
    },
    addMarkerContainer: {
        width: '100%',
        '& .MuiTypography-root': {
            marginLeft: '50px'
        }
    },
    addMarkerInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: theme.spacing(1),
        '@media (max-width: 530px)': {
            flexDirection: 'column',
            gap: theme.spacing(1),
        },
    },
    markerEquality: {
        '@media (max-width: 530px)': {
            display: 'none'
        },
    },
    imgIcon: {
        width: 'auto',
        height: '90%',
        marginRight: '10px'
    },
    selectedPopoverElement: {
        background: '#F5F5F5',
    }
}));

const dataValidators = {
    isRequired: (value) => {
        const errors = []
        if (isEmpty(value)) {
            errors.push('Value must not be empty.')
        }
        return errors;
    },
    isLink: (value) => {
        const errors = [];
        if (isEmpty(value)) {
            return errors;
        };
        if (!isURL(value)) {
            errors.push('Invalid link format.')
        };
        return errors;
    }
}

const AddNewWorkoutJournal = ({ onSubmit, onClose }) => {
    const styles = useStyles();
    const workoutJournalName = useState('');
    const workoutJournalNamePassed = useState(true);
    const [disabled, setDisabled] = useState(true);
    const description = useState('');

    function addWorkoutJournal(e) {
        e.preventDefault();
        if (!(workoutJournalName[0] && workoutJournalNamePassed[0])) {
            return;
        }

        postData(process.env.REACT_APP_HOST + '/api/workout/add-workout-journal', { name: workoutJournalName[0], description: description[0] })
            .then(data => {
                onSubmit();
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (workoutJournalName[0] && workoutJournalNamePassed[0]) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [workoutJournalName[0], workoutJournalNamePassed[0]])

    return (
        <form onSubmit={addWorkoutJournal}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Add a new workout journal
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutJournalName}
                label='Workout Journal Name'
                startIcon='fa-solid fa-file-signature'
                validator={dataValidators.isRequired}
                validatorPassed={workoutJournalNamePassed}
            />
            <UGBInputArea
                label='Description'
                $value={description}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    disabled={disabled}
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </form>
    );
}

const EditWorkoutJournal = ({ selectedWorkoutJournalObj, setSelectedWorkoutJournalObj, workoutJournals, setWorkoutJournals, onClose }) => {
    const styles = useStyles();
    const workoutJournalName = useState(selectedWorkoutJournalObj?.name || '');
    const description = useState(selectedWorkoutJournalObj?.description || '');
    const workoutJournalNamePassed = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [hasNameChanges, setHasNameChanges] = useState(false);
    const [hasDescriptionChanges, setHasDescriptionChanges] = useState(false);

    function editWorkoutJournal(e) {
        e.preventDefault();
        if (!selectedWorkoutJournalObj) {
            return;
        }

        if (!(workoutJournalName[0] && workoutJournalNamePassed[0])) {
            return;
        }
        const changes = { id: selectedWorkoutJournalObj.id };
        if (hasNameChanges) {
            changes.name = workoutJournalName[0];
        }
        if (hasDescriptionChanges) {
            changes.description = description[0];
        }

        putData(process.env.REACT_APP_HOST + '/api/workout/edit-workout-journal', changes)
            .then(data => {
                const foundWJ = workoutJournals.find(wj => wj.id === selectedWorkoutJournalObj.id);
                if (hasNameChanges) {
                    setSelectedWorkoutJournalObj(workoutJournal => (workoutJournal.name = workoutJournalName[0], { ...workoutJournal }))
                    foundWJ.name = workoutJournalName[0]
                }
                if (hasDescriptionChanges) {
                    setSelectedWorkoutJournalObj(workoutJournal => (workoutJournal.description = description[0], { ...workoutJournal }))
                    foundWJ.description = description[0]
                }
                setWorkoutJournals([...workoutJournals])
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (selectedWorkoutJournalObj && selectedWorkoutJournalObj.name && workoutJournalName[0] === selectedWorkoutJournalObj.name) {
            setHasNameChanges(false);
        } else {
            setHasNameChanges(true);
        }
    }, [workoutJournalName[0]])

    useEffect(() => {
        if (selectedWorkoutJournalObj && selectedWorkoutJournalObj.description && description[0] === selectedWorkoutJournalObj.description) {
            setHasDescriptionChanges(false);
        } else {
            setHasDescriptionChanges(true);
        }
    }, [description[0]])

    useEffect(() => {
        if (workoutJournalName[0] && workoutJournalNamePassed[0] && (hasNameChanges || hasDescriptionChanges)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [workoutJournalName[0], workoutJournalNamePassed[0], hasNameChanges, hasDescriptionChanges])

    useEffect(() => {
        if (selectedWorkoutJournalObj) {
            workoutJournalName[1](selectedWorkoutJournalObj.name);
            description[1](selectedWorkoutJournalObj.description);
        }
    }, [selectedWorkoutJournalObj])

    return (
        <form onSubmit={editWorkoutJournal}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Edit workout journal: {selectedWorkoutJournalObj?.name || ''}
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutJournalName}
                label='Workout Journal Name'
                startIcon='fa-solid fa-file-signature'
                validator={dataValidators.isRequired}
                validatorPassed={workoutJournalNamePassed}
            />
            <UGBInputArea
                label='Description'
                $value={description}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    disabled={disabled}
                    type='submit'
                    btnType='primary'
                >
                    Save
                </UGBButton>
            </div>
        </form>
    );
}

const DeleteWorkoutJournal = ({ selectedWorkoutJournalObj, refresh, onClose }) => {
    const styles = useStyles();
    const workoutJournalName = useState(selectedWorkoutJournalObj?.name || '');

    function deleteWJ(e) {
        e.preventDefault()
        deleteData(process.env.REACT_APP_HOST + '/api/workout/delete-workout-journal', { id: selectedWorkoutJournalObj.id })
            .then(data => {
                refresh();
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (selectedWorkoutJournalObj) {
            workoutJournalName[1](selectedWorkoutJournalObj.name);
        }
    }, [selectedWorkoutJournalObj])

    return (
        <form onSubmit={deleteWJ}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Are you sure you want to delete workout journal &ldquo;{workoutJournalName}&rdquo;?
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
                    btnType='outlinedSecondary'
                >
                    Delete
                </UGBButton>
            </div>
        </form>
    );
}

const AddNewWorkoutSession = ({ workoutJournal, onSubmit, onClose }) => {
    const styles = useStyles();
    const workoutSessionName = useState('');
    const workoutSessionNamePassed = useState(true);
    const [disabled, setDisabled] = useState(true);

    function addWorkoutSession(e) {
        e.preventDefault();
        if (!(workoutSessionName[0] && workoutSessionNamePassed[0])) {
            return;
        }

        postData(process.env.REACT_APP_HOST + '/api/workout/add-workout-journal-session', { name: workoutSessionName[0], workoutJournalId: workoutJournal.id })
            .then(data => {
                onSubmit();
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (workoutSessionName[0] && workoutSessionNamePassed[0]) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [workoutSessionName[0], workoutSessionNamePassed[0]])

    return (
        <form onSubmit={addWorkoutSession}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Add a new session for the workout journal: {workoutJournal?.name || ''}
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutSessionName}
                label='Session Name'
                startIcon='fa-solid fa-file-signature'
                validator={dataValidators.isRequired}
                validatorPassed={workoutSessionNamePassed}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    disabled={disabled}
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </form>
    );
}

const EditWorkoutSession = ({ selectedWorkoutJournalObj, selectedWorkoutSessionObj, setSelectedWorkoutSessionObj, workoutSessions, setWorkoutSessions, onClose }) => {
    const styles = useStyles();
    const workoutSessionName = useState(selectedWorkoutSessionObj?.name || '');
    const workoutSessionNamePassed = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [hasNameChanges, setHasNameChanges] = useState(false);

    function addWorkoutJournal(e) {
        e.preventDefault();
        if (!selectedWorkoutSessionObj && !selectedWorkoutJournalObj) {
            return;
        }

        if (!(workoutSessionName[0] && workoutSessionNamePassed[0])) {
            return;
        }

        const changes = { id: selectedWorkoutSessionObj.id, workoutJournalId: selectedWorkoutJournalObj.id };
        if (hasNameChanges) {
            changes.name = workoutSessionName[0];
        }

        putData(process.env.REACT_APP_HOST + '/api/workout/edit-workout-journal-session', changes)
            .then(data => {
                const foundWJ = workoutSessions.find(wj => wj.id === selectedWorkoutSessionObj.id);
                if (hasNameChanges) {
                    setSelectedWorkoutSessionObj(workoutJournal => (workoutJournal.name = workoutSessionName[0], { ...workoutJournal }))
                    foundWJ.name = workoutSessionName[0]
                }
                setWorkoutSessions([...workoutSessions])
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (selectedWorkoutSessionObj && selectedWorkoutSessionObj.name && workoutSessionName[0] === selectedWorkoutSessionObj.name) {
            setHasNameChanges(false);
        } else {
            setHasNameChanges(true);
        }
    }, [workoutSessionName[0]])

    useEffect(() => {
        if (workoutSessionName[0] && workoutSessionNamePassed[0] && hasNameChanges) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [workoutSessionName[0], workoutSessionNamePassed[0], hasNameChanges])

    useEffect(() => {
        if (selectedWorkoutSessionObj) {
            workoutSessionName[1](selectedWorkoutSessionObj.name);
        }
    }, [selectedWorkoutSessionObj])

    return (
        <form onSubmit={addWorkoutJournal}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Edit workout session: {selectedWorkoutSessionObj?.name || ''}
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutSessionName}
                label='Workout Journal Name'
                startIcon='fa-solid fa-file-signature'
                validator={dataValidators.isRequired}
                validatorPassed={workoutSessionNamePassed}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    disabled={disabled}
                    type='submit'
                    btnType='primary'
                >
                    Save
                </UGBButton>
            </div>
        </form>
    );
}

const DeleteWorkoutSession = ({ selectedWorkoutJournalObj, selectedWorkoutSessionObj, refresh, onClose }) => {
    const styles = useStyles();
    const workoutSessionName = useState(selectedWorkoutSessionObj?.name || '');

    function deleteWJ(e) {
        e.preventDefault();
        if (!selectedWorkoutJournalObj && !selectedWorkoutSessionObj) {
            return;
        }

        deleteData(process.env.REACT_APP_HOST + '/api/workout/delete-workout-journal-session', { id: selectedWorkoutSessionObj.id, workoutJournalId: selectedWorkoutJournalObj.id })
            .then(data => {
                refresh();
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    useEffect(() => {
        if (selectedWorkoutSessionObj) {
            workoutSessionName[1](selectedWorkoutSessionObj.name);
        }
    }, [selectedWorkoutSessionObj])

    return (
        <form onSubmit={deleteWJ}>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5' type='title'>
                    Are you sure you want to delete workout session &ldquo;{workoutSessionName}&rdquo;?
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
                    btnType='outlinedSecondary'
                >
                    Delete
                </UGBButton>
            </div>
        </form>
    );
}

const AddNewExercise = ({ onClose, missingExerciseName }) => {
    const styles = useStyles();
    const videoLink = useState('');
    const videoLinkPassed = useState(true);
    const exercise = useState(missingExerciseName || '');
    const exercisePassed = useState(true);
    const [muscleGroups] = useState(['Neck', 'Traps', 'Shoulders', 'Chest', 'Biceps', 'Forearms', 'Abs', 'Quadriceps', 'Calves', 'Upper Back', 'Triceps', 'Lower Back', 'Glutes', 'Hamstring']);
    const [selectedMuscleGroupsStr, setSelectedMuscleGroupsStr] = useState('');
    const [selectedMuscleGroupsArr, setSelectedMuscleGroupsArr] = useState([]);
    const [anchorEl, setAnchorEl] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (exercise[0] && exercisePassed[0] && videoLinkPassed[0]) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [exercise[0], exercisePassed[0], videoLinkPassed[0]])

    useEffect(() => {
        setSelectedMuscleGroupsStr(selectedMuscleGroupsArr.join(', '))
    }, [selectedMuscleGroupsArr])

    function addExercise(e) {
        e.preventDefault();
        if (!(exercise[0] && exercisePassed[0] && videoLinkPassed[0])) {
            return;
        }

        postData(process.env.REACT_APP_HOST + '/api/workout/add-exercise', { exercise: exercise[0], videoUrl: videoLink[0], muscleGroups: selectedMuscleGroupsStr })
            .then(data => {
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuList>
                    {muscleGroups.map((muscleGroup, j) => {
                        return (
                            <MenuItem
                                classes={{ root: selectedMuscleGroupsArr.indexOf(muscleGroup) >= 0 ? styles.selectedPopoverElement : null }}
                                key={j}
                                onClick={(e) => {
                                    const selectedMuscleGroupsArrIndex = selectedMuscleGroupsArr.indexOf(muscleGroup);
                                    if (selectedMuscleGroupsArrIndex >= 0) {
                                        const tempSelectedMuscleGroupsArr = selectedMuscleGroupsArr;
                                        tempSelectedMuscleGroupsArr.splice(selectedMuscleGroupsArrIndex, 1);
                                        setSelectedMuscleGroupsArr([...tempSelectedMuscleGroupsArr]);
                                    } else {
                                        setSelectedMuscleGroupsArr([...selectedMuscleGroupsArr, muscleGroup])
                                    }
                                }}
                            >
                                {muscleGroup}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
            <form onSubmit={addExercise}>
                <div className={styles.titleSection}>
                    <UGBLabel variant='h5' type='title'>
                        Add a new exercise
                    </UGBLabel>
                </div>
                <UGBIconInput
                    $value={exercise}
                    label='Exercise'
                    MuiIconStart={FitnessCenterIcon}
                    validator={dataValidators.isRequired}
                    validatorPassed={exercisePassed}
                />
                <UGBIconInput
                    $value={videoLink}
                    label='Video link'
                    startIcon='fa-solid fa-link'
                    validator={dataValidators.isLink}
                    validatorPassed={videoLinkPassed}
                />
                <UGBInput
                    label='Targeted Muscle Groups'
                    value={selectedMuscleGroupsStr}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    InputProps={{
                        startAdornment: (
                            <img src={muscle} alt='muscle' className={styles.imgIcon} />
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    className={styles.showMoreIcon}
                                    disableRipple
                                    isEnd={false}
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div className={styles.actions}>
                    <UGBButton
                        btnType='secondary'
                        onClick={() => onClose()}
                    >
                        Cancel
                    </UGBButton>
                    <UGBButton
                        disabled={disabled}
                        type='submit'
                        btnType='primary'
                    >
                        Add
                    </UGBButton>
                </div>
            </form>
        </>
    );
}

const PopoverLink = ({ ex, color }) => {
    const styles = useStyles();
    const [videoLink, setVideoLink] = useState('');

    return (
        <Tooltip
            classes={{ tooltip: styles.tooltipPopper }}
            disableHoverListener={!Boolean(videoLink)}
            title={videoLink ?
                <img className={styles.tooltipImg} src={`https://img.youtube.com/vi/${videoLink}/maxresdefault.jpg`}
                    alt=''
                />
                :
                null
            }>
            <div className={styles.contentBox}>
                <UGBLink
                    url={ex.videoLink}
                    label='Video Link'
                    color={color}
                    target='blank'
                    onClick={e => e.stopPropagation()}
                    onHover={e => {
                        const aEl = e.target.parentElement;
                        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        const match = regExp.exec(aEl.href)
                        if (match && match.length && match[2]) {
                            setVideoLink(match[2]);
                        }
                    }}
                />
            </div>
        </Tooltip>
    );
}

function ExerciseListItem({
    exType = 'superset',
    supersetItems,
    setExercisesForMerge,
    exercisesForMerge,
    setSessionExercises,
    sessionExercises,
    setToggleExerciseContent,
    setSelectedSessionExercise,
}) {
    const styles = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem
                key={exType === 'superset' ? 'superset-list-item' : supersetItems.id}
                button={exType === 'superset'}
                onClick={exType === 'superset' ? () => setOpen(!open) : null}
            >
                <ListItemIcon className={styles.clearBtn}>
                    <IconButton
                        className={styles.changePadding}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (exType === 'superset') {
                                setSessionExercises(sessionExercises.filter(exx => exx !== supersetItems));
                                setExercisesForMerge(exercisesForMerge.filter(exx => exx !== supersetItems));
                            } else {
                                setSessionExercises(sessionExercises.filter(exx => exx.id !== supersetItems.id));
                                setExercisesForMerge(exercisesForMerge.filter(exx => exx.id !== supersetItems.id));
                            }
                        }}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText
                    primary={
                        exType === 'superset' ?
                            !open ?
                                <div >
                                    <span style={{ fontWeight: 'bolder', fontSize: '17px' }}>Superset: </span >
                                    <span>{(() => {
                                        let exercises = [];
                                        supersetItems.superset.forEach(exx => exercises.push(exx.exercise));
                                        return exercises.join(', ');
                                    })()}</span >
                                </div>
                                :
                                <span style={{ fontWeight: 'bolder', fontSize: '17px' }}>Superset: </span >
                            :
                            supersetItems.exercise
                    }
                    secondary={exType === 'superset' ?
                        null
                        :
                        <PopoverLink ex={supersetItems} color='primary' />
                    }
                />
                <div className={exType === 'superset' ?
                    styles.rightSideSupersetListIem
                    :
                    styles.rightSideListIem
                }>
                    <div className={styles.sorts}>
                        <ListItemIcon className={styles.sort}>
                            <IconButton
                                className={styles.changePadding}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const tempSessionExercises = sessionExercises.slice();
                                    const current = tempSessionExercises.indexOf(supersetItems);
                                    const next = current + 1;
                                    if (next >= tempSessionExercises.length) {
                                        return;
                                    }
                                    const temp = tempSessionExercises[next];
                                    tempSessionExercises[next] = tempSessionExercises[current];
                                    tempSessionExercises[current] = temp;
                                    setSessionExercises(tempSessionExercises);
                                }}
                            >
                                <ArrowDownwardIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemIcon className={styles.sort}>
                            <IconButton
                                className={styles.changePadding}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const tempSessionExercises = sessionExercises.slice();
                                    const current = tempSessionExercises.indexOf(supersetItems);
                                    const next = current - 1;
                                    if (next < 0) {
                                        return;
                                    }
                                    const temp = tempSessionExercises[next];
                                    tempSessionExercises[next] = tempSessionExercises[current];
                                    tempSessionExercises[current] = temp;
                                    setSessionExercises(tempSessionExercises);
                                }}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        </ListItemIcon>
                    </div>
                    <div className={styles.checkboxAndExpand}>
                        <ListItemIcon className={styles.checkbox}>
                            <UGBCheckbox
                                onClick={e => e.stopPropagation()}
                                onChange={e => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        setExercisesForMerge([...exercisesForMerge, supersetItems])
                                    } else {
                                        if (exType === 'superset') {
                                            setExercisesForMerge(exercisesForMerge.filter(exx => exx != supersetItems));
                                        } else {
                                            setExercisesForMerge(exercisesForMerge.filter(exx => exx.id !== supersetItems.id));
                                        }
                                    }
                                }}
                            />
                        </ListItemIcon>
                        {exType === 'superset' ?
                            open ?
                                <ExpandLess style={{ color: '#757575' }} />
                                :
                                <ExpandMore style={{ color: '#757575' }} />
                            :
                            <ListItemIcon className={styles.sort}>
                                <IconButton
                                    className={styles.changePadding}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setToggleExerciseContent(true);
                                        setSelectedSessionExercise(supersetItems);
                                    }}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemIcon>
                        }
                    </div>
                </div>
            </ListItem>
            {exType !== 'superset' ?
                null
                :
                < Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={styles.nested}>
                        {supersetItems.superset.map(ex => {
                            return (
                                <ListItem key={ex.id} className={styles.nestedListItem}>
                                    <ListItemIcon className={styles.clearBtn}>
                                        <IconButton
                                            className={styles.changePadding}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const tempSessionExercises = sessionExercises;
                                                supersetItems.superset = supersetItems.superset.filter(exx => exx.id !== ex.id);
                                                if (supersetItems.superset.length === 1) {
                                                    const tempSuperSetItem = supersetItems.superset[0];
                                                    tempSessionExercises[tempSessionExercises.indexOf(supersetItems)] = tempSuperSetItem;
                                                }
                                                setSessionExercises([...tempSessionExercises]);
                                                setExercisesForMerge([...exercisesForMerge]);
                                            }}
                                        >
                                            <HighlightOffIcon style={{ color: '#28A745' }} />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ex.exercise}
                                        secondary={ex.videoLink ?
                                            <PopoverLink ex={ex} color='green' />
                                            :
                                            null
                                        }
                                    />
                                    <div className={styles.sorts}>
                                        <ListItemIcon className={styles.sort}>
                                            <IconButton
                                                className={styles.changePadding}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const tempSessionExercises = supersetItems.superset;
                                                    const current = tempSessionExercises.indexOf(ex);
                                                    const next = current + 1;
                                                    if (next >= tempSessionExercises.length) {
                                                        return;
                                                    }
                                                    const temp = tempSessionExercises[next];
                                                    tempSessionExercises[next] = tempSessionExercises[current];
                                                    tempSessionExercises[current] = temp;
                                                    setSessionExercises([...sessionExercises]);
                                                }}
                                            >
                                                <ArrowDownwardIcon style={{ color: '#28A745' }} />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemIcon className={styles.sort}>
                                            <IconButton
                                                className={styles.changePadding}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const tempSessionExercises = supersetItems.superset;
                                                    const current = tempSessionExercises.indexOf(ex);
                                                    const next = current - 1;
                                                    if (next < 0) {
                                                        return;
                                                    }
                                                    const temp = tempSessionExercises[next];
                                                    tempSessionExercises[next] = tempSessionExercises[current];
                                                    tempSessionExercises[current] = temp;
                                                    setSessionExercises([...sessionExercises]);
                                                }}
                                            >
                                                <ArrowUpwardIcon style={{ color: '#28A745' }} />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemIcon className={styles.sort}>
                                            <IconButton
                                                className={styles.changePadding}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setToggleExerciseContent(true);
                                                    setSelectedSessionExercise(ex);
                                                }}
                                            >
                                                <ArrowForwardIosIcon style={{ color: '#28A745' }} />
                                            </IconButton>
                                        </ListItemIcon>
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            }
        </ >
    );
}

const AddSets = ({ sessionExercises, setSessionExercises, selectedSessionExercise, setSelectedSessionExercise }) => {
    const styles = useStyles();

    return (
        <div className={styles.addSetAndMarkersContainer}>
            {selectedSessionExercise.sets.map((set, i) => {
                return (
                    <div key={set.set} className={styles.addSet}>
                        <IconButton
                            onClick={(e) => {
                                const tempSets = selectedSessionExercise.sets;
                                const exI = tempSets.indexOf(set);
                                tempSets.splice(exI, 1);
                                for (let j = 0; j < tempSets.length; j++) {
                                    tempSets[j].set = `Set ${j + 1}`
                                }
                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets = tempSets, { ...selectedSessionExercise }));
                                setSessionExercises([...sessionExercises]);
                            }}
                        >
                            <HighlightOffIcon />
                        </IconButton>
                        <UGBIconInput
                            imgIconStart={tallyIcon}
                            label={`Reps for ${set.set}`}
                            value={set.reps}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets[i].reps = value, { ...selectedSessionExercise }));
                                setSessionExercises([...sessionExercises]);
                            }}
                        />
                        <UGBIconInput
                            MuiIconStart={TimerIcon}
                            label='Rest time after set'
                            type="time"
                            value={set.rest}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets[i].rest = value, { ...selectedSessionExercise }));
                                setSessionExercises([...sessionExercises])
                            }}
                        />
                    </div>
                );
            })}
            <div className={styles.addSetBtn}>
                <UGBIconButton
                    disabled={selectedSessionExercise.sets.length >= 10}
                    $onClick={() => {
                        const tempSets = selectedSessionExercise.sets;
                        const set = `Set ${tempSets.length + 1}`;
                        tempSets.push({ set: set, reps: '', rest: '' })
                        setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets = tempSets, { ...selectedSessionExercise }));
                        setSessionExercises([...sessionExercises])
                    }}
                    withRadius={false}
                    btnType='primary'
                    MuiIcon={AddIcon}
                />
            </div>
        </div >
    );
}

const AddMarkers = ({ sessionExercises, setSessionExercises, selectedSessionExercise, setSelectedSessionExercise }) => {
    //TODO make the user unable to select Periodization or Intensity Volume more than once
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorIndex, setAnchorIndex] = useState(null);
    const [markers] = useState(['Periodization', 'Intensity Volume']);
    const [anchorMarkerValue, setAnchorMarkerValue] = useState(null);
    const [anchorMarkerValueTypeIndex, setAnchorMarkerValueTypeIndex] = useState(null);
    const [markerValueType, setMarkerValueType] = useState(null);
    const [markerValues] = useState({
        'Periodization': ['Linear', 'Set Range'],
        'Intensity Volume': ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    });

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setAnchorIndex(index)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorIndex(null);
    };

    const handleClickMarkerValueType = (event, index, markerType) => {
        setMarkerValueType(markerType);
        setAnchorMarkerValue(event.currentTarget);
        setAnchorMarkerValueTypeIndex(index);
    };

    const handleCloseMarkerValueType = () => {
        setAnchorMarkerValue(null);
        setAnchorMarkerValueTypeIndex(null);
    };

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuList>
                    {markers.map((marker, j) => {
                        return (
                            <MenuItem key={j}
                                onClick={(e) => {
                                    const value = e.target.textContent;
                                    if (selectedSessionExercise.markers[anchorIndex].markerValue) {
                                        setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[anchorIndex].marker = value, selectedSessionExercise.markers[anchorIndex].markerValue = '', { ...selectedSessionExercise }));
                                    } else {
                                        setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[anchorIndex].marker = value, { ...selectedSessionExercise }));
                                    }
                                    setSessionExercises([...sessionExercises]);
                                    handleClose();
                                }}
                            >
                                {marker}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
            <Popover
                anchorEl={anchorMarkerValue}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorMarkerValue)}
                onClose={handleCloseMarkerValueType}
            >
                <MenuList>
                    {markerValueType ?
                        markerValues[markerValueType].map((marker, j) => {
                            return (
                                <MenuItem key={j}
                                    onClick={(e) => {
                                        const value = marker;
                                        if (selectedSessionExercise.markers[anchorMarkerValueTypeIndex].markerValue === value) {
                                            setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[anchorMarkerValueTypeIndex].markerValue = '', { ...selectedSessionExercise }));
                                        } else if (markerValueType === 'Periodization' || markerValueType === 'Intensity Volume') {
                                            setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[anchorMarkerValueTypeIndex].markerValue = value, { ...selectedSessionExercise }));
                                        }
                                        setSessionExercises([...sessionExercises]);
                                        handleCloseMarkerValueType();
                                    }}
                                >
                                    {marker}
                                </MenuItem>
                            );
                        })
                        :
                        null
                    }
                </MenuList>
            </Popover>
            <div className={styles.addSetAndMarkersContainer}>
                {selectedSessionExercise.markers.map((marker, i) => {
                    return (
                        <div key={marker + i} className={styles.addMarkerContainer}>
                            <UGBLabel variant='subtitle2'>
                                Marker Type
                            </UGBLabel>
                            <div key={i} className={styles.addMarker}>
                                <IconButton
                                    onClick={(e) => {
                                        const tempMarkers = selectedSessionExercise.markers;
                                        const exI = tempMarkers.indexOf(marker);
                                        tempMarkers.splice(exI, 1);
                                        setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers = tempMarkers, { ...selectedSessionExercise }));
                                        setSessionExercises([...sessionExercises]);
                                    }}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                                <div className={styles.addMarkerInputs}>
                                    <UGBInput
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={styles.svgInputIcon} position="start">
                                                    <i class="fa-solid fa-highlighter"></i>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        className={styles.showMoreIcon}
                                                        disableRipple
                                                        isEnd={false}
                                                        onClick={(e) => handleClick(e, i)}
                                                    >
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        label=''
                                        value={marker.marker}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (selectedSessionExercise.markers[i].markerValue) {
                                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[i].marker = value, selectedSessionExercise.markers[i].markerValue = '', { ...selectedSessionExercise }));
                                            } else {
                                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[i].marker = value, { ...selectedSessionExercise }));
                                            }
                                            setSessionExercises([...sessionExercises]);
                                        }}
                                    />
                                    <div className={styles.markerEquality}>=</div>
                                    <UGBInput
                                        label=''
                                        value={marker.markerValue}
                                        onChange={(e) => {
                                            if (marker.marker === 'Periodization' || marker.marker === 'Intensity Volume') {
                                                return;
                                            }
                                            const value = e.target.value;
                                            setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers[i].markerValue = value, { ...selectedSessionExercise }));
                                            setSessionExercises([...sessionExercises]);
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                marker.marker === 'Intensity Volume' ?
                                                    <InputAdornment className={styles.svgInputIcon} position="start">
                                                        <i class="fa-solid fa-percent" />
                                                    </InputAdornment>
                                                    :
                                                    marker.marker === 'Periodization' ?
                                                        <InputAdornment className={styles.svgInputIcon} position="start">
                                                            <i class="fa-solid fa-chart-line" />
                                                        </InputAdornment>
                                                        :
                                                        <img src={inputIcon} alt='inputIcon' className={styles.imgIcon} />
                                            ),
                                            endAdornment: (
                                                marker.marker === 'Periodization' || marker.marker === 'Intensity Volume' ?
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            className={styles.showMoreIcon}
                                                            disableRipple
                                                            isEnd={false}
                                                            onClick={(e) => handleClickMarkerValueType(e, i, marker.marker)}
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    :
                                                    null
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className={styles.addSetBtn}>
                    <UGBIconButton
                        $onClick={() => {
                            const tempMarkers = selectedSessionExercise.markers;
                            tempMarkers.push({ marker: '', markerValue: '' })
                            setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers = tempMarkers, { ...selectedSessionExercise }));
                            setSessionExercises([...sessionExercises])
                        }}
                        withRadius={false}
                        btnType='primary'
                        MuiIcon={AddIcon}
                    />
                </div>
            </div >
        </>
    );
}

function getMarkers(markers) {
    let resMarkers = [];
    let periodization = '';
    let intensityVolume = '';

    for (const marker of markers) {
        if (marker.marker === 'Periodization') {
            periodization = marker.markerValue;
        } else if (marker.marker === 'Intensity Volume') {
            intensityVolume = marker.markerValue;
        } else {
            resMarkers.push(`${marker.marker}|${marker.markerValue}`)
        }
    }
    return { markers: resMarkers, periodization: periodization, intensityVolume }
}

function getSets(sets) {
    let resSets = [];
    for (const set of sets) {
        resSets.push(`${set.set.slice(4)}|${set.reps || ''}|${set.rest || ''}`)
    }
    return resSets;
}

const WorkoutBuilder = () => {
    const styles = useStyles();
    const history = useHistory();
    const { tab } = useQuery();

    const [showAddNewWorkoutJournal, setShowAddNewWorkoutJournal] = useState(false);
    const [showAddNewWorkoutSession, setShowAddNewWorkoutSession] = useState(true);
    const [showAddNewExercise, setShowAddNewExercise] = useState(true);
    const [showEditWorkoutJournal, setShowEditWorkoutJournal] = useState(false);
    const [showDeleteWorkoutJournal, setShowDeleteWorkoutJournal] = useState(false);
    const [showEditWorkoutSession, setShowEditWorkoutSession] = useState(false);
    const [showDeleteWorkoutSession, setShowDeleteWorkoutSession] = useState(false);

    const selectedWorkoutJournal = useState('');
    const [selectedWorkoutJournalObj, setSelectedWorkoutJournalObj] = useState(null);
    const [workoutJournals, setWorkoutJournals] = useState([]);
    const [refreshWorkoutJournals, setRefreshWorkoutJournals] = useState({});

    const selectedWorkoutSession = useState('');
    const [selectedWorkoutSessionObj, setSelectedWorkoutSessionObj] = useState(null);
    const [workoutSessions, setWorkoutSessions] = useState([]);
    const [disableWorkoutJournalDependants, setDisableWorkoutJournalDependants] = useState(true);
    const [refreshWorkoutSessions, setRefreshWorkoutSessions] = useState({});

    const [selectedSessionExercise, setSelectedSessionExercise] = useState({});
    const [sessionExercises, setSessionExercises] = useState([]);
    const [sessionExercisesAsString, setSessionExercisesAsString] = useState('[]');

    const [exercisesForMerge, setExercisesForMerge] = useState([]);
    const [exercisesForMergeDisabled, setExercisesForMergeDisabled] = useState(true);

    const [toggleExerciseContent, setToggleExerciseContent] = useState(false);
    const [missingExerciseName, setMissingExerciseName] = useState('');

    const [showExerciseAddSet, setShowExerciseAddSet] = useState(false);
    const [showAddMarkers, setShowAddMarkers] = useState(false);
    const [hideExerciseContent, setHideExerciseContent] = useState(false);
    const [disableSave, setDisableSave] = useState(false);

    useEffect(() => {
        switch (tab) {
            case 'add-new-workout-journal':
                setShowAddNewWorkoutJournal(true);
                setShowAddNewExercise(false);
                setShowAddNewWorkoutSession(false);
                setShowEditWorkoutJournal(false);
                break;
            case 'add-new-workout-session':
                setShowAddNewWorkoutSession(true);
                setShowAddNewExercise(false);
                setShowAddNewWorkoutJournal(false);
                setShowEditWorkoutJournal(false);
                break;
            case 'add-new-exercise':
                setShowAddNewExercise(true);
                setShowAddNewWorkoutSession(false);
                setShowAddNewWorkoutJournal(false);
                setShowEditWorkoutJournal(false);
                break;
            default:
                setShowAddNewWorkoutJournal(false);
                setShowAddNewWorkoutSession(false);
                setShowAddNewExercise(false);
                setShowEditWorkoutJournal(false);
                break;
        }
    }, [tab])

    useEffect(() => {
        getData(process.env.REACT_APP_HOST + `/api/workout/get-workout-journals`)
            .then(data => {
                setWorkoutJournals(data.data);
                if (data.data.length) {
                    selectedWorkoutJournal[1](data.data[0].id);
                } else {
                    selectedWorkoutSession[1]('');
                    setSelectedWorkoutSessionObj(null)
                    setWorkoutSessions([]);
                    setSelectedWorkoutJournalObj(null);
                    setDisableWorkoutJournalDependants(true);
                }
            }, error => { })
    }, [refreshWorkoutJournals])

    useEffect(() => {
        if (selectedWorkoutJournal[0]) {
            const tempSelectedWorkoutJournalObj = workoutJournals.find(x => x.id === selectedWorkoutJournal[0]);
            if (tempSelectedWorkoutJournalObj) {
                setSelectedWorkoutJournalObj(tempSelectedWorkoutJournalObj);
                setDisableWorkoutJournalDependants(false);
            } else {
                setSelectedWorkoutJournalObj(null);
                setDisableWorkoutJournalDependants(true);
            }

            getData(process.env.REACT_APP_HOST + `/api/workout/get-workout-journal-sessions?filter=${selectedWorkoutJournal[0]}`)
                .then(data => {
                    setWorkoutSessions(data.data);
                    if (data.data.length) {
                        selectedWorkoutSession[1](data.data[0].id);
                    } else {
                        selectedWorkoutSession[1]('');
                        setSelectedWorkoutSessionObj(null);
                    }
                }, error => { })
        }
    }, [selectedWorkoutJournal[0], refreshWorkoutSessions])

    useEffect(() => {
        setSessionExercisesAsString('[]');
        setSelectedSessionExercise({});
        setExercisesForMerge([]);
        setSessionExercises([]);
        setExercisesForMergeDisabled(true);
        setToggleExerciseContent(false);
        setShowExerciseAddSet(false);
        setShowAddMarkers(false);
        setHideExerciseContent(false);

        if (selectedWorkoutSession[0]) {
            const tempSelectedWorkoutSessionObj = workoutSessions.find(x => x.id === selectedWorkoutSession[0]);
            if (tempSelectedWorkoutSessionObj) {
                setSelectedWorkoutSessionObj(tempSelectedWorkoutSessionObj);
            } else {
                setSelectedWorkoutSessionObj(null);
            }

            getData(process.env.REACT_APP_HOST + `/api/workout/get-workout-journal-session-exercises?workoutSessionId=${selectedWorkoutSession[0]}`)
                .then(data => {
                    setSessionExercisesAsString(JSON.stringify(data.data))
                    setSessionExercises(data.data);
                }, error => { })
        }
    }, [selectedWorkoutSession[0]])

    useEffect(() => {
        if (exercisesForMerge.length && exercisesForMerge.length > 1) {
            setExercisesForMergeDisabled(false);
        } else {
            setExercisesForMergeDisabled(true);
        }
    }, [exercisesForMerge])

    function onClickMerge() {
        const tempSessionExercises = sessionExercises.filter(exx => !exercisesForMerge.includes(exx));
        const superset = [];
        for (const exx of exercisesForMerge) {
            if (exx.superset) {
                for (const exxx of exx.superset) {
                    superset.push(exxx);
                }
            } else {
                superset.push(exx);
            }
        }
        tempSessionExercises.push({ superset: superset });
        setSessionExercises(tempSessionExercises);
        setExercisesForMerge([]);
    }

    useEffect(() => {
        const tempSessionExercisesAsString = JSON.stringify(sessionExercises)
        if (sessionExercisesAsString === tempSessionExercisesAsString) {
            setDisableSave(true);
        } else {
            setDisableSave(false);
        }
    }, [sessionExercises, sessionExercisesAsString])

    useEffect(() => {
        if (exercisesForMergeDisabled && !exercisesForMerge.length) {
            const checkboxes = document.getElementsByClassName('exercises-list')[0].querySelectorAll('[type~=checkbox]');
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    checkbox.parentElement.parentElement.click();
                }
            }
        }
    }, [exercisesForMergeDisabled, exercisesForMerge])

    function saveChanges() {
        //setSavingChangesLoading(true);
        const tempSessionExercises = [];
        let order = 1;

        for (const sessionExercise of sessionExercises) {
            if (sessionExercise.superset) {
                let supersetOrder = 1;
                for (const supersetSessionExercise of sessionExercise.superset) {
                    let sets = getSets(supersetSessionExercise.sets)
                    let markersData = getMarkers(supersetSessionExercise.markers);
                    let markers = markersData.markers;
                    let periodization = markersData.periodization;
                    let intensityVolume = markersData.intensityVolume;
                    tempSessionExercises.push({
                        ...supersetSessionExercise,
                        ordered: Number(`${order}.${supersetOrder}`),
                        sets: sets.join(','),
                        markers: markers.join(','),
                        periodization: periodization,
                        intensityVolume: intensityVolume,
                        setsCount: supersetSessionExercise.sets.length,
                        markersCount: supersetSessionExercise.markers.length
                    })
                    supersetOrder++;
                }
            } else {
                let sets = getSets(sessionExercise.sets);
                let markersData = getMarkers(sessionExercise.markers);
                let markers = markersData.markers;
                let periodization = markersData.periodization;
                let intensityVolume = markersData.intensityVolume;
                tempSessionExercises.push({
                    ...sessionExercise,
                    ordered: order,
                    sets: sets.join(','),
                    markers: markers.join(','),
                    periodization: periodization,
                    intensityVolume: intensityVolume,
                    setsCount: sessionExercise.sets.length,
                    markersCount: sessionExercise.markers.length
                })
            }
            order++;
        }


        postData(process.env.REACT_APP_HOST + '/api/workout/add-workout-journal-session-exercises', {
            workoutSessionId: selectedWorkoutSessionObj.id,
            sessionExercises: tempSessionExercises
        }).then(data => {
            setSessionExercisesAsString(JSON.stringify(sessionExercises));
        }, error => {
            console.log('LOGOUT ERROR--->', error);
        })

        // console.log(sessionExercises)
        console.log(tempSessionExercises)
        // console.log(selectedWorkoutSessionObj);
        // console.log(selectedWorkoutJournalObj);

        //setSavingChangesLoading(false);
        //setSavedChanges(true);
    }

    return (
        <>
            <>
                <UGBModal
                    open={showDeleteWorkoutSession}
                    onClose={() => setShowDeleteWorkoutSession(false)}
                    maxWidth='xs'
                >
                    <DeleteWorkoutSession
                        selectedWorkoutJournalObj={selectedWorkoutJournalObj}
                        selectedWorkoutSessionObj={selectedWorkoutSessionObj}
                        refresh={() => setRefreshWorkoutSessions({})}
                        onClose={() => setShowDeleteWorkoutSession(false)}
                    />
                </UGBModal>
                <UGBModal
                    open={showEditWorkoutSession}
                    onClose={() => setShowEditWorkoutSession(false)}
                    maxWidth='xs'
                >
                    <EditWorkoutSession
                        selectedWorkoutJournalObj={selectedWorkoutJournalObj}
                        selectedWorkoutSessionObj={selectedWorkoutSessionObj}
                        setSelectedWorkoutSessionObj={setSelectedWorkoutSessionObj}
                        workoutSessions={workoutSessions}
                        setWorkoutSessions={setWorkoutSessions}
                        onClose={() => setShowEditWorkoutSession(false)}
                    />
                </UGBModal>
                <UGBModal
                    open={showDeleteWorkoutJournal}
                    onClose={() => setShowDeleteWorkoutJournal(false)}
                    maxWidth='xs'
                >
                    <DeleteWorkoutJournal
                        selectedWorkoutJournalObj={selectedWorkoutJournalObj}
                        refresh={() => setRefreshWorkoutJournals({})}
                        onClose={() => setShowDeleteWorkoutJournal(false)}
                    />
                </UGBModal>
                <UGBModal
                    open={showEditWorkoutJournal}
                    onClose={() => setShowEditWorkoutJournal(false)}
                    maxWidth='xs'
                >
                    <EditWorkoutJournal
                        selectedWorkoutJournalObj={selectedWorkoutJournalObj}
                        setSelectedWorkoutJournalObj={setSelectedWorkoutJournalObj}
                        workoutJournals={workoutJournals}
                        setWorkoutJournals={setWorkoutJournals}
                        onClose={() => setShowEditWorkoutJournal(false)}
                    />
                </UGBModal>
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
                        onSubmit={() => {
                            setRefreshWorkoutJournals({});
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
                        onSubmit={() => {
                            setRefreshWorkoutSessions({});
                        }}
                        workoutJournal={selectedWorkoutJournalObj}
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
                        missingExerciseName={missingExerciseName}
                        onClose={() => {
                            history.push(window.location.pathname);
                        }}
                    />
                </UGBModal>
            </>
            <div className={styles.pageContainer}>
                <div className={styles.leftSideContainer}>
                    <div className={styles.titleSection}>
                        <UGBLabel variant='h5' type='title'>
                            Workout Builder
                        </UGBLabel>
                        <UGBLabel variant='subtitle1' type='title'>
                            Click the "ADD" button to add a non existing journal or session
                        </UGBLabel>
                    </div>
                    <div className={styles.select}>
                        <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                            Workout Journal
                        </UGBLabel>
                        <div className={styles.selectAndEditContainer}>
                            <UGBSelect
                                disabled={!workoutJournals.length}
                                $value={selectedWorkoutJournal}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <UGBIconButton
                                                isEnd={false}
                                                $onClick={() => history.push('?tab=add-new-workout-journal')}
                                            >
                                                ADD
                                            </UGBIconButton>
                                        </InputAdornment>
                                    )
                                }}
                            >
                                {workoutJournals.map(x => {
                                    return (
                                        <UGBMenuItem key={x.id} value={x.id}>
                                            {x.name}
                                        </UGBMenuItem>
                                    )
                                })}
                            </UGBSelect>
                            <IconButton
                                disabled={disableWorkoutJournalDependants}
                                className={styles.editButton}
                                onClick={() => setShowEditWorkoutJournal(true)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                disabled={disableWorkoutJournalDependants}
                                className={styles.deleteButton}
                                onClick={() => setShowDeleteWorkoutJournal(true)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.select}>
                        <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                            Workout Session
                        </UGBLabel>
                        <div className={styles.selectAndEditContainer}>
                            <UGBSelect
                                disabled={!workoutSessions.length}
                                $value={selectedWorkoutSession}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <UGBIconButton
                                                disabled={disableWorkoutJournalDependants}
                                                isEnd={false}
                                                $onClick={() => history.push('?tab=add-new-workout-session')}
                                            >
                                                ADD
                                            </UGBIconButton>
                                        </InputAdornment>
                                    )
                                }}
                            >
                                {workoutSessions.map(x => {
                                    return (
                                        <UGBMenuItem key={x.id} value={x.id}>
                                            {x.name}
                                        </UGBMenuItem>
                                    )
                                })}
                            </UGBSelect>
                            <IconButton
                                disabled={!selectedWorkoutSessionObj}
                                className={styles.editButton}
                                onClick={() => setShowEditWorkoutSession(true)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                disabled={!selectedWorkoutSessionObj}
                                className={styles.deleteButton}
                                onClick={() => setShowDeleteWorkoutSession(true)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.exerciseMapping}>
                        <div
                            className={clsx(
                                styles.addedExercises,
                                styles.collapseContent,
                                !toggleExerciseContent ?
                                    styles.collapseContentTransition
                                    :
                                    styles.collapsed
                            )}
                        >
                            <div className={styles.toolbar}>
                                <div className={styles.toolbarTitle}>
                                    <UGBLabel variant='subtitle1' type='title' minWidth='107px'>
                                        Exercises for the following workout session:
                                    </UGBLabel>
                                </div>
                                <div className={styles.mergeBtn}>
                                    {!exercisesForMergeDisabled ?
                                        <UGBButton
                                            disabled={exercisesForMergeDisabled}
                                            btnType='primary'
                                            onClick={onClickMerge}>
                                            Merge Into Superset
                                        </UGBButton>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <List className={clsx(styles.exercisesList, 'exercises-list')}>
                                {sessionExercises.map(ex => {
                                    if (ex.superset) {
                                        return (
                                            <List key={`superset-${ex.superset[0].id}-${ex.superset[1].id}`}>
                                                <ExerciseListItem
                                                    key={`superset-exerciseListItem-${ex.superset[0].id}-${ex.superset[1].id}`}
                                                    exType='superset'
                                                    supersetItems={ex}
                                                    setExercisesForMerge={setExercisesForMerge}
                                                    exercisesForMerge={exercisesForMerge}
                                                    setSessionExercises={setSessionExercises}
                                                    sessionExercises={sessionExercises}
                                                    setToggleExerciseContent={setToggleExerciseContent}
                                                    setSelectedSessionExercise={setSelectedSessionExercise}
                                                />
                                            </List>
                                        );
                                    } else {
                                        return (
                                            <ExerciseListItem
                                                key={ex.id}
                                                exType='single-exercise'
                                                supersetItems={ex}
                                                setExercisesForMerge={setExercisesForMerge}
                                                exercisesForMerge={exercisesForMerge}
                                                setSessionExercises={setSessionExercises}
                                                sessionExercises={sessionExercises}
                                                setToggleExerciseContent={setToggleExerciseContent}
                                                setSelectedSessionExercise={setSelectedSessionExercise}
                                            />
                                        );
                                    }
                                })
                                }
                            </List>
                            <div className={clsx(styles.select, styles.autocomplete)}>
                                <UGBLabel variant='subtitle2' type='title' minWidth='53px'>
                                    Exercises
                                </UGBLabel>
                                <ExercisesAutoComplete
                                    disabled={!selectedWorkoutSession[0]}
                                    setMissingExerciseName={setMissingExerciseName}
                                    onSelectedExercise={ex => {
                                        if (!selectedWorkoutSession[0]) {
                                            return;
                                        }

                                        for (const exx of sessionExercises) {
                                            if (exx.superset && exx.superset.find(exxx => ex.id === exxx.id)) {
                                                return;
                                            }
                                            if (ex.id === exx.id) {
                                                return;
                                            }
                                        }
                                        ex.sets = [];
                                        ex.markers = [];
                                        setSessionExercises([...sessionExercises, ex])
                                    }}
                                />
                            </div>
                        </div>
                        <div className={clsx(
                            styles.collapseContent,
                            toggleExerciseContent ?
                                styles.collapseExercisesContentTransition
                                :
                                styles.collapsed
                        )}>
                            <div className={clsx(styles.exercisesContentHeader, hideExerciseContent ? styles.exercisesContentHeaderAlign : null)}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (hideExerciseContent) {
                                            if (showExerciseAddSet) { setShowExerciseAddSet(false); }
                                            if (showAddMarkers) { setShowAddMarkers(false); }
                                            setHideExerciseContent(false)
                                        } else {
                                            setToggleExerciseContent(false);
                                            setSelectedSessionExercise({});
                                        }
                                    }}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <UGBLabel variant='h5' type='title'>
                                    {selectedSessionExercise.exercise}
                                    {hideExerciseContent ? <br /> : null}
                                    {showExerciseAddSet ? 'Add Sets' : ''}
                                    {showAddMarkers ? 'Add Markers' : ''}
                                </UGBLabel>
                                <div style={{ width: '48px' }} />
                            </div>
                            <>
                                {!hideExerciseContent ?
                                    <>
                                        <div
                                            className={styles.exercisesContentContainer}
                                            onClick={() => {
                                                setHideExerciseContent(true);
                                                setShowExerciseAddSet(true);
                                                setShowAddMarkers(false);
                                            }}
                                        >
                                            <div className={styles.exercisesContent} >
                                                <img src={fitnessTracking} alt='fitnessTracking' className={styles.svg} />
                                                <UGBLabel variant='h5' type='title'>
                                                    Add Sets
                                                </UGBLabel>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.exercisesContentContainer}
                                            onClick={() => {
                                                setHideExerciseContent(true);
                                                setShowAddMarkers(true);
                                                setShowExerciseAddSet(false);
                                            }}
                                        >
                                            <div className={styles.exercisesContent}  >
                                                <img src={addMarkersSvg} alt='Add Markers' className={styles.svg} />
                                                <UGBLabel variant='h5' type='title'>
                                                    Add Markers
                                                </UGBLabel>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {showExerciseAddSet ?
                                            <AddSets
                                                sessionExercises={sessionExercises}
                                                setSessionExercises={setSessionExercises}
                                                selectedSessionExercise={selectedSessionExercise}
                                                setSelectedSessionExercise={setSelectedSessionExercise}
                                            />
                                            :
                                            null
                                        }
                                        {showAddMarkers ?
                                            <AddMarkers
                                                sessionExercises={sessionExercises}
                                                setSessionExercises={setSessionExercises}
                                                selectedSessionExercise={selectedSessionExercise}
                                                setSelectedSessionExercise={setSelectedSessionExercise}
                                            />
                                            :
                                            null
                                        }
                                    </>
                                }
                            </>
                        </div>
                    </div>
                    <div className={styles.saveAndResetActions}>
                        {/* <UGBButton className={styles.defaultButton} onClick={resetToDefault} btnType='outlinedPrimary' variant='outlined'>Reset To Default</UGBButton> */}
                        <UGBButton onClick={saveChanges} btnType='primary' disabled={disableSave} >Save Changes</UGBButton>
                    </div>
                </div>
                <div className={styles.rightSideContainer}>
                    <img src={lifting2} alt='lifting2' className={styles.svg} />
                </div>
            </div>
        </>
    );
}

export default WorkoutBuilder;