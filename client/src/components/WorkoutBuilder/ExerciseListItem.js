import * as React from "react";
import { List as ReactMovableList, arrayMove } from "react-movable";
import { useState, useEffect } from "react";
import {
  List,
  IconButton,
  ListItemIcon,
  ListItem,
  makeStyles,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { UGBCheckbox } from "../Global/UGBCheckbox";
import isURL from "validator/es/lib/isURL";
import isEmpty from "validator/es/lib/isEmpty";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import workout from "../assets/workout.svg";
import PopoverLink from "./PopoverLink";

const useStyles = makeStyles((theme) => ({
  clearBtn: {
    minWidth: theme.spacing(5),
    "& .MuiListItemIcon-root": {
      minWidth: theme.spacing(5),
    },
  },
  changePadding: {
    padding: theme.spacing(0.375),
  },
  sort: {
    minWidth: "auto",
    "& .MuiSvgIcon-root": {
      color: "#757575",
    },
  },
  checkbox: {
    "& .MuiFormControlLabel-root": {
      marginLeft: "0",
      marginRight: "0",
      minWidth: "auto",
    },
  },
  rightSideListIem: {
    display: "flex",
    flexDirection: "row",
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
    },
  },
  sorts: {
    display: "flex",
    flexDirection: "row",
  },
  checkboxAndExpand: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
    },
  },
  rightSideSupersetListIem: {
    display: "flex",
    flexDirection: "row",
  },
  nested: {
    paddingLeft: theme.spacing(2.5),
  },
  nestedListItem: {
    "& .MuiTypography-root": {
      color: "#28A745",
    },
  },
  svg: {
    width: "100%",
    height: "auto",
  },
  supersetLabel: {
    fontWeight: "bolder",
    fontSize: theme.spacing(2.125),
  },
  arrowExpandMore: {
    transform: "rotate(90deg)",
  },
  arrowExpandLess: {
    transform: "rotate(-90deg)",
  },
  dragIndicatorIcon: {
    color: "#757575",
    marginLeft: "-6px",
  },
  workoutIcon: {
    height: "auto",
    width: "44px",
    cursor: "pointer",
  },
  repetitionsButton: {
    padding: "0px",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .MuiButtonBase-root": {
      padding: "0px",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
}));

const ExerciseListItem = ({
  exType = "superset",
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
  _props,
}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [stopTransition, setStopTransition] = useState(false);

  useEffect(() => {
    if (exType === "superset") {
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

  return exType === "superset" ? (
    <List
      key={`superset-${supersetItems.superset[0].id}-${supersetItems.superset[1].id}`}
      {..._props}
    >
      <>
        <ListItem key="superset-list-item" button={false}>
          <DragIndicatorIcon className={styles.dragIndicatorIcon} />
          <ListItemIcon className={styles.clearBtn}>
            <IconButton
              className={styles.changePadding}
              onClick={(e) => {
                e.stopPropagation();
                setSessionExercises(
                  sessionExercises.filter((exx) => exx !== supersetItems)
                );
                setExercisesForMerge(
                  exercisesForMerge.filter((exx) => exx !== supersetItems)
                );
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText
            primary={
              !open ? (
                <div>
                  <span className={styles.supersetLabel}>Superset: </span>
                  <span>
                    {(() =>
                      supersetItems.superset
                        .map((exx) => exx.exercise)
                        .join(", "))()}
                  </span>
                </div>
              ) : (
                <span className={styles.supersetLabel}>Superset: </span>
              )
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
                  <img className={styles.workoutIcon} src={workout} alt="" />
                </IconButton>
              </ListItemIcon>
              <ListItemIcon className={styles.checkbox}>
                <UGBCheckbox
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setExercisesForMerge([
                        ...exercisesForMerge,
                        supersetItems,
                      ]);
                    } else {
                      setExercisesForMerge(
                        exercisesForMerge.filter((exx) => exx != supersetItems)
                      );
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
                      keepCollapseOpenedForSupersetItems[
                        supersetItems.superset[0].id
                      ] = true;
                    } else {
                      for (let i = 0; i < supersetItems.superset.length; i++) {
                        if (
                          keepCollapseOpenedForSupersetItems[
                            supersetItems.superset[i].id
                          ]
                        ) {
                          delete keepCollapseOpenedForSupersetItems[
                            supersetItems.superset[i].id
                          ];
                          break;
                        }
                      }
                    }
                    setKeepCollapseOpenedForSupersetItems(
                      keepCollapseOpenedForSupersetItems
                    );
                  }}
                >
                  {open ? (
                    <ArrowForwardIosIcon className={styles.arrowExpandLess} />
                  ) : (
                    <ArrowForwardIosIcon className={styles.arrowExpandMore} />
                  )}
                </IconButton>
              </ListItemIcon>
            </div>
          </div>
        </ListItem>
        <Collapse
          classes={{ root: stopTransition ? { transition: "none" } : null }}
          timeout={stopTransition ? 0 : "auto"}
          in={open}
          unmountOnExit
        >
          <ReactMovableList
            values={supersetItems.superset}
            onChange={({ oldIndex, newIndex }) => {
              const tempSessionExercises = sessionExercises;
              const index = tempSessionExercises.indexOf(supersetItems);
              supersetItems.superset = arrayMove(
                supersetItems.superset,
                oldIndex,
                newIndex
              );
              tempSessionExercises[index] = supersetItems;
              setSessionExercises([...tempSessionExercises]);
            }}
            renderList={({ children, props }) => (
              <List
                component="div"
                disablePadding
                className={styles.nested}
                {...props}
              >
                {children}
              </List>
            )}
            renderItem={({ value, props }) => {
              const ex = value;
              return (
                <ListItem
                  key={ex.id}
                  className={styles.nestedListItem}
                  {...props}
                >
                  <DragIndicatorIcon className={styles.dragIndicatorIcon} />
                  <ListItemIcon className={styles.clearBtn}>
                    <IconButton
                      className={styles.changePadding}
                      onClick={(e) => {
                        e.stopPropagation();
                        const tempSessionExercises = sessionExercises;
                        supersetItems.superset = supersetItems.superset.filter(
                          (exx) => exx.id !== ex.id
                        );
                        if (supersetItems.superset.length === 1) {
                          const tempSuperSetItem = supersetItems.superset[0];
                          tempSessionExercises[
                            tempSessionExercises.indexOf(supersetItems)
                          ] = tempSuperSetItem;
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
                    secondary={
                      ex.videoLink ? (
                        <PopoverLink ex={ex} color="green" />
                      ) : null
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
  ) : (
    <>
      <ListItem key={supersetItems.id} button={false} {..._props}>
        <DragIndicatorIcon className={styles.dragIndicatorIcon} />
        <ListItemIcon className={styles.clearBtn}>
          <IconButton
            className={styles.changePadding}
            onClick={(e) => {
              e.stopPropagation();
              setSessionExercises(
                sessionExercises.filter((exx) => exx.id !== supersetItems.id)
              );
              setExercisesForMerge(
                exercisesForMerge.filter((exx) => exx.id !== supersetItems.id)
              );
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={supersetItems.exercise}
          secondary={<PopoverLink ex={supersetItems} color="primary" />}
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
                <img className={styles.workoutIcon} src={workout} alt="" />
              </IconButton>
            </ListItemIcon>
            <ListItemIcon className={styles.checkbox}>
              <UGBCheckbox
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    setExercisesForMerge([...exercisesForMerge, supersetItems]);
                  } else {
                    setExercisesForMerge(
                      exercisesForMerge.filter(
                        (exx) => exx.id !== supersetItems.id
                      )
                    );
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
};


export default ExerciseListItem;