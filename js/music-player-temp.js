// ==================================================================
// Player.js - Refactor hiện đại, chuẩn doanh nghiệp, có comment tiếng Việt
// ==================================================================

class Player {
  constructor() {
    // ===== Khởi tạo state =====
    this.state = {
      isPlaying: false, // Trạng thái phát nhạc
      isShuffle: false, // Trạng thái trộn bài
      loopMode: 0, // 0: không lặp, 1: lặp 1 bài, 2: lặp toàn bộ
      currentSong: null, // Bài hát hiện tại
      currentPlaylist: [], // Danh sách phát hiện tại
      likedSongs: [], // Danh sách bài hát yêu thích
    };

    // ===== Khởi tạo audio =====
    this.audio = new Audio();

    // ===== Lấy các element DOM =====
    this.elements = {
      playerContainer: document.querySelector('.music-player'),
      coverImage: document.querySelector('.cover-image'),
      songTitleText: document.querySelector('.song-title-text'),
      artistNameText: document.querySelector('.artist-name-text'),
      settingBtn: document.querySelector('.setting-btn'),
      lyricBtn: document.querySelector('.lyric-btn'),
      shuffleBtn: document.querySelector('.shuffle-btn'),
      backwardBtn: document.querySelector('.backward-btn'),
      playBtn: document.querySelector('.play-btn'),
      forwardBtn: document.querySelector('.forward-btn'),
      repeatBtn: document.querySelector('.repeat-btn'),
      likeBtn: document.querySelector('.like-btn'),
      volumeSlider: document.querySelector('.volume-slider'),
      progressContainer: document.querySelector('.progress-bar-container'),
      progressFill: document.querySelector('.progress-fill'),
      currentTimeText: document.querySelector('.current-time-text'),
      durationText: document.querySelector('.duration-text'),
      lyricsWrapper: document.querySelector('.lyrics-wrapper'),
      lyricsBox: document.querySelector('.lyrics-box-container'),
      playlistWrapper: document.querySelector('.playlist-wrapper'),
      playlistContainer: document.querySelector('.playlist-container'),
      playlistList: document.querySelector('.playlist-list'),
      playlistHeaderText: document.querySelector('.playlist-header-text'),
      modal: document.querySelector('.modal'),
      closeBtn: document.querySelector('.close-btn'),
      themeSection: document.querySelector('.theme-section'),
      playlistSlideshowTrack: document.querySelector('.slideshow-track'),
      volumeControl: document.querySelector('.volume-control-container'),
    };

    this.songs = [
      {
        id: 1,
        name: "Chạm Đáy Nỗi Đau",
        artist: "ERIK",
        album: "Single",
        songPath: "../music/ChamDayNoiDau-ERIK.mp3",
        time: "03:42",
        songImgPath: "songs/cham-day-noi-dau.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 2,
        name: "Chạy Ngay Đi",
        artist: "Sơn Tùng M-TP",
        album: "Single",
        songPath: "../music/ChayNgayDi-SonTungMTP.mp3",
        time: "04:15",
        songImgPath: "songs/chay-ngay-di.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 3,
        name: "Chúng Ta Không Thuộc Về Nhau",
        artist: "Sơn Tùng M-TP",
        album: "Single",
        songPath: "../music/ChungTaKhongThuocVeNhau-SonTungMTP.mp3",
        time: "02:58",
        songImgPath: "songs/chung-ta-khong-thuoc-ve-nhau.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 4,
        name: "Đừng Ai Nhắc Về Anh Ấy",
        artist: "Trà My Idol",
        album: "Single",
        songPath: "../music/DungAiNhacVeAnhAy-TraMyIdol.mp3",
        time: "02:58",
        songImgPath: "songs/dung-ai-nhac-ve-anh-ay.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 5,
        name: "Dưới Những Cơn Mưa",
        artist: "Mr. Siro",
        album: "Single",
        songPath: "../music/DuoiNhungConMua-MrSiro.mp3",
        time: "02:58",
        songImgPath: "songs/duoi-nhung-con-mua.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 6,
        name: "Hãy Trao Cho Anh",
        artist: "Sơn Tùng M-TP ft. Snoop Dogg",
        album: "Single",
        songPath: "../music/HayTraoChoAnh-SonTungMTPSnoopDogg.mp3",
        time: "02:58",
        songImgPath: "songs/hay-trao-cho-anh.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
      {
        id: 7,
        name: "Nắng Ấm Xa Dần",
        artist: "Sơn Tùng M-TP",
        album: "Single",
        songPath: "../music/NangAmXaDan-SonTungMTP.mp3",
        time: "02:58",
        songImgPath: "songs/nang-am-xa-dan.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 4.0,
            subText: "Neon signs flicker in the rain",
          },
          {
            no: 2,
            timeStart: 4.01,
            timeEnd: 8.5,
            subText: "Walking streets with no one around",
          },
          {
            no: 3,
            timeStart: 8.51,
            timeEnd: 12.0,
            subText: "Lost in the city lights",
          },
        ],
      },
    ];
    this.playlists = [
      {
        id: 1,
        name: "Top-50",
        imgPath: "../images/image9.jpg",
        songIds: [1, 2, 3, 4],
      },
      {
        id: 2,
        name: "EDM",
        imgPath: "../images/image10.jpg",
        songIds: [4, 5, 6, 7],
      },
      {
        id: 3,
        name: "Remix",
        imgPath: "../images/image11.jpg",
        songIds: [1, 3, 5, 7],
      },
      {
        id: 4,
        name: "Chill",
        imgPath: "../images/image12.jpg",
        songIds: [2, 4, 6, 7],
      },
      {
        id: 5,
        name: "Lo-fi",
        imgPath: "../images/image13.jpg",
        songIds: [5, 6, 7, 1],
      },
      {
        id: 6,
        name: "Bass",
        imgPath: "../images/image14.jpg",
        songIds: [6, 5, 4, 3],
      },
    ];
    this.themes = {
      sand: {
        "--bg-gradient-main": "linear-gradient(135deg, #f8e9a1, #f76c6c)",
        "--bg-panel": "rgba(255, 255, 255, 0.75)",
        "--color-primary": "#ffe066",
        "--color-secondary": "#f25f5c", // đậm nhất
        "--color-tertiary": "#f8b195",
        "--color-text-main": "#4a4a4a",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#fffbe7",
        "--color-highlight-light": "#fff9e8",
        "--color-text-secondary": "#777777",
      },

      light: {
        "--bg-gradient-main": "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
        "--bg-panel": "rgba(255, 255, 255, 0.7)",
        "--color-primary": "#ff6ec4",
        "--color-secondary": "#787ff6",
        "--color-tertiary": "#bbbef5",
        "--color-text-main": "#2c2c2c",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#ffe3f1",
        "--color-highlight-light": "#fcf2f9",
        "--color-text-secondary": "#888888",
      },
      dark: {
        "--bg-gradient-main": "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
        "--bg-panel": "rgba(40, 40, 40, 0.85)",
        "--color-primary": "#9f7aea",
        "--color-secondary": "#63b3ed",
        "--color-tertiary": "#a0aec0",
        "--color-text-main": "#f5f5f5",
        "--shadow-main": "rgba(0, 0, 0, 0.4)",
        "--color-highlight": "#2d2d2d",
        "--color-highlight-light": "#3a3a3a",
        "--color-text-secondary": "#888888",
      },
      chill: {
        "--bg-gradient-main": "linear-gradient(135deg, #d4fc79, #96e6a1)",
        "--bg-panel": "rgba(255, 255, 255, 0.6)",
        "--color-primary": "#4ecdc4",
        "--color-secondary": "#337ab7",
        "--color-tertiary": "#1296ba",
        "--color-text-main": "#2f3e46",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#eef9bf",
        "--color-highlight-light": "#f0ffdc",
        "--color-text-secondary": "#888888",
      },
      modern: {
        "--bg-gradient-main": " linear-gradient(135deg, #667eea, #764ba2)",
        "--bg-panel": " rgba(255, 255, 255, 0.1)",
        "--color-primary": " #d2afd8",
        "--color-secondary": " #f057ff",
        "--color-tertiary": " #a594f9",
        "--color-text-main": " #ffffff",
        "--shadow-main": " rgba(0, 0, 0, 0.4)",
        "--color-highlight": " #fbe2fb",
        "--color-highlight-light": " #d4a8fb",
        "--color-text-secondary": " #cccccc",
      },
      candy: {
        "--bg-gradient-main": "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "--bg-panel": "rgba(255, 255, 255, 0.6)",
        "--color-primary": "#ff758c",
        "--color-secondary": "#ff7eb3",
        "--color-tertiary": "#ffc3a0",
        "--color-text-main": "#3e3e3e",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#ffe4ec",
        "--color-highlight-light": "#fff0f5",
        "--color-text-secondary": "#888888",
      },
      sakura: {
        "--bg-gradient-main": "linear-gradient(135deg, #fce4ec, #f8bbd0)",
        "--bg-panel": "rgba(255, 245, 248, 0.7)",
        "--color-primary": "#ec407a",
        "--color-secondary": "#f06292",
        "--color-tertiary": "#f8bbd0",
        "--color-text-main": "#4a4a4a",
        "--shadow-main": "rgba(0, 0, 0, 0.08)",
        "--color-highlight": "#fff0f5",
        "--color-highlight-light": "#ffebef",
        "--color-text-secondary": "#888888",
      },
      midnight: {
        "--bg-gradient-main":
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        "--bg-panel": "rgba(20, 20, 30, 0.8)",
        "--color-primary": "#64dfdf",
        "--color-secondary": "#80ffdb",
        "--color-tertiary": "#6930c3",
        "--color-text-main": "#e0e0e0",
        "--shadow-main": "rgba(0, 0, 0, 0.6)",
        "--color-highlight": "#222831",
        "--color-highlight-light": "#31363f",
        "--color-text-secondary": "#aaaaaa",
      },
      forest: {
        "--bg-gradient-main": "linear-gradient(135deg, #a8e063, #baf79e)",
        "--bg-panel": "rgba(255, 255, 255, 0.65)",
        "--color-primary": "#3b945e",
        "--color-secondary": "#397b54",
        "--color-tertiary": "#4e944f",
        "--color-text-main": "#263a29",
        "--shadow-main": "rgba(0, 0, 0, 0.15)",
        "--color-highlight": "#dff6dd",
        "--color-highlight-light": "#f2fff2",
        "--color-text-secondary": "#888888",
      },
      peach: {
        "--bg-gradient-main": "linear-gradient(135deg, #ffecd2, #fcb69f)",
        "--bg-panel": "rgba(255, 255, 255, 0.8)",
        "--color-primary": "#ffb085",
        "--color-secondary": "#e17a47", // đậm nhất
        "--color-tertiary": "#ffd8c2",
        "--color-text-main": "#4d3b3b",
        "--shadow-main": "rgba(0, 0, 0, 0.12)",
        "--color-highlight": "#fff2eb",
        "--color-highlight-light": "#fff8f4",
        "--color-text-secondary": "#888888",
      },

      // Mint mát lạnh – Nền sáng
      mint: {
        "--bg-gradient-main": "linear-gradient(135deg, #d9f8c4, #b3e5d9)",
        "--bg-panel": "rgba(255, 255, 255, 0.75)",
        "--color-primary": "#b2dfdb",
        "--color-secondary": "#009688", // đậm
        "--color-tertiary": "#80cbc4",
        "--color-text-main": "#2e3a36",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#e0f2f1",
        "--color-highlight-light": "#f1fffc",
        "--color-text-secondary": "#666666",
      },

      // Neon Tokyo – Nền tối
      neon: {
        "--bg-gradient-main":
          "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        "--bg-panel": "rgba(25, 25, 35, 0.9)",
        "--color-primary": "#9d4edd",
        "--color-secondary": "#e0aaff", // sáng hơn
        "--color-tertiary": "#7b2cbf",
        "--color-text-main": "#f0f0f0",
        "--shadow-main": "rgba(0, 0, 0, 0.5)",
        "--color-highlight": "#322653",
        "--color-highlight-light": "#3c3a6e",
        "--color-text-secondary": "#bbbbbb",
      },

      // Cyberpunk – Nền tối
      cyberpunk: {
        "--bg-gradient-main": "linear-gradient(135deg, #ff0057, #7a00ff)",
        "--bg-panel": "rgba(10, 10, 20, 0.85)",
        "--color-primary": "#ff67e7",
        "--color-secondary": "#ffde59", // sáng nhất
        "--color-tertiary": "#8c52ff",
        "--color-text-main": "#ffffff",
        "--shadow-main": "rgba(0, 0, 0, 0.7)",
        "--color-highlight": "#1a1a2e",
        "--color-highlight-light": "#29294d",
        "--color-text-secondary": "#999999",
      },

      // Ocean deep – Nền tối
      ocean: {
        "--bg-gradient-main": "linear-gradient(135deg, #2b5876, #4e4376)",
        "--bg-panel": "rgba(30, 30, 50, 0.9)",
        "--color-primary": "#4d96ff",
        "--color-secondary": "#90e0ef", // sáng hơn
        "--color-tertiary": "#00b4d8",
        "--color-text-main": "#d9f8ff",
        "--shadow-main": "rgba(0, 0, 0, 0.3)",
        "--color-highlight": "#142850",
        "--color-highlight-light": "#27496d",
        "--color-text-secondary": "#a0c4ff",
      },

      // Cloudy Blue – Nền sáng
      cloudy: {
        "--bg-gradient-main": "linear-gradient(135deg, #dfe9f3, #ffffff)",
        "--bg-panel": "rgba(255, 255, 255, 0.85)",
        "--color-primary": "#b3cde0",
        "--color-secondary": "#3f72af", // đậm hơn
        "--color-tertiary": "#a9def9",
        "--color-text-main": "#333333",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#f7f9fb",
        "--color-highlight-light": "#ecf4fb",
        "--color-text-secondary": "#666666",
      },
      sunset: {
        "--bg-gradient-main": "linear-gradient(135deg, #f7971e, #ffd200)",
        "--bg-panel": "rgba(255, 250, 230, 0.8)",
        "--color-primary": "#ffb347",
        "--color-secondary": "#ff8008", // đậm
        "--color-tertiary": "#ffd194",
        "--color-text-main": "#4b3e2f",
        "--shadow-main": "rgba(0, 0, 0, 0.15)",
        "--color-highlight": "#fff3d6",
        "--color-highlight-light": "#fff9eb",
        "--color-text-secondary": "#888888",
      },
      lavender: {
        "--bg-gradient-main": "linear-gradient(135deg, #eecda3, #ef629f)",
        "--bg-panel": "rgba(255, 240, 250, 0.75)",
        "--color-primary": "#d291bc",
        "--color-secondary": "#a4508b",
        "--color-tertiary": "#f5b0cb",
        "--color-text-main": "#3e3e3e",
        "--shadow-main": "rgba(0, 0, 0, 0.08)",
        "--color-highlight": "#fde4f2",
        "--color-highlight-light": "#fff0fa",
        "--color-text-secondary": "#777777",
      },
      vintage: {
        "--bg-gradient-main": "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
        "--bg-panel": "rgba(255, 255, 255, 0.65)",
        "--color-primary": "#c3aed6",
        "--color-secondary": "#8b5fbf", // đậm
        "--color-tertiary": "#a17eb5",
        "--color-text-main": "#4e4e4e",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#f3e9ff",
        "--color-highlight-light": "#faf6ff",
        "--color-text-secondary": "#888888",
      },
      moody: {
        "--bg-gradient-main": "linear-gradient(135deg, #2b5876, #4e4376)",
        "--bg-panel": "rgba(25, 25, 35, 0.8)",
        "--color-primary": "#9baec8",
        "--color-secondary": "#cddafd", // sáng
        "--color-tertiary": "#4c6793",
        "--color-text-main": "#f1f1f1",
        "--shadow-main": "rgba(0, 0, 0, 0.4)",
        "--color-highlight": "#2c3e50",
        "--color-highlight-light": "#34495e",
        "--color-text-secondary": "#aaaaaa",
      },
      coral: {
        "--bg-gradient-main": "linear-gradient(135deg, #ff9a8b, #ff6a88)",
        "--bg-panel": "rgba(255, 240, 240, 0.7)",
        "--color-primary": "#ff7b7b",
        "--color-secondary": "#ff4e50",
        "--color-tertiary": "#ffa69e",
        "--color-text-main": "#4a4a4a",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#ffe5e5",
        "--color-highlight-light": "#fff1f1",
        "--color-text-secondary": "#888888",
      },
      glacier: {
        "--bg-gradient-main": "linear-gradient(135deg, #c2e9fb, #a1c4fd)",
        "--bg-panel": "rgba(255, 255, 255, 0.8)",
        "--color-primary": "#89dce4",
        "--color-secondary": "#4ea3d1",
        "--color-tertiary": "#7bdff2",
        "--color-text-main": "#2f3e46",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#e0f7ff",
        "--color-highlight-light": "#f2fbff",
        "--color-text-secondary": "#666666",
      },
      noir: {
        "--bg-gradient-main": "linear-gradient(135deg, #232526, #414345)",
        "--bg-panel": "rgba(20, 20, 20, 0.85)",
        "--color-primary": "#666666",
        "--color-secondary": "#eeeeee", // sáng
        "--color-tertiary": "#999999",
        "--color-text-main": "#ffffff",
        "--shadow-main": "rgba(0, 0, 0, 0.5)",
        "--color-highlight": "#2a2a2a",
        "--color-highlight-light": "#3a3a3a",
        "--color-text-secondary": "#bbbbbb",
      },
      spring: {
        "--bg-gradient-main": "linear-gradient(135deg, #f6d365, #fda085)",
        "--bg-panel": "rgba(255, 255, 255, 0.7)",
        "--color-primary": "#f9a26c",
        "--color-secondary": "#f76c6c", // đậm
        "--color-tertiary": "#ffd97d",
        "--color-text-main": "#444444",
        "--shadow-main": "rgba(0, 0, 0, 0.08)",
        "--color-highlight": "#fff2d7",
        "--color-highlight-light": "#fff8ec",
        "--color-text-secondary": "#777777",
      },
      galaxy: {
        "--bg-gradient-main": "linear-gradient(135deg, #654ea3, #eaafc8)",
        "--bg-panel": "rgba(30, 20, 40, 0.9)",
        "--color-primary": "#a685e2",
        "--color-secondary": "#fbc7d4", // sáng hơn
        "--color-tertiary": "#9153c9",
        "--color-text-main": "#f5f5f5",
        "--shadow-main": "rgba(0, 0, 0, 0.5)",
        "--color-highlight": "#2e2e3a",
        "--color-highlight-light": "#413e52",
        "--color-text-secondary": "#bbbbbb",
      },
      denim: {
        "--bg-gradient-main": "linear-gradient(135deg, #398dfc, #29baff)",
        "--bg-panel": "rgba(240, 245, 255, 0.85)",
        "--color-primary": "#7aa1f7",
        "--color-secondary": "#0844a1", // đậm
        "--color-tertiary": "#9bb1f9",
        "--color-text-main": "#1c1c3c",
        "--shadow-main": "rgba(0, 0, 0, 0.2)",
        "--color-highlight": "#e6ecff",
        "--color-highlight-light": "#f0f4ff",
        "--color-text-secondary": "#555555",
      },
    };

