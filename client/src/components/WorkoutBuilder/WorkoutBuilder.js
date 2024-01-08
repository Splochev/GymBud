/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { List as ReactMovableList, arrayMove } from "react-movable";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  List,
  IconButton,
  InputAdornment,
  makeStyles,
  Popover,
} from "@material-ui/core";
import { ExercisesAutoComplete } from "../Autocompletes/ExercisesAutocomplete";
import { UGBIconButton, UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBMenuItem, UGBSelect } from "../Global/UGBSelect";
import UGBModal from "../Global/UGBModal";
import { getData, postData } from "../utils/FetchUtils";
import { useQuery } from "../utils/RouteUtils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import lifting3 from "../assets/lifting3.svg";
import addMarkersSvg from "../assets/mark.svg";
import lifting2 from "../assets/lifting2.svg";
import clsx from "clsx";
import WeightAndRepsGoal from "./WeightAndRepsGoal";
import RepetitionsComponent from "./RepetitionsComponent";
import AddNewExercise from "./AddNewExercise";
import AddNewWorkoutJournal from "./AddNewJournal";
import EditWorkoutJournal from "./EditWorkoutJournal";
import ExerciseListItem from "./ExerciseListItem";
import DeleteWorkoutJournal from "./DeleteWorkoutJournal";
import AddNewWorkoutSession from "./AddNewWorkoutSession";
import EditWorkoutSession from "./EditWorkoutSession";
import DeleteWorkoutSession from "./DeleteWorkoutSession";
import AddSets from "./AddSets";
import AddMarkers from "./AddMarkers";

const useStyles = makeStyles((theme) => ({
  leftSideContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    width: theme.spacing(65),
    "@media (max-width: 1350px)": {
      width: theme.spacing(56.25),
    },
    "@media (max-width: 1150px)": {
      width: theme.spacing(50),
    },
    "@media (max-width: 1000px)": {
      width: "100%",
      minWidth: "auto",
    },
  },
  select: {
    width: "100%",
    display: "flex",
    gap: 0,
    marginTop: theme.spacing(1),
    flexDirection: "column",
    alignItems: "start",
    "& .MuiAutocomplete-root": {
      width: "100%",
    },
  },
  autocomplete: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  exerciseMapping: {
    height: theme.spacing(73),
  },
  exercisesList: {
    height: "450px",
    overflow: "auto",
    "& .MuiListItem-gutters": {
      paddingLeft: 0,
      paddingRight: 0,
    },
    "& .MuiList-padding": {
      paddingTop: 0,
      paddingBottom: 0,
    },
    "& .MuiListItem-root": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  saveAndResetActions: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "baseline",
    justifyContent: "end",
  },
  toolbar: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  toolbarTitle: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  mergeBtn: {
    height: theme.spacing(5.25),
    width: theme.spacing(23.375),
    minWidth: theme.spacing(23.375),
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "end",
      width: "100%",
    },
  },
  collapsed: {
    width: "0px",
    height: "0px",
  },
  collapseContent: {
    overflow: "hidden",
    transition: "width 0.2s",
    transitionTimingFunction: "ease-in",
  },
  collapseContentTransition: {
    overflow: "unset",
    width: "100%",
    height: "100%",
  },
  collapseExercisesContentTransition: {
    overflow: "unset",
    width: "100%",
    height: "100%",
    minHeight: theme.spacing(66.25),
  },
  exercisesContentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    borderRadius: theme.spacing(3.75),
    "&:hover": {
      cursor: "pointer",
    },
  },
  exercisesContent: {
    width: theme.spacing(27.5),
    height: theme.spacing(27.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  svg: {
    width: "100%",
    height: "auto",
  },
  exercisesContentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  exercisesContentHeaderAlign: {
    alignItems: "baseline",
  },
  rightSideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  pageContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(3.75),
    paddingRight: theme.spacing(3.75),
    "@media (max-width: 550px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  editButton: {
    padding: theme.spacing(1),
    color: "#28A745",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  deleteButton: {
    padding: theme.spacing(1),
    color: "#DC3545",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  selectAndEditContainer: {
    width: "100%",
    display: "flex",
    gap: theme.spacing(1),
  },
  divFiller: {
    width: theme.spacing(6),
  },
}));

