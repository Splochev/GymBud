/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { List as ReactMovableList, arrayMove } from 'react-movable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List, IconButton, ListItemIcon, ListItem, InputAdornment, makeStyles, ListItemText, Collapse, Tooltip, Popover, MenuList, MenuItem, Chip } from '@material-ui/core';
import { ExercisesAutoComplete } from '../Autocompletes/ExercisesAutocomplete';
import { UGBIconButton, UGBButton } from '../Global/UGBButton';
import { UGBCheckbox } from '../Global/UGBCheckbox';
import UGBLabel from '../Global/UGBLabel';
import { UGBMenuItem, UGBSelect } from '../Global/UGBSelect';
import UGBModal from '../Global/UGBModal';
import { UGBIconInput, UGBInput, UGBInputArea, UGBLegendInput, UGBTimeInput } from '../Global/UGBInput';
import UGBLink from '../Global/UGBLink';
import { debounce, deleteData, getData, postData, putData } from '../utils/FetchUtils';
import { useQuery } from '../utils/RouteUtils';
import isURL from 'validator/es/lib/isURL';
import isEmpty from 'validator/es/lib/isEmpty';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TimerIcon from '@material-ui/icons/Timer';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import lifting3 from '../assets/lifting3.svg'
import addMarkersSvg from '../assets/mark.svg'
import tallyIcon from '../assets/tallyIcon.png';
import lifting2 from '../assets/lifting2.svg';
import workout from '../assets/workout.svg';
import muscle from '../assets/muscle.svg';
import inputIcon from '../assets/inputIcon.png';
import clsx from 'clsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import { UGBLoaderSpinner } from '../Global/UGBLoader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CountDownTimer from '../utils/CountDownTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import { textIsEmpty } from '../utils/ValidationUtils';
import { parseDate } from '../utils/utilFunc';

const useStyles = makeStyles((theme) => ({
    titleSection: {
        marginBottom: theme.spacing(1),
    },
    leftSideContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        width: theme.spacing(65),
        '@media (max-width: 1350px)': {
            width: theme.spacing(56.25),
        },
        '@media (max-width: 1150px)': {
            width: theme.spacing(50),
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
        marginTop: theme.spacing(1),
        flexDirection: 'column',
        alignItems: "start",
        '& .MuiAutocomplete-root': {
            width: '100%'
        }
    },
    autocomplete: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    exerciseMapping: {
        height: '570px'
    },
    deleteSetBtn: {
        width: '35px',
        height: '35px',
        marginLeft: '2px',
        padding: '0px'
    },
    exercisesList: {
        height: '450px',
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
        minWidth: theme.spacing(5),
        '& .MuiListItemIcon-root': {
            minWidth: theme.spacing(5),
        }
    },
    saveAndResetActions: {
        display: 'flex',
        gap: theme.spacing(2),
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
            width: theme.spacing(11.625)
        }
    },
    changePadding: {
        padding: theme.spacing(0.375)
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
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    toolbarTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    mergeBtn: {
        height: theme.spacing(5.25),
        width: theme.spacing(23.375),
        minWidth: theme.spacing(23.375),
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
        paddingLeft: theme.spacing(2.5),
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
        minHeight: theme.spacing(66.25),
    },
    contentBox: {
        display: 'initial'
    },
    linkAsChip: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        paddingLeft: '12px',
        paddingRight: '12px',
        height: '32px',
        borderRadius: '16px'
    },
    tooltipImg: {
        height: '100%',
        width: theme.spacing(31.25)
    },
    tooltipPopper: {
        background: '#1B1B1B',
        paddingTop: theme.spacing(1)
    },
    exercisesContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: theme.spacing(2),
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        borderRadius: theme.spacing(3.75),
        '&:hover': {
            cursor: 'pointer'
        },
    },
    exercisesContent: {
        width: theme.spacing(27.5),
        height: theme.spacing(27.5),
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
        gap: theme.spacing(1),
        alignItems: 'center',
    },
    addSetBtn: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: theme.spacing(0.375),
        marginTop: theme.spacing(0.375),
    },
    addSetAndMarkersContainer: {
        marginTop: theme.spacing(1.25),
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(2),
        height: theme.spacing(57.5),
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
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
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
            marginLeft: theme.spacing(6.25)
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
        marginRight: theme.spacing(1.25)
    },
    selectedPopoverElement: {
        background: '#F5F5F5',
        color: '#28A745',
    },
    supersetLabel: {
        fontWeight: 'bolder',
        fontSize: theme.spacing(2.125)
    },
    divFiller: {
        width: theme.spacing(6)
    },
    arrowExpandMore: {
        transform: 'rotate(90deg)'
    },
    arrowExpandLess: {
        transform: 'rotate(-90deg)'
    },
    dragIndicatorIcon: {
        color: '#757575',
        marginLeft: '-6px'
    },
    workoutIcon: {
        height: 'auto',
        width: '44px',
        cursor: 'pointer'
    },
    repetitionsButton: {
        padding: '0px',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiButtonBase-root': {
            padding: '0px',
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
    repetitionsComponentLabel: {
        alignItems: 'baseline'
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
                <UGBLabel variant='h5'>
                    Add a new workout program
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutJournalName}
                label='Name'
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

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                <UGBLabel variant='h5'>
                    Edit workout: {selectedWorkoutJournalObj?.name || ''}
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutJournalName}
                label='Name'
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
                <UGBLabel variant='h5'>
                    Are you sure you want to delete workout &ldquo;{workoutJournalName}&rdquo;?
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
                <UGBLabel variant='h5'>
                    Add a new day to the workout: {workoutJournal?.name || ''}
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
                <UGBLabel variant='h5'>
                    Edit workout day: {selectedWorkoutSessionObj?.name || ''}
                </UGBLabel>
            </div>
            <UGBIconInput
                $value={workoutSessionName}
                label='Workout Name'
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
                <UGBLabel variant='h5'>
                    Are you sure you want to delete workout day &ldquo;{workoutSessionName}&rdquo;?
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
                    <UGBLabel variant='h5'>
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