    // ===== Khởi tạo UI và sự kiện =====
    this.initUI();
    this.initEvents();
  }

  // ===== Khởi tạo UI ban đầu =====
  initUI() {
    this.renderThemeOptions();
    this.renderPlaylist();
    // ... các render khác nếu cần
  }

  // ===== Khởi tạo các event listener =====
  initEvents() {
    // Sự kiện play/pause
    this.elements.playBtn.addEventListener('click', () => this.togglePlay());
    // Sự kiện next/prev
    this.elements.forwardBtn.addEventListener('click', () => this.nextSong());
    this.elements.backwardBtn.addEventListener('click', () => this.prevSong());
    // Sự kiện shuffle
    this.elements.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    // Sự kiện repeat
    this.elements.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    // Sự kiện like
    this.elements.likeBtn.addEventListener('click', () => this.toggleLike());
    // Sự kiện volume
    this.elements.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    // Sự kiện modal
    this.elements.settingBtn.addEventListener('click', () => this.toggleModal());
    this.elements.closeBtn.addEventListener('click', () => this.toggleModal());
    this.elements.modal.addEventListener('click', (e) => {
      if (e.target === this.elements.modal) this.toggleModal();
    });
    // ... các event khác
  }

  // ===== Playback =====
  playSong(song = this.state.currentSong) {
    if (!song) return;
    this.audio.src = song.songPath;
    this.audio.play();
    this.state.isPlaying = true;
    this.state.currentSong = song;
    this.updateSongInfoUI();
    this.updatePlayBtnUI();
  }

  pauseSong() {
    this.audio.pause();
    this.state.isPlaying = false;
    this.updatePlayBtnUI();
  }

  togglePlay() {
    if (this.audio.paused) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }

  nextSong() {
    // ... logic chuyển bài tiếp theo
  }

  prevSong() {
    // ... logic chuyển bài trước đó
  }

  setVolume(value) {
    // value: 0-100
    this.audio.volume = Math.min(Math.max(value / 100, 0), 1);
    // ... cập nhật icon volume nếu cần
  }

  // ===== Playlist =====
  renderPlaylist() {
    // ... render danh sách playlist ra UI
  }

  // ===== Theme =====
  renderThemeOptions() {
    // ... render các theme ra UI
  }

  applyTheme(themeName) {
    // ... áp dụng theme cho app
  }

  // ===== Modal =====
  toggleModal() {
    this.elements.modal.classList.toggle('show');
  }

  // ===== Like =====
  toggleLike() {
    // ... logic thêm/xóa bài hát yêu thích
  }

  // ===== Repeat/Shuffle =====
  toggleRepeat() {
    // ... logic chuyển đổi repeat mode
  }

  toggleShuffle() {
    // ... logic chuyển đổi shuffle
  }

  // ===== Update UI =====
  updateSongInfoUI() {
    // ... cập nhật thông tin bài hát lên UI
  }

  updatePlayBtnUI() {
    // ... cập nhật icon play/pause
  }

  // ===== Các hàm khác (lyrics, storage, ...) =====
  // ...
}

// Khởi tạo player khi DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.player = new Player();
  player.initUI();
  player.initEvents();
});
// ==================================================================
// END Player.js
// ==================================================================
