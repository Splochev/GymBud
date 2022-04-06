import { useState } from "react";
import UGBLabel from "../Global/UGBLabel";
import { UGBMenuItem, UGBSelect } from "../Global/UGBSelect";
import WeightTracker from "./WeightTracker";
import { makeStyles } from '@material-ui/core';
import activityTracker from '../assets/activityTracker.svg'
import { UGBButton } from "../Global/UGBButton";
import { useHistory } from 'react-router-dom';
import TuneIcon from '@material-ui/icons/Tune';
import { IconButton } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { MenuList } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    pageLayout: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
        '@media (max-width: 330px)': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        }
    },
    title: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        '@media (max-width: 675px)': {
            justifyContent: 'center',
        }
    },
    toolbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 675px)': {
            flexDirection: 'column',
            gap: theme.spacing(1),
            justifyContent: 'center',
        }
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(1),
        '& .MuiButton-root': {
            width: theme.spacing(16.25)
        },
        '@media (max-width: 675px)': {
            width: '100%',
            justifyContent: 'center',
        }
    },
    select: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        '& .MuiInputBase-root': {
            maxWidth: theme.spacing(31),
        },
        '@media (max-width: 675px)': {
            justifyContent: 'center',
        }
    },
    svg: {
        width: 'auto',
        height: theme.spacing(43),
    },
    bottomBackgroundImage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
        '@media (max-width: 1000px)': {
            display: 'none'
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
    }
}));

const Progress = () => {
    const styles = useStyles();
    const history = useHistory();
    const [progressTypes] = useState([{ id: 1, label: 'Weight' }, { id: 2, label: 'Strength' }]);
    const [groupByTypes] = useState(['week', 'month', 'quarter', 'year']);
    const selectedProgressType = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [groupBy, setGroupBy] = useState('week');

    return (
        <div className={styles.pageLayout}>
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
                            Add Weight
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
                    </div>
                    :
                    null
                }
            </div>
            {selectedProgressType[0] === 1 ? <WeightTracker groupBy={groupBy} /> : null}
            <div className={styles.bottomBackgroundImage}>
                <img className={styles.svg} src={activityTracker} alt='' />
            </div>
        </div >
    );
}

export default Progress;