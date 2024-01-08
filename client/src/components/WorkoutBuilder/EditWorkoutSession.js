import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBIconInput } from "../Global/UGBInput";
import { putData } from "../utils/FetchUtils";
import isURL from "validator/es/lib/isURL";
import isEmpty from "validator/es/lib/isEmpty";

const useStyles = makeStyles((theme) => ({
  titleSection: {
    marginBottom: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
    "& button:first-child": {
      marginRight: theme.spacing(2),
    },
    "& button": {
      width: theme.spacing(11.625),
    },
  },
}));

const dataValidators = {
  isRequired: (value) => {
    const errors = [];
    if (isEmpty(value)) {
      errors.push("Value must not be empty.");
    }
    return errors;
  },
  isLink: (value) => {
    const errors = [];
    if (isEmpty(value)) {
      return errors;
    }
    if (!isURL(value)) {
      errors.push("Invalid link format.");
    }
    return errors;
  },
};

const EditWorkoutSession = ({
  selectedWorkoutJournalObj,
  selectedWorkoutSessionObj,
  setSelectedWorkoutSessionObj,
  workoutSessions,
  setWorkoutSessions,
  onClose,
}) => {
  const styles = useStyles();
  const workoutSessionName = useState(selectedWorkoutSessionObj?.name || "");
  const workoutSessionNamePassed = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [hasNameChanges, setHasNameChanges] = useState(false);

  function addWorkoutJournal(e) {
    e.preventDefault();
    if (!selectedWorkoutSessionObj && !selectedWorkoutJournalObj) {
      return;
    }

    if (!(workoutSessionName[0] && workoutSessionNamePassed[0])) {
      return;
    }

    const changes = {
      id: selectedWorkoutSessionObj.id,
      workoutJournalId: selectedWorkoutJournalObj.id,
    };
    if (hasNameChanges) {
      changes.name = workoutSessionName[0];
    }

    putData(
      process.env.REACT_APP_HOST + "/api/workout/edit-workout-journal-session",
      changes
    ).then(
      (data) => {
        const foundWJ = workoutSessions.find(
          (wj) => wj.id === selectedWorkoutSessionObj.id
        );
        if (hasNameChanges) {
          setSelectedWorkoutSessionObj(
            (workoutJournal) => (
              (workoutJournal.name = workoutSessionName[0]),
              { ...workoutJournal }
            )
          );
          foundWJ.name = workoutSessionName[0];
        }
        setWorkoutSessions([...workoutSessions]);
        onClose();
      },
      (error) => {
        console.log("LOGOUT ERROR--->", error);
      }
    );
  }

  useEffect(() => {
    if (
      selectedWorkoutSessionObj &&
      selectedWorkoutSessionObj.name &&
      workoutSessionName[0] === selectedWorkoutSessionObj.name
    ) {
      setHasNameChanges(false);
    } else {
      setHasNameChanges(true);
    }
  }, [workoutSessionName[0]]);

  useEffect(() => {
    if (
      workoutSessionName[0] &&
      workoutSessionNamePassed[0] &&
      hasNameChanges
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [workoutSessionName[0], workoutSessionNamePassed[0], hasNameChanges]);

  useEffect(() => {
    if (selectedWorkoutSessionObj) {
      workoutSessionName[1](selectedWorkoutSessionObj.name);
    }
  }, [selectedWorkoutSessionObj]);

  return (
    <form onSubmit={addWorkoutJournal}>
      <div className={styles.titleSection}>
        <UGBLabel variant="h5">
          Edit workout day: {selectedWorkoutSessionObj?.name || ""}
        </UGBLabel>
      </div>
      <UGBIconInput
        $value={workoutSessionName}
        label="Workout Name"
        startIcon="fa-solid fa-file-signature"
        validator={dataValidators.isRequired}
        validatorPassed={workoutSessionNamePassed}
      />
      <div className={styles.actions}>
        <UGBButton btnType="secondary" onClick={() => onClose()}>
          Cancel
        </UGBButton>
        <UGBButton disabled={disabled} type="submit" btnType="primary">
          Save
        </UGBButton>
      </div>
    </form>
  );
};

export default EditWorkoutSession;