const PopoverLink = ({ ex, color, isChip }) => {
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
            <div className={clsx(styles.contentBox, isChip ? styles.linkAsChip : null)}>
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
    keepCollapseOpenedForSupersetItems,
    setKeepCollapseOpenedForSupersetItems,
    onClickRepetitionsButton,
    _props
}) {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [stopTransition, setStopTransition] = useState(false);

    useEffect(() => {
        if (exType === 'superset') {
            for (let i = 0; i < supersetItems.superset.length; i++) {
                if (keepCollapseOpenedForSupersetItems[supersetItems.superset[i].id]) {
                    setStopTransition(true);
                    setOpen(true);
                    break;
                }
            }
        }
    }, [sessionExercises]);

    useEffect(() => {
        if (stopTransition) {
            setStopTransition(false);
        }
    }, [stopTransition]);


    return (
        exType === 'superset' ?
            <List key={`superset-${supersetItems.superset[0].id}-${supersetItems.superset[1].id}`} {..._props}>
                <>
                    <ListItem key='superset-list-item' button={false}>
                        <DragIndicatorIcon className={styles.dragIndicatorIcon} />
                        <ListItemIcon className={styles.clearBtn}>
                            <IconButton
                                className={styles.changePadding}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSessionExercises(sessionExercises.filter(exx => exx !== supersetItems));
                                    setExercisesForMerge(exercisesForMerge.filter(exx => exx !== supersetItems));
                                }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary={!open ?
                                <div >
                                    <span className={styles.supersetLabel}>Superset: </span >
                                    <span>{(() => supersetItems.superset.map(exx => exx.exercise).join(', '))()}</span >
                                </div>
                                :
                                <span className={styles.supersetLabel}>Superset: </span >
                            }
                        />
                        <div className={styles.rightSideSupersetListIem}>
                            <div className={styles.checkboxAndExpand}>
                                <ListItemIcon className={styles.sort}>
                                    <IconButton
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        className={styles.repetitionsButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClickRepetitionsButton(supersetItems);
                                            setToggleExerciseContent(true);
                                            setSelectedSessionExercise(supersetItems);
                                        }}
                                    >
                                        <img className={styles.workoutIcon} src={workout} alt='' />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon className={styles.checkbox}>
                                    <UGBCheckbox
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => {
                                            const isChecked = e.target.checked;
                                            if (isChecked) {
                                                setExercisesForMerge([...exercisesForMerge, supersetItems])
                                            } else {
                                                setExercisesForMerge(exercisesForMerge.filter(exx => exx != supersetItems));
                                            }
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemIcon className={styles.sort}>
                                    <IconButton
                                        className={styles.changePadding}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpen(!open);
                                            if (!open) {
                                                keepCollapseOpenedForSupersetItems[supersetItems.superset[0].id] = true;
                                            } else {
                                                for (let i = 0; i < supersetItems.superset.length; i++) {
                                                    if (keepCollapseOpenedForSupersetItems[supersetItems.superset[i].id]) {
                                                        delete keepCollapseOpenedForSupersetItems[supersetItems.superset[i].id];
                                                        break;
                                                    }
                                                }
                                            }
                                            setKeepCollapseOpenedForSupersetItems(keepCollapseOpenedForSupersetItems);
                                        }}
                                    >
                                        {open ?
                                            <ArrowForwardIosIcon className={styles.arrowExpandLess} />
                                            :
                                            <ArrowForwardIosIcon className={styles.arrowExpandMore} />
                                        }
                                    </IconButton>
                                </ListItemIcon>
                            </div>
                        </div>
                    </ListItem>
                    <Collapse
                        classes={{ root: stopTransition ? { transition: 'none' } : null }}
                        timeout={stopTransition ? 0 : "auto"}
                        in={open}
                        unmountOnExit
                    >
                        <ReactMovableList
                            values={supersetItems.superset}
                            onChange={({ oldIndex, newIndex }) => {
                                const tempSessionExercises = sessionExercises;
                                const index = tempSessionExercises.indexOf(supersetItems);
                                supersetItems.superset = arrayMove(supersetItems.superset, oldIndex, newIndex)
                                tempSessionExercises[index] = supersetItems;
                                setSessionExercises([...tempSessionExercises]);
                            }}
                            renderList={({ children, props }) => <List component="div" disablePadding className={styles.nested} {...props}>{children}</List>}
                            renderItem={({ value, props }) => {
                                const ex = value;
                                return (
                                    <ListItem key={ex.id} className={styles.nestedListItem} {...props}>
                                        <DragIndicatorIcon className={styles.dragIndicatorIcon} />
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
                                                <HighlightOffIcon />
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
                                                        setToggleExerciseContent(true);
                                                        setSelectedSessionExercise(ex);
                                                    }}
                                                >
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                            </ListItemIcon>
                                        </div>
                                    </ListItem>
                                );
                            }}
                        />
                    </Collapse>
                </>
                {open ? <span data-movable-handle /> : null}
            </List>
            :
            <>
                <ListItem
                    key={supersetItems.id}
                    button={false}
                    {..._props}
                >
                    <DragIndicatorIcon className={styles.dragIndicatorIcon} />
                    <ListItemIcon className={styles.clearBtn}>
                        <IconButton
                            className={styles.changePadding}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSessionExercises(sessionExercises.filter(exx => exx.id !== supersetItems.id));
                                setExercisesForMerge(exercisesForMerge.filter(exx => exx.id !== supersetItems.id));
                            }}
                        >
                            <HighlightOffIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText
                        primary={supersetItems.exercise}
                        secondary={<PopoverLink ex={supersetItems} color='primary' />}
                    />
                    <div className={styles.rightSideListIem}>
                        <div className={styles.checkboxAndExpand}>
                            <ListItemIcon className={styles.sort}>
                                <IconButton
                                    disableFocusRipple={true}
                                    disableRipple={true}
                                    className={styles.repetitionsButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClickRepetitionsButton(supersetItems);
                                        setToggleExerciseContent(true);
                                        setSelectedSessionExercise(supersetItems);
                                    }}
                                >
                                    <img className={styles.workoutIcon} src={workout} alt='' />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemIcon className={styles.checkbox}>
                                <UGBCheckbox
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => {
                                        const isChecked = e.target.checked;
                                        if (isChecked) {
                                            setExercisesForMerge([...exercisesForMerge, supersetItems])
                                        } else {
                                            setExercisesForMerge(exercisesForMerge.filter(exx => exx.id !== supersetItems.id));
                                        }
                                    }}
                                />
                            </ListItemIcon>
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
                        </div>
                    </div>
                </ListItem>
            </>
    );
}

