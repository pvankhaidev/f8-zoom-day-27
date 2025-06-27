// ==================================================================
// ── S ──────────────────────── Player ─────────────────────────────
const Player = {
  // ──────────────────────── Biến const ────────────────────────────
  consts: Object.freeze({
    // Biến lưu 3 trạng thái loop
    REPEAT_MODES: Object.freeze({
      NO_REPEAT: 0, // Không lặp
      REPEAT_ONE: 1, // Lặp 1 bài
      REPEAT_ALL: 2, // Lặp toàn bộ playlist
    }),
    // Biến lưu trạng thái bool ở dạng chuỗi, dùng để lưu trạng thái trong storage
    BOOLEAN_STRING: Object.freeze({
      TRUE: "true",
      FALSE: "false",
    }),
    // Biến lưu danh sách theme
    THEMES: Object.freeze({
      // Sand desert – Nền sáng
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
    }),
  }),

  // ──────────────────────── Biến global ──────────────────────────────
  vars: {
    // Biến lưu trạng thái play, pause
    isPlaying: false,
    // Biến lưu âm thanh
    audio: new Audio(),
    // Biến lưu trạng thái hiển thị lyrics
    isLyricsVisible: false,
    // Biến lưu trạng thái sắp xếp
    isShuffle: false,
    // Biến lưu trạng thái loop
    loopMode: 0,
    // Toàn bộ danh sách phát,
    songItems: [
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
    ],

    // Tất cả các danh sách phát đề xuất
    playlists: [
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
    ],

    // Biến lưu bài hát hiện tại
    currentSong: {
      id: null,
      name: "",
      artist: "",
      album: "",
      songPath: "",
      songImgPath: "",
      time: "",
      sub: [],
    },
    // Biến lưu bài phát gần nhất
    lastPlayed: {
      id: null,
      time: null,
      playlistId: null,
    },
    // Danh sách phát hiện tại
    currentPlaylist: [],
    // Danh sách bài hát yêu thích
    likedItems: [],
  },

  // ──────────────────────── Elements ──────────────────────────────
  elements: Object.freeze({
    // ====== Tổng quát ======
    playerContainer: $(".music-player"),

    // ====== Header ======
    coverImage: $(".cover-image"),
    songTitleText: $(".song-title-text"),
    artistNameText: $(".artist-name-text"),
    settingBtn: $(".setting-btn"),

    // ====== Controls Button ======
    lyricBtn: $(".lyric-btn"),
    shuffleBtn: $(".shuffle-btn"),
    backwardBtn: $(".backward-btn"),
    playBtn: $(".play-btn"),
    forwardBtn: $(".forward-btn"),
    repeatBtn: $(".repeat-btn"),
    likeBtn: $(".like-btn"),

    // ====== Volume ======
    volumeSlider: $(".volume-slider"),

    // ====== Progress Bar ======
    progressContainer: $(".progress-bar-container"),
    progressFill: $(".progress-fill"),
    currentTimeText: $(".current-time-text"),
    durationText: $(".duration-text"),

    // ====== Lyrics ======
    lyricsWrapper: $(".lyrics-wrapper"),
    lyricsBox: $(".lyrics-box-container"),
    lyricLines: $$(".lyric-text"),

    // ====== Playlist ======
    playlistWrapper: $(".playlist-wrapper"),
    playlistContainer: $(".playlist-container"),
    playlistItems: $$(".song-name-item"),

    // ====== Header Texts (Lyrics & Playlist) ======
    lyricHeader: $(".lyric-header-text"),
    playlistHeader: $(".playlist-header-text"),

    // ====== Modal ======
    modal: $(".modal"),
    modalContent: $(".modal-content"),
    settingBtn: $(".setting-btn"),
    closeBtn: $(".close-btn"),
    themeSection: $(".theme-section"),
    playlistSlideshowTrack: $(".slideshow-track"),
    playlistList: $(".playlist-list"),
    playlistHeaderText: $(".playlist-header-text"),
    volumnControl: $(".volume-control-container"),
    volumnSlider: $(".volume-slider"),
  }),

  // ──────────────────────── Methods ──────────────────────────────
  methods: {
    // ==== Hàm sử dụng chung ====
    common: {
      // Hàm khởi tạo UI
      initUI() {
        //
        Player.methods.theme.renderTheme();
        Player.methods.playlist.renderPlaylist();
      },

      // Hàm khởi tạo player
      initPlayer() {
        console.log("init");
      },

      // Chuyển đổi thời gian giây → định dạng mm:ss
      formatTime(time) {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60)
          .toString()
          .padStart(2, "0");
        return `${mins}:${secs}`;
      },
    },

    // ==== Playback ====
    playback: {
      // Phát bài hát hiện tại
      playSong() {
        const song = Player.vars.currentSong;
        if (!song || !song.songPath) return;

        const audio = Player.vars.audio;
        audio.src = song.songPath;
        audio.play();
        Player.vars.isPlaying = true;
      },

      // Tạm dừng bài hát
      pauseSong() {
        Player.vars.audio.pause();
        Player.vars.isPlaying = false;
      },

      // Chuyển đổi giữa phát và tạm dừng
      togglePlayPause() {
        const audio = Player.vars.audio;
        if (audio.paused) {
          this.playSong();
        } else {
          this.pauseSong();
        }
      },

      // Phát bài tiếp theo trong danh sách
      playNext() {
        const currentId = Player.vars.currentSong.id;
        const playlist = Player.vars.currentPlaylist.length
          ? Player.vars.currentPlaylist
          : Player.vars.songItems;

        const index = playlist.findIndex((s) => s.id === currentId);
        const nextIndex = (index + 1) % playlist.length;
        Player.vars.currentSong = playlist[nextIndex];

        this.playSong();
      },

      // Phát bài trước đó trong danh sách
      playPrev() {
        const currentId = Player.vars.currentSong.id;
        const playlist = Player.vars.currentPlaylist.length
          ? Player.vars.currentPlaylist
          : Player.vars.songItems;

        const index = playlist.findIndex((s) => s.id === currentId);
        const prevIndex = (index - 1 + playlist.length) % playlist.length;
        Player.vars.currentSong = playlist[prevIndex];

        this.playSong();
      },

      // Tua đến thời điểm cụ thể trong bài hát
      seekTo(time) {
        Player.vars.audio.currentTime = time;
      },

      // Cập nhật tiến trình bài hát và đồng bộ UI
      updateProgress() {
        const audio = Player.vars.audio;
        const current = audio.currentTime;
        const duration = audio.duration || 0;

        Player.elements.currentTimeText.textContent =
          Player.methods.formatTime(current);
        Player.elements.durationText.textContent =
          Player.methods.formatTime(duration);

        const percent = (current / duration) * 100;
        Player.elements.progressFill.style.width = `${percent}%`;
      },

      // Thiết lập âm lượng
      setVolume(volume) {
        Player.vars.audio.volume = Math.min(Math.max(volume, 0), 1);
      },

      // Hiển thị thông tin bài hát đang phát
      renderSongInfo(song) {},
    },

    // ==== Theme====
    theme: {
      // Render theme từ dữ liệu theme
      renderTheme() {
        const { themeSection } = Player.elements;
        themeSection.innerHTML = ""; // Xóa trước nếu đã có

        const themes = Player.consts.THEMES;
        for (const themeName in themes) {
          const themeDiv = document.createElement("div");
          themeDiv.classList.add("theme-sample");
          themeDiv.textContent = themeName;
          themeDiv.dataset.theme = themeName;

          // Gán màu nền và màu chữ dựa trên biến trong theme
          const themeVars = themes[themeName];
          themeDiv.style.background = themeVars["--bg-gradient-main"];
          themeDiv.style.color = themeVars["--color-secondary"];

          // Gắn sự kiện click để áp dụng theme
          themeDiv.addEventListener("click", () => {
            Player.methods.theme.applyTheme(themeName);
          });

          themeSection.appendChild(themeDiv);
        }
      },

      // Áp dụng theme
      applyTheme(themeName) {
        const theme = Player.consts.THEMES[themeName];
        if (!theme) return;

        const root = document.documentElement;

        Object.entries(theme).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      },
    },

    // ==== Liked Songs ====
    liked: {
      // Thêm hoặc xoá bài hát khỏi danh sách yêu thích
      toggleLike(songId) {},

      // Kiểm tra xem bài hát có nằm trong danh sách yêu thích không
      isLiked(songId) {},

      // Hiển thị danh sách bài hát yêu thích
      renderLikedPlaylist() {},
    },

    // ==== Playlist Management ====
    playlist: {
      renderPlaylist() {
        const { playlistSlideshowTrack } = Player.elements;
        playlistSlideshowTrack.innerHTML = ""; // xóa cũ

        const playlists = Player.vars.playlists;
        playlists.forEach((pl) => {
          const slide = document.createElement("div");
          slide.classList.add("slide-item");
          slide.style.backgroundImage = `url('${pl.imgPath}')`;
          slide.textContent = pl.name;
          slide.dataset.id = pl.id;

          // Click chọn playlist => apply
          slide.addEventListener("click", () => {
            Player.methods.playlist.applyPlaylist(pl.id);
          });

          playlistSlideshowTrack.appendChild(slide);
        });

        Player.methods.playlist.applyPlaylist(playlists[0].id);
      },

      applyPlaylist(playlistId) {
        const { playlistList, playlistHeaderText } = Player.elements;
        const playlists = Player.vars.playlists;
        const songItems = Player.vars.songItems;

        // Tìm playlist theo id
        const playlist = playlists.find((pl) => pl.id === playlistId);
        if (!playlist) {
          console.warn("Playlist không tồn tại:", playlistId);
          return;
        }

        // Lấy danh sách bài hát theo songIds trong playlist
        const songs = playlist.songIds
          .map((id) => songItems.find((s) => s.id === id))
          .filter(Boolean); // lọc undefined nếu có

        // Xóa nội dung cũ
        playlistList.innerHTML = "";

        // Tạo từng li cho mỗi bài
        songs.forEach((song, index) => {
          const li = document.createElement("li");
          li.classList.add("song-name", "song-name-item");
          if (index === 0) li.classList.add("active");

          li.setAttribute("onclick", `playSong(${song.id})`);
          li.dataset.id = song.id;

          // Nội dung bài hát
          const titleSpan = document.createElement("span");
          titleSpan.className = "song-title";
          titleSpan.textContent = `${index + 1}. ${song.name}`;

          const durationSpan = document.createElement("span");
          durationSpan.className = "song-duration";
          durationSpan.textContent = song.time;

          li.appendChild(titleSpan);
          li.appendChild(durationSpan);

          playlistList.appendChild(li);
        });

        playlistHeaderText.textContent = playlist.name;
        // Có thể update Player.vars.currentPlaylist = songs để lưu trạng thái playlist đang chơi
        Player.vars.currentPlaylist = songs;

        // Optional: Tự động phát bài đầu tiên khi đổi playlist
        // Player.methods.playback.playSong();
      },
    },

    // ==== Lyrics ====
    lyrics: {
      // Hiển thị lời bài hát
      renderLyrics() {},

      // Tô đậm câu đang phát theo thời gian hiện tại
      highlightCurrentLyric(currentTime) {},
    },

    // ==== Local storage ====
    storage: {
      // Lưu dữ liệu vào localStorage
      saveStorage() {},

      // Tải dữ liệu từ localStorage
      loadStorage() {},
    },

    // ==== Modal ====
    modal: {
      // Hàm tougle modal
      toggleModal() {
        modal.classList.toggle("show");
      },
    },

    // ==== Control Button ====
    control: {
      // Hàm đổi trạng thái bật tắt lyrics
      changeLyric(el, iconActive, iconNone) {
        const { lyricsWrapper, playlistWrapper } = Player.elements;
        el.classList.toggle("active");
        el.innerHTML = el.classList.contains("active") ? iconActive : iconNone;
        Player.vars.isLyricsVisible = el.classList.contains("active");
        if (Player.vars.isLyricsVisible) {
          lyricsWrapper.classList.add("active");
          playlistWrapper.classList.remove("active");
        } else {
          lyricsWrapper.classList.remove("active");
          playlistWrapper.classList.add("active");
        }
      },

      // Hàm đổi trạng thái bật tắt trộn
      changeShuffle(el) {
        el.classList.toggle("inactive");
        Player.vars.isShuffle = el.classList.contains("inactive");
      },

      // Hàm đổi trạng thái bật tắt repeat
      changeRepeat(el) {
        const { NO_REPEAT, REPEAT_ONE, REPEAT_ALL } =
          Player.consts.REPEAT_MODES;
        el.classList.remove("active");
        el.classList.remove("single");
        el.classList.remove("inactive");

        if (Player.vars.loopMode === NO_REPEAT) {
          el.classList.add("active");
          Player.vars.loopMode = REPEAT_ALL;
        } else if (Player.vars.loopMode === REPEAT_ALL) {
          el.classList.add("single");
          Player.vars.loopMode = REPEAT_ONE;
        } else {
          el.classList.add("inactive");
          Player.vars.loopMode = NO_REPEAT;
        }
      },

      // Hàm đổi trạng thái bật tắt yêu thích
      changeLiked(el, iconActive, iconNone, isForce = null) {
        let isLiked = false;
        if (isForce) {
          // Gán trực tiếp
          if (isForce === true) {
            el.classList.remove("active");
            el.classList.add("active");
            isLiked = true;
          } else {
            el.classList.remove("active");
            isLiked = false;
          }
        } else {
          // Gán theo kiểu tougle
          el.classList.toggle("active");
          isLiked = el.classList.contains("active");
        }

        // Cập nhật icon
        el.innerHTML = isLiked ? iconActive : iconNone;

        if (isLiked) {
          // Hàm lưu bài hát yêu thích vào mảng, storage
        } else {
          // Hoặc hàm xóa khỏi mảng, storage
        }
      },

      // Hàm đổi trạng thái play, pause
      changePlay(el, iconPause, iconPlay, blnForce = null) {
        const audio = Player.vars.audio;
        const currentSong = Player.vars.currentSong;

        if (blnForce !== null) {
          Player.vars.isPlaying = blnForce === true;
        } else {
          el.classList.toggle("active");
          Player.vars.isPlaying = el.classList.contains("active");
        }

        // Cập nhật icon
        el.innerHTML = Player.vars.isPlaying ? iconPause : iconPlay;

        if (Player.vars.isPlaying) {
          // Phát
        } else {
          // Dừng
        }
      },
    },
  },
};
// ── E ──────────────────────── Player ─────────────────────────────
// ==================================================================

