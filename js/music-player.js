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
    // Toàn bộ danh sách phát, sẽ truyền từ file JSON
    allSongItems: [
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
  }),

  // ──────────────────────── Methods ──────────────────────────────
  methods: {
    // ================================
    // ── Playback Control Methods ──
    // ================================
    playback: {
      /**
       * Phát bài hát hiện tại
       */
      playSong() {
        const song = Player.vars.currentSong;
        if (!song || !song.songPath) return;

        const audio = Player.vars.audio;
        audio.src = song.songPath;
        audio.play();
        Player.vars.isPlaying = true;
      },

      /**
       * Tạm dừng bài hát
       */
      pauseSong() {
        Player.vars.audio.pause();
        Player.vars.isPlaying = false;
      },

      /**
       * Chuyển đổi giữa phát và tạm dừng
       */
      togglePlayPause() {
        const audio = Player.vars.audio;
        if (audio.paused) {
          this.playSong();
        } else {
          this.pauseSong();
        }
      },

      /**
       * Phát bài tiếp theo trong danh sách
       */
      playNext() {
        const currentId = Player.vars.currentSong.id;
        const playlist = Player.vars.currentPlaylist.length
          ? Player.vars.currentPlaylist
          : Player.vars.allSongItems;

        const index = playlist.findIndex((s) => s.id === currentId);
        const nextIndex = (index + 1) % playlist.length;
        Player.vars.currentSong = playlist[nextIndex];

        this.playSong();
      },

      /**
       * Phát bài trước đó trong danh sách
       */
      playPrev() {
        const currentId = Player.vars.currentSong.id;
        const playlist = Player.vars.currentPlaylist.length
          ? Player.vars.currentPlaylist
          : Player.vars.allSongItems;

        const index = playlist.findIndex((s) => s.id === currentId);
        const prevIndex = (index - 1 + playlist.length) % playlist.length;
        Player.vars.currentSong = playlist[prevIndex];

        this.playSong();
      },

      /**
       * Tua đến thời điểm cụ thể trong bài hát
       * @param {number} time - thời gian muốn tua đến (tính bằng giây)
       */
      seekTo(time) {
        Player.vars.audio.currentTime = time;
      },

      /**
       * Cập nhật tiến trình bài hát và đồng bộ UI
       */
      updateProgress() {
        const audio = Player.vars.audio;
        const current = audio.currentTime;
        const duration = audio.duration || 0;

        Player.elements.currentTimeText.textContent = this.formatTime(current);
        Player.elements.durationText.textContent = this.formatTime(duration);

        const percent = (current / duration) * 100;
        Player.elements.progressFill.style.width = `${percent}%`;
      },

      /**
       * Thiết lập âm lượng
       * @param {number} volume - giá trị từ 0.0 đến 1.0
       */
      setVolume(volume) {
        Player.vars.audio.volume = Math.min(Math.max(volume, 0), 1);
      },

      /**
       * Chuyển đổi thời gian giây → định dạng mm:ss
       * @param {number} time
       * @returns {string}
       */
      formatTime(time) {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60)
          .toString()
          .padStart(2, "0");
        return `${mins}:${secs}`;
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

    // ==== Lyrics ====
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

    // ==== Local storage ====
    storage: {
      saveLastPlayed() {
        // Lưu bài hát phát gần nhất vào localStorage
      },
      loadLastPlayed() {
        // Tải bài hát gần nhất đã phát từ localStorage
      },
    },

    // ==== Modal ====
    modal: {
      // Hàm tougle modal
      toggleModal() {
        modal.classList.toggle("show");
      },
    },
    // ==== Control Button ====
    controlButton: {
      // Hàm đổi trạng thái bật tắt lyrics
      changeLyricState(el, iconActive, iconNone) {
        el.classList.toggle("active");
        el.innerHTML = el.classList.contains("active") ? iconActive : iconNone;
        Player.vars.isLyricsVisible = el.classList.contains("active");
      },
      // Hàm đổi trạng thái bật tắt trộn
      changeShuffleState(el) {
        el.classList.toggle("inactive");
        Player.vars.isShuffle = el.classList.contains("inactive");
      },
      // Hàm đổi trạng thái bật tắt repeat
      changeRepeatState(el) {
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
        console.log(Player.vars.loopMode);
      },
      // Hàm đổi trạng thái bật tắt yêu thích
      changeLikedState(el, iconActive, iconNone, isForce = null) {
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
      changePlayState(el, iconPause, iconPlay, blnForce = null) {
        const audio = Player.vars.audio;
        const currentSong = Player.vars.currentSong;

        if (blnForce !== null) {
          Player.vars.isPlaying = blnForce === true;
        } else {
          el.classList.toggle("active");
          Player.vars.isPlaying = el.classList.contains("active");
        }

        el.innerHTML = Player.vars.isPlaying ? iconPause : iconPlay;

        if (Player.vars.isPlaying) {
          const currentPath = new URL(
            currentSong.songPath,
            window.location.href
          ).href;
          if (audio.src !== currentPath) {
            audio.src = currentPath;
          }

          // Nếu đang không phát, phát tiếp (resume)
          if (audio.paused) {
            audio.play();
          }
        } else {
          audio.pause();
        }
      },
    },
  },
};
// ── E ──────────────────────── Player ─────────────────────────────
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
} = Player.elements;

const {
  changeLyricState,
  changeShuffleState,
  changeRepeatState,
  changeLikedState,
  changePlayState,
} = Player.methods.controlButton;
// Sự kiện nhấn nút cc
lyricBtn.addEventListener("click", function () {
  changeLyricState(
    this,
    '<i class="fa-solid fa-closed-captioning"></i>',
    '<i class="fa-regular fa-closed-captioning"></i>'
  );
});
// Sự kiện nhấn nút shuffle
shuffleBtn.addEventListener("click", function () {
  changeShuffleState(this);
});
// Sự kiện nhấn nút repeat
repeatBtn.addEventListener("click", function () {
  changeRepeatState(this);
});
// Sự kiện nhấn nút yêu thích
likeBtn.addEventListener("click", function () {
  changeLikedState(
    this,
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-regular fa-heart"></i>'
  );
});
// Sự kiện nhấn nút playBtn
playBtn.addEventListener("click", function () {
  changePlayState(
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

// ── E ──────────────────────── Control Button ─────────────────────
// ==================================================================

//
const playback = Player.methods.playback;
const audio = Player.vars.audio;

// Gán bài hát đầu tiên làm current
Player.vars.currentSong = Player.vars.allSongItems[0];

// Cập nhật src vào thẻ Audio
audio.src = Player.vars.currentSong.songPath;

// Load metadata như thời lượng
audio.addEventListener("loadedmetadata", () => {
  Player.elements.durationText.textContent = playback.formatTime(
    audio.duration
  );
});

// Cập nhật thời gian, tiến độ
audio.addEventListener("timeupdate", playback.updateProgress);

// Xử lý khi kết thúc bài hát
audio.addEventListener("ended", playback.playNext);