const AddSets = ({ sessionExercises, setSessionExercises, selectedSessionExercise, setSelectedSessionExercise, timeValidations, setTimeValidations, repsValidations, setRepsValidations }) => {
    const styles = useStyles();

    return (
        <div className={styles.addSetAndMarkersContainer}>
            {selectedSessionExercise.sets.map((set, i) => {
                return (
                    <div key={set.set} className={styles.addSet}>
                        <IconButton
                            className={clsx(styles.editButton, styles.deleteSetBtn)}
                            disableRipple
                            onClick={(e) => {
                                const tempSets = selectedSessionExercise.sets;
                                const exI = tempSets.indexOf(set);
                                tempSets.splice(exI, 1);
                                for (let j = 0; j < tempSets.length; j++) {
                                    tempSets[j].set = `Set ${j + 1}`
                                }
                                delete repsValidations[set.set + '-reps'];
                                delete timeValidations[set.set + '-rest'];
                                setRepsValidations(repsValidations);
                                setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets = tempSets, { ...selectedSessionExercise }));
                                setSessionExercises([...sessionExercises]);
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                        <div>
                            <UGBIconInput
                                imgIconStart={tallyIcon}
                                label={`${set.set}: Reps goal`}
                                value={set.reps}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (isNaN(Number(value)) || textIsEmpty(value)) {
                                        repsValidations[set.set + '-reps'] = true;
                                    } else {
                                        delete repsValidations[set.set + '-reps'];
                                    }
                                    setRepsValidations(repsValidations);
                                    setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets[i].reps = value, { ...selectedSessionExercise }));
                                    setSessionExercises([...sessionExercises]);
                                }}
                            />
                            <div style={{ color: '#F42A82', fontSize: '12px', height: '14px' }}>{repsValidations && repsValidations[set.set + '-reps'] ? 'Number required' : null}</div>
                        </div>
                        <div>
                            <UGBTimeInput
                                name="Rest Time"
                                label='Rest time after set'
                                initTime={set.rest}
                                mountFocus='true'
                                onTimeChange={(props) => {
                                    const value = props;
                                    const re = /^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/;
                                    const isValidFormat = re.test(value);
                                    if (isValidFormat) {
                                        delete timeValidations[set.set + '-rest'];
                                    } else {
                                        timeValidations[set.set + '-rest'] = true;
                                    }
                                    setTimeValidations(timeValidations);
                                    setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets[i].rest = value, { ...selectedSessionExercise }));
                                    setSessionExercises([...sessionExercises])
                                }}
                            />
                            <div style={{ color: '#F42A82', fontSize: '12px', height: '14px' }}>{timeValidations && timeValidations[set.set + '-rest'] ? 'Format mm:ss required' : null}</div>
                        </div>
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
                        timeValidations[set + '-rest'] = false;
                        repsValidations[set + '-reps'] = false;
                        setTimeValidations(timeValidations);
                        setRepsValidations(repsValidations);
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
                        <div key={marker.marker + i} className={styles.addMarkerContainer}>
                            <UGBLabel variant='subtitle2'>
                                Marker Type
                            </UGBLabel>
                            <div key={i} className={styles.addMarker}>
                                <IconButton
                                    className={clsx(styles.editButton, styles.deleteSetBtn)}
                                    disableRipple
                                    onClick={(e) => {
                                        const tempMarkers = selectedSessionExercise.markers;
                                        const exI = tempMarkers.indexOf(marker);
                                        tempMarkers.splice(exI, 1);
                                        setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.markers = tempMarkers, { ...selectedSessionExercise }));
                                        setSessionExercises([...sessionExercises]);
                                    }}
                                >
                                    <ClearIcon />
                                </IconButton>
                                <div className={styles.addMarkerInputs}>
                                    <UGBInput
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={styles.svgInputIcon} position="start">
                                                    <i className="fa-solid fa-highlighter"></i>
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
                                                        <i className="fa-solid fa-percent" />
                                                    </InputAdornment>
                                                    :
                                                    marker.marker === 'Periodization' ?
                                                        <InputAdornment className={styles.svgInputIcon} position="start">
                                                            <i className="fa-solid fa-chart-line" />
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
                        disabled={selectedSessionExercise.markers.length >= 10}
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

    const [keepCollapseOpenedForSupersetItems, setKeepCollapseOpenedForSupersetItems] = useState({});
    const [showRepetitionsComponent, setShowRepetitionsComponent] = useState(false);
    const [refreshWorkoutJournalSessionExercises, setRefreshWorkoutJournalSessionExercises] = useState({});
    const [timeValidations, setTimeValidations] = useState({});
    const [repsValidations, setRepsValidations] = useState({});

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
    }, [selectedWorkoutSession[0], refreshWorkoutJournalSessionExercises])

    useEffect(() => {
        if (exercisesForMerge.length && exercisesForMerge.length > 1) {
            setExercisesForMergeDisabled(false);
        } else {
            setExercisesForMergeDisabled(true);
        }
    }, [exercisesForMerge])

    useEffect(() => {
        if (Object.keys(timeValidations).length || Object.keys(repsValidations).length) {
            setDisableSave(true);
            return;
        }

        const tempSessionExercisesAsString = JSON.stringify(sessionExercises)
        if (sessionExercisesAsString === tempSessionExercisesAsString) {
            setDisableSave(true);
        } else {
            setDisableSave(false);
        }
    }, [sessionExercises, sessionExercisesAsString, timeValidations, repsValidations])

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
        }).then(() => {
            setRefreshWorkoutJournalSessionExercises({});
        }, error => {
            console.log('LOGOUT ERROR--->', error);
            setRefreshWorkoutJournalSessionExercises({});
        })

        // console.log(sessionExercises)
        // console.log(tempSessionExercises)
        // console.log(selectedWorkoutSessionObj);
        // console.log(selectedWorkoutJournalObj);

        //setSavingChangesLoading(false);
        //setSavedChanges(true);
    }

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

    function onClickRepetitionsButton(ex) {
        setShowRepetitionsComponent(true);
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
                    <div>
                        <UGBLabel variant='h5'>
                            Workout
                        </UGBLabel>
                    </div>
                    <div className={styles.select}>
                        <UGBLabel variant='subtitle2'>
                            Workout Program
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
                        <UGBLabel variant='subtitle2'>
                            Workout Day
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
                                    <UGBLabel variant='subtitle1'>
                                        Exercises:
                                    </UGBLabel>
                                </div>
                                <div className={styles.mergeBtn}>
                                    <UGBButton
                                        disabled={exercisesForMergeDisabled}
                                        onClick={onClickMerge}
                                        btnType={exercisesForMergeDisabled ? '' : 'outlinedPrimary'}
                                    >
                                        Merge Into Superset
                                    </UGBButton>
                                </div>
                            </div>
                            <ReactMovableList
                                values={sessionExercises}
                                onChange={({ oldIndex, newIndex }) => setSessionExercises(arrayMove(sessionExercises, oldIndex, newIndex))}
                                renderList={({ children, props }) => <List className={clsx(styles.exercisesList, 'exercises-list')} {...props}>{children}</List>}
                                renderItem={({ value, props }) => <ExerciseListItem
                                    key={value.superset ?
                                        `superset-exerciseListItem-${value.superset[0].id}-${value.superset[1].id}`
                                        :
                                        value.id
                                    }
                                    exType={value.superset ? 'superset' : 'single-exercise'}
                                    supersetItems={value}
                                    setExercisesForMerge={setExercisesForMerge}
                                    exercisesForMerge={exercisesForMerge}
                                    setSessionExercises={setSessionExercises}
                                    sessionExercises={sessionExercises}
                                    setToggleExerciseContent={setToggleExerciseContent}
                                    setSelectedSessionExercise={setSelectedSessionExercise}
                                    _props={props}
                                    keepCollapseOpenedForSupersetItems={keepCollapseOpenedForSupersetItems}
                                    setKeepCollapseOpenedForSupersetItems={setKeepCollapseOpenedForSupersetItems}
                                    onClickRepetitionsButton={onClickRepetitionsButton}
                                />}
                            />
                            <div className={clsx(styles.select, styles.autocomplete)}>
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
                            <div className={clsx(
                                styles.exercisesContentHeader,
                                hideExerciseContent ? styles.exercisesContentHeaderAlign : null,
                                showRepetitionsComponent ? styles.repetitionsComponentLabel : null
                            )}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (showRepetitionsComponent) {
                                            setShowRepetitionsComponent(false);
                                            setToggleExerciseContent(false);
                                            setSelectedSessionExercise({});
                                            return;
                                        }
                                        if (hideExerciseContent) {
                                            if (showExerciseAddSet) {
                                                if (Object.keys(timeValidations).length || Object.keys(repsValidations).length) {
                                                    const tempSets = selectedSessionExercise.sets;
                                                    for (let i = 0; i < tempSets.length; i++) {
                                                        if (timeValidations[tempSets[i].set + '-rest'] === false || timeValidations[tempSets[i].set + '-rest']) {
                                                            delete timeValidations[tempSets[i].set + '-rest'];
                                                            delete repsValidations[tempSets[i].set + '-reps'];
                                                            tempSets.splice(i, 1);
                                                        } else if (repsValidations[tempSets[i].set + '-reps'] === false || repsValidations[tempSets[i].set + '-reps']) {
                                                            delete timeValidations[tempSets[i].set + '-rest'];
                                                            delete repsValidations[tempSets[i].set + '-reps'];
                                                            tempSets.splice(i, 1);
                                                        }
                                                    }
                                                    setRepsValidations(repsValidations);
                                                    setTimeValidations(timeValidations);
                                                    setSelectedSessionExercise(selectedSessionExercise => (selectedSessionExercise.sets = tempSets, { ...selectedSessionExercise }));
                                                    setSessionExercises([...sessionExercises]);
                                                }
                                                setShowExerciseAddSet(false);
                                            }
                                            if (showAddMarkers) { setShowAddMarkers(false); }
                                            setHideExerciseContent(false)
                                        } else {
                                            setToggleExerciseContent(false);
                                            setSelectedSessionExercise({});
                                        }
                                    }}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <UGBLabel variant='h5'>
                                    {showRepetitionsComponent ?
                                        "Set reps for today's workout"
                                        :
                                        <>
                                            {selectedSessionExercise.exercise}
                                            {hideExerciseContent ? <br /> : null}
                                            {showExerciseAddSet ? 'Add Sets' : ''}
                                            {showAddMarkers ? 'Add Markers' : ''}
                                        </>
                                    }
                                </UGBLabel>
                                <div className={styles.divFiller} />
                            </div>
                            {showRepetitionsComponent ?
                                <RepetitionsComponent
                                    exercise={selectedSessionExercise}
                                    notSaved={disableSave}
                                />
                                :
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
                                                    <img src={lifting3} alt='lifting' className={styles.svg} />
                                                    <UGBLabel variant='h5'>
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
                                                    <UGBLabel variant='h5'>
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
                                                    timeValidations={timeValidations}
                                                    setTimeValidations={setTimeValidations}
                                                    repsValidations={repsValidations}
                                                    setRepsValidations={setRepsValidations}
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
                            }
                        </div>
                    </div>
                    {showRepetitionsComponent ?
                        null
                        :
                        < div className={styles.saveAndResetActions}>
                            {/* <UGBButton className={styles.defaultButton} onClick={resetToDefault} btnType='outlinedPrimary' variant='outlined'>Reset To Default</UGBButton> */}
                            <UGBButton onClick={saveChanges} btnType='primary' disabled={disableSave} >Save Changes</UGBButton>
                        </div>
                    }
                </div>
                <div className={styles.rightSideContainer}>
                    <img src={lifting2} alt='lifting2' className={styles.svg} />
                </div>
            </div>
        </>
    );
}

