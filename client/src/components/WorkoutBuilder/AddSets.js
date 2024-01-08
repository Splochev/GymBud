/* eslint-disable no-sequences */
import * as React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { UGBIconButton } from "../Global/UGBButton";
import { UGBIconInput, UGBTimeInput } from "../Global/UGBInput";
import AddIcon from "@material-ui/icons/Add";
import tallyIcon from "../assets/tallyIcon.png";
import clsx from "clsx";
import ClearIcon from "@material-ui/icons/Clear";
import { textIsEmpty } from "../utils/ValidationUtils";

const useStyles = makeStyles((theme) => ({
  addSetAndMarkersContainer: {
    marginTop: theme.spacing(1.25),
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: theme.spacing(57.5),
    overflow: "auto",
  },
  addSet: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  editButton: {
    padding: theme.spacing(1),
    color: "#28A745",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  deleteSetBtn: {
    width: "35px",
    height: "35px",
    marginLeft: "2px",
    padding: "0px",
  },
  addSetBtn: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(0.375),
    marginTop: theme.spacing(0.375),
  },
}));

const AddSets = ({
  sessionExercises,
  setSessionExercises,
  selectedSessionExercise,
  setSelectedSessionExercise,
  timeValidations,
  setTimeValidations,
  repsValidations,
  setRepsValidations,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.addSetAndMarkersContainer}>
      {selectedSessionExercise.sets.map((set, i) => {
        return (
          <div key={set.set} className={styles.addSet}>
            <IconButton
              className={clsx(styles.editButton, styles.deleteSetBtn)}
              disableRipple
              onClick={(e) => {
                const tempSets = selectedSessionExercise.sets;
                const exI = tempSets.indexOf(set);
                tempSets.splice(exI, 1);
                for (let j = 0; j < tempSets.length; j++) {
                  tempSets[j].set = `Set ${j + 1}`;
                }
                delete repsValidations[set.set + "-reps"];
                delete timeValidations[set.set + "-rest"];
                setRepsValidations(repsValidations);
                setSelectedSessionExercise(
                  (selectedSessionExercise) => (
                    (selectedSessionExercise.sets = tempSets),
                    { ...selectedSessionExercise }
                  )
                );
                setSessionExercises([...sessionExercises]);
              }}
            >
              <ClearIcon />
            </IconButton>
            <div>
              <UGBIconInput
                imgIconStart={tallyIcon}
                label={`${set.set}: Reps goal`}
                value={set.reps}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(Number(value)) || textIsEmpty(value)) {
                    repsValidations[set.set + "-reps"] = true;
                  } else {
                    delete repsValidations[set.set + "-reps"];
                  }
                  setRepsValidations(repsValidations);
                  setSelectedSessionExercise(
                    (selectedSessionExercise) => (
                      (selectedSessionExercise.sets[i].reps = value),
                      { ...selectedSessionExercise }
                    )
                  );
                  setSessionExercises([...sessionExercises]);
                }}
              />
              <div
                style={{ color: "#F42A82", fontSize: "12px", height: "14px" }}
              >
                {repsValidations && repsValidations[set.set + "-reps"]
                  ? "Number required"
                  : null}
              </div>
            </div>
            <div>
              <UGBTimeInput
                name="Rest Time"
                label="Rest time after set"
                initTime={set.rest}
                mountFocus="true"
                onTimeChange={(props) => {
                  const value = props;
                  const re = /^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$/;
                  const isValidFormat = re.test(value);
                  if (isValidFormat) {
                    delete timeValidations[set.set + "-rest"];
                  } else {
                    timeValidations[set.set + "-rest"] = true;
                  }
                  setTimeValidations(timeValidations);
                  setSelectedSessionExercise(
                    (selectedSessionExercise) => (
                      (selectedSessionExercise.sets[i].rest = value),
                      { ...selectedSessionExercise }
                    )
                  );
                  setSessionExercises([...sessionExercises]);
                }}
              />
              <div
                style={{ color: "#F42A82", fontSize: "12px", height: "14px" }}
              >
                {timeValidations && timeValidations[set.set + "-rest"]
                  ? "Format mm:ss required"
                  : null}
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.addSetBtn}>
        <UGBIconButton
          disabled={selectedSessionExercise.sets.length >= 10}
          $onClick={() => {
            const tempSets = selectedSessionExercise.sets;
            const set = `Set ${tempSets.length + 1}`;
            tempSets.push({ set: set, reps: "", rest: "" });
            timeValidations[set + "-rest"] = false;
            repsValidations[set + "-reps"] = false;
            setTimeValidations(timeValidations);
            setRepsValidations(repsValidations);
            setSelectedSessionExercise(
              (selectedSessionExercise) => (
                (selectedSessionExercise.sets = tempSets),
                { ...selectedSessionExercise }
              )
            );
            setSessionExercises([...sessionExercises]);
          }}
          withRadius={false}
          btnType="primary"
          MuiIcon={AddIcon}
        />
      </div>
    </div>
  );
};

export default AddSets;