// ==================================================================
// ───────────────────────── XỬ LÝ SỰ KIỆN ──────────────────────────
// ==================================================================
// ==================================================================
// ── S ──────────────────────── Modal ──────────────────────────────
// Sự kiện nhấn nút menu và close
const { modal, settingBtn, closeBtn } = Player.elements;
const { toggleModal } = Player.methods.modal;

// Nhấn nút Menu mở Modal
settingBtn.addEventListener("click", toggleModal);

// Nhấn nút close và vùng overlay đóng Modal
closeBtn.addEventListener("click", toggleModal);
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    toggleModal();
  }
});
// ── E ──────────────────────── Modal ──────────────────────────────
// ==================================================================

// ==================================================================
// ── S ──────────────────────── Control Button ─────────────────────
const {
  lyricBtn,
  shuffleBtn,
  backwardBtn,
  playBtn,
  forwardBtn,
  repeatBtn,
  likeBtn,
  volumnControl,
  volumnSlider,
} = Player.elements;

const { changeLyric, changeShuffle, changeRepeat, changeLiked, changePlay } =
  Player.methods.control;

// Sự kiện nhấn nút cc
lyricBtn.addEventListener("click", function () {
  changeLyric(
    this,
    '<i class="fa-solid fa-closed-captioning"></i>',
    '<i class="fa-regular fa-closed-captioning"></i>'
  );
});