export default WorkoutBuilder;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function getProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles3 = makeStyles((theme) => ({
    repetitionsComponentContainer: {
        flexGrow: 1,
        width: '100%',
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            boxShadow: 'none'
        },
        '& .MuiAppBar-colorPrimary': {
            backgroundColor: '#28A745',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: '#28A745'
        },
        '& .MuiBox-root': {
            padding: 0
        },
        "& .MuiButtonBase-root": {
            color: '#1B1B1B',
        },
        "& .Mui-selected": {
            color: '#28A745',
        }
    },
    repetitionsTabPanelContainer: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        width: '100%',
        height: '394px',
        flexDirection: 'column',
        overflow: 'auto'
    },
    chips: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(1.5),
    },
    imgIcon: {
        width: 'auto',
        height: '90%',
    },
    tabs: {
        '& .Mui-selected': {
            '& .MuiTab-wrapper': {
                height: '34px',
                alignItems: 'normal',
                gap: theme.spacing(1),
                flexDirection: 'row-reverse'
            }
        }
    },
    barIconWidth: {
        width: '24px'
    },
    chipsAppBar: {
        '& .MuiTabs-scroller': {
            display: 'flex',
            alignItems: 'center'
        }
    },
    sort: {
        minWidth: 'auto',
        '& .MuiSvgIcon-root': {
            color: '#757575'
        }
    },
    historyContainer: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiListItemText-root': {
            textAlign: 'center',
            flex: 'unset',
            '& .MuiListItemText-primary': {
                width: '116px',
                fontSize: '13px'
            },
            '& .MuiListItemText-secondary ': {
                width: '116px'
            },
        }
    },
    newEntries: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: theme.spacing(1)
    },
    changePadding: {
        padding: theme.spacing(0.375)
    },
    startTimer: {
        height: '40px',
        width: '40px',
        color: '#28A745',
        border: '1px solid #28A745',
        background: 'transparent',
        '&:hover': {
            background: 'transparent',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            background: 'transparent',
            border: '1px solid #1E7E34',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    circularProgressWithLabel: {
        '& .MuiCircularProgress-root': { color: '#28A745' }
    },
    timerIcon: {
        color: '#28A745'
    }
}));

