/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import CountDownTimer from "../utils/CountDownTimer";
import CircularProgressWithLabel from "../Global/CircularProgressWithLabel";

const useStyles = makeStyles((theme) => ({
  startTimer: {
    height: "40px",
    width: "40px",
    color: "#28A745",
    border: "1px solid #28A745",
    background: "transparent",
    "&:hover": {
      background: "transparent",
      border: "1px solid #1E7E34",
    },
    "&:focus": {
      background: "transparent",
      border: "1px solid #1E7E34",
      boxShadow: "rgb(163,217,176) 0px 0px 0px 3px",
      outline: "none",
    },
  },
  circularProgressWithLabel: {
    "& .MuiCircularProgress-root": { color: "#28A745" },
  },
  timerIcon: {
    color: "#28A745",
  },
}));

function beep() {
  let context = new AudioContext();
  let oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 800);
}

const Timer = ({ timeInSeconds }) => {
  const styles = useStyles();
  const [startTimer, setStartTimer] = useState(false);
  const [countDown, setCountDown] = useState("00:00");
  const [visualProgress, setVisualProgress] = useState(0);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setCountDown(minutes + ":" + seconds);
  }

  useEffect(() => {
    if (startTimer) {
      const countDownTokens = countDown.split(":");
      const countDownInSeconds =
        Number(countDownTokens[0]) * 60 + Number(countDownTokens[1]);

      const progress =
        (Math.abs(countDownInSeconds - timeInSeconds) * 100.0) /
        Math.abs(0 - timeInSeconds);

      if (initiallyLoaded) {
        if (progress >= 100) {
          beep();
        }
      } else {
        setInitiallyLoaded(true);
      }
      setVisualProgress(progress);
    }
  }, [countDown]);

  return (
    <div>
      {startTimer ? (
        <div
          className={styles.circularProgressWithLabel}
          onClick={() => setStartTimer(false)}
        >
          <CircularProgressWithLabel value={visualProgress} label={countDown} />
        </div>
      ) : (
        <IconButton
          className={styles.startTimer}
          onClick={() => {
            setStartTimer(true);
            const timer = new CountDownTimer(timeInSeconds);
            const timeObj = CountDownTimer.parseTime(timeInSeconds);
            format(timeObj.minutes, timeObj.seconds);
            timer.onTick(format);
            timer.start();
          }}
        >
          <TimerIcon className={styles.timerIcon} />
        </IconButton>
      )}
    </div>
  );
};

export default Timer;
