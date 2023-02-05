import { useState } from "react";
import UGBLabel from "../Global/UGBLabel";
import { UGBMenuItem, UGBSelect } from "../Global/UGBSelect";
import WeightTracker from "./WeightTracker";
import { makeStyles } from '@material-ui/core';
import { UGBButton } from "../Global/UGBButton";
import { useHistory } from 'react-router-dom';
import TuneIcon from '@material-ui/icons/Tune';
import { IconButton } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { MenuList } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import clsx from "clsx";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import UGBModal from "../Global/UGBModal";
import { deleteData } from '../utils/FetchUtils.js';
import { useStoreContext } from "../store/Store";


const useStyles = makeStyles((theme) => ({
    pageLayout: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
        '@media (max-width: 400px)': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        }
    },
    title: {
        display: 'flex',
        '@media (max-width: 735px)': {
            justifyContent: 'center',
        }
    },
    toolbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 735px)': {
            flexDirection: 'column',
            gap: theme.spacing(1),
            justifyContent: 'center',
        }
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(1),
        '& .MuiButton-root': {
            width: theme.spacing(17)
        },
        '@media (max-width: 735px)': {
            width: '100%',
            justifyContent: 'center',
        },
    },
    select: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        '& .MuiInputBase-root': {
            maxWidth: theme.spacing(31),
        },
        '& .MuiTypography-root': {
            minWidth: theme.spacing(10.125)
        },
        '@media (max-width: 735px)': {
            justifyContent: 'center',
        }
    },
    groupBy: {
        padding: theme.spacing(1),
        color: '#28A745',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    },
    menuItem: {
        textTransform: 'capitalize',
    },
    active: {
        color: '#28A745',
        background: '#F5F5F5'
    },
    resetWeightEntriesModalActions: {
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
}));

const ResetWeightEntriesModal = ({onClose}) => {
    const styles = useStyles();
    const store = useStoreContext();

    async function resetWeightEntries(e) {
        e.preventDefault();
        await deleteData(process.env.REACT_APP_HOST + '/api/weight-tracker/delete-weight-entries')
            .then(() => {
                store[1](state => (state.refreshCharts = {}, { ...state }))
                onClose();
            }, error => {
                console.log('DELETE ALL ENTRIES ERROR--->', error)
                onClose();
            })
    };

    return (
        <>
            <div className={styles.titleSection}>
                <UGBLabel variant='h5'>
                    Are you sure you want to delete all weight entries?
                </UGBLabel>
            </div>
            <div className={styles.resetWeightEntriesModalActions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='outlinedSecondary'
                    onClick={resetWeightEntries}
                >
                    Delete
                </UGBButton>
            </div>
        </>
    );
};

const Progress = () => {
    const styles = useStyles();
    const history = useHistory();
    const [progressTypes] = useState([{ id: 1, label: 'Weight' }, { id: 2, label: 'Strength' }]);
    const [groupByTypes] = useState(['week', 'month', 'quarter', 'year']);
    const selectedProgressType = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [groupBy, setGroupBy] = useState('week');
    const [showResetWeightEntriesModal, setShowResetWeightEntriesModal] = useState(false);

    return (
        <div className={styles.pageLayout}>
            <UGBModal
                open={showResetWeightEntriesModal}
                onClose={() => setShowResetWeightEntriesModal(false)}
                maxWidth='xs'
            >
                <ResetWeightEntriesModal onClose={() => setShowResetWeightEntriesModal(false)}/>
            </UGBModal>
            <div className={styles.title}>
                <UGBLabel variant='h5'>
                    Track Progress
                </UGBLabel>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.select}>
                    <UGBLabel variant='subtitle2'>
                        Tracker Type
                    </UGBLabel>
                    <UGBSelect label='' $value={selectedProgressType}>
                        {progressTypes.map(x => {
                            return (
                                <UGBMenuItem key={x.id} value={x.id}>
                                    {x.label}
                                </UGBMenuItem>
                            )
                        })}
                    </UGBSelect>
                </div>
                {selectedProgressType[0] === 1 ?
                    <div className={styles.actions}>
                        <UGBButton btnType='primary'
                            onClick={() => {
                                history.push("?tab=edit-weight-entries");
                            }}
                        >
                            Edit Weight
                        </UGBButton>
                        <UGBButton
                            btnType='primary'
                            onClick={() => {
                                history.push("?tab=track-weight");
                            }}
                        >
                            Track Weight
                        </UGBButton>
                        <IconButton
                            className={styles.groupBy}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <TuneIcon />
                        </IconButton>
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
                                {groupByTypes.map((tempGroupBy, j) => {
                                    return (
                                        <MenuItem
                                            className={clsx(
                                                styles.menuItem,
                                                groupBy === tempGroupBy ?
                                                    styles.active
                                                    :
                                                    null
                                            )}
                                            key={j}
                                            onClick={(e) => {
                                                setGroupBy(tempGroupBy);
                                                setAnchorEl(null);
                                            }}
                                        >
                                            {tempGroupBy}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </Popover>
                        <IconButton
                            className={styles.groupBy}
                            onClick={(e) => setShowResetWeightEntriesModal(true)}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                    </div>
                    :
                    null
                }
            </div>
            {selectedProgressType[0] === 1 ? <WeightTracker groupBy={groupBy} /> : null}
        </div >
    );
}

export default Progress;