/* ==================================================================
   data.js — ТАНЫ ХУВИЙН МЭДЭЭЛЭЛ
   ------------------------------------------------------------------
   Сайтын бүх хувийн мэдээлэл энэ ганц файлд байна.
   "TODO" гэж тэмдэглэсэн утгуудыг өөрийнхөөрөө солиход л хангалттай.
   Текст бүр { mn: "...", en: "..." } гэсэн хоёр хэлтэй.
   ================================================================== */

window.PROFILE = {
  osName: "NomadOS",                                   // "Үйлдлийн систем"-ийн нэр

  name: { mn: "Таны Нэр", en: "Your Name" },           // TODO: бүтэн нэр
  initials: "ТН",                                      // TODO: нэрийн эхний 2 үсэг (аватар дээр)
  username: "guest",                                   // терминалд харагдах нэр
  role: {                                              // TODO: таны чиглэл
    mn: "Frontend хөгжүүлэгч",
    en: "Frontend Developer"
  },
  tagline: {                                           // TODO: өөрийгөө илэрхийлсэн нэг өгүүлбэр
    mn: "Тал нутаг шиг уудам төсөөлөлтэй, код бүрдээ дэг журамтай.",
    en: "Imagination as wide as the steppe, discipline in every line of code."
  },
  status: { mn: "Дадлагын боломж хайж байна", en: "Open to internships" },
  location: { mn: "Улаанбаатар, Монгол", en: "Ulaanbaatar, Mongolia" },
  school: { mn: "СЭЗИС · Программ хангамж", en: "UFE · Software Engineering" },   // TODO
  codingSince: 2023,                                   // TODO: код бичиж эхэлсэн он

  bio: {                                               // TODO: товч намтар (2–3 догол мөр)
    mn: [
      "Сайн байна уу! Би СЭЗИС-ийн Программ хангамжийн ангийн оюутан. Хүмүүсийн өдөр тутамд хэрэглэх, энгийн атлаа сэтгэлд хоногшмоор вэб бүтээгдэхүүн хийх дуртай.",
      "Код бичихээс гадна зураг зурах, уулын аялал, шагай тоглох дуртай. Энэ портфолиог ч гэсэн «вэбсайт бус, жижигхэн ертөнц» болгох гэж оролдсон."
    ],
    en: [
      "Hi! I'm a Software Engineering student at UFE. I love building web products that people use every day — simple, yet memorable.",
      "Outside of code I enjoy drawing, hiking in the mountains and playing shagai. That's why this portfolio tries to be a tiny world rather than a website."
    ]
  },

  timeline: [                                          // TODO: таны замнал
    { year: "2023", mn: "СЭЗИС-д элсэж, анхны «Hello, World!»-оо бичсэн", en: "Joined UFE and wrote my first \"Hello, World!\"" },
    { year: "2024", mn: "Анхны вэбсайтаа хийж, JavaScript-д дурласан", en: "Built my first website and fell for JavaScript" },
    { year: "2025", mn: "React, Node.js сурч, багийн төсөлд оролцсон", en: "Learned React & Node.js, joined a team project" },
    { year: "2026", mn: "NomadOS — та яг одоо дотор нь байна", en: "NomadOS — you're inside it right now" }
  ],

  skills: [                                            // TODO: level = 0–100
    { name: "HTML & CSS", level: 90, group: "frontend" },
    { name: "JavaScript", level: 80, group: "frontend" },
    { name: "React", level: 65, group: "frontend" },
    { name: "Node.js / Express", level: 55, group: "backend" },
    { name: "SQL / PostgreSQL", level: 60, group: "backend" },
    { name: "Figma / UI", level: 70, group: "design" }
  ],
  tools: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "Postman"],
  languages: [
    { mn: "Монгол — төрөлх", en: "Mongolian — native" },
    { mn: "Англи — B2", en: "English — B2" }
  ],

  /* БҮТЭЭЛҮҮД — хамгийн багадаа 3.
     image: assets/projects/ дотор өөрийн screenshot-оо хийгээд замыг нь солиорой. */
  projects: [
    {
      id: "todo",
      year: "2025",
      title: { mn: "Ногоон жагсаалт", en: "Green List" },
      type: { mn: "Хичээлийн төсөл", en: "Course project" },
      image: "assets/projects/todo.svg",
      short: { mn: "Өдрөө төлөвлөх React апп", en: "A React app for planning your day" },
      desc: {
        mn: "Даалгавар нэмэх, засах, шүүх, чирж эрэмбэлэх боломжтой. Өгөгдлийг localStorage-д хадгалдаг тул хуудсаа хаасан ч алга болохгүй. Энэ төслөөр компонент болон state удирдлагыг гүнзгий ойлгосон.",
        en: "Add, edit, filter and drag-to-reorder tasks. Data persists in localStorage, so nothing is lost when you close the tab. This project taught me components and state management in depth."
      },
      role: { mn: "Бие даан — дизайн ба хөгжүүлэлт", en: "Solo — design & development" },
      stack: ["React", "CSS Modules", "localStorage"],
      demo: "https://example.com",                       // TODO
      code: "https://github.com/your-username/green-list" // TODO
    },
    {
      id: "weather",
      year: "2025",
      title: { mn: "Тэнгэр — цаг агаар", en: "Tenger — Weather" },
      type: { mn: "Хувийн төсөл", en: "Personal project" },
      image: "assets/projects/weather.svg",
      short: { mn: "API-аас мэдээлэл татдаг цаг агаарын апп", en: "A weather app powered by a public API" },
      desc: {
        mn: "OpenWeather API-аас Улаанбаатар болон бусад хотын цаг агаарыг татаж, 5 хоногийн таамгийг график хэлбэрээр харуулдаг. -30°C-т ч ажиллана!",
        en: "Fetches weather for Ulaanbaatar and other cities from the OpenWeather API and charts a 5-day forecast. Works even at -30°C!"
      },
      role: { mn: "Бие даан", en: "Solo" },
      stack: ["JavaScript", "Fetch API", "Chart.js"],
      demo: "https://example.com",                        // TODO
      code: "https://github.com/your-username/tenger"     // TODO
    },
    {
      id: "library",
      year: "2026",
      title: { mn: "Номын сангийн систем", en: "Library System" },
      type: { mn: "Багийн төсөл", en: "Team project" },
      image: "assets/projects/library.svg",
      short: { mn: "Ном бүртгэх, зээлэх REST API ба самбар", en: "REST API and dashboard for lending books" },
      desc: {
        mn: "Номын сангийн ном бүртгэх, зээлүүлэх, хугацаа хэтэрсэн номыг мэдэгдэх систем. 3 хүний багт backend хариуцаж, REST API болон өгөгдлийн сангийн бүтцийг зохиосон.",
        en: "A system to catalogue, lend and track overdue books. In a team of three I owned the backend: the REST API and the database schema."
      },
      role: { mn: "Backend хөгжүүлэгч (3 хүний баг)", en: "Backend developer (team of 3)" },
      stack: ["Node.js", "Express", "PostgreSQL"],
      demo: "https://example.com",                        // TODO
      code: "https://github.com/your-username/library"    // TODO
    },
    {
      id: "nomados",
      year: "2026",
      title: { mn: "NomadOS портфолио", en: "NomadOS portfolio" },
      type: { mn: "Бие даалт 2", en: "Assignment 2" },
      image: "assets/projects/nomados.svg",
      short: { mn: "Таны яг одоо үзэж буй сайт", en: "The very site you're looking at" },
      desc: {
        mn: "Framework-гүй, цэвэр HTML, CSS, JavaScript-ээр бичсэн үйлдлийн систем маягийн портфолио. Цонх удирдагч, терминал, шагай тоглоом, Улаанбаатарын цагаар өөрчлөгддөг ханын зураг бүгд гараар бичигдсэн.",
        en: "An OS-style portfolio in plain HTML, CSS and JavaScript — no frameworks. The window manager, terminal, shagai game and the wallpaper that follows Ulaanbaatar time are all hand-written."
      },
      role: { mn: "Санаа, дизайн, код", en: "Concept, design, code" },
      stack: ["HTML", "CSS", "Vanilla JS", "SVG"],
      demo: "",                                            // хоосон бол "Демо" товч харагдахгүй
      code: "https://github.com/your-username/portfolio"  // TODO
    }
  ],

  contact: {                                           // TODO: холбоо барих
    email: "your.email@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    instagram: "https://www.instagram.com/your-username"
  }
};