const RepetitionsComponent = ({ exercise, notSaved }) => {
    const styles = useStyles3();
    const [value, setValue] = React.useState(0);
    const [isSaving, setIsSaving] = useState([]);
    const [isSaved, setIsSaved] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.repetitionsComponentContainer}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className={styles.tabs}
                >
                    {exercise && exercise.superset ?
                        exercise.superset.map((exx, i) => <Tab
                            key={'tab' + exx.id}
                            label={exx.exercise}
                            {...getProps(i)}
                            icon={isSaving.length && i === value ?
                                <div className={styles.barIconWidth}>
                                    <UGBLoaderSpinner
                                        height={20}
                                        width={20}
                                        color='#28A745'
                                    />
                                </div>
                                :
                                isSaved.length && i === value ?
                                    <div className={styles.barIconWidth}>
                                        <CloudDoneIcon />
                                    </div>
                                    :
                                    <div className={styles.barIconWidth} />
                            }
                        />)
                        :
                        exercise ?
                            <Tab
                                icon={isSaving.length ?
                                    <div className={styles.barIconWidth}>
                                        <UGBLoaderSpinner
                                            height={20}
                                            width={20}
                                            color='#28A745'
                                        />
                                    </div>
                                    :
                                    isSaved.length ?
                                        <div className={styles.barIconWidth}>
                                            <CloudDoneIcon />
                                        </div>
                                        :
                                        <div className={styles.barIconWidth} />
                                }
                                key={'tab' + exercise.id}
                                label={exercise.exercise}
                                {...getProps(0)}
                            />
                            :
                            <Tab
                                icon={isSaving.length ?
                                    <div className={styles.barIconWidth}>
                                        <UGBLoaderSpinner
                                            height={20}
                                            width={20}
                                            color='#28A745'
                                        />
                                    </div>
                                    :
                                    isSaved.length ?
                                        <div className={styles.barIconWidth}>
                                            <CloudDoneIcon />
                                        </div>
                                        :
                                        <div className={styles.barIconWidth} />
                                }
                                label=''
                                {...getProps(0)}
                            />
                    }
                </Tabs>
            </AppBar>
            {exercise && exercise.superset ?
                exercise.superset.map((exx, i) => {
                    return (
                        <TabPanel key={exx.id} value={value} index={i}>
                            <RepetitionsTabPanel
                                exercise={exx}
                                notSaved={notSaved}
                                setIsSaving={setIsSaving}
                                setIsSaved={setIsSaved}
                                isSaving={isSaving}
                                isSaved={isSaved}
                            />
                        </TabPanel>
                    );
                })
                :
                exercise ?
                    <TabPanel key={exercise.id} value={value} index={0}>
                        <RepetitionsTabPanel
                            exercise={exercise}
                            notSaved={notSaved}
                            setIsSaving={setIsSaving}
                            setIsSaved={setIsSaved}
                            isSaving={isSaving}
                            isSaved={isSaved}
                        />
                    </TabPanel>
                    :
                    <TabPanel value={value} index={0} />
            }
        </div>
    );
}

