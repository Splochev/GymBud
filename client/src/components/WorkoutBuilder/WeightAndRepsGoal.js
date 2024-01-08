import * as React from "react";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { postData, putData } from "../utils/FetchUtils";
import { parseDate } from "../utils/utilFunc";

const WeightAndRepsGoal = ({ exercisesList }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [exerciseListWithRepetitionsData, setExerciseListWithRepetitionsData] =
    useState([]);

  const flatExercisesList = exercisesList.reduce((acc, ex) => {
    if (ex.superset) {
      acc.push(...ex.superset);
    } else {
      acc.push(ex);
    }
    return acc;
  }, []);
  const exIds = flatExercisesList.map((ex) => ex.dailyWorkoutDataId);

  const getRepetitionsData = (dailyWorkoutDataIds) => {
    postData(
      process.env.REACT_APP_HOST + "/api/workout/get-repetitions-data",
      dailyWorkoutDataIds
    ).then(
      (data) => {
        let redFlagsCounter = 0;
        setExerciseListWithRepetitionsData(
          flatExercisesList.map((ex, i) => {
            const tempEx = { ...ex };
            tempEx.repetitionsData = data[i];
            const historicalEntires =
              tempEx &&
              tempEx.repetitionsData &&
              tempEx.repetitionsData.historicalEntires
                ? Object.values(tempEx.repetitionsData.historicalEntires)
                : [];

            const todaysData = [];
            let goalEntiresText = "";
            let historicalEntiresText = "";

            historicalEntires.forEach((entryArr, i) => {
              const entry = entryArr[0];
              let weight = entry.weight;
              if (!weight) return "";

              const liMarker =
                tempEx &&
                tempEx.markers &&
                tempEx.markers.find((m) => m.marker === "LI");

              const li =
                liMarker && liMarker.markerValue
                  ? Number(liMarker.markerValue)
                  : 0.25;

              todaysData.push({
                forSet: ex.sets[i].set,
                reps: ex.sets[i].reps,
                weight: Number(weight) + li,
              });

              const goalText = `Set ${i + 1}: ${Number(weight) + li}Kg`;
              goalEntiresText += i === 0 ? goalText : `/ ${goalText}`;

              const text = `Set ${i + 1}: ${weight}Kg`;
              historicalEntiresText += i === 0 ? text : `/ ${text}`;
            });

            tempEx.todaysData = todaysData;
            tempEx.goalEntiresText = goalEntiresText;
            tempEx.historicalEntiresText = historicalEntiresText;
            if (!historicalEntiresText) redFlagsCounter++;

            return tempEx;
          })
        );
        setShowFlag(redFlagsCounter === flatExercisesList.length);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const applyGoals = async () => {
    const validExerciseListWithRepetitionsData =
      exerciseListWithRepetitionsData.filter((ex) => ex.goalEntiresText);
    const today = parseDate(new Date(), "/");
    const reqData = [];

    for (const ex of validExerciseListWithRepetitionsData) {
      for (const todaysData of ex.todaysData) {
        reqData.push({
          weight: todaysData.weight,
          forSet: todaysData.forSet,
          createdOn: today,
          dailyWorkoutDataId: ex.dailyWorkoutDataId,
        });
      }
    }

    await putData(
      process.env.REACT_APP_HOST + "/api/workout/add-weight-entries",
      reqData
    );
  };

  useEffect(() => {
    if (!exIds.length || exerciseListWithRepetitionsData.length) return;
    getRepetitionsData(exIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exIds]);

  return (
    <div>
      {showFlag ? (
        <UGBLabel variant="subtitle2">
          "You need to have worked out once in order to set a goal for your next
          workout."
        </UGBLabel>
      ) : (
        <>
          <UGBLabel variant="h6">
            Apply weight goals for your next workout
          </UGBLabel>
          <List>
            {exerciseListWithRepetitionsData.map((ex) => {
              if (!ex.historicalEntiresText) return null;
              return (
                <ListItem key={ex.id} button={false} dense>
                  <ListItemText
                    primary={
                      <div>
                        <div>{ex.exercise}</div>
                        <div>
                          <span>History: </span>
                          <span>{ex.historicalEntiresText}</span>
                        </div>
                        <div>
                          <span>Goal:&#160;&#160;&#160;&#160;&#160;</span>
                          <span>{ex.goalEntiresText}</span>
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
          <UGBButton onClick={applyGoals} btnType="primary">
            Apply Goals
          </UGBButton>
        </>
      )}
    </div>
  );
};

export default WeightAndRepsGoal;
