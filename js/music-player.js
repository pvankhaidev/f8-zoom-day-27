// ==================================================================
// Player.js - Music Player hoàn chỉnh, đầy đủ tính năng, có comment tiếng Việt
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
      isLyricsVisible: false, // Trạng thái hiển thị lyrics
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
        songImgPath: "../images/image9.jpg",
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
        songImgPath: "../images/image10.jpg",
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
        songImgPath: "../images/image11.jpg",
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
        songImgPath: "../images/image12.jpg",
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
        songImgPath: "../images/image13.jpg",
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
        songImgPath: "../images/image14.jpg",
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
        songImgPath: "../images/image15.jpg",
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
        songIds: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: 2,
        name: "EDM",
        imgPath: "../images/image10.jpg",
        songIds: [4, 5, 6, 7, 1, 2, 3],
      },
      {
        id: 3,
        name: "Remix",
        imgPath: "../images/image11.jpg",
        songIds: [1, 3, 5, 7, 2, 4, 6],
      },
      {
        id: 4,
        name: "Chill",
        imgPath: "../images/image12.jpg",
        songIds: [2, 4, 6, 7, 1, 3, 5],
      },
      {
        id: 5,
        name: "Lo-fi",
        imgPath: "../images/image13.jpg",
        songIds: [5, 6, 7, 1, 2, 3, 4],
      },
      {
        id: 6,
        name: "Bass",
        imgPath: "../images/image14.jpg",
        songIds: [6, 5, 4, 3, 2, 1, 7],
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

    // ===== Load trạng thái từ localStorage =====
    this.loadStorage();

    // ===== Khởi tạo UI và sự kiện =====
    this.initUI();
    this.initEvents();
  }

  // ===== Khởi tạo UI ban đầu =====
  initUI() {
    this.renderThemeOptions();
    this.renderPlaylist();
    this.updateSongInfoUI();
    this.updatePlayBtnUI();
    this.updateLikeBtnUI();
    this.updateProgressUI();
    this.renderLyrics();
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
    // Sự kiện chọn bài hát trong playlist
    this.elements.playlistList.addEventListener('click', (e) => {
      const li = e.target.closest('li.song-name-item');
      if (li) {
        const songId = Number(li.dataset.id);
        const song = this.songs.find(s => s.id === songId);
        if (song) this.playSong(song);
      }
    });
    // Sự kiện tua nhạc
    this.elements.progressContainer.addEventListener('click', (e) => {
      const rect = this.elements.progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      if (this.audio.duration) {
        this.audio.currentTime = percent * this.audio.duration;
      }
    });
    // Sự kiện cập nhật tiến trình nhạc
    this.audio.addEventListener('timeupdate', () => this.updateProgressUI());
    this.audio.addEventListener('ended', () => this.handleSongEnd());
    // Sự kiện toggle lyrics
    this.elements.lyricBtn.addEventListener('click', () => this.toggleLyrics());
  }

  // ===== Playback =====
  playSong(song = this.state.currentSong) {
    if (!song) return;
    // Nếu đang phát đúng bài hiện tại thì không set lại src để giữ nguyên currentTime
    if (this.audio.src !== this.getAudioSrc(song.songPath)) {
      this.audio.src = song.songPath;
      this.audio.currentTime = 0;
    }
    this.audio.play();
    this.state.isPlaying = true;
    this.state.currentSong = song;
    this.updateSongInfoUI();
    this.updatePlayBtnUI();
    this.updateLikeBtnUI();
    this.renderLyrics();
    this.saveStorage();
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

  // ===== Next/Prev theo đúng thứ tự currentPlaylist (kể cả khi shuffle) =====
  nextSong() {
    const playlist = this.state.currentPlaylist.length ? this.state.currentPlaylist : this.songs;
    let idx = playlist.findIndex(s => s.id === this.state.currentSong?.id);
    idx = (idx + 1) % playlist.length;
    this.playSong(playlist[idx]);
  }

  prevSong() {
    const playlist = this.state.currentPlaylist.length ? this.state.currentPlaylist : this.songs;
    let idx = playlist.findIndex(s => s.id === this.state.currentSong?.id);
    idx = (idx - 1 + playlist.length) % playlist.length;
    this.playSong(playlist[idx]);
  }

  setVolume(value) {
    this.audio.volume = Math.min(Math.max(value / 100, 0), 1);
    // Cập nhật icon volume nếu cần
  }

  handleSongEnd() {
    // Xử lý khi bài hát kết thúc
    if (this.state.loopMode === 1) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else if (this.state.loopMode === 2) {
      this.nextSong();
    } else {
      this.pauseSong();
    }
  }

  // ===== Playlist =====
  renderPlaylist() {
    // Hiển thị các playlist dưới dạng slide show
    const track = this.elements.playlistSlideshowTrack;
    track.innerHTML = '';
    this.playlists.forEach((pl) => {
      const slide = document.createElement('div');
      slide.classList.add('slide-item');
      slide.style.backgroundImage = `url('${pl.imgPath}')`;
      slide.textContent = pl.name;
      slide.dataset.id = pl.id;
      // Sự kiện click chọn playlist
      slide.addEventListener('click', () => this.applyPlaylist(pl.id));
      track.appendChild(slide);
    });
    // Mặc định chọn playlist đầu tiên
    if (this.playlists.length > 0) {
      this.applyPlaylist(this.playlists[0].id);
    }
  }

  applyPlaylist(playlistId) {
    // Tìm playlist theo id
    const playlist = this.playlists.find((pl) => pl.id === playlistId);
    if (!playlist) {
      console.warn('Playlist không tồn tại:', playlistId);
      return;
    }
    // Lấy danh sách bài hát theo songIds trong playlist
    const songs = playlist.songIds.map(id => this.songs.find(s => s.id === id)).filter(Boolean);
    this.state.currentPlaylist = songs;
    this.elements.playlistHeaderText.textContent = playlist.name;
    this.elements.playlistList.innerHTML = '';
    songs.forEach((song, idx) => {
      const li = document.createElement('li');
      li.className = 'song-name song-name-item' + (idx === 0 ? ' active' : '');
      li.dataset.id = song.id;
      li.innerHTML = `<span class="song-title">${idx + 1}. ${song.name}</span><span class="song-duration">${song.time}</span>`;
      this.elements.playlistList.appendChild(li);
    });
    // Tự động phát bài đầu tiên khi đổi playlist
    if (songs.length > 0) {
      this.playSong(songs[0]);
    }
  }

  // ===== Theme =====
  renderThemeOptions() {
    this.elements.themeSection.innerHTML = '';
    Object.entries(this.themes).forEach(([themeName, themeVars]) => {
      const div = document.createElement('div');
      div.className = 'theme-sample';
      div.textContent = themeName;
      div.style.background = themeVars['--bg-gradient-main'];
      div.style.color = themeVars['--color-secondary'];
      div.addEventListener('click', () => this.applyTheme(themeName));
      this.elements.themeSection.appendChild(div);
    });
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    this.saveStorage();
  }

  // ===== Modal =====
  toggleModal() {
    this.elements.modal.classList.toggle('show');
  }

  // ===== Like =====
  toggleLike() {
    if (!this.state.currentSong) return;
    const id = this.state.currentSong.id;
    const idx = this.state.likedSongs.indexOf(id);
    if (idx === -1) {
      this.state.likedSongs.push(id);
    } else {
      this.state.likedSongs.splice(idx, 1);
    }
    this.updateLikeBtnUI();
    this.saveStorage();
  }

  updateLikeBtnUI() {
    if (!this.state.currentSong) return;
    const id = this.state.currentSong.id;
    if (this.state.likedSongs.includes(id)) {
      this.elements.likeBtn.classList.add('active');
      this.elements.likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
      this.elements.likeBtn.classList.remove('active');
      this.elements.likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
  }

  // ===== Repeat/Shuffle =====
  toggleRepeat() {
    this.state.loopMode = (this.state.loopMode + 1) % 3;
    // Cập nhật UI cho nút repeat
    const btn = this.elements.repeatBtn;
    btn.classList.remove('active', 'single', 'inactive');
    if (this.state.loopMode === 0) btn.classList.add('inactive');
    else if (this.state.loopMode === 1) btn.classList.add('single');
    else btn.classList.add('active');
    this.saveStorage();
  }

  toggleShuffle() {
    this.state.isShuffle = !this.state.isShuffle;
    this.elements.shuffleBtn.classList.toggle('inactive', !this.state.isShuffle);
    if (this.state.isShuffle) {
      // Xáo trộn playlist hiện tại
      this.state.currentPlaylist = this.shuffleArray([...this.state.currentPlaylist]);
      this.renderCurrentPlaylistUI();
      // Phát lại từ đầu playlist mới
      if (this.state.currentPlaylist.length > 0) {
        this.playSong(this.state.currentPlaylist[0]);
      }
    } else {
      // Trả lại playlist đúng thứ tự gốc theo playlist đang chọn
      const currentPlId = this.getCurrentPlaylistId();
      if (currentPlId) {
        this.applyPlaylist(currentPlId);
      }
    }
    this.saveStorage();
  }

  // Hàm xáo trộn mảng (Fisher-Yates)
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Render lại UI playlist hiện tại (sau khi xáo trộn)
  renderCurrentPlaylistUI() {
    this.elements.playlistList.innerHTML = '';
    this.state.currentPlaylist.forEach((song, idx) => {
      const li = document.createElement('li');
      li.className = 'song-name song-name-item' + (idx === 0 ? ' active' : '');
      li.dataset.id = song.id;
      li.innerHTML = `<span class="song-title">${idx + 1}. ${song.name}</span><span class="song-duration">${song.time}</span>`;
      this.elements.playlistList.appendChild(li);
    });
  }

  // Lấy id playlist hiện tại (nếu có)
  getCurrentPlaylistId() {
    const name = this.elements.playlistHeaderText.textContent;
    const pl = this.playlists.find(p => p.name === name);
    return pl ? pl.id : null;
  }

  // ===== Update UI =====
  updateSongInfoUI() {
    const song = this.state.currentSong;
    if (!song) return;
    this.elements.coverImage.src = song.songImgPath || '';
    this.elements.songTitleText.textContent = song.name;
    this.elements.artistNameText.textContent = song.artist;
    // Cập nhật active trong playlist
    this.elements.playlistList.querySelectorAll('li').forEach(li => {
      li.classList.toggle('active', Number(li.dataset.id) === song.id);
    });
  }

  updatePlayBtnUI() {
    if (this.state.isPlaying) {
      this.elements.playBtn.classList.add('active');
      this.elements.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.elements.playBtn.classList.remove('active');
      this.elements.playBtn.innerHTML = '<i class="fa-solid fa-play icon-play"></i>';
    }
  }

  updateProgressUI() {
    const current = this.audio.currentTime;
    const duration = this.audio.duration || 0;
    this.elements.currentTimeText.textContent = this.formatTime(current);
    this.elements.durationText.textContent = this.formatTime(duration);
    const percent = duration ? (current / duration) * 100 : 0;
    this.elements.progressFill.style.width = `${percent}%`;
    this.highlightCurrentLyric(current);
  }

  // ===== Lyrics =====
  renderLyrics() {
    const song = this.state.currentSong;
    if (!song || !song.sub) {
      this.elements.lyricsBox.innerHTML = '<p>Không có lời bài hát</p>';
      return;
    }
    this.elements.lyricsBox.innerHTML = song.sub.map((line, idx) =>
      `<p class="lyric lyric-text" data-idx="${idx}" data-time="${line.timeStart}">${line.subText}</p>`
    ).join('');
    // Sự kiện click vào từng câu lyric để tua
    this.elements.lyricsBox.querySelectorAll('.lyric-text').forEach(p => {
      p.onclick = () => {
        const time = Number(p.dataset.time);
        if (!isNaN(time)) this.audio.currentTime = time;
      };
    });
  }

  highlightCurrentLyric(currentTime) {
    const song = this.state.currentSong;
    if (!song || !song.sub) return;
    const idx = song.sub.findIndex(line => currentTime >= line.timeStart && currentTime <= line.timeEnd);
    this.elements.lyricsBox.querySelectorAll('.lyric-text').forEach((p, i) => {
      p.classList.toggle('active', i === idx);
    });
  }

  // ===== Storage =====
  saveStorage() {
    const data = {
      likedSongs: this.state.likedSongs,
      theme: this.getCurrentThemeName(),
      loopMode: this.state.loopMode,
      isShuffle: this.state.isShuffle,
    };
    localStorage.setItem('musicPlayerData', JSON.stringify(data));
  }

  loadStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('musicPlayerData'));
      if (data) {
        this.state.likedSongs = data.likedSongs || [];
        this.state.loopMode = data.loopMode || 0;
        this.state.isShuffle = !!data.isShuffle;
        if (data.theme) this.applyTheme(data.theme);
      }
    } catch {}
  }

  getCurrentThemeName() {
    // Trả về tên theme hiện tại (nếu cần lưu)
    // (Có thể lưu vào state nếu muốn tối ưu)
    return null;
  }

  // ===== Utils =====
  formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // ===== Toggle lyrics/playlist UI như code cũ =====
  toggleLyrics() {
    const el = this.elements.lyricBtn;
    const { lyricsWrapper, playlistWrapper } = this.elements;
    el.classList.toggle('active');
    el.innerHTML = el.classList.contains('active')
      ? '<i class="fa-solid fa-closed-captioning"></i>'
      : '<i class="fa-regular fa-closed-captioning"></i>';
    this.state.isLyricsVisible = el.classList.contains('active');
    if (this.state.isLyricsVisible) {
      lyricsWrapper.classList.add('active');
      playlistWrapper.classList.remove('active');
    } else {
      lyricsWrapper.classList.remove('active');
      playlistWrapper.classList.add('active');
    }
  }

  // Helper để lấy src tuyệt đối của audio (so sánh đúng)
  getAudioSrc(path) {
    const a = document.createElement('a');
    a.href = path;
    return a.href;
  }
}

// Khởi tạo player khi DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.player = new Player();
});
// ==================================================================
// END Player.js
// ==================================================================