const RepetitionsTabPanel = ({ exercise, notSaved, setIsSaving, setIsSaved, isSaving, isSaved }) => {
    const styles = useStyles3();
    const [markers, setMarkers] = useState([]);
    const [historicalEntries, setHistoricalEntires] = useState({});
    const [todaysData, setTodaysData] = useState({});
    const [dailyWorkoutDataId, setDailyWorkoutDataId] = useState(null);

    useEffect(() => {
        if (exercise && exercise.markers && exercise.markers.length) {
            const markers = [...exercise.markers];
            const intensityVolumeIndex = markers.findIndex(m => m.marker === 'Intensity Volume')
            if (intensityVolumeIndex >= 0 && intensityVolumeIndex >= 2) {
                const intensityVolume = markers[intensityVolumeIndex];
                markers.splice(intensityVolumeIndex, 1);
                markers.unshift(intensityVolume);
            }
            const periodizationIndex = markers.findIndex(m => m.marker === 'Periodization')
            if (intensityVolumeIndex >= 0 && periodizationIndex >= 2) {
                const periodization = markers[periodizationIndex];
                markers.splice(periodizationIndex, 1);
                markers.unshift(periodization);
            }
            setMarkers(markers);

            setDailyWorkoutDataId(exercise.dailyWorkoutDataId)
            getRepetitionsData(exercise.dailyWorkoutDataId);
        }
    }, [exercise]);

    function getRepetitionsData(dailyWorkoutDataId) {
        getData(process.env.REACT_APP_HOST + `/api/workout/get-repetitions-data?dailyWorkoutDataId=${dailyWorkoutDataId}`)
            .then(data => {
                setHistoricalEntires(data.historicalEntires);
                const _todaysData = data.todaysData || {};
                if (exercise && exercise.sets && exercise.sets.length) {
                    for (const set of exercise.sets) {
                        if (!_todaysData[set.set]) {
                            _todaysData[set.set] = { reps: '', weight: '' }
                        } 
                    }
                }
                console.log(_todaysData);
                setTodaysData(_todaysData);
            }, error => {
                console.log(error);
            })
    }

    return (
        <div className={styles.repetitionsTabPanelContainer}>

            <AppBar position="static" color="default" className={styles.chipsAppBar}>
                <Tabs
                    value={-1}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        exercise && (markers || exercise.muscleGroups || exercise.videoLink) ?
                            <div className={styles.chips}>
                                {exercise.videoLink ?
                                    <div {...getProps(exercise.videoLink)}>
                                        <PopoverLink ex={exercise} color='green' isChip={true} />
                                    </div>
                                    :
                                    null
                                }
                                {exercise.muscleGroups ?
                                    <Chip
                                        icon={<img src={muscle} alt='muscle' className={styles.imgIcon} />}
                                        key={exercise.muscleGroups}
                                        label={exercise.muscleGroups}
                                        variant="outlined"
                                        {...getProps(exercise.muscleGroups)}
                                    />
                                    :
                                    null
                                }
                                {markers && markers.length ?
                                    markers.map((marker, i) => {
                                        if (!marker.marker.length) {
                                            return null;
                                        }

                                        return (
                                            <Chip
                                                key={`${marker.marker}=${marker.markerValue}`}
                                                label={`${marker.marker}${marker.markerValue ? '=' : ''}${marker.markerValue}`}
                                                variant="outlined"
                                                {...getProps(i)}
                                            />
                                        );
                                    })
                                    :
                                    null
                                }
                            </div>
                            :
                            null
                    }
                </Tabs>
            </AppBar>
            {notSaved ?
                !exercise.sets || (exercise && exercise.sets && exercise.sets.length === 0) ?
                    <UGBLabel variant='subtitle1'>
                        You haven't added any sets and reps goals to this exercise
                    </UGBLabel>
                    :
                    <div>
                        <List component="div" disablePadding>
                            {exercise.sets.map((set, i) => {
                                const timeTokens = set.rest.split(':');
                                const minutes = Number(timeTokens[0]);
                                const seconds = Number(timeTokens[1]);
                                const timeInSeconds = (minutes * 60) + seconds;

                                return (
                                    <ListItem key={set.set + i} button={false}>
                                        < HistoryListItem historicalEntry={historicalEntries[set.set]} />
                                        <div className={styles.newEntries}>
                                            <div style={{ width: '100%' }}>
                                                <DebouncingWeightInput
                                                    todaysData={todaysData}
                                                    set={set}
                                                    setTodaysData={setTodaysData}
                                                    setIsSaving={setIsSaving}
                                                    setIsSaved={setIsSaved}
                                                    isSaving={isSaving}
                                                    isSaved={isSaved}
                                                    dailyWorkoutDataId={dailyWorkoutDataId}
                                                />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <DebouncingRepsInput
                                                    todaysData={todaysData}
                                                    set={set}
                                                    setTodaysData={setTodaysData}
                                                    setIsSaving={setIsSaving}
                                                    setIsSaved={setIsSaved}
                                                    isSaving={isSaving}
                                                    isSaved={isSaved}
                                                    dailyWorkoutDataId={dailyWorkoutDataId}
                                                />
                                            </div>
                                            <Timer timeInSeconds={timeInSeconds} />
                                        </div>

                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                :
                <UGBLabel variant='subtitle1'>
                    You need to save changes before setting reps
                </UGBLabel>
            }
        </div>
    );
}

const Timer = ({ timeInSeconds }) => {
    const styles = useStyles3();
    const [startTimer, setStartTimer] = useState(false);
    const [countDown, setCountDown] = useState('00:00');
    const [visualProgress, setVisualProgress] = useState(0);
    const [initiallyLoaded, setInitiallyLoaded] = useState(false);

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setCountDown(minutes + ':' + seconds);
    }

    useEffect(() => {
        if (startTimer) {
            const countDownTokens = countDown.split(':');
            const countDownInSeconds = (Number(countDownTokens[0]) * 60) + Number(countDownTokens[1]);

            const progress = Math.abs(countDownInSeconds - timeInSeconds) * 100.0 / Math.abs(0 - timeInSeconds);

            if (initiallyLoaded) {
                if (progress >= 100) {
                    beep();
                }
            } else {
                setInitiallyLoaded(true);
            }
            setVisualProgress(progress);
        }
    }, [countDown]);


    function beep() {
        let context = new AudioContext();
        let oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = 800;
        oscillator.connect(context.destination);
        oscillator.start();
        setTimeout(function () {
            oscillator.stop();
        }, 800);
    }

    return (
        <div>
            {startTimer ?
                <div className={styles.circularProgressWithLabel} onClick={() => setStartTimer(false)}>
                    <CircularProgressWithLabel value={visualProgress} label={countDown} />
                </div>
                :
                <IconButton className={styles.startTimer}
                    onClick={() => {
                        setStartTimer(true);
                        const timer = new CountDownTimer(timeInSeconds);
                        const timeObj = CountDownTimer.parseTime(timeInSeconds);
                        format(timeObj.minutes, timeObj.seconds);
                        timer.onTick(format);
                        timer.start();
                    }}
                >
                    <TimerIcon className={styles.timerIcon} />
                </IconButton>
            }
        </div>
    );
}

const HistoryListItem = ({ historicalEntry }) => {
    const styles = useStyles3();
    const [max, setMax] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (historicalEntry) {
            setMax(historicalEntry.length);
            setCurrentIndex(historicalEntry.length - 1);
        }
    }, [historicalEntry])

    return (
        <div className={styles.historyContainer}>
            <ListItemIcon className={styles.sort}>
                <IconButton
                    className={styles.changePadding}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </ListItemIcon>
            <ListItemText
                primary={historicalEntry && historicalEntry[currentIndex] && (historicalEntry[currentIndex].weight || historicalEntry[currentIndex].reps) ? `${historicalEntry[currentIndex].weight || 0}Kg X ${historicalEntry[currentIndex].reps || 0}Reps` : 'N/A'}
                secondary={historicalEntry && historicalEntry[currentIndex] && (historicalEntry[currentIndex].weight || historicalEntry[currentIndex].reps) ? historicalEntry[currentIndex].date : 'N/A'}
            />
            <ListItemIcon className={styles.sort}>
                <IconButton
                    className={styles.changePadding}
                    disabled={currentIndex + 1 >= max}
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </ListItemIcon>
        </div>
    );
}

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate"{...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color='#28A745'
            >
                <Typography variant="caption" component="div">{props.label}</Typography>
            </Box>
        </Box>
    );
}