// Sự kiện nhấn nút shuffle
shuffleBtn.addEventListener("click", function () {
  changeShuffle(this);
});

// Sự kiện nhấn nút repeat
repeatBtn.addEventListener("click", function () {
  changeRepeat(this);
});

// Sự kiện nhấn nút yêu thích
likeBtn.addEventListener("click", function () {
  changeLiked(
    this,
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-regular fa-heart"></i>'
  );
});

// Sự kiện nhấn nút playBtn
playBtn.addEventListener("click", function () {
  changePlay(
    this,
    '<i class="fa-solid fa-pause"></i>',
    '<i class="fa-solid fa-play icon-play"></i>'
  );
});

// Sự kiện nhấn nút backward
backwardBtn.addEventListener("click", function () {
  // Hàm xử lý lùi
});

// Sự kiện nhấn nút forward
forwardBtn.addEventListener("click", function () {
  // Hàm xử lý tiến
});

// Sự kiện thay đổi volumn
Player.elements.volumnSlider.addEventListener("input", function (e) {
  const volume = parseInt(e.target.value, 10); // Lấy giá trị slider

  // Gán volume cho audio (giá trị 0.0 – 1.0)
  Player.methods.playback.setVolume(volume / 100);

  // Đổi icon theo mức volume
  const icon = Player.elements.volumnControl.querySelector("i");
  if (volume > 50) {
    icon.className = "fa-solid fa-volume-high icon-volume";
  } else if (volume > 0 && volume <= 50) {
    icon.className = "fa-solid fa-volume-low icon-volume";
  } else {
    icon.className = "fa-solid fa-volume-off icon-volume";
  }
});
// ── E ──────────────────────── Control Button ─────────────────────
// ==================================================================

Player.methods.common.initUI();
