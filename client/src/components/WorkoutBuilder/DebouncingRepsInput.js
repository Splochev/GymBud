/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { InputAdornment } from "@material-ui/core";
import { UGBLegendInput } from "../Global/UGBInput";
import { debounce, putData } from "../utils/FetchUtils";
import { parseDate } from "../utils/utilFunc";

const DebouncingRepsInput = ({
  todaysData,
  set,
  setTodaysData,
  setIsSaving,
  setIsSaved,
  isSaving,
  isSaved,
  dailyWorkoutDataId,
}) => {
  const [tempReps, setTempReps] = useState("");
  const [reps, setReps] = useState("");
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [loadedTodaysData, setLoadedTodaysData] = useState(false);

  const updateRepsEntry = async () => {
    setIsSaving([...isSaving, set.set + "-r"]);
    const created = new Date();
    const reqData = {
      reps: reps,
      forSet: set.set,
      createdOn: parseDate(created, "/"),
      dailyWorkoutDataId: dailyWorkoutDataId,
    };
    putData(
      process.env.REACT_APP_HOST + "/api/workout/add-reps-entry",
      reqData
    ).then(
      (data) => {
        setIsSaving(isSaving.filter((save) => save === set.set + "-r"));
        setIsSaved([...isSaved, set.set + "-r"]);
        setTimeout(function () {
          setIsSaved(isSaved.filter((save) => save === set.set + "-r"));
        }, 1250);
      },
      (error) => {
        setIsSaving(isSaving.filter((save) => save === set.set + "-r"));
        console.log("LOGOUT ERROR--->", error);
      }
    );
  };

  useEffect(() => {
    if (!initiallyLoaded) {
      setInitiallyLoaded(true);
      return;
    }
    updateRepsEntry();
  }, [reps]);

  useEffect(() => {
    if (
      !loadedTodaysData &&
      todaysData &&
      todaysData[set.set] &&
      !isNaN(Number(todaysData[set.set].reps))
    ) {
      setTempReps(todaysData[set.set].reps);
      setLoadedTodaysData(true);
      return;
    }
  }, [todaysData]);

  const debounceMemo = React.useMemo(
    () =>
      debounce(
        (event) => {
          setTempReps(event.target.value);
        },
        (event) => {
          setReps(event.target.value);
        },
        500
      ),
    []
  );

  return (
    <UGBLegendInput
      minWidth="100px"
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
};

export default DebouncingRepsInput;