const DebouncingWeightInput = ({ todaysData, set, setTodaysData, setIsSaving, setIsSaved, isSaving, isSaved, dailyWorkoutDataId }) => {
    const [tempWeight, setTempWeight] = useState('');
    const [weight, setWeight] = useState('');
    const [initiallyLoaded, setInitiallyLoaded] = useState(false);
    const [loadedTodaysData, setLoadedTodaysData] = useState(false);

    const updateWeightEntry = async () => {
        setIsSaving([...isSaving, set.set + '-w']);
        const created = new Date();
        const reqData = {
            weight: weight,
            forSet: set.set,
            createdOn: parseDate(created, '/'),
            dailyWorkoutDataId: dailyWorkoutDataId
        }
        putData(process.env.REACT_APP_HOST + '/api/workout/add-weight-entry', reqData)
            .then(data => {
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })

        setIsSaving(isSaving.filter(save => save === set.set + '-w'));
        setIsSaved([...isSaved, set.set + '-w']);
        setTimeout(
            function () {
                setIsSaved(isSaved.filter(save => save === set.set + '-w'));
            }, 1250);
    }

    useEffect(() => {
        if (!initiallyLoaded) {
            setInitiallyLoaded(true);
            return;
        }
        updateWeightEntry();
    }, [weight])

    useEffect(() => {
        if (!loadedTodaysData && todaysData && todaysData[set.set] && !isNaN(Number(todaysData[set.set].weight))) {
            setTempWeight(todaysData[set.set].weight);
            setLoadedTodaysData(true);
            return;
        }
    }, [todaysData])

    const debounceMemo = React.useMemo(
        () => debounce(
            (event) => {
                setTempWeight(event.target.value);
            }, (event) => {
                setWeight(event.target.value);
            }, 500),
        [],
    );

    return (
        <UGBInput
            label=''
            value={tempWeight}
            onChange={(e) => {
                if (todaysData && todaysData[set.set]) {
                    todaysData[set.set].weight = e.target.value;
                    setTodaysData({ ...todaysData });
                    debounceMemo(e);
                }
            }}
            InputProps={{ endAdornment: (<InputAdornment position="start">Kg</InputAdornment>) }}
        />
    );
}

