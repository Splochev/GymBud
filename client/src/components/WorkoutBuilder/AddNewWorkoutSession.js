/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBIconInput } from "../Global/UGBInput";
import { postData } from "../utils/FetchUtils";
import isEmpty from "validator/es/lib/isEmpty";
import isURL from "validator/lib/isURL";

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

const AddNewWorkoutSession = ({ workoutJournal, onSubmit, onClose }) => {
  const styles = useStyles();
  const workoutSessionName = useState("");
  const workoutSessionNamePassed = useState(true);
  const [disabled, setDisabled] = useState(true);

  function addWorkoutSession(e) {
    e.preventDefault();
    if (!(workoutSessionName[0] && workoutSessionNamePassed[0])) {
      return;
    }

    postData(
      process.env.REACT_APP_HOST + "/api/workout/add-workout-journal-session",
      { name: workoutSessionName[0], workoutJournalId: workoutJournal.id }
    ).then(
      (data) => {
        onSubmit();
        onClose();
      },
      (error) => {
        console.log("LOGOUT ERROR--->", error);
      }
    );
  }

  useEffect(() => {
    if (workoutSessionName[0] && workoutSessionNamePassed[0]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [workoutSessionName[0], workoutSessionNamePassed[0]]);

  return (
    <form onSubmit={addWorkoutSession}>
      <div className={styles.titleSection}>
        <UGBLabel variant="h5">
          Add a new day to the workout: {workoutJournal?.name || ""}
        </UGBLabel>
      </div>
      <UGBIconInput
        $value={workoutSessionName}
        label="Session Name"
        startIcon="fa-solid fa-file-signature"
        validator={dataValidators.isRequired}
        validatorPassed={workoutSessionNamePassed}
      />
      <div className={styles.actions}>
        <UGBButton btnType="secondary" onClick={() => onClose()}>
          Cancel
        </UGBButton>
        <UGBButton disabled={disabled} type="submit" btnType="primary">
          Add
        </UGBButton>
      </div>
    </form>
  );
};

export default AddNewWorkoutSession;