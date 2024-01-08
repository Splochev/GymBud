import * as React from "react";
import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  makeStyles,
  Popover,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { UGBIconButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBInput } from "../Global/UGBInput";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import inputIcon from "../assets/inputIcon.png";
import clsx from "clsx";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  deleteSetBtn: {
    width: "35px",
    height: "35px",
    marginLeft: "2px",
    padding: "0px",
  },
  svg: {
    width: "100%",
    height: "auto",
  },
  addSet: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  addSetBtn: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(0.375),
    marginTop: theme.spacing(0.375),
  },
  addSetAndMarkersContainer: {
    marginTop: theme.spacing(1.25),
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: theme.spacing(57.5),
    overflow: "auto",
  },
  editButton: {
    padding: theme.spacing(1),
    color: "#28A745",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  showMoreIcon: {
    padding: theme.spacing(0.7),
    marginRight: theme.spacing(-2.25),
  },
  svgInputIcon: {
    color: "#757575",
  },
  addMarker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: theme.spacing(1),
  },
  addMarkerContainer: {
    width: "100%",
    "& .MuiTypography-root": {
      marginLeft: theme.spacing(6.25),
    },
  },
  addMarkerInputs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: theme.spacing(1),
    "@media (max-width: 530px)": {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  markerEquality: {
    "@media (max-width: 530px)": {
      display: "none",
    },
  },
  imgIcon: {
    width: "auto",
    height: "90%",
    marginRight: theme.spacing(1.25),
  },
}));

const PERIODIZATIONS = ["Linear", "Set Range"];
const INTENSITY_VOLUMES = [
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];
const LIS = ["0.25", "0.5", "0.75", "1", "1.25", "2", "5"];

