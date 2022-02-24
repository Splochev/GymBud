import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Badge, makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { MenuList, Popover } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import useWindowSize from '../utils/useWindowSize';

const useStyles = makeStyles((theme) => ({
    active: {
        color: '#28A745 !important',
        borderBottom: '2px solid #28A745 !important',
        '& .MuiSvgIcon-root': {
            color: '#28A745 !important',
        },
    },
    shrinkUrl: {
        width: '143px'
    },
    navUrls: {
        fontSize: '20px',
        color: 'white',
        borderBottom: '2px solid #1B1B1B',
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
            color: '#1E7E34 !important',
            borderBottom: '2px solid #1E7E34 !important',
            '& .MuiSvgIcon-root': {
                color: '#1E7E34 !important',
            },
        }
    },
    badge: {
        verticalAlign: 'text-top',
        marginLeft: '7px',
        marginTop: '4px',
        color: 'white',
        '& .MuiBadge-badge': {
            background: '#DC3545'
        }
    },
}));

const LiItem = ({ path, active, badgeCount, type = 'link', anchor, setAnchor, menuItems, customLabel, variant = 'li', shrinkUrl = true, customShrinkUrl, children }) => {
    const styles = useStyles();
    const size = useWindowSize();
    const history = useHistory();

    if (type === 'select') {
        return (
            <>
                {customLabel ?
                    { ...children }
                    :
                    <div
                        className={clsx(
                            styles.navUrls,
                            active ? styles.active : null,
                            shrinkUrl ? size.width < 970 ? styles.shrinkUrl : null : null
                        )}
                        style={{ width: customShrinkUrl ? customShrinkUrl : '' }}
                        onClick={(e) => {
                            setAnchor(e.currentTarget)
                            if (path) { history.push(path) }
                        }}
                    >
                        {children}
                        <ArrowDropDown style={{ color: '#FFFFFF' }} />
                    </div>
                }
                <Popover
                    anchorEl={anchor}
                    keepMounted
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                >
                    {menuItems ?
                        <MenuList>
                            {menuItems.map((item, index) => {
                                return (
                                    <MenuItem key={item.label + index}>
                                        {item.path ?
                                            <Link
                                                key={item.label + index + index}
                                                component={NavLink}
                                                exact={true}
                                                to={item.path}
                                                onClick={() => setAnchor(null)}
                                            >
                                                {item.labels ?
                                                    item.labels.map((l, i) => (
                                                        <div key={item.label + l + i}>{l}</div>
                                                    ))
                                                    :
                                                    item.label
                                                }
                                            </Link>
                                            :
                                            <Link key={item.label + index} onClick={item.onClick}>
                                                {item.labels ?
                                                    item.labels.map((l, i) => (
                                                        <div key={item.label + l + i}>{l}</div>
                                                    ))
                                                    :
                                                    item.label
                                                }
                                            </Link>
                                        }
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                        :
                        null
                    }
                </Popover>
            </>
        );
    };

    return (
        <div
            className={clsx(
                styles.navUrls,
                shrinkUrl ?
                    size.width < 970 ? styles.shrinkUrl
                        :
                        null
                    :
                    null,
                active ?
                    styles.active
                    :
                    null
            )}
            style={{ width: customShrinkUrl ? customShrinkUrl : '' }}
            onClick={(e) => {
                if (path) { history.push(path) }
            }}
        >
            <span>
                {children}
                {badgeCount || badgeCount === 0 ?
                    <Badge badgeContent={badgeCount} className={styles.badge} />
                    :
                    null
                }
            </span>
        </div>
    );
}

export default LiItem;