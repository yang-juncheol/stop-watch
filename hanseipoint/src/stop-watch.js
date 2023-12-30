document.addEventListener("DOMContentLoaded", function () {
  const timerElement = document.querySelector(".stop-watch-timer");
  const startButton = document.createElement("button");
  const pauseButton = document.createElement("button");
  const resumeButton = document.createElement("button");
  const resetButton = document.createElement("button");
  const lapButton = document.createElement("button");
  const lapList = document.querySelector(".stop-watch-lap-list");
  let isRunning = false;
  let isPaused = false;
  let startTime;
  let lapNumber = 1;
  let elapsedTimeBeforePause = 0;

  startButton.textContent = "시작";
  pauseButton.textContent = "일시정지";
  resumeButton.textContent = "재시작";
  resetButton.textContent = "초기화";
  lapButton.textContent = "랩 기록";

  document.querySelector(".stop-watch-control").appendChild(startButton);
  document.querySelector(".stop-watch-control").appendChild(pauseButton);
  document.querySelector(".stop-watch-control").appendChild(resumeButton);
  document.querySelector(".stop-watch-control").appendChild(resetButton);
  document.querySelector(".stop-watch-control").appendChild(lapButton);

  pauseButton.style.display = "none";
  resumeButton.style.display = "none";
  resetButton.style.display = "none";
  lapButton.style.display = "none";

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resumeButton.addEventListener("click", resumeTimer);
  resetButton.addEventListener("click", resetTimer);
  lapButton.addEventListener("click", recordLap);

  function startTimer() {
    if (!isRunning && !isPaused) {
      isRunning = true;
      startTime = Date.now() - elapsedTimeBeforePause;
      updateTimer();
      startButton.style.display = "none";
      pauseButton.style.display = "inline-block";
      resetButton.style.display = "inline-block";
      lapButton.style.display = "inline-block";
    }
  }

  function pauseTimer() {
    if (isRunning && !isPaused) {
      isPaused = true;
      elapsedTimeBeforePause = Date.now() - startTime;
      pauseButton.style.display = "none";
      resumeButton.style.display = "inline-block";
      resetButton.style.display = "inline-block";
      lapButton.style.display = "none";
    }
  }

  function resumeTimer() {
    if (isRunning && isPaused) {
      isPaused = false;
      startTime = Date.now() - elapsedTimeBeforePause;
      updateTimer();
      pauseButton.style.display = "inline-block";
      resumeButton.style.display = "none";
      resetButton.style.display = "";
      lapButton.style.display = "inline-block";
    }
  }

  function resetTimer() {
    isRunning = false;
    isPaused = false;
    elapsedTimeBeforePause = 0;
    lapNumber = 1;
    startButton.textContent = "시작";
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
    resetButton.style.display = "none";
    lapButton.style.display = "none";
    timerElement.textContent = "00:00.000";
    lapList.innerHTML = "";
  }

  function updateTimer() {
    if (isRunning && !isPaused) {
      const elapsedTime = Date.now() - startTime;
      const formattedTime = formatTime(elapsedTime);
      timerElement.textContent = formattedTime;
      requestAnimationFrame(updateTimer);
    }
  }

  function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const tenths = Math.floor((milliseconds % 1000) / 1); // 첫째 자리 (1/10 초)
    return `${minutes
      .toString()
      .padStart(
        2,
        "0"
      )}:${seconds.toString().padStart(2, "0")}.${tenths.toString()}`;
  }

  function recordLap() {
    if (isRunning && !isPaused) {
      const lapTime = timerElement.textContent;
      const lapItem = document.createElement("li");
      lapItem.textContent = `랩 ${lapNumber} : ${lapTime}`;
      lapList.appendChild(lapItem);
      lapNumber++;
    }
  }
});
