const players = [
  {
    name: "Minami",
    age: 24,
    location: "Tokyo",
    bio: "🎨 Yêu hội họa & cà phê sữa đá.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Soojin",
    age: 22,
    location: "Seoul",
    bio: "📸 Chụp ảnh, chill acoustic.",
    img: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    name: "Linh",
    age: 23,
    location: "Hà Nội",
    bio: "💃 Mê nhảy, cực vui tính.",
    img: "https://randomuser.me/api/portraits/women/82.jpg",
  },
  {
    name: "Yuna",
    age: 25,
    location: "Osaka",
    bio: "📚 Bookworm, introvert nhẹ.",
    img: "https://randomuser.me/api/portraits/women/58.jpg",
  },
  {
    name: "Mika",
    age: 21,
    location: "Nagoya",
    bio: "🎧 EDM addict & designer.",
    img: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    name: "Thảo",
    age: 24,
    location: "Đà Nẵng",
    bio: "☕ Ăn chay trường, thích thiền.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Sakura",
    age: 26,
    location: "Tokyo",
    bio: "🌸 Gái truyền thống, yêu nấu ăn.",
    img: "https://randomuser.me/api/portraits/women/59.jpg",
  },
  {
    name: "Nari",
    age: 23,
    location: "Busan",
    bio: "🛼 Trượt patin đỉnh cao.",
    img: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Ngọc",
    age: 25,
    location: "TP.HCM",
    bio: "🎮 Thích chơi game & làm UI.",
    img: "https://randomuser.me/api/portraits/women/88.jpg",
  },
  {
    name: "Airi",
    age: 22,
    location: "Fukuoka",
    bio: "🎻 Chơi violin, yêu động vật.",
    img: "https://randomuser.me/api/portraits/women/39.jpg",
  },
  {
    name: "Miyeon",
    age: 24,
    location: "Incheon",
    bio: "💄 Làm đẹp là đam mê.",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "Hana",
    age: 23,
    location: "Tokyo",
    bio: "🧁 Bánh ngọt là chân ái.",
    img: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    name: "Jisoo",
    age: 26,
    location: "Seoul",
    bio: "🎤 Vocal chính team nhạc indie.",
    img: "https://randomuser.me/api/portraits/women/91.jpg",
  },
  {
    name: "Mai",
    age: 21,
    location: "Huế",
    bio: "📖 Thích lịch sử và cổ phục.",
    img: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    name: "Emi",
    age: 24,
    location: "Kyoto",
    bio: "🧘 Yoga mỗi sáng, chill mỗi tối.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Nana",
    age: 22,
    location: "Sapporo",
    bio: "🎮 Streamer game chiến thuật.",
    img: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    name: "Hiền",
    age: 25,
    location: "Cần Thơ",
    bio: "🍲 Nấu ăn đỉnh, thích chill.",
    img: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    name: "Rika",
    age: 23,
    location: "Yokohama",
    bio: "🎨 Thiết kế giao diện & UX.",
    img: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Hương",
    age: 26,
    location: "Quảng Ninh",
    bio: "🎵 Ballad & trà sữa lover.",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    name: "Eunha",
    age: 24,
    location: "Daegu",
    bio: "🎬 Mê điện ảnh, thích viết kịch bản.",
    img: "https://randomuser.me/api/portraits/women/85.jpg",
  },
];
// danh sách thích
let liked = [];
// danh sách không thích
let disliked = [];

const cardStack = document.getElementById("cardStack");

function renderCards() {
  // Xóa các card cũ nếu có
  cardStack.innerHTML = "";

  // Duyệt qua mảng players và tạo thẻ card
  players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.zIndex = players.length - index; // đảm bảo card sau nằm dưới

    card.innerHTML = `
      <img src="${player.img}" alt="${player.name}" />
      <div class="overlay">${player.name}, ${player.age}</div>
      <div class="info">
        <p>${player.bio}</p>
        <p>📍 ${player.location}</p>
      </div>
    `;

    cardStack.appendChild(card);
  });
}

renderCards();
