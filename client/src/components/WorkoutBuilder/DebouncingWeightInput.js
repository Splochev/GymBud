/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { InputAdornment } from "@material-ui/core";
import { UGBInput } from "../Global/UGBInput";
import { debounce, putData } from "../utils/FetchUtils";
import { parseDate } from "../utils/utilFunc";

const DebouncingWeightInput = ({
  todaysData,
  set,
  setTodaysData,
  setIsSaving,
  setIsSaved,
  isSaving,
  isSaved,
  dailyWorkoutDataId,
}) => {
  const [tempWeight, setTempWeight] = useState("");
  const [weight, setWeight] = useState("");
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [loadedTodaysData, setLoadedTodaysData] = useState(false);

  const updateWeightEntry = async () => {
    setIsSaving([...isSaving, set.set + "-w"]);
    const created = new Date();
    const reqData = [{
      weight: weight,
      forSet: set.set,
      createdOn: parseDate(created, "/"),
      dailyWorkoutDataId: dailyWorkoutDataId,
    }];
    putData(
      process.env.REACT_APP_HOST + "/api/workout/add-weight-entries",
      reqData
    ).then(
      (data) => {
        setIsSaving(isSaving.filter((save) => save === set.set + "-w"));
        setIsSaved([...isSaved, set.set + "-w"]);
        setTimeout(function () {
          setIsSaved(isSaved.filter((save) => save === set.set + "-w"));
        }, 1250);
      },
      (error) => {
        setIsSaving(isSaving.filter((save) => save === set.set + "-w"));
        console.log("LOGOUT ERROR--->", error);
      }
    );
  };

  useEffect(() => {
    if (!initiallyLoaded) {
      setInitiallyLoaded(true);
      return;
    }
    updateWeightEntry();
  }, [weight]);

  useEffect(() => {
    if (
      !loadedTodaysData &&
      todaysData &&
      todaysData[set.set] &&
      !isNaN(Number(todaysData[set.set].weight))
    ) {
      setTempWeight(todaysData[set.set].weight);
      setLoadedTodaysData(true);
      return;
    }
  }, [todaysData]);

  const debounceMemo = React.useMemo(
    () =>
      debounce(
        (event) => {
          setTempWeight(event.target.value);
        },
        (event) => {
          setWeight(event.target.value);
        },
        500
      ),
    []
  );

  return (
    <UGBInput
      label=""
      value={tempWeight}
      onChange={(e) => {
        if (todaysData && todaysData[set.set]) {
          todaysData[set.set].weight = e.target.value;
          setTodaysData({ ...todaysData });
          debounceMemo(e);
        }
      }}
      InputProps={{
        endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
      }}
    />
  );
};

export default DebouncingWeightInput;