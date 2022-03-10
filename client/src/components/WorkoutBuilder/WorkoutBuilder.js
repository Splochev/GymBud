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
import { UGBCheckbox } from '../Global/UGBCheckbox';
import UGBLabel from '../Global/UGBLabel';
import { UGBMenuItem, UGBSelect } from '../Global/UGBSelect';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ListItemText } from '@material-ui/core';
import { UGBButton } from '../Global/UGBButton';
import { useEffect } from 'react';
import UGBModal from '../Global/UGBModal';
import { UGBIconInput, UGBInputArea } from '../Global/UGBInput';
import { getData, postData } from '../utils/FetchUtils';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import isURL from 'validator/es/lib/isURL';
import isEmpty from 'validator/es/lib/isEmpty';
import UGBLink from '../Global/UGBLink';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titleSection: {
        marginBottom: '16px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px',
        maxWidth: '520px'
    },
    select: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        gap: 10,
        '& .MuiAutocomplete-root': {
            width: '100%'
        },
        '@media (max-width: 445px)': {
            flexDirection: 'column',
            alignItems: "start",
            gap: 0,
            marginTop: '5px'
        }
    },
    autocomplete: {
        marginTop: '12px',
    },
    exerciseMapping: {
        marginTop: '8px',
        minHeight: '530px',
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
        '@media (max-width: 560px)': {
            flexDirection: 'column',
        }
    },
    mergeBtn: {
        width: '187px',
        height: '42px',
        '@media (max-width: 560px)': {
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
    exercisesContent: {
        background: 'red'
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

const AddNewExercise = ({ onClose, missingExerciseName }) => {
    const styles = useStyles();
    const videoLink = useState('');
    const videoLinkPassed = useState(true);

    const exercise = useState(missingExerciseName || '');
    const exercisePassed = useState(true);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (exercise[0] && exercisePassed[0] && videoLinkPassed[0]) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [exercise[0], exercisePassed[0], videoLinkPassed[0]])

    function addExercise(e) {
        e.preventDefault();
        if (!(exercise[0] && exercisePassed[0] && videoLinkPassed[0])) {
            return;
        }

        postData(process.env.REACT_APP_HOST + '/api/workout/add-exercise', { exercise: exercise[0], videoUrl: videoLink[0] })
            .then(data => {
                onClose();
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    return (
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

function ExerciseListItem({ exType = 'superset', supersetItems, setExercisesForMerge, exercisesForMerge, setSessionExercises, sessionExercises, setToggleExerciseContent, setSelectedSessionExercise }) {
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

const WorkoutBuilder = () => {
    const styles = useStyles();
    const history = useHistory();
    const { tab } = useQuery();

    const [showAddNewWorkoutJournal, setShowAddNewWorkoutJournal] = useState(false);
    const [showAddNewWorkoutSession, setShowAddNewWorkoutSession] = useState(true);
    const [showAddNewExercise, setShowAddNewExercise] = useState(true);

    const selectedWorkoutJournal = useState('');
    const [selectedWorkoutJournalObj, setSelectedWorkoutJournalObj] = useState(null);
    const [workoutJournals, setWorkoutJournals] = useState([]);
    const [refreshWorkoutJournals, setRefreshWorkoutJournals] = useState({});

    const selectedWorkoutSession = useState('');
    const [selectedWorkoutSessionObj, setSelectedWorkoutSessionObj] = useState(null);
    const [workoutSessions, setWorkoutSessions] = useState([]);
    const [refreshWorkoutSessions, setRefreshWorkoutSessions] = useState({});
    const [addWorkoutSessionDisabled, setAddWorkoutSessionDisabled] = useState(true);

    const [selectedSessionExercise, setSelectedSessionExercise] = useState({});
    const [sessionExercises, setSessionExercises] = useState([]);
    const [addSessionExerciseDisabled, setAddSessionExerciseDisabled] = useState(true);

    const [exercisesForMerge, setExercisesForMerge] = useState([]);
    const [exercisesForMergeDisabled, setExercisesForMergeDisabled] = useState(true);

    const [toggleExerciseContent, setToggleExerciseContent] = useState(false);
    const [missingExerciseName, setMissingExerciseName] = useState('');

    useEffect(() => {
        switch (tab) {
            case 'add-new-workout-journal':
                setShowAddNewWorkoutJournal(true);
                setShowAddNewExercise(false);
                setShowAddNewWorkoutSession(false);
                break;
            case 'add-new-workout-session':
                setShowAddNewWorkoutSession(true);
                setShowAddNewExercise(false);
                setShowAddNewWorkoutJournal(false);
                break;
            case 'add-new-exercise':
                setShowAddNewExercise(true);
                setShowAddNewWorkoutSession(false);
                setShowAddNewWorkoutJournal(false);
                break;
            default:
                setShowAddNewWorkoutJournal(false);
                setShowAddNewWorkoutSession(false);
                setShowAddNewExercise(false);
                break;
        }
    }, [tab])

    useEffect(() => {
        getData(process.env.REACT_APP_HOST + `/api/workout/get-workout-journals`)
            .then(data => {
                setWorkoutJournals(data.data);
                if (data.data.length) {
                    selectedWorkoutJournal[1](data.data[0].id);
                }
            }, error => { })
    }, [refreshWorkoutJournals])

    useEffect(() => {
        if (selectedWorkoutJournal[0]) {
            const tempSelectedWorkoutJournalObj = workoutJournals.find(x => x.id === selectedWorkoutJournal[0]);
            if (tempSelectedWorkoutJournalObj) {
                setSelectedWorkoutJournalObj(tempSelectedWorkoutJournalObj);
                setAddWorkoutSessionDisabled(false);
            } else {
                setSelectedWorkoutJournalObj(null);
                setAddWorkoutSessionDisabled(true);
            }

            getData(process.env.REACT_APP_HOST + `/api/workout/get-workout-journal-sessions?filter=${selectedWorkoutJournal[0]}`)
                .then(data => {
                    setWorkoutSessions(data.data);
                    if (data.data.length) {
                        selectedWorkoutSession[1](data.data[0].id);
                    }
                }, error => { })
        }
    }, [selectedWorkoutJournal[0], refreshWorkoutSessions])

    useEffect(() => {
        //TODO
        if (selectedWorkoutSession[0]) {
            const tempSelectedWorkoutSessionObj = workoutSessions.find(x => x.id === selectedWorkoutSession[0]);
            if (tempSelectedWorkoutSessionObj) {
                setSelectedWorkoutSessionObj(tempSelectedWorkoutSessionObj);
                setAddSessionExerciseDisabled(false);
            } else {
                setSelectedWorkoutSessionObj(null);
                setAddSessionExerciseDisabled(true);
            }

            // getData(process.env.REACT_APP_HOST + `/api/workout/get-session-exercises?filter=${selectedWorkoutSession[0]}`)
            //     .then(data => {
            //             setSessionExercises(data.data);
            //     }, error => { })
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
            <div className={styles.container}>
                <div className={styles.titleSection}>
                    <UGBLabel variant='h5' type='title'>
                        Workout Builder
                    </UGBLabel>
                    <UGBLabel variant='subtitle1' type='title'>
                        Click the "ADD" button to add a non existing journal, session or exercise
                    </UGBLabel>
                </div>
                <div className={styles.select}>
                    <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                        Workout Journal
                    </UGBLabel>
                    <UGBSelect
                        $value={selectedWorkoutJournal}
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
                    >
                        {workoutJournals.map(x => {
                            return (
                                <UGBMenuItem key={x.id} value={x.id}>
                                    {x.name}
                                </UGBMenuItem>
                            )
                        })}
                    </UGBSelect>
                </div>
                <div className={styles.select}>
                    <UGBLabel variant='subtitle2' type='title' minWidth='107px'>
                        Workout Session
                    </UGBLabel>
                    <UGBSelect
                        $value={selectedWorkoutSession}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <UGBIconButton disabled={addWorkoutSessionDisabled} isEnd={false} $onClick={() => history.push('?tab=add-new-workout-session')} >
                                        ADD
                                    </UGBIconButton>
                                </InputAdornment>
                            ),
                            labelWidth: 70
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
                            <UGBLabel variant='subtitle1' type='title' minWidth='107px'>
                                Exercises for the following workout session:
                            </UGBLabel>
                            <div className={styles.mergeBtn}>
                                {!exercisesForMergeDisabled ?
                                    <UGBButton disabled={exercisesForMergeDisabled} btnType='primary' onClick={onClickMerge}>Merge Into Superset</UGBButton>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <List className={styles.exercisesList}>
                            {sessionExercises.map(ex => {
                                if (ex.superset) {
                                    return (
                                        <List>
                                            <ExerciseListItem
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
                                Exercise
                            </UGBLabel>
                            <ExercisesAutoComplete
                                disabled={addSessionExerciseDisabled}
                                setMissingExerciseName={setMissingExerciseName}
                                onSelectedExercise={ex => {
                                    for (const exx of sessionExercises) {
                                        if (exx.superset && exx.superset.find(exxx => ex.id === exxx.id)) {
                                            return;
                                        }
                                        if (ex.id === exx.id) {
                                            return;
                                        }
                                    }
                                    setSessionExercises([...sessionExercises, ex])
                                }}
                            />
                        </div>
                    </div>
                    <div className={clsx(
                        styles.exercisesContent,
                        styles.collapseContent,
                        toggleExerciseContent ?
                            styles.collapseExercisesContentTransition
                            :
                            styles.collapsed
                    )}>
                        <IconButton onClick={(e) => {
                            e.stopPropagation();
                            setToggleExerciseContent(false);
                            setSelectedSessionExercise({});
                        }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={styles.saveAndResetActions}>
                    {/* <UGBButton className={styles.defaultButton} onClick={resetToDefault} btnType='outlinedPrimary' variant='outlined'>Reset To Default</UGBButton> */}
                    <UGBButton onClick={saveChanges} btnType='primary' >Save Changes</UGBButton>
                </div>
            </div>
        </>
    );
}

export default WorkoutBuilder;