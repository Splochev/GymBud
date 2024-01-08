/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { List, ListItem, makeStyles, Chip } from "@material-ui/core";
import UGBLabel from "../Global/UGBLabel";
import { postData } from "../utils/FetchUtils";
import muscle from "../assets/muscle.svg";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Timer from "./Timer";
import HistoryListItem from "./HistoryListItem";
import DebouncingWeightInput from "./DebouncingWeightInput";
import DebouncingRepsInput from "./DebouncingRepsInput";
import PopoverLink from "./PopoverLink";

const useStyles = makeStyles((theme) => ({
  repetitionsTabPanelContainer: {
    paddingTop: theme.spacing(1),
    display: "flex",
    width: "100%",
    height: "394px",
    flexDirection: "column",
    overflow: "auto",
  },
  chips: {
    display: "flex",
    width: "100%",
    gap: theme.spacing(1.5),
  },
  imgIcon: {
    width: "auto",
    height: "90%",
  },
  chipsAppBar: {
    "& .MuiTabs-scroller": {
      display: "flex",
      alignItems: "center",
    },
  },
  newEntries: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: theme.spacing(1),
  },
}));

const getProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const RepetitionsTabPanel = ({
  exercise,
  setIsSaving,
  setIsSaved,
  isSaving,
  isSaved,
}) => {
  const styles = useStyles();
  const [markers, setMarkers] = useState([]);
  const [historicalEntries, setHistoricalEntires] = useState({});
  const [todaysData, setTodaysData] = useState({});
  const [dailyWorkoutDataId, setDailyWorkoutDataId] = useState(null);

  useEffect(() => {
    if (exercise) {
      const markers = exercise?.markers?.length ? [...exercise.markers] : [];
      const intensityVolumeIndex = markers.findIndex(
        (m) => m.marker === "Intensity Volume"
      );
      if (intensityVolumeIndex >= 0 && intensityVolumeIndex >= 2) {
        const intensityVolume = markers[intensityVolumeIndex];
        markers.splice(intensityVolumeIndex, 1);
        markers.unshift(intensityVolume);
      }
      const periodizationIndex = markers.findIndex(
        (m) => m.marker === "Periodization"
      );
      if (intensityVolumeIndex >= 0 && periodizationIndex >= 2) {
        const periodization = markers[periodizationIndex];
        markers.splice(periodizationIndex, 1);
        markers.unshift(periodization);
      }
      setMarkers(markers);

      setDailyWorkoutDataId(exercise.dailyWorkoutDataId);
      getRepetitionsData(exercise.dailyWorkoutDataId);
    }
  }, [exercise]);

  const getRepetitionsData = (dailyWorkoutDataIds) => {
    postData(process.env.REACT_APP_HOST + "/api/workout/get-repetitions-data", [
      dailyWorkoutDataIds,
    ]).then(
      (data) => {
        setHistoricalEntires(data[0].historicalEntires);
        const _todaysData = data[0].todaysData || {};
        if (exercise && exercise.sets && exercise.sets.length) {
          for (const set of exercise.sets) {
            if (!_todaysData[set.set]) {
              _todaysData[set.set] = { reps: "", weight: "" };
            }
          }
        }
        setTodaysData(_todaysData);
      },
      (error) => {
        console.log(error);
      }
    );
  };

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
          {exercise &&
          (markers || exercise.muscleGroups || exercise.videoLink) ? (
            <div className={styles.chips}>
              {exercise.videoLink ? (
                <div {...getProps(exercise.videoLink)}>
                  <PopoverLink ex={exercise} color="green" isChip={true} />
                </div>
              ) : null}
              {exercise.muscleGroups ? (
                <Chip
                  icon={
                    <img src={muscle} alt="muscle" className={styles.imgIcon} />
                  }
                  key={exercise.muscleGroups}
                  label={exercise.muscleGroups}
                  variant="outlined"
                  {...getProps(exercise.muscleGroups)}
                />
              ) : null}
              {markers && markers.length
                ? markers.map((marker, i) => {
                    if (!marker.marker.length) {
                      return null;
                    }

                    return (
                      <Chip
                        key={`${marker.marker}=${marker.markerValue}`}
                        label={`${marker.marker}${
                          marker.markerValue ? "=" : ""
                        }${marker.markerValue}`}
                        variant="outlined"
                        {...getProps(i)}
                      />
                    );
                  })
                : null}
            </div>
          ) : null}
        </Tabs>
      </AppBar>
      {!exercise.sets ||
      (exercise && exercise.sets && exercise.sets.length === 0) ? (
        <UGBLabel variant="subtitle1">
          You haven't added any sets and reps goals to this exercise
        </UGBLabel>
      ) : (
        <div>
          <List component="div" disablePadding>
            {exercise.sets.map((set, i) => {
              const timeTokens = set.rest.split(":");
              const minutes = Number(timeTokens[0]);
              const seconds = Number(timeTokens[1]);
              const timeInSeconds = minutes * 60 + seconds;

              return (
                <ListItem key={set.set + i} button={false}>
                  <HistoryListItem
                    historicalEntry={historicalEntries[set.set]}
                  />
                  <div className={styles.newEntries}>
                    <div style={{ width: "100%" }}>
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
                    <div style={{ width: "100%" }}>
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
      )}
    </div>
  );
};

export default RepetitionsTabPanel;
