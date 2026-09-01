var klikA = new Audio("https://dekatutorial.github.io/ct/klk.mp3");
klikA.autoplay = false;
klikA.loop = false;

const musikA = new Audio(musik);
musikA.autoplay = true;
musikA.loop = true;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const book = document.querySelector(".book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

const btnContainer = document.querySelector(".btn-container");
const openBtn = document.querySelector(".open-btn");
const navBtn = document.querySelector(".nav");
const pesanBtn = document.querySelector(".pesan-btn");

for (let i = 0; i < konten.length - 1; i++) {
  const paperE = document.createElement("div");
  paperE.classList.add("paper");

  paperE.innerHTML = `
        <div class="front">
          <div class="front-content" style="--bg: url('${konten[i]}')">
          </div>
        </div>
        <div class="back">
          <div class="back-content" style="--bg: url('${konten[i + 1]}')">
          </div>
        </div>`;

  book.appendChild(paperE);
}

openBtn.onclick = () => {
  musikA.play();
  if (isKlikAudio) klikA.play();
  clickHandler(1);
  btnContainer.classList.add("hide");
  setTimeout(() => {
    openBtn.classList.remove("show");
    navBtn.classList.add("show");
    btnContainer.classList.remove("hide");
  }, 500);
};

pesanBtn.onclick = kirimPesan;

prevBtn.addEventListener("click", () => {
  pauseAll();
  if (isKlikAudio) klikA.play();
  clickHandler(0);
});
nextBtn.addEventListener("click", () => {
  pauseAll();
  if (isKlikAudio) klikA.play();
  clickHandler(1);
});

function openBook() {
  book.style.transform = "translateX(50%)";
  book.classList.remove("fs");
  book.classList.remove("bs");
}

function closeBook(isAtBegining) {
  if (isAtBegining) {
    book.classList.add("fs");
    book.style.transform = "translateX(0%)";
    papers.forEach((paper, index) => {
      paper.querySelector(".front").style.transform = `rotateY(0deg)`;
      paper.querySelector(".back").style.transform = `rotateY(0deg)`;
    });
  } else {
    book.classList.add("bs");
    book.style.transform = "translateX(100%)";
    papers.forEach((paper, index) => {
      paper.querySelector(".front").style.transform = `rotateY(-180deg)`;
      paper.querySelector(".back").style.transform = `rotateY(-180deg)`;
    });
  }

  papers.forEach((paper, index) => {
    const paperBack = paper.querySelector(".back");
    paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0)`;
  });
}
const papers = document.querySelectorAll(".paper");
const paperTotal = papers.length;
let currentLocation = 0;
let zInd = paperTotal;
let dataZIndex = [];
papers.forEach((element) => {
  element.style.zIndex = zInd;
  dataZIndex.push(zInd);
  zInd--;
});

let clck = 1;
function clickHandler(x) {
  if (clck) {
    if (x) {
      goNextPage();
    } else {
      goPrevPage();
    }
    clck = 0;
    setTimeout(() => {
      clck = 1;
    }, 500);
  }
}

if (!tampilKirimPesan) {
  pesanBtn.style.display = "none";
}

function goNextPage() {
  if (currentLocation == paperTotal - 1) pesanBtn.classList.add("show");
  if (currentLocation < paperTotal) {
    playVidYt(currentLocation + 1);
    let time = 250;
    if (currentLocation == 0) time = 300;
    if (currentLocation == paperTotal - 1) time = 200;
    const tmp = currentLocation;
    setTimeout(() => {
      papers[tmp].style.zIndex = `${tmp}`;
      if (tmp == paperTotal - 2) {
        papers[tmp + 1].style.zIndex = `${tmp + 1}`;
      }
    }, time);

    const activeNow = currentLocation;
    paperHandler(activeNow);

    if (currentLocation == paperTotal - 1) closeBook(0);
    else openBook();

    // console.log(`Active now : ${currentLocation}`);
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 0 && currentLocation <= paperTotal) {
    currentLocation--;
    playVidYt(currentLocation);

    let time = 250;
    if (currentLocation == 0) time = 200;
    if (currentLocation == paperTotal - 1) time = 300;
    const tmp = currentLocation;
    setTimeout(() => {
      papers[tmp].style.zIndex = `${dataZIndex[tmp]}`;

      if (tmp == paperTotal - 1) {
        papers[tmp].style.zIndex = paperTotal - 1;
      } else if (tmp == paperTotal - 2) {
        papers[tmp + 1].style.zIndex = `${dataZIndex[tmp + 1]}`;
      }
      // console.clear();
      // console.log(tmp);
    }, time);

    const activeNow = currentLocation - 1;
    paperHandler(activeNow);

    if (currentLocation == 0) closeBook(1);
    if (currentLocation == paperTotal - 1) openBook();
  }
}

function paperHandler(activeNow) {
  papers.forEach((paper, index) => {
    const paperFront = paper.querySelector(".front");
    const paperBack = paper.querySelector(".back");
    if (activeNow >= 0) {
      if (index >= activeNow - 2 && index <= activeNow + 3) {
        paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0.2)`;
      } else {
        paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0)`;
      }

      if (index == activeNow) {
        paperFront.style.transform = `rotateY(-150deg)`;
        paperBack.style.transform = `rotateY(-150deg)`;
      } else if (index == activeNow - 1) {
        paperFront.style.transform = `rotateY(-160deg)  scaleX(105%)`;
        paperBack.style.transform = `rotateY(-160deg)  scaleX(105%)`;
      } else if (index <= activeNow - 2) {
        paperFront.style.transform = `rotateY(-170deg)  scaleX(110%)`;
        paperBack.style.transform = `rotateY(-170deg)  scaleX(110%)`;
      } else if (index == activeNow + 1) {
        paperFront.style.transform = `rotateY(-30deg)`;
        paperBack.style.transform = `rotateY(-30deg)`;
      } else if (index == activeNow + 2) {
        paperFront.style.transform = `rotateY(-20deg)  scaleX(105%)`;
        paperBack.style.transform = `rotateY(-20deg)  scaleX(105%)`;
      } else if (index >= activeNow + 3) {
        paperFront.style.transform = `rotateY(-10deg) scaleX(110%)`;
        paperBack.style.transform = `rotateY(-10deg) scaleX(110%)`;
      }
    }
  });
}
let addInYt = 0;
let addInVideo = 0;
video.forEach((data) => {
  if (data.idYoutube) {
    data.index = addInYt;
    addInYt++;
  } else if (data.fileVideo) {
    data.index = addInVideo;
    addInVideo++;
  }
});

function playVidYt(index) {
  const dataPage = video.filter((item) => item.page === index);

  let dataPos0 = dataPage.find((item) => item.position === 0);
  if (dataPos0) {
    musikA.pause();
    if (dataPos0.idYoutube !== undefined) {
      ytplay(dataPos0.index);
    } else if (dataPos0.fileVideo !== undefined) {
      videos[dataPos0.index].play();
    }
    return;
  }

  let dataPos1 = dataPage.find((item) => item.position === 1);
  if (dataPos1) {
    musikA.pause();
    if (dataPos1.idYoutube !== undefined) {
      ytplay(dataPos1.index);
    } else if (dataPos1.fileVideo !== undefined) {
      videos[dataPos1.index].play();
    }
    return;
  }
}

const vidWidth = (document.querySelector(".paper").clientWidth * 80) / 100;
console.log(vidWidth);

let players = [];

// let papers = document.querySelectorAll(".paper");
let indVid = 0;
let indYt = 0;
video.forEach((data) => {
  const videoE = document.createElement("div");
  videoE.classList.add("video");

  const btnCn = document.createElement("div");
  btnCn.classList.add("btn-cn");

  const btnPlay = document.createElement("button");
  btnPlay.classList.add("btn-play");
  btnPlay.innerHTML = btnPlayText;

  const btnFullscreen = document.createElement("button");
  btnFullscreen.classList.add("btn-fs");
  btnFullscreen.innerHTML = btnFullscreenText;

  if (data.idYoutube) {
    const ytE = document.createElement("div");
    ytE.classList.add("ytplayer");
    ytE.setAttribute("id", `ytplayer${indYt}`);

    const tmpIyt = indYt;
    btnPlay.onclick = () => {
      ytplay(tmpIyt);
    };

    btnFullscreen.onclick = () => {
      goFullscreenYt(tmpIyt);
    };

    videoE.appendChild(ytE);
    // videoE.appendChild(btnPlay);

    indYt++;
  } else if (data.fileVideo) {
    const vidE = document.createElement("video");
    vidE.width = vidWidth;
    vidE.height = (vidWidth * 9) / 16;
    vidE.setAttribute("controls", "");

    const sourceE = document.createElement("source");
    sourceE.src = data.fileVideo;
    sourceE.type = "video/mp4";

    btnPlay.onclick = () => {
      pauseAll();
      musikA.pause();
      vidE.play();
    };

    btnFullscreen.onclick = () => {
      goFullscreenVideo(vidE);
    };

    vidE.appendChild(sourceE);
    videoE.appendChild(vidE);
    // videoE.appendChild(btnPlay);
    // videoE.appendChild(btnFullscreen);
  }

  btnCn.appendChild(btnPlay);
  btnCn.appendChild(btnFullscreen);

  if (data.position) {
    papers[data.page].querySelector(".front-content").appendChild(videoE);
    papers[data.page].querySelector(".front-content").appendChild(btnCn);
  } else {
    papers[data.page - 1].querySelector(".back-content").appendChild(videoE);
    papers[data.page - 1].querySelector(".back-content").appendChild(btnCn);
  }
  indVid++;
});

function onYouTubeIframeAPIReady() {
  let indVidd = 0;
  let indYt = 0;
  video.forEach((data) => {
    if (data.idYoutube) {
      players[indYt] = new YT.Player(`ytplayer${indYt}`, {
        videoId: data.idYoutube,
        height: (vidWidth / 16) * 9,
        width: vidWidth,
      });
      indYt++;
    }
    indVidd++;
  });

  console.log(video);
}

function ytplay(ind) {
  pauseAll();
  musikA.pause();
  if (players[ind] && players[ind].playVideo) {
    players[ind].playVideo();
  }
}

const videos = document.querySelectorAll("video");
function pauseAll() {
  for (let i = 0; i < players.length; i++) {
    ytpause(i);
  }
  for (let i = 0; i < videos.length; i++) {
    videos[i].pause();
  }
  musikA.play();
}

function ytpause(ind) {
  if (players[ind] && players[ind].pauseVideo) {
    players[ind].pauseVideo();
  }
}

function goFullscreenYt(index) {
  const iframe = players[index].getIframe();
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen(); // Safari
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen(); // IE
  }
}

function goFullscreenVideo(element) {
  const video = element;
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Safari
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen(); // IE
  }
}
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const links = document.querySelectorAll(".navlist a");
const navItems = document.querySelectorAll(".navlist li");

/* Toggle mobile menu */
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

/* Klik menu */
links.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.getAttribute("href");

    // Jika external link → biarkan normal
    if (target.startsWith("http")) return;

    // Hapus semua active
    navItems.forEach((li) => li.classList.remove("active"));

    // Tambahkan active ke li yang diklik
    this.parentElement.classList.add("active");

    // Tutup mobile menu
    menu.classList.remove("bx-x");
    navlist.classList.remove("open");
  });
});

window.onload = () => {
  const preload = document.querySelector(".preload");
  preload.style = "transition: .5s ease all; opacity: 0";
  setTimeout(() => {
    preload.remove();
  }, 500);
};
