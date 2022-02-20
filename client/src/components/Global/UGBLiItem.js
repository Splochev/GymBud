import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
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
        height: '100%',
        borderBottom: '2px solid #343A40',
        '&:hover': {
            color: '#1E7E34 !important',
            borderBottom: '2px solid #1E7E34 !important',
            '& .MuiSvgIcon-root': {
                color: '#1E7E34 !important',
            },
        }
    },
    badge: {
        fontSize: '12px',
        verticalAlign: 'text-top',
        marginLeft: '5px'
    },
}));


const LiItem = ({ path, active, badge, type = 'link', anchor, setAnchor, menuItems, customLabel, variant = 'li', shrinkUrl = true, children }) => {
    const styles = useStyles();
    const size = useWindowSize();
    const history = useHistory();

    if (type === 'select') {
        return (
            <div className={variant === 'li' ? "nav-item" : null}>
                {customLabel ?
                    { ...children }
                    :
                    <a
                        className={clsx(
                            "nav-link",
                            styles.navUrls,
                            active ? styles.active : null,
                            shrinkUrl ? size.width < 970 ? styles.shrinkUrl : null : null
                        )}
                        href="#!"
                        onClick={(e) => {
                            e.preventDefault();
                            setAnchor(e.currentTarget)
                        }}
                    >
                        {children}
                        <ArrowDropDown style={{ color: '#FFFFFF' }} />
                    </a>
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
                            {menuItems.map(item => {
                                return (
                                    <MenuItem key={item.label}>
                                        {item.path ?
                                            <Link
                                                component={NavLink}
                                                exact={true}
                                                to={item.path}
                                                onClick={() => setAnchor(null)}
                                            >
                                                {item.labels ?
                                                    item.labels.map(l => (
                                                        <div>{l}</div>
                                                    ))
                                                    :
                                                    item.label
                                                }
                                            </Link>
                                            :
                                            <Link key={item.label} onClick={item.onClick}>
                                                {item.labels ?
                                                    item.labels.map(l => (
                                                        <div key={item.l}>{l}</div>
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
            </div>
        );
    };

    return (
        <li className="nav-item">
            <a className={clsx("nav-link", styles.navUrls, shrinkUrl ? size.width < 970 ? styles.shrinkUrl : null : null, active ? styles.active : null)}
                href="#!"
                onClick={(e) => {
                    e.preventDefault();
                    if (path) { history.push(path) }
                }}
            >
                {children}
                {badge || badge === 0 ?
                    <span className={clsx("badge badge-pill badge-secondary", styles.badge)}>
                        {badge}
                    </span>
                    :
                    null
                }
            </a>
        </li>
    );
}

export default LiItem;