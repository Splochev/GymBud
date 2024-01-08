/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBIconInput, UGBInputArea } from "../Global/UGBInput";
import { postData } from "../utils/FetchUtils";
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

const AddNewWorkoutJournal = ({ onSubmit, onClose }) => {
  const styles = useStyles();
  const workoutJournalName = useState("");
  const workoutJournalNamePassed = useState(true);
  const [disabled, setDisabled] = useState(true);
  const description = useState("");

  function addWorkoutJournal(e) {
    e.preventDefault();
    if (!(workoutJournalName[0] && workoutJournalNamePassed[0])) {
      return;
    }

    postData(process.env.REACT_APP_HOST + "/api/workout/add-workout-journal", {
      name: workoutJournalName[0],
      description: description[0],
    }).then(
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
    if (workoutJournalName[0] && workoutJournalNamePassed[0]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [workoutJournalName[0], workoutJournalNamePassed[0]]);

  return (
    <form onSubmit={addWorkoutJournal}>
      <div className={styles.titleSection}>
        <UGBLabel variant="h5">Add a new workout program</UGBLabel>
      </div>
      <UGBIconInput
        $value={workoutJournalName}
        label="Name"
        startIcon="fa-solid fa-file-signature"
        validator={dataValidators.isRequired}
        validatorPassed={workoutJournalNamePassed}
      />
      <UGBInputArea label="Description" $value={description} />
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

export default AddNewWorkoutJournal;
