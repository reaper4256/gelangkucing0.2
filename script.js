const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const video4 = document.getElementById("video4");

const tapArea = document.getElementById("tapArea");
const hint1 = document.querySelector(".hint1");
const hint2 = document.querySelector(".hint2");
const btnNext = document.querySelector(".btn-next");

const videos = [video1, video2, video3, video4];

let currentVideo = null;
let stage = "idle";

function showVideo(video) {
  videos.forEach((item) => {
    item.classList.remove("active");
  });

  video.classList.add("active");

  currentVideo = video;
}

function playVideo(video, loop = false) {
  video.loop = loop;
  video.currentTime = 0;

  video.play().catch((error) => {
    console.log("Video gagal play:", error);
  });
}

function stopVideo(video) {
  video.pause();
  video.loop = false;
  video.currentTime = 0;
}

videos.forEach((video) => {
  video.load();
});

video1.addEventListener(
  "loadeddata",
  () => {
    video1.currentTime = 0;
    video1.pause();

    showVideo(video1);
  },
  { once: true },
);

function showGelang() {
  // cegah dipanggil berkali-kali
  if (stage !== "idle") return;

  stage = "showing-gelang";

  hint1.classList.remove("show");
  setTimeout(() => {
    hint2.classList.add("show");
  }, 10000);

  showVideo(video1);

  playVideo(video1);
}

video1.addEventListener("ended", () => {
  if (stage !== "showing-gelang") return;

  stage = "gelang";

  showVideo(video2);

  playVideo(video2, true);
});

function showKucing() {
  if (stage !== "gelang") return;

  stage = "waiting-kucing";

  video2.loop = false;

  hint2.classList.remove("show");
}

video2.addEventListener("ended", () => {
  if (stage !== "waiting-kucing") return;

  stage = "showing-kucing";

  showVideo(video3);

  playVideo(video3);
});

video3.addEventListener("ended", () => {
  if (stage !== "showing-kucing") return;

  stage = "kucing";

  showVideo(video4);

  playVideo(video4, true);

  btnNext.addEventListener("click", navigateNext);
  
  btnNext.classList.add("show");
});

tapArea.addEventListener("click", () => {
  if (stage === "idle") {
    showGelang();
    return;
  }

  if (stage === "gelang") {
    showKucing();
    return;
  }
});

// =========
window.onload = function () {
  const preload = document.querySelector(".preload");
  preload.style = "transition: 1s ease all; opacity: 0;";
  setTimeout(() => {
    preload.remove();
  }, 1000);
};