const getMarkers = (markers) => {
  let resMarkers = [];
  let periodization = "";
  let intensityVolume = "";

  for (const marker of markers) {
    if (marker.marker === "Periodization") {
      periodization = marker.markerValue;
    } else if (marker.marker === "Intensity Volume") {
      intensityVolume = marker.markerValue;
    } else {
      resMarkers.push(`${marker.marker}|${marker.markerValue}`);
    }
  }
  return { markers: resMarkers, periodization: periodization, intensityVolume };
};

const getSets = (sets) => {
  let resSets = [];
  for (const set of sets) {
    resSets.push(`${set.set.slice(4)}|${set.reps || ""}|${set.rest || ""}`);
  }
  return resSets;
};

const WorkoutBuilder = () => {
  const styles = useStyles();
  const history = useHistory();
  const { tab } = useQuery();
  const [showAddNewWorkoutJournal, setShowAddNewWorkoutJournal] =
    useState(false);
  const [showAddNewWorkoutSession, setShowAddNewWorkoutSession] =
    useState(true);
  const [showAddNewExercise, setShowAddNewExercise] = useState(true);
  const [showEditWorkoutJournal, setShowEditWorkoutJournal] = useState(false);
  const [showDeleteWorkoutJournal, setShowDeleteWorkoutJournal] =
    useState(false);
  const [showEditWorkoutSession, setShowEditWorkoutSession] = useState(false);
  const [showDeleteWorkoutSession, setShowDeleteWorkoutSession] =
    useState(false);
  const selectedWorkoutJournal = useState("");
  const [selectedWorkoutJournalObj, setSelectedWorkoutJournalObj] =
    useState(null);
  const [workoutJournals, setWorkoutJournals] = useState([]);
  const [refreshWorkoutJournals, setRefreshWorkoutJournals] = useState({});
  const selectedWorkoutSession = useState("");
  const [selectedWorkoutSessionObj, setSelectedWorkoutSessionObj] =
    useState(null);
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [disableWorkoutJournalDependants, setDisableWorkoutJournalDependants] =
    useState(true);
  const [refreshWorkoutSessions, setRefreshWorkoutSessions] = useState({});
  const [selectedSessionExercise, setSelectedSessionExercise] = useState({});
  const [sessionExercises, setSessionExercises] = useState([]);
  const [sessionExercisesAsString, setSessionExercisesAsString] =
    useState("[]");
  const [exercisesForMerge, setExercisesForMerge] = useState([]);
  const [exercisesForMergeDisabled, setExercisesForMergeDisabled] =
    useState(true);
  const [toggleExerciseContent, setToggleExerciseContent] = useState(false);
  const [missingExerciseName, setMissingExerciseName] = useState("");
  const [showExerciseAddSet, setShowExerciseAddSet] = useState(false);
  const [showAddMarkers, setShowAddMarkers] = useState(false);
  const [hideExerciseContent, setHideExerciseContent] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [
    keepCollapseOpenedForSupersetItems,
    setKeepCollapseOpenedForSupersetItems,
  ] = useState({});
  const [showRepetitionsComponent, setShowRepetitionsComponent] =
    useState(false);
  const [
    refreshWorkoutJournalSessionExercises,
    setRefreshWorkoutJournalSessionExercises,
  ] = useState({});
  const [timeValidations, setTimeValidations] = useState({});
  const [repsValidations, setRepsValidations] = useState({});
  const [showWeightAndRepsGoal, setShowWeightAndRepsGoal] = useState(null);

  useEffect(() => {
    switch (tab) {
      case "add-new-workout-journal":
        setShowAddNewWorkoutJournal(true);
        setShowAddNewExercise(false);
        setShowAddNewWorkoutSession(false);
        setShowEditWorkoutJournal(false);
        break;
      case "add-new-workout-session":
        setShowAddNewWorkoutSession(true);
        setShowAddNewExercise(false);
        setShowAddNewWorkoutJournal(false);
        setShowEditWorkoutJournal(false);
        break;
      case "add-new-exercise":
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
  }, [tab]);

  useEffect(() => {
    getData(
      process.env.REACT_APP_HOST + `/api/workout/get-workout-journals`
    ).then(
      (data) => {
        setWorkoutJournals(data.data);
        if (data.data.length) {
          selectedWorkoutJournal[1](data.data[0].id);
        } else {
          selectedWorkoutSession[1]("");
          setSelectedWorkoutSessionObj(null);
          setWorkoutSessions([]);
          setSelectedWorkoutJournalObj(null);
          setDisableWorkoutJournalDependants(true);
        }
      },
      (error) => {}
    );
  }, [refreshWorkoutJournals]);

  useEffect(() => {
    if (selectedWorkoutJournal[0]) {
      const tempSelectedWorkoutJournalObj = workoutJournals.find(
        (x) => x.id === selectedWorkoutJournal[0]
      );
      if (tempSelectedWorkoutJournalObj) {
        setSelectedWorkoutJournalObj(tempSelectedWorkoutJournalObj);
        setDisableWorkoutJournalDependants(false);
      } else {
        setSelectedWorkoutJournalObj(null);
        setDisableWorkoutJournalDependants(true);
      }

      getData(
        process.env.REACT_APP_HOST +
          `/api/workout/get-workout-journal-sessions?filter=${selectedWorkoutJournal[0]}`
      ).then(
        (data) => {
          setWorkoutSessions(data.data);
          if (data.data.length) {
            selectedWorkoutSession[1](data.data[0].id);
          } else {
            selectedWorkoutSession[1]("");
            setSelectedWorkoutSessionObj(null);
          }
        },
        (error) => {}
      );
    }
  }, [selectedWorkoutJournal[0], refreshWorkoutSessions]);

  useEffect(() => {
    setSessionExercisesAsString("[]");
    setSelectedSessionExercise({});
    setExercisesForMerge([]);
    setSessionExercises([]);
    setExercisesForMergeDisabled(true);
    setToggleExerciseContent(false);
    setShowExerciseAddSet(false);
    setShowAddMarkers(false);
    setHideExerciseContent(false);

    if (selectedWorkoutSession[0]) {
      const tempSelectedWorkoutSessionObj = workoutSessions.find(
        (x) => x.id === selectedWorkoutSession[0]
      );
      if (tempSelectedWorkoutSessionObj) {
        setSelectedWorkoutSessionObj(tempSelectedWorkoutSessionObj);
      } else {
        setSelectedWorkoutSessionObj(null);
      }

      getData(
        process.env.REACT_APP_HOST +
          `/api/workout/get-workout-journal-session-exercises?workoutSessionId=${selectedWorkoutSession[0]}`
      ).then(
        (data) => {
          setSessionExercisesAsString(JSON.stringify(data.data));
          setSessionExercises(data.data);
        },
        (error) => {}
      );
    }
  }, [selectedWorkoutSession[0], refreshWorkoutJournalSessionExercises]);

  useEffect(() => {
    if (exercisesForMerge.length && exercisesForMerge.length > 1) {
      setExercisesForMergeDisabled(false);
    } else {
      setExercisesForMergeDisabled(true);
    }
  }, [exercisesForMerge]);

  useEffect(() => {
    if (
      Object.keys(timeValidations).length ||
      Object.keys(repsValidations).length
    ) {
      setDisableSave(true);
      return;
    }

    const tempSessionExercisesAsString = JSON.stringify(sessionExercises);
    if (sessionExercisesAsString === tempSessionExercisesAsString) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [
    sessionExercises,
    sessionExercisesAsString,
    timeValidations,
    repsValidations,
  ]);

  useEffect(() => {
    if (exercisesForMergeDisabled && !exercisesForMerge.length) {
      const checkboxes = document
        .getElementsByClassName("exercises-list")[0]
        .querySelectorAll("[type~=checkbox]");
      for (const checkbox of checkboxes) {
        if (checkbox.checked) {
          checkbox.parentElement.parentElement.click();
        }
      }
    }
  }, [exercisesForMergeDisabled, exercisesForMerge]);

  const saveChanges = () => {
    const tempSessionExercises = [];
    let order = 1;

    for (const sessionExercise of sessionExercises) {
      if (sessionExercise.superset) {
        let supersetOrder = 1;
        for (const supersetSessionExercise of sessionExercise.superset) {
          let sets = getSets(supersetSessionExercise.sets);
          let markersData = getMarkers(supersetSessionExercise.markers);
          let markers = markersData.markers;
          let periodization = markersData.periodization;
          let intensityVolume = markersData.intensityVolume;
          tempSessionExercises.push({
            ...supersetSessionExercise,
            ordered: Number(`${order}.${supersetOrder}`),
            sets: sets.join(","),
            markers: markers.join(","),
            periodization: periodization,
            intensityVolume: intensityVolume,
            setsCount: supersetSessionExercise.sets.length,
            markersCount: supersetSessionExercise.markers.length,
          });
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
          sets: sets.join(","),
          markers: markers.join(","),
          periodization: periodization,
          intensityVolume: intensityVolume,
          setsCount: sessionExercise.sets.length,
          markersCount: sessionExercise.markers.length,
        });
      }
      order++;
    }

    postData(
      process.env.REACT_APP_HOST +
        "/api/workout/add-workout-journal-session-exercises",
      {
        workoutSessionId: selectedWorkoutSessionObj.id,
        sessionExercises: tempSessionExercises,
      }
    ).then(
      () => {
        setRefreshWorkoutJournalSessionExercises({});
      },
      (error) => {
        console.error("LOGOUT ERROR--->", error);
        setRefreshWorkoutJournalSessionExercises({});
      }
    );
  };

  const onClickMerge = () => {
    const tempSessionExercises = sessionExercises.filter(
      (exx) => !exercisesForMerge.includes(exx)
    );
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
  };

  function onClickRepetitionsButton(ex) {
    setShowRepetitionsComponent(true);
  }

  return (
    <>
      <>
        <UGBModal
          open={showDeleteWorkoutSession}
          onClose={() => setShowDeleteWorkoutSession(false)}
          maxWidth="xs"
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
          maxWidth="xs"
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
          maxWidth="xs"
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
          maxWidth="xs"
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
          maxWidth="xs"
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
          maxWidth="xs"
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
          maxWidth="xs"
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
            <UGBLabel variant="h5">Workout</UGBLabel>
          </div>
          <div className={styles.select}>
            <UGBLabel variant="subtitle2">Workout Program</UGBLabel>
            <div className={styles.selectAndEditContainer}>
              <UGBSelect
                disabled={!workoutJournals.length}
                $value={selectedWorkoutJournal}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UGBIconButton
                        isEnd={false}
                        $onClick={() =>
                          history.push("?tab=add-new-workout-journal")
                        }
                      >
                        ADD
                      </UGBIconButton>
                    </InputAdornment>
                  ),
                }}
              >
                {workoutJournals.map((x) => {
                  return (
                    <UGBMenuItem key={x.id} value={x.id}>
                      {x.name}
                    </UGBMenuItem>
                  );
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
            <UGBLabel variant="subtitle2">Workout Day</UGBLabel>
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
                        $onClick={() =>
                          history.push("?tab=add-new-workout-session")
                        }
                      >
                        ADD
                      </UGBIconButton>
                    </InputAdornment>
                  ),
                }}
              >
                {workoutSessions.map((x) => {
                  return (
                    <UGBMenuItem key={x.id} value={x.id}>
                      {x.name}
                    </UGBMenuItem>
                  );
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
                !toggleExerciseContent
                  ? styles.collapseContentTransition
                  : styles.collapsed
              )}
            >
              <div className={styles.toolbar}>
                <div className={styles.toolbarTitle}>
                  <IconButton
                    className={styles.editButton}
                    onClick={(e) => setShowWeightAndRepsGoal(e.currentTarget)}
                  >
                    <i class="fa-solid fa-crosshairs" />
                  </IconButton>
                  <Popover
                    open={Boolean(showWeightAndRepsGoal)}
                    anchorEl={showWeightAndRepsGoal}
                    onClose={() => setShowWeightAndRepsGoal(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <WeightAndRepsGoal exercisesList={sessionExercises} />
                  </Popover>
                  <UGBLabel variant="subtitle1">Exercises:</UGBLabel>
                </div>
                <div className={styles.mergeBtn}>
                  <UGBButton
                    disabled={exercisesForMergeDisabled}
                    onClick={onClickMerge}
                    btnType={exercisesForMergeDisabled ? "" : "outlinedPrimary"}
                  >
                    Merge Into Superset
                  </UGBButton>
                </div>
              </div>
              <ReactMovableList
                values={sessionExercises}
                onChange={({ oldIndex, newIndex }) =>
                  setSessionExercises(
                    arrayMove(sessionExercises, oldIndex, newIndex)
                  )
                }
                renderList={({ children, props }) => (
                  <List
                    className={clsx(styles.exercisesList, "exercises-list")}
                    {...props}
                  >
                    {children}
                  </List>
                )}
                renderItem={({ value, props }) => (
                  <ExerciseListItem
                    key={
                      value.superset
                        ? `superset-exerciseListItem-${value.superset[0].id}-${value.superset[1].id}`
                        : value.id
                    }
                    exType={value.superset ? "superset" : "single-exercise"}
                    supersetItems={value}
                    setExercisesForMerge={setExercisesForMerge}
                    exercisesForMerge={exercisesForMerge}
                    setSessionExercises={setSessionExercises}
                    sessionExercises={sessionExercises}
                    setToggleExerciseContent={setToggleExerciseContent}
                    setSelectedSessionExercise={setSelectedSessionExercise}
                    _props={props}
                    keepCollapseOpenedForSupersetItems={
                      keepCollapseOpenedForSupersetItems
                    }
                    setKeepCollapseOpenedForSupersetItems={
                      setKeepCollapseOpenedForSupersetItems
                    }
                    onClickRepetitionsButton={onClickRepetitionsButton}
                  />
                )}
              />
              <div className={clsx(styles.select, styles.autocomplete)}>
                <ExercisesAutoComplete
                  disabled={!selectedWorkoutSession[0]}
                  setMissingExerciseName={setMissingExerciseName}
                  onSelectedExercise={(ex) => {
                    if (!selectedWorkoutSession[0]) {
                      return;
                    }

                    for (const exx of sessionExercises) {
                      if (
                        exx.superset &&
                        exx.superset.find((exxx) => ex.id === exxx.id)
                      ) {
                        return;
                      }
                      if (ex.id === exx.id) {
                        return;
                      }
                    }
                    ex.sets = [];
                    ex.markers = [];
                    setSessionExercises([...sessionExercises, ex]);
                  }}
                />
              </div>
            </div>
            <div
              className={clsx(
                styles.collapseContent,
                toggleExerciseContent
                  ? styles.collapseExercisesContentTransition
                  : styles.collapsed
              )}
            >
              <div
                className={clsx(
                  styles.exercisesContentHeader,
                  hideExerciseContent
                    ? styles.exercisesContentHeaderAlign
                    : null,
                  showRepetitionsComponent
                    ? styles.repetitionsComponentLabel
                    : null
                )}
              >
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
                        if (
                          Object.keys(timeValidations).length ||
                          Object.keys(repsValidations).length
                        ) {
                          const tempSets = selectedSessionExercise.sets;
                          for (let i = 0; i < tempSets.length; i++) {
                            if (
                              timeValidations[tempSets[i].set + "-rest"] ===
                                false ||
                              timeValidations[tempSets[i].set + "-rest"]
                            ) {
                              delete timeValidations[tempSets[i].set + "-rest"];
                              delete repsValidations[tempSets[i].set + "-reps"];
                              tempSets.splice(i, 1);
                            } else if (
                              repsValidations[tempSets[i].set + "-reps"] ===
                                false ||
                              repsValidations[tempSets[i].set + "-reps"]
                            ) {
                              delete timeValidations[tempSets[i].set + "-rest"];
                              delete repsValidations[tempSets[i].set + "-reps"];
                              tempSets.splice(i, 1);
                            }
                          }
                          setRepsValidations(repsValidations);
                          setTimeValidations(timeValidations);
                          setSelectedSessionExercise(
                            (selectedSessionExercise) => (
                              (selectedSessionExercise.sets = tempSets),
                              { ...selectedSessionExercise }
                            )
                          );
                          setSessionExercises([...sessionExercises]);
                        }
                        setShowExerciseAddSet(false);
                      }
                      if (showAddMarkers) {
                        setShowAddMarkers(false);
                      }
                      setHideExerciseContent(false);
                    } else {
                      setToggleExerciseContent(false);
                      setSelectedSessionExercise({});
                    }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <UGBLabel variant="h5">
                  {showRepetitionsComponent ? (
                    "Set reps for today's workout"
                  ) : (
                    <>
                      {selectedSessionExercise.exercise}
                      {hideExerciseContent ? <br /> : null}
                      {showExerciseAddSet ? "Add Sets" : ""}
                      {showAddMarkers ? "Add Markers" : ""}
                    </>
                  )}
                </UGBLabel>
                <div className={styles.divFiller} />
              </div>
              {showRepetitionsComponent ? (
                <RepetitionsComponent
                  exercise={selectedSessionExercise}
                  notSaved={disableSave}
                />
              ) : (
                <>
                  {!hideExerciseContent ? (
                    <>
                      <div
                        className={styles.exercisesContentContainer}
                        onClick={() => {
                          setHideExerciseContent(true);
                          setShowExerciseAddSet(true);
                          setShowAddMarkers(false);
                        }}
                      >
                        <div className={styles.exercisesContent}>
                          <img
                            src={lifting3}
                            alt="lifting"
                            className={styles.svg}
                          />
                          <UGBLabel variant="h5">Add Sets</UGBLabel>
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
                        <div className={styles.exercisesContent}>
                          <img
                            src={addMarkersSvg}
                            alt="Add Markers"
                            className={styles.svg}
                          />
                          <UGBLabel variant="h5">Add Markers</UGBLabel>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {showExerciseAddSet ? (
                        <AddSets
                          sessionExercises={sessionExercises}
                          setSessionExercises={setSessionExercises}
                          selectedSessionExercise={selectedSessionExercise}
                          setSelectedSessionExercise={
                            setSelectedSessionExercise
                          }
                          timeValidations={timeValidations}
                          setTimeValidations={setTimeValidations}
                          repsValidations={repsValidations}
                          setRepsValidations={setRepsValidations}
                        />
                      ) : null}
                      {showAddMarkers ? (
                        <AddMarkers
                          sessionExercises={sessionExercises}
                          setSessionExercises={setSessionExercises}
                          selectedSessionExercise={selectedSessionExercise}
                          setSelectedSessionExercise={
                            setSelectedSessionExercise
                          }
                        />
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {showRepetitionsComponent ? null : (
            <div className={styles.saveAndResetActions}>
              <UGBButton
                onClick={saveChanges}
                btnType="primary"
                disabled={disableSave}
              >
                Save Changes
              </UGBButton>
            </div>
          )}
        </div>
        <div className={styles.rightSideContainer}>
          <img src={lifting2} alt="lifting2" className={styles.svg} />
        </div>
      </div>
    </>
  );
};

export default WorkoutBuilder;