const DebouncingRepsInput = ({ todaysData, set, setTodaysData, setIsSaving, setIsSaved, isSaving, isSaved, dailyWorkoutDataId }) => {
    const [tempReps, setTempReps] = useState('');
    const [reps, setReps] = useState('');
    const [initiallyLoaded, setInitiallyLoaded] = useState(false);
    const [loadedTodaysData, setLoadedTodaysData] = useState(false);

    const updateRepsEntry = async () => {
        setIsSaving([...isSaving, set.set + '-r']);
        const created = new Date();
        const reqData = {
            reps: reps,
            forSet: set.set,
            createdOn: parseDate(created, '/'),
            dailyWorkoutDataId: dailyWorkoutDataId
        }
        putData(process.env.REACT_APP_HOST + '/api/workout/add-reps-entry', reqData)
            .then(data => {
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })

        setIsSaving(isSaving.filter(save => save === set.set + '-r'));
        setIsSaved([...isSaved, set.set + '-r']);
        setTimeout(
            function () {
                setIsSaved(isSaved.filter(save => save === set.set + '-r'));
            }, 1250);
    }

    useEffect(() => {
        if (!initiallyLoaded) {
            setInitiallyLoaded(true);
            return;
        }
        updateRepsEntry();
    }, [reps])

    useEffect(() => {
        if (!loadedTodaysData && todaysData && todaysData[set.set] && !isNaN(Number(todaysData[set.set].reps))) {
            setTempReps(todaysData[set.set].reps);
            setLoadedTodaysData(true);
            return;
        }
    }, [todaysData])

    const debounceMemo = React.useMemo(
        () => debounce(
            (event) => {
                setTempReps(event.target.value);
            }, (event) => {
                setReps(event.target.value);
            }, 500),
        [],
    );

    return (
        <UGBLegendInput
            minWidth='100px'
            label={`Reps Goal: ${set && set.reps ? set.reps : null}`}
            value={tempReps}
            onChange={(e) => {
                if (todaysData && todaysData[set.set]) {
                    todaysData[set.set].reps = e.target.value;
                    setTodaysData({ ...todaysData });
                    debounceMemo(e);
                }
            }}
            endAdornment={<InputAdornment position="start">Reps</InputAdornment>}
        />
    );
}