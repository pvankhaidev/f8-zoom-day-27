const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Player = {
  // Biến const
  consts: Object.freeze({
    // Biến lưu 3 trạng thái loop
    LOOP_MODES: Object.freeze({
      NO_LOOP: 0, // Không lặp
      LOOP_ONE: 1, // Lặp 1 bài
      LOOP_ALL: 2, // Lặp toàn bộ playlist
    }),
    // Biến lưu trạng thái bool ở dạng chuỗi, dùng để lưu trạng thái trong storage
    BOOLEAN_STRING: Object.freeze({
      TRUE: "true",
      FALSE: "false",
    }),
    // Biến lưu danh sách theme
    THEMES: Object.freeze({
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
        "--color-secondary": "#556270",
        "--color-tertiary": "#c7f464",
        "--color-text-main": "#2f3e46",
        "--shadow-main": "rgba(0, 0, 0, 0.1)",
        "--color-highlight": "#eef9bf",
        "--color-highlight-light": "#f0ffdc",
        "--color-text-secondary": "#888888",
      },
    }),
  }),

  // Biến global
  vars: {
    // Biến lưu trạng thái hiển thị lyrics
    isLyricsVisible: false,
    // Biến lưu trạng thái sắp xếp
    isShuffle: false,
    // Biến lưu trạng thái loop
    loopMode: 0,
    // Toàn bộ danh sách phát, sẽ truyền từ file JSON
    allSongItems: [
      {
        id: 1,
        name: "Sunrise Drive",
        artist: "Luna Hart",
        album: "Morning Escape",
        imgPath: "images/sunrise-drive.jpg",
        time: "03:42",
        songPath: "songs/sunrise-drive.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 5.2,
            subText: "Waking up to the morning light",
          },
          {
            no: 2,
            timeStart: 5.21,
            timeEnd: 10.5,
            subText: "Driving down the open road",
          },
          {
            no: 3,
            timeStart: 10.51,
            timeEnd: 15.0,
            subText: "Feel the breeze and the sunlight",
          },
        ],
      },
      {
        id: 2,
        name: "Echoes of You",
        artist: "The Hollow Trees",
        album: "Midnight Memories",
        imgPath: "images/echoes-of-you.jpg",
        time: "04:15",
        songPath: "songs/echoes-of-you.mp3",
        sub: [
          {
            no: 1,
            timeStart: 0.0,
            timeEnd: 6.0,
            subText: "Echoes of your voice remain",
          },
          {
            no: 2,
            timeStart: 6.01,
            timeEnd: 12.3,
            subText: "Haunting me through the night",
          },
          {
            no: 3,
            timeStart: 12.31,
            timeEnd: 18.0,
            subText: "I can't forget your face",
          },
        ],
      },
      {
        id: 3,
        name: "City Lights",
        artist: "Noah Grey",
        album: "Urban Nights",
        imgPath: "images/city-lights.jpg",
        time: "02:58",
        songPath: "songs/city-lights.mp3",
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
    allPlaylists: [
      {
        id: 1,
        name: "Top 50",
        imgPath: "",
        songIds: [],
      },
      {
        id: 2,
        name: "EDM",
        imgPath: "",
        songIds: [],
      },
      {
        id: 3,
        name: "Remix",
        imgPath: "",
        songIds: [],
      },
    ],
    // Biến lưu bài hát hiện tại
    currentSongId: null,
    // Biến lưu bài phát gần nhất
    lastPlayedSong: {
      id: null,
      time: null,
    },
    // Danh sách phát hiện tại
    currentPlaylist: [],
    // Danh sách bài hát yêu thích
    likedItems: [],
    // Danh sách đã phát gần đây, lưu 2 bài gần nhất
    playHistory: [],
  },

  // Danh sách phần tử
  elements: {
    // ====== Tổng quát ======
    playerContainer: $(".music-player"),

    // ====== Header ======
    coverImage: $(".cover-image"),
    songTitleText: $(".song-title-text"),
    artistNameText: $(".artist-name-text"),
    settingBtn: $(".setting-btn"),

    // ====== Controls Section ======
    playBtn: $(".play-btn"),
    backwardBtn: $(".backward-btn"),
    forwardBtn: $(".forward-btn"),
    shuffleBtn: $(".shuffle-btn"),
    repeatBtn: $(".repeat-btn"),
    lyricBtn: $(".lyric-btn"),
    likeBtn: $(".like-btn"),

    // ====== Volume ======
    // volumeBtn: $(".icon-volume"), // nếu có dùng icon riêng
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
  },

  // Danh sách các phương thức
  methods: {
    // ==== Playback control ====
    playback: {
      playSong() {
        // Phát bài hát hiện tại
      },
      pauseSong() {
        // Tạm dừng bài hát
      },
      togglePlayPause() {
        // Bật/tắt phát bài hát
      },
      playNext() {
        // Phát bài kế tiếp
      },
      playPrev() {
        // Phát bài trước đó
      },
      seekTo(time) {
        // Tua bài hát đến thời điểm cụ thể
      },
      updateProgress() {
        // Cập nhật tiến trình bài hát
      },
      setVolume(volume) {
        // Đặt âm lượng
      },
    },

    // ==== Loop & Shuffle ====
    repeatShuffle: {
      toggleShuffle() {
        // Bật/tắt chế độ phát ngẫu nhiên
      },
      changeLoopMode() {
        // Chuyển giữa các chế độ lặp
      },
      getNextSongId() {
        // Lấy ID bài hát kế tiếp dựa trên chế độ lặp/ngẫu nhiên
      },
    },

    // ==== Theme handling ====
    theme: {
      applyTheme(themeName) {
        // Áp dụng theme theo tên
      },
      toggleTheme() {
        // Chuyển đổi theme giữa các kiểu đã có
      },
      saveTheme() {
        // Lưu theme hiện tại vào localStorage
      },
      loadTheme() {
        // Tải theme đã lưu từ localStorage
      },
    },

    // ==== Liked Songs ====
    liked: {
      toggleLike(songId) {
        // Thêm hoặc xoá bài hát khỏi danh sách yêu thích
      },
      isLiked(songId) {
        // Kiểm tra xem bài hát có nằm trong danh sách yêu thích không
      },
      renderLikedSongs() {
        // Hiển thị danh sách bài hát yêu thích
      },
      saveLikedSongs() {
        // Lưu danh sách yêu thích vào localStorage
      },
      loadLikedSongs() {
        // Tải danh sách yêu thích từ localStorage
      },
    },

    // ==== Playlist Management ====
    playlist: {
      renderPlaylist() {
        // Hiển thị danh sách phát
      },
      loadPlaylistById(id) {
        // Tải danh sách phát theo ID
      },
    },

    // ==== Lyrics (Supichi) ====
    lyrics: {
      renderLyrics(songId) {
        // Hiển thị lời bài hát theo ID
      },
      highlightCurrentLyric(currentTime) {
        // Tô đậm câu đang phát theo thời gian hiện tại
      },
    },

    // ==== Song Info Display ====
    display: {
      renderSongInfo(song) {
        // Hiển thị thông tin bài hát đang phát
      },
    },

    // ==== Playback History ====
    history: {
      addToHistory(songId) {
        // Thêm bài hát vào lịch sử phát gần đây
      },
      renderHistory() {
        // Hiển thị lịch sử phát
      },
    },

    // ==== App State Persistence ====
    storage: {
      saveLastPlayed() {
        // Lưu bài hát phát gần nhất vào localStorage
      },
      loadLastPlayed() {
        // Tải bài hát gần nhất đã phát từ localStorage
      },
    },
  },
};

console.log(Player.elements.coverImage);