const AddMarkers = ({
  sessionExercises,
  setSessionExercises,
  selectedSessionExercise,
  setSelectedSessionExercise,
}) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorIndex, setAnchorIndex] = useState(null);
  const [markers] = useState(["Periodization", "Intensity Volume", "LI"]);
  const [anchorMarkerValue, setAnchorMarkerValue] = useState(null);
  const [anchorMarkerValueTypeIndex, setAnchorMarkerValueTypeIndex] =
    useState(null);
  const [markerValueType, setMarkerValueType] = useState(null);
  const [markerValues] = useState({
    Periodization: PERIODIZATIONS,
    "Intensity Volume": INTENSITY_VOLUMES,
    LI: LIS,
  });

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setAnchorIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorIndex(null);
  };

  const handleClickMarkerValueType = (event, index, markerType) => {
    setMarkerValueType(markerType);
    setAnchorMarkerValue(event.currentTarget);
    setAnchorMarkerValueTypeIndex(index);
  };

  const handleCloseMarkerValueType = () => {
    setAnchorMarkerValue(null);
    setAnchorMarkerValueTypeIndex(null);
  };

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList>
          {markers.map((marker, j) => {
            return (
              <MenuItem
                key={j}
                onClick={(e) => {
                  const value = e.target.textContent;
                  if (
                    selectedSessionExercise.markers[anchorIndex].markerValue
                  ) {
                    setSelectedSessionExercise(
                      (selectedSessionExercise) => (
                        (selectedSessionExercise.markers[anchorIndex].marker =
                          value),
                        (selectedSessionExercise.markers[
                          anchorIndex
                        ].markerValue = ""),
                        { ...selectedSessionExercise }
                      )
                    );
                  } else {
                    setSelectedSessionExercise(
                      (selectedSessionExercise) => (
                        (selectedSessionExercise.markers[anchorIndex].marker =
                          value),
                        { ...selectedSessionExercise }
                      )
                    );
                  }
                  setSessionExercises([...sessionExercises]);
                  handleClose();
                }}
              >
                {marker}
              </MenuItem>
            );
          })}
        </MenuList>
      </Popover>
      <Popover
        anchorEl={anchorMarkerValue}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorMarkerValue)}
        onClose={handleCloseMarkerValueType}
      >
        <MenuList>
          {markerValueType
            ? markerValues[markerValueType].map((marker, j) => {
                return (
                  <MenuItem
                    key={j}
                    onClick={(e) => {
                      const value = marker;
                      if (
                        selectedSessionExercise.markers[
                          anchorMarkerValueTypeIndex
                        ].markerValue === value
                      ) {
                        setSelectedSessionExercise(
                          (selectedSessionExercise) => (
                            (selectedSessionExercise.markers[
                              anchorMarkerValueTypeIndex
                            ].markerValue = ""),
                            { ...selectedSessionExercise }
                          )
                        );
                      } else if (
                        markerValueType === "Periodization" ||
                        markerValueType === "Intensity Volume" ||
                        markerValueType === "LI"
                      ) {
                        setSelectedSessionExercise(
                          (selectedSessionExercise) => (
                            (selectedSessionExercise.markers[
                              anchorMarkerValueTypeIndex
                            ].markerValue = value),
                            { ...selectedSessionExercise }
                          )
                        );
                      }
                      setSessionExercises([...sessionExercises]);
                      handleCloseMarkerValueType();
                    }}
                  >
                    {marker}
                  </MenuItem>
                );
              })
            : null}
        </MenuList>
      </Popover>
      <div className={styles.addSetAndMarkersContainer}>
        {selectedSessionExercise.markers.map((marker, i) => {
          return (
            <div key={marker.marker + i} className={styles.addMarkerContainer}>
              <UGBLabel variant="subtitle2">Marker Type</UGBLabel>
              <div key={i} className={styles.addMarker}>
                <IconButton
                  className={clsx(styles.editButton, styles.deleteSetBtn)}
                  disableRipple
                  onClick={(e) => {
                    const tempMarkers = selectedSessionExercise.markers;
                    const exI = tempMarkers.indexOf(marker);
                    tempMarkers.splice(exI, 1);
                    setSelectedSessionExercise(
                      (selectedSessionExercise) => (
                        (selectedSessionExercise.markers = tempMarkers),
                        { ...selectedSessionExercise }
                      )
                    );
                    setSessionExercises([...sessionExercises]);
                  }}
                >
                  <ClearIcon />
                </IconButton>
                <div className={styles.addMarkerInputs}>
                  <UGBInput
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          className={styles.svgInputIcon}
                          position="start"
                        >
                          <i className="fa-solid fa-highlighter"></i>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            className={styles.showMoreIcon}
                            disableRipple
                            isEnd={false}
                            onClick={(e) => handleClick(e, i)}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label=""
                    value={marker.marker}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (selectedSessionExercise.markers[i].markerValue) {
                        setSelectedSessionExercise(
                          (selectedSessionExercise) => (
                            (selectedSessionExercise.markers[i].marker = value),
                            (selectedSessionExercise.markers[i].markerValue =
                              ""),
                            { ...selectedSessionExercise }
                          )
                        );
                      } else {
                        setSelectedSessionExercise(
                          (selectedSessionExercise) => (
                            (selectedSessionExercise.markers[i].marker = value),
                            { ...selectedSessionExercise }
                          )
                        );
                      }
                      setSessionExercises([...sessionExercises]);
                    }}
                  />
                  <div className={styles.markerEquality}>=</div>
                  <UGBInput
                    label=""
                    value={marker.markerValue}
                    onChange={(e) => {
                      if (
                        marker.marker === "Periodization" ||
                        marker.marker === "Intensity Volume" ||
                        marker.marker === "LI"
                      ) {
                        return;
                      }
                      const value = e.target.value;
                      setSelectedSessionExercise(
                        (selectedSessionExercise) => (
                          (selectedSessionExercise.markers[i].markerValue =
                            value),
                          { ...selectedSessionExercise }
                        )
                      );
                      setSessionExercises([...sessionExercises]);
                    }}
                    InputProps={{
                      startAdornment:
                        marker.marker === "Intensity Volume" ? (
                          <InputAdornment
                            className={styles.svgInputIcon}
                            position="start"
                          >
                            <i className="fa-solid fa-percent" />
                          </InputAdornment>
                        ) : marker.marker === "Periodization" ? (
                          <InputAdornment
                            className={styles.svgInputIcon}
                            position="start"
                          >
                            <i className="fa-solid fa-chart-line" />
                          </InputAdornment>
                        ) : marker.marker === "LI" ? (
                          <InputAdornment
                            className={styles.svgInputIcon}
                            position="start"
                          >
                            <i className="fa-solid fa-ruler-horizontal" />
                          </InputAdornment>
                        ) : (
                          <img
                            src={inputIcon}
                            alt="inputIcon"
                            className={styles.imgIcon}
                          />
                        ),
                      endAdornment:
                        marker.marker === "Periodization" ||
                        marker.marker === "Intensity Volume" ||
                        marker.marker === "LI" ? (
                          <InputAdornment position="start">
                            <IconButton
                              className={styles.showMoreIcon}
                              disableRipple
                              isEnd={false}
                              onClick={(e) =>
                                handleClickMarkerValueType(e, i, marker.marker)
                              }
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.addSetBtn}>
          <UGBIconButton
            disabled={selectedSessionExercise.markers.length >= 10}
            $onClick={() => {
              const tempMarkers = selectedSessionExercise.markers;
              tempMarkers.push({ marker: "", markerValue: "" });
              setSelectedSessionExercise(
                (selectedSessionExercise) => (
                  (selectedSessionExercise.markers = tempMarkers),
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
    </>
  );
};

export default AddMarkers;
