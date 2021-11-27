class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play-btn");
    this.currentKick = "./static/sounds/kicks/808.wav";
    this.currentClap = "./static/sounds/claps/808.wav";
    this.currentSnare = "./static/sounds/snares/808.wav";
    this.currentHat = "./static/sounds/hi-hats/808.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hatAudio = document.querySelector(".hat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease 2`;
      // Check Active Pads
      if (bar.classList.contains("active")) {
        // Check Sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("hat-pad")) {
          this.hatAudio.currentTime = 0;
          this.hatAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = `<i class="fas fa-play"></i>`;
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;

    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectValue;
        break;
      case "hat-select":
        this.hatAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.clapAudio.volume = 0;
          break;
        case "2":
          this.hatAudio.volume = 0;
          break;
        case "3":
          this.snareAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.clapAudio.volume = 1;
          break;
        case "2":
          this.hatAudio.volume = 1;
          break;
        case "3":
          this.snareAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoNum = document.querySelector(".tempo-time");
    this.bpm = e.target.value;
    tempoNum.innerText = e.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play-btn");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

// Events
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((mute) => {
  mute.addEventListener("click", (e) => {
    drumKit.mute(e);
  });
});

drumKit.tempSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});

drumKit.tempSlider.addEventListener("change", () => {
  drumKit.updateTempo();
});
