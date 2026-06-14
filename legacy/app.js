// ==========================================================================
// BOOK DATABASE (40 Books Total: 37 Monthly Curriculum + 3 Daily Companions)
// ==========================================================================
const DEFAULT_BOOKS = [
  // Month 1
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    month: 1,
    monthLabel: "Month 1 (June 12 – July 12, 2026)",
    theme: "Learning & Habits",
    themeClass: "learning",
    pages: 320,
    difficulty: "Easy",
    description: "Reread: Establish the systems, environments, and tiny routines required to read consistently.",
    focusQuestion: "What 2-minute habit can you design to anchor your daily reading?",
    icon: "atom",
    gradient: "linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)"
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    month: 1,
    monthLabel: "Month 1 (June 12 – July 12, 2026)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 175,
    difficulty: "Easy",
    description: "An allegorical novel about finding one's purpose, momentum, and listening to the heart.",
    focusQuestion: "What is your Personal Legend, and how do you recognize the omens guiding you?",
    icon: "pyramid",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #f59e0b 100%)"
  },
  {
    id: "the-little-prince",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    month: 1,
    monthLabel: "Month 1 (June 12 – July 12, 2026)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 95,
    difficulty: "Easy",
    description: "A classic story about friendship, love, and human nature viewed through a child's eyes.",
    focusQuestion: "How do grown-ups lose their capacity to see the essence of things?",
    icon: "scroll",
    gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)"
  },
  {
    id: "show-your-work",
    title: "Show Your Work!",
    author: "Austin Kleon",
    month: 1,
    monthLabel: "Month 1 (June 12 – July 12, 2026)",
    theme: "Productivity & Focus",
    themeClass: "productivity",
    pages: 220,
    difficulty: "Easy",
    description: "Learn why generosity, documentation, and sharing your process beats self-promotion.",
    focusQuestion: "What small part of your learning process can you share with others today?",
    icon: "speech",
    gradient: "linear-gradient(135deg, #311005 0%, #ea580c 100%)"
  },
  
  // Month 2 (TIGHT MONTH - 0 ADDITIONS)
  {
    id: "how-to-read-a-book",
    title: "How to Read a Book",
    author: "Mortimer J. Adler",
    month: 2,
    monthLabel: "Month 2 (July 12 – August 12, 2026)",
    theme: "Learning & Habits",
    themeClass: "learning",
    pages: 420,
    difficulty: "Hard",
    description: "Learn the stages of active reading: inspectional, analytical, and syntopical.",
    focusQuestion: "How can you transition from passive scrolling to active critical reading?",
    icon: "book",
    gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)"
  },
  {
    id: "make-it-stick",
    title: "Make It Stick",
    author: "Peter C. Brown",
    month: 2,
    monthLabel: "Month 2 (July 12 – August 12, 2026)",
    theme: "Learning & Habits",
    themeClass: "learning",
    pages: 330,
    difficulty: "Medium",
    description: "The science of memory, active recall, spaced repetition, and successful study design.",
    focusQuestion: "How will you replace ineffective rereading with active self-quizzing?",
    icon: "puzzle",
    gradient: "linear-gradient(135deg, #0f172a 0%, #8b5cf6 100%)"
  },

  // Month 3
  {
    id: "biology-notebook",
    title: "High School Biology Notebook",
    author: "Workman Publishing",
    month: 3,
    monthLabel: "Month 3 (August 12 – September 12, 2026)",
    theme: "Science & Academics",
    themeClass: "academics",
    pages: 500,
    difficulty: "Easy",
    description: "An illustrated Big Fat Notebook reviewing cell biology, genetics, ecosystems, and human systems.",
    focusQuestion: "How do feedback loops in cellular biology maintain homeostasis?",
    icon: "dna",
    gradient: "linear-gradient(135deg, #022c22 0%, #10b981 100%)"
  },
  {
    id: "chemistry-notebook",
    title: "High School Chemistry Notebook",
    author: "Workman Publishing",
    month: 3,
    monthLabel: "Month 3 (August 12 – September 12, 2026)",
    theme: "Science & Academics",
    themeClass: "academics",
    pages: 500,
    difficulty: "Easy",
    description: "An illustrated Big Fat Notebook reviewing atomic structures, chemical bonds, reactions, and thermodynamics.",
    focusQuestion: "How do electron configurations dictate chemical reactivity?",
    icon: "beaker",
    gradient: "linear-gradient(135deg, #172554 0%, #3b82f6 100%)"
  },
  {
    id: "mind-for-numbers",
    title: "A Mind for Numbers",
    author: "Barbara Oakley",
    month: 3,
    monthLabel: "Month 3 (August 12 – September 12, 2026)",
    theme: "Learning & Habits",
    themeClass: "learning",
    pages: 300,
    difficulty: "Medium",
    description: "How to excel at math and science even if you flunked algebra.",
    focusQuestion: "How can you use diffuse thinking (letting your mind wander) to solve hard science equations?",
    icon: "mindset",
    gradient: "linear-gradient(135deg, #022c22 0%, #10b981 100%)"
  },

  // Month 4
  {
    id: "high-school-superstar",
    title: "High School Superstar",
    author: "Cal Newport",
    month: 4,
    monthLabel: "Month 4 (September 12 – October 12, 2026)",
    theme: "Science & Academics",
    themeClass: "academics",
    pages: 270,
    difficulty: "Medium",
    description: "Unconventional strategy to excel academically and develop unique interests without burning out.",
    focusQuestion: "What is your deep, self-directed 'interestingness' project outside of coursework?",
    icon: "star",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #a855f7 100%)"
  },
  {
    id: "the-war-of-art",
    title: "The War of Art",
    author: "Steven Pressfield",
    month: 4,
    monthLabel: "Month 4 (September 12 – October 12, 2026)",
    theme: "Productivity & Focus",
    themeClass: "productivity",
    pages: 190,
    difficulty: "Easy",
    description: "Identify and conquer the internal barriers and 'Resistance' holding you back from execution.",
    focusQuestion: "In what areas of your life is Resistance masquerading as rationalization?",
    icon: "shield",
    gradient: "linear-gradient(135deg, #4c0519 0%, #f43f5e 100%)"
  },
  {
    id: "steal-like-an-artist",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    month: 4,
    monthLabel: "Month 4 (September 12 – October 12, 2026)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 160,
    difficulty: "Easy",
    description: "A guide to influence, drawing inspiration, and unlocking creative growth.",
    focusQuestion: "Who are the top three thinkers you want to study and 'steal' ideas from?",
    icon: "puzzle",
    gradient: "linear-gradient(135deg, #4c0519 0%, #f43f5e 100%)"
  },
  {
    id: "grit",
    title: "Grit",
    author: "Angela Duckworth",
    month: 4,
    monthLabel: "Month 4 (September 12 – October 12, 2026)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 350,
    difficulty: "Medium",
    description: "Why passion and long-term perseverance, not talent, are the secrets to success.",
    focusQuestion: "What is your high-level goal that gives meaning to all your daily efforts?",
    icon: "shield",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #a855f7 100%)"
  },

  // Month 5
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    month: 5,
    monthLabel: "Month 5 (October 12 – November 12, 2026)",
    theme: "Productivity & Focus",
    themeClass: "productivity",
    pages: 300,
    difficulty: "Medium",
    description: "Develop the cognitive stamina to block distractions and concentrate intensely.",
    focusQuestion: "How will you schedule daily blocks of shallow work to protect your deep work?",
    icon: "lighthouse",
    gradient: "linear-gradient(135deg, #0f172a 0%, #ec4899 100%)"
  },
  {
    id: "ultralearning",
    title: "Ultralearning",
    author: "Scott H. Young",
    month: 5,
    monthLabel: "Month 5 (October 12 – November 12, 2026)",
    theme: "Learning & Habits",
    themeClass: "learning",
    pages: 300,
    difficulty: "Medium",
    description: "A comprehensive framework for self-directed, intense learning of complex subjects.",
    focusQuestion: "Which subject or skill would you want to design a 100-hour learning sprint for?",
    icon: "lightning",
    gradient: "linear-gradient(135deg, #311005 0%, #ea580c 100%)"
  },
  {
    id: "digital-minimalism",
    title: "Digital Minimalism",
    author: "Cal Newport",
    month: 5,
    monthLabel: "Month 5 (October 12 – November 12, 2026)",
    theme: "Productivity & Focus",
    themeClass: "productivity",
    pages: 250,
    difficulty: "Medium",
    description: "A practical guide to reclaiming focus, quiet reflection, and community from technology.",
    focusQuestion: "Which digital tool can you step away from to improve your focus?",
    icon: "lighthouse",
    gradient: "linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)"
  },

  // Month 6
  {
    id: "mindset",
    title: "Mindset",
    author: "Carol S. Dweck",
    month: 6,
    monthLabel: "Month 6 (November 12 – December 12, 2026)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 320,
    difficulty: "Medium",
    description: "Shift from a fixed belief of intelligence to a growth mindset focused on practice.",
    focusQuestion: "When you make a mistake, do you focus on fixing it or defending your reputation?",
    icon: "mindset",
    gradient: "linear-gradient(135deg, #022c22 0%, #059669 100%)"
  },
  {
    id: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    month: 6,
    monthLabel: "Month 6 (November 12 – December 12, 2026)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 280,
    difficulty: "Medium",
    description: "Tactical empathy and negotiation methods from a former FBI hostage negotiator.",
    focusQuestion: "How can you frame questions to elicit a 'No' rather than a standard defensive 'Yes'?",
    icon: "speech",
    gradient: "linear-gradient(135deg, #172554 0%, #1e40af 100%)"
  },
  {
    id: "influence",
    title: "Influence",
    author: "Robert Cialdini",
    month: 6,
    monthLabel: "Month 6 (November 12 – December 12, 2026)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 320,
    difficulty: "Medium",
    description: "The six key principles behind why people say 'yes' and how to apply them ethically.",
    focusQuestion: "How do social proof and reciprocity affect your own choices daily?",
    icon: "speech",
    gradient: "linear-gradient(135deg, #172554 0%, #3b82f6 100%)"
  },

  // Month 7
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    month: 7,
    monthLabel: "Month 7 (December 12, 2026 – January 12, 2027)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 600,
    difficulty: "Hard",
    description: "Epic sci-fi masterpiece exploring power dynamics, ecology, religion, and human endurance.",
    focusQuestion: "How do training and ritual act as armor against fear on Arrakis?",
    icon: "dune",
    gradient: "linear-gradient(135deg, #451a03 0%, #ea580c 100%)"
  },
  {
    id: "animal-farm",
    title: "Animal Farm",
    author: "George Orwell",
    month: 7,
    monthLabel: "Month 7 (December 12, 2026 – January 12, 2027)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 140,
    difficulty: "Easy",
    description: "A classic satirical fables warning against totalitarian corruption of ideals.",
    focusQuestion: "How do the rules of Animal Farm slowly distort to favor the pigs?",
    icon: "scroll",
    gradient: "linear-gradient(135deg, #0d1527 0%, #ec4899 100%)"
  },

  // Month 8
  {
    id: "stumbling-on-happiness",
    title: "Stumbling on Happiness",
    author: "Daniel Gilbert",
    month: 8,
    monthLabel: "Month 8 (January 12 – February 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 300,
    difficulty: "Medium",
    description: "Learn how the brain construct simulations of our futures and miscalculates happiness.",
    focusQuestion: "Why does our imagination routinely over-represent peak events while ignoring details?",
    icon: "maze",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #d946ef 100%)"
  },
  {
    id: "psychology-of-money",
    title: "Psychology of Money",
    author: "Morgan Housel",
    month: 8,
    monthLabel: "Month 8 (January 12 – February 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 250,
    difficulty: "Easy",
    description: "Timeless lessons on wealth, compound interest, greed, and financial behavior.",
    focusQuestion: "How does the difference between rich (income) and wealthy (assets) change your perspective?",
    icon: "money",
    gradient: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)"
  },
  {
    id: "drive",
    title: "Drive",
    author: "Daniel H. Pink",
    month: 8,
    monthLabel: "Month 8 (January 12 – February 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 260,
    difficulty: "Easy",
    description: "The science of motivation: autonomy, mastery, and purpose.",
    focusQuestion: "Do you perform better under external rewards (grades) or intrinsic interest?",
    icon: "star",
    gradient: "linear-gradient(135deg, #311005 0%, #ea580c 100%)"
  },
  {
    id: "predictably-irrational",
    title: "Predictably Irrational",
    author: "Dan Ariely",
    month: 8,
    monthLabel: "Month 8 (January 12 – February 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 300,
    difficulty: "Medium",
    description: "Expose the hidden, systematic forces that shape our illogical decisions.",
    focusQuestion: "How does the 'decoy effect' influence your choices when buying things?",
    icon: "maze",
    gradient: "linear-gradient(135deg, #0f172a 0%, #d946ef 100%)"
  },

  // Month 9 (TIGHT MONTH - 0 ADDITIONS)
  {
    id: "anxious",
    title: "Anxious",
    author: "Joseph LeDoux",
    month: 9,
    monthLabel: "Month 9 (February 12 – March 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 400,
    difficulty: "Hard",
    description: "A deep neurobiological examination of how fear and anxiety are computed inside the brain.",
    focusQuestion: "How can conscious cognitive appraisal restructure unconscious threat reactions?",
    icon: "knot",
    gradient: "linear-gradient(135deg, #450a0a 0%, #ef4444 100%)"
  },
  {
    id: "courage-is-calling",
    title: "Courage Is Calling",
    author: "Ryan Holiday",
    month: 9,
    monthLabel: "Month 9 (February 12 – March 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 280,
    difficulty: "Medium",
    description: "Virtues Series: Part 1. Confronting fear, resisting compliance, and choosing heroic action.",
    focusQuestion: "Where in your life does fear or routine prevent you from doing what you know is right?",
    icon: "lion",
    gradient: "linear-gradient(135deg, #0f172a 0%, #f59e0b 100%)"
  },

  // Month 10
  {
    id: "white-nights",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    month: 10,
    monthLabel: "Month 10 (March 12 – April 12, 2027)",
    theme: "Fiction & Literature",
    themeClass: "fiction",
    pages: 80,
    difficulty: "Medium",
    description: "Classic Russian short story analyzing isolation, idealization, and romantic dreams.",
    focusQuestion: "What is the cost of living inside your own mind instead of reality?",
    icon: "lamp",
    gradient: "linear-gradient(135deg, #020617 0%, #6366f1 100%)"
  },
  {
    id: "discipline-is-destiny",
    title: "Discipline Is Destiny",
    author: "Ryan Holiday",
    month: 10,
    monthLabel: "Month 10 (March 12 – April 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 300,
    difficulty: "Medium",
    description: "Virtues Series: Part 2. Temperance, daily focus, body mastery, and boundaries.",
    focusQuestion: "What immediate physical action can you take to streamline your daily habits?",
    icon: "scale",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #10b981 100%)"
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    month: 10,
    monthLabel: "Month 10 (March 12 – April 12, 2027)",
    theme: "Psychology & Mindset",
    themeClass: "psychology",
    pages: 160,
    difficulty: "Medium",
    description: "A psychiatrist's memoir of surviving camps, detailing logotherapy and locating purpose.",
    focusQuestion: "What is your primary source of meaning that helps you endure difficulties?",
    icon: "knot",
    gradient: "linear-gradient(135deg, #450a0a 0%, #ef4444 100%)"
  },
  {
    id: "obstacle-is-the-way",
    title: "The Obstacle Is the Way",
    author: "Ryan Holiday",
    month: 10,
    monthLabel: "Month 10 (March 12 – April 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 200,
    difficulty: "Medium",
    description: "Learn how to turn adversity, struggles, and setbacks into advantages.",
    focusQuestion: "How can you view a current obstacle in your life as a hidden opportunity?",
    icon: "lion",
    gradient: "linear-gradient(135deg, #0f172a 0%, #f59e0b 100%)"
  },

  // Month 11
  {
    id: "right-thing-right-now",
    title: "Right Thing Right Now",
    author: "Ryan Holiday",
    month: 11,
    monthLabel: "Month 11 (April 12 – May 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 320,
    difficulty: "Medium",
    description: "Virtues Series: Part 3. Justice, alignment with integrity, community duty, and kindness.",
    focusQuestion: "How do you align your daily actions with your core concepts of fairness and integrity?",
    icon: "sword",
    gradient: "linear-gradient(135deg, #311005 0%, #dc2626 100%)"
  },
  {
    id: "virtues-wisdom",
    title: "Virtues Series: Wisdom",
    author: "Ryan Holiday",
    month: 11,
    monthLabel: "Month 11 (April 12 – May 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 300,
    difficulty: "Medium",
    description: "Virtues Series: Part 4. Practical wisdom, decision-making logic, and distinguishing truth.",
    focusQuestion: "How do you separate what is under your control from what is not?",
    icon: "owl",
    gradient: "linear-gradient(135deg, #172554 0%, #06b6d4 100%)"
  },
  {
    id: "letters-stoic",
    title: "Letters from a Stoic",
    author: "Seneca",
    month: 11,
    monthLabel: "Month 11 (April 12 – May 12, 2027)",
    theme: "Stoicism & Virtues",
    themeClass: "stoicism",
    pages: 240,
    difficulty: "Medium",
    description: "Timeless moral essays and advice on friendship, wealth, and focus.",
    focusQuestion: "How does writing letters of counsel to others help clarify your own values?",
    icon: "pillar",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #10b981 100%)"
  },

  // Month 12 (TIGHT MONTH - 0 ADDITIONS)
  {
    id: "history-western-philosophy",
    title: "History of Western Philosophy",
    author: "Bertrand Russell",
    month: 12,
    monthLabel: "Month 12 (May 12 – June 12, 2027)",
    theme: "Classical Philosophy",
    themeClass: "philosophy",
    pages: 300,
    difficulty: "Hard",
    description: "Part 1: Ancient Philosophy. Pre-Socratic thinkers, Socrates, Plato, and Aristotle.",
    focusQuestion: "How did early Greek philosophy transition from mythic storytelling to logical reasoning?",
    icon: "pillar",
    gradient: "linear-gradient(135deg, #0d1527 0%, #475569 100%)"
  },
  {
    id: "five-dialogues",
    title: "Five Dialogues",
    author: "Plato",
    month: 12,
    monthLabel: "Month 12 (May 12 – June 12, 2027)",
    theme: "Classical Philosophy",
    themeClass: "philosophy",
    pages: 160,
    difficulty: "Medium",
    description: "Socrates' trials and execution, discussing piety, virtue, law, and the soul.",
    focusQuestion: "Why did Socrates choose death over silencing his philosophical inquiries?",
    icon: "scroll",
    gradient: "linear-gradient(135deg, #1e293b 0%, #f472b6 100%)"
  },
  {
    id: "the-republic",
    title: "The Republic",
    author: "Plato",
    month: 12,
    monthLabel: "Month 12 (May 12 – June 12, 2027)",
    theme: "Classical Philosophy",
    themeClass: "philosophy",
    pages: 400,
    difficulty: "Hard",
    description: "Socratic dialogue investigating the structure of a just society and the nature of justice.",
    focusQuestion: "How does the Allegory of the Cave explain our duty to share wisdom with others?",
    icon: "temple",
    gradient: "linear-gradient(135deg, #0f172a 0%, #e11d48 100%)"
  }
];
let books = [];

// Separate list for daily stoic companions (integrated in calculation)
const companionBooks = [
  {
    id: "stoic-main",
    title: "The Daily Stoic",
    author: "Ryan Holiday & Stephen Hanselman",
    pages: 400,
    isCompanion: true
  },
  {
    id: "stoic-journal",
    title: "The Daily Stoic Journal",
    author: "Ryan Holiday & Stephen Hanselman",
    pages: 380,
    isCompanion: true
  },
  {
    id: "stoic-meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    pages: 180,
    isCompanion: true
  }
];

// ==========================================================================
// STATE MANAGEMENT & CONFIG
// ==========================================================================
const CURRICULUM_START_DATE = new Date("2026-06-12");
const CURRICULUM_END_DATE = new Date("2027-06-12");
const STOIC_START_DATE = new Date("2027-01-01");

let state = {
  currentView: "timeline", // "timeline" or "theme"
  activeFilter: "all",    // timeline: "all" or month (1-12); theme: "all" or specific theme
  completedBooks: [],     // Array of book IDs checked off
  simulatedDate: new Date("2026-06-13T12:00:00"), // Simulated date widget
  hasManuallySelectedDate: false,
  
  // Reading Progress State variables
  dailyReadingLogs: {},      // YYYY-MM-DD -> pages read (integer)
  dailyTargets: {},          // YYYY-MM-DD -> dynamic targets (integer)
  dailyDifficulties: {},     // YYYY-MM-DD -> difficulties used (string)
  longestStreak: 0,
  currentStreak: 0,
  baseGoal: 30,
  selectedBookId: "atomic-habits",
  selectedDifficulty: "easy",
  tbrList: [],
  categories: []
};

// ==========================================================================
// TIMEZONE CALENDAR UTILS (TORONTO BASING)
// ==========================================================================
function getTorontoDate() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const partMap = {};
  parts.forEach(p => partMap[p.type] = p.value);
  return new Date(`${partMap.year}-${partMap.month}-${partMap.day}T12:00:00`);
}

function formatDateYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Midnight Sync Refresh Engine (Runs exactly once daily at midnight Toronto time)
function setupAutoRefresh() {
  const refreshDateAndStreak = () => {
    if (state.hasManuallySelectedDate) return;
    const todayToronto = getTorontoDate();
    state.simulatedDate = todayToronto;
    
    const dateInput = document.querySelector(".date-badge input");
    if (dateInput) {
      dateInput.value = formatDateYMD(todayToronto);
    }
    
    const formattedDate = todayToronto.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    document.getElementById("current-date-display").textContent = formattedDate;
    
    recalculateStreak();
    updateDashboardMetrics();
    renderCurriculumList();
    updateProgressView();
  };

  // Calculate milliseconds until next midnight in Toronto time
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const partMap = {};
  parts.forEach(p => partMap[p.type] = p.value);
  
  const currentTorontoDate = new Date(`${partMap.year}-${String(partMap.month).padStart(2, '0')}-${String(partMap.day).padStart(2, '0')}T${partMap.hour}:${partMap.minute}:${partMap.second}`);
  
  const tomorrowMidnight = new Date(currentTorontoDate);
  tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
  tomorrowMidnight.setHours(0, 0, 5, 0); // 5 seconds past midnight
  
  const msToMidnight = tomorrowMidnight.getTime() - currentTorontoDate.getTime();
  
  setTimeout(() => {
    refreshDateAndStreak();
    setInterval(refreshDateAndStreak, 86400000); // Repeat every 24 hours
  }, Math.max(1000, msToMidnight));
}

// ==========================================================================
// SVG COVER GENERATOR
// ==========================================================================
function getSvgIcon(iconName) {
  const icons = {
    atom: `<circle cx="12" cy="12" r="3" fill="#fff" opacity="0.9"/>
           <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4" transform="rotate(30, 12, 12)"/>
           <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4" transform="rotate(90, 12, 12)"/>
           <ellipse cx="12" cy="12" rx="9" ry="3" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4" transform="rotate(150, 12, 12)"/>`,
    pyramid: `<polygon points="12,4 21,17 12,20" fill="#fff" opacity="0.3"/>
              <polygon points="12,4 3,17 12,20" fill="#fff" opacity="0.8"/>
              <circle cx="17" cy="7" r="1.5" fill="#fff" opacity="0.9"/>
              <line x1="3" y1="20" x2="21" y2="20" stroke="#fff" stroke-width="1.5"/>`,
    book: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#fff" stroke-width="1.5" fill="none"/>
           <path d="M6 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6 2z" stroke="#fff" stroke-width="1.5" fill="none"/>
           <line x1="8" y1="7" x2="16" y2="7" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
           <line x1="8" y1="11" x2="16" y2="11" stroke="#fff" stroke-width="1.5" opacity="0.5"/>`,
    puzzle: `<path d="M19 11h-2.2c-.3-1.1-.9-2-1.8-2.7l1.5-1.5-1.4-1.4-1.5 1.5c-.7-.9-1.6-1.5-2.7-1.8V3h-2v2.2c-1.1.3-2 .9-2.7 1.8L4.7 5.5 3.3 6.9l1.5 1.5c-.9.7-1.5 1.6-1.8 2.7H1v2h2.2c.3 1.1.9 2 1.8 2.7l-1.5 1.5 1.4 1.4 1.5-1.5c.9-.7 1.5-1.6 1.8-2.7H19v-2z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    dna: `<path d="M4.5 10.5C4.5 5.5 19.5 5.5 19.5 10.5C19.5 15.5 4.5 15.5 4.5 20.5" stroke="#fff" stroke-width="1.5" fill="none"/>
          <path d="M19.5 3.5C19.5 8.5 4.5 8.5 4.5 13.5C4.5 18.5 19.5 18.5 19.5 23.5" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4"/>
          <line x1="12" y1="7" x2="12" y2="10" stroke="#fff" stroke-width="1.5"/>
          <line x1="12" y1="14" x2="12" y2="17" stroke="#fff" stroke-width="1.5" opacity="0.6"/>`,
    beaker: `<path d="M6 3h12M9 3v3m6-3v3M9 6h6v1m-6 0v11a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V7M5 21h14" stroke="#fff" stroke-width="1.5" fill="none"/>
             <circle cx="10" cy="11" r="1" fill="#fff" opacity="0.6"/>
             <circle cx="14" cy="14" r="1.5" fill="#fff" opacity="0.7"/>
             <circle cx="11" cy="17" r="1" fill="#fff" opacity="0.8"/>`,
    star: `<polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="none" stroke="#fff" stroke-width="1.5"/>
           <circle cx="12" cy="11" r="2.5" fill="#fff"/>`,
    shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" stroke-width="1.5" fill="none"/>
             <line x1="12" y1="6" x2="12" y2="18" stroke="#fff" stroke-width="1" opacity="0.5"/>
             <line x1="8" y1="12" x2="16" y2="12" stroke="#fff" stroke-width="1" opacity="0.5"/>`,
    lighthouse: `<polygon points="9,20 15,20 13,8 11,8" stroke="#fff" stroke-width="1.5" fill="none"/>
                 <rect x="10" y="5" width="4" height="3" fill="#fff"/>
                 <polygon points="12,1 22,5 12,9" fill="#fff" opacity="0.2"/>
                 <polygon points="12,1 2,5 12,9" fill="#fff" opacity="0.2"/>`,
    lightning: `<polygon points="13,2 3,14 11,14 11,22 21,10 13,10" fill="none" stroke="#fff" stroke-width="1.5"/>`,
    mindset: `<path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="none" stroke="#fff" stroke-width="1.5"/>
              <path d="M12 6v12M12 10h5M12 14h6" stroke="#fff" stroke-width="1.5"/>
              <circle cx="8.5" cy="9.5" r="1.5" fill="#fff"/>
              <circle cx="8.5" cy="14.5" r="1.5" fill="#fff"/>`,
    speech: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#fff" stroke-width="1.5" fill="none"/>
             <circle cx="9" cy="11.5" r="1" fill="#fff"/>
             <circle cx="13" cy="11.5" r="1" fill="#fff"/>`,
    dune: `<path d="M2 20c4-4 8-4 12-2s6-2 8-6" stroke="#fff" stroke-width="1.5" fill="none"/>
           <path d="M2 20h20V12c-4 2-8 2-12 0s-6 2-8 8z" fill="#fff" opacity="0.1"/>
           <circle cx="12" cy="7" r="3" fill="#fff" opacity="0.8"/>`,
    maze: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="#fff" stroke-width="1.5" fill="none"/>
           <path d="M7 7h10v4H11v4H7" stroke="#fff" stroke-width="1.5" fill="none"/>
           <line x1="15" y1="15" x2="17" y2="15" stroke="#fff" stroke-width="1.5"/>`,
    money: `<circle cx="12" cy="12" r="8" stroke="#fff" stroke-width="1.5" fill="none"/>
            <path d="M12 8v8M10 10h3.5a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3H14" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    knot: `<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.3"/>
           <path d="M8 8c2.5 0 2.5 8 5 8s2.5-8 5-8" stroke="#fff" stroke-width="1.5" fill="none"/>
           <path d="M6 12c3 0 3 6 6 6s3-6 6-6" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.6"/>`,
    lion: `<circle cx="12" cy="12" r="7" stroke="#fff" stroke-width="1.5" fill="none"/>
           <path d="M12 8c1.5 0 3 1.5 3 3v2M12 8c-1.5 0-3 1.5-3 3v2M9 13h6" stroke="#fff" stroke-width="1.5" fill="none"/>
           <polygon points="12,14 10,17 14,17" fill="#fff"/>`,
    lamp: `<line x1="12" y1="4" x2="12" y2="20" stroke="#fff" stroke-width="1.5"/>
           <path d="M8 8h8l-2-4H10z" fill="#fff" opacity="0.7"/>
           <circle cx="12" cy="10" r="1.5" fill="#fff"/>
           <rect x="9" y="20" width="6" height="2" fill="#fff" opacity="0.5"/>`,
    scale: `<line x1="12" y1="4" x2="12" y2="20" stroke="#fff" stroke-width="1.5"/>
            <line x1="6" y1="7" x2="18" y2="7" stroke="#fff" stroke-width="1.5"/>
            <path d="M6 7v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7" stroke="#fff" stroke-width="1" fill="none"/>
            <path d="M14 7v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7" stroke="#fff" stroke-width="1" fill="none"/>`,
    sword: `<line x1="6" y1="18" x2="18" y2="6" stroke="#fff" stroke-width="2"/>
            <line x1="8" y1="14" x2="10" y2="16" stroke="#fff" stroke-width="3"/>
            <circle cx="6" cy="18" r="1" fill="#fff"/>`,
    owl: `<circle cx="9" cy="9" r="2" fill="#fff"/>
          <circle cx="15" cy="9" r="2" fill="#fff"/>
          <polygon points="12,10 10,13 14,13" fill="#fff"/>
          <path d="M6 12a6 6 0 0 0 12 0V8c0-2.5-2-4.5-4.5-4.5h-3C8 3.5 6 5.5 6 8v4z" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.4"/>`,
    laurel: `<path d="M6 18c0-3.5 2-6.5 5.5-7.5M18 18c0-3.5-2-6.5-5.5-7.5" stroke="#fff" stroke-width="1.5" fill="none"/>
             <circle cx="6" cy="13" r="1" fill="#fff"/>
             <circle cx="8" cy="9" r="1" fill="#fff"/>
             <circle cx="11" cy="7" r="1" fill="#fff"/>
             <circle cx="18" cy="13" r="1" fill="#fff"/>
             <circle cx="16" cy="9" r="1" fill="#fff"/>
             <circle cx="13" cy="7" r="1" fill="#fff"/>`,
    pillar: `<rect x="5" y="4" width="14" height="2" fill="#fff" opacity="0.9"/>
             <rect x="6" y="18" width="12" height="2" fill="#fff" opacity="0.9"/>
             <line x1="8" y1="6" x2="8" y2="18" stroke="#fff" stroke-width="1.5"/>
             <line x1="12" y1="6" x2="12" y2="18" stroke="#fff" stroke-width="1.5"/>
             <line x1="16" y1="6" x2="16" y2="18" stroke="#fff" stroke-width="1.5"/>`,
    scroll: `<path d="M16 2H7.5A2.5 2.5 0 0 0 5 4.5v13A2.5 2.5 0 0 0 7.5 20H18v-2h-2V2z" stroke="#fff" stroke-width="1.5" fill="none"/>
             <path d="M18 2h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/>
             <line x1="8" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
             <line x1="8" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="1.5" opacity="0.6"/>`,
    temple: `<polygon points="12,3 22,9 2,9" fill="#fff" opacity="0.8"/>
             <rect x="4" y="19" width="16" height="2" fill="#fff"/>
             <line x1="6" y1="9" x2="6" y2="19" stroke="#fff" stroke-width="1.5"/>
             <line x1="10" y1="9" x2="10" y2="19" stroke="#fff" stroke-width="1.5"/>
             <line x1="14" y1="9" x2="14" y2="19" stroke="#fff" stroke-width="1.5"/>
             <line x1="18" y1="9" x2="18" y2="19" stroke="#fff" stroke-width="1.5"/>`
  };
  return icons[iconName] || icons['book'];
}

function renderBookCoverSvg(book) {
  return `
    <svg class="cover-illustration" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect width="100" height="100" fill="url(#grad-${book.id})" />
      
      <!-- Grid overlay -->
      <path d="M0,10 L100,10 M0,20 L100,20 M0,30 L100,30 M0,40 L100,40 M0,50 L100,50 M0,60 L100,60 M0,70 L100,70 M0,80 L100,80 M0,90 L100,90" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
      <path d="M10,0 L10,100 M20,0 L20,100 M30,0 L30,100 M40,0 L40,100 M50,0 L50,100 M60,0 L60,100 M70,0 L70,100 M80,0 L80,100 M90,0 L90,100" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>

      <!-- Center icon graphic -->
      <g transform="translate(38, 38) scale(1.0)">
        <svg width="24" height="24" viewBox="0 0 24 24">
          ${getSvgIcon(book.icon)}
        </svg>
      </g>
      
      <!-- Spine simulation lines -->
      <line x1="5" y1="0" x2="5" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
      <line x1="6.5" y1="0" x2="6.5" y2="100" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>
    </svg>
  `;
}

// Injects shared SVG defs for linear gradients
function getSharedGradientDefs() {
  return books.map(book => `
    <linearGradient id="grad-${book.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${book.gradient.match(/#[a-fA-F0-9]{3,6}/g)[0]}" />
      <stop offset="100%" stop-color="${book.gradient.match(/#[a-fA-F0-9]{3,6}/g)[1]}" />
    </linearGradient>
  `).join("");
}

function initializeGradientDefs() {
  let svgDefs = document.getElementById("svg-shared-defs");
  if (!svgDefs) {
    svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDefs.id = "svg-shared-defs";
    svgDefs.style.position = "absolute";
    svgDefs.style.width = "0";
    svgDefs.style.height = "0";
    svgDefs.style.overflow = "hidden";
    
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = getSharedGradientDefs();
    svgDefs.appendChild(defs);
    document.body.appendChild(svgDefs);
  }
}

// ==========================================================================
// CALCULATOR & METRICS ENGINE
// ==========================================================================
function updateDashboardMetrics() {
  const totalBooksCount = books.length + companionBooks.length; // 40
  
  // Completed books
  const completedMainCount = books.filter(b => state.completedBooks.includes(b.id)).length;
  const completedCompanionCount = companionBooks.filter(b => state.completedBooks.includes(b.id)).length;
  const totalCompleted = completedMainCount + completedCompanionCount;
  
  // Completed pages
  const totalMainPages = books.reduce((acc, b) => acc + b.pages, 0);
  const totalCompanionPages = companionBooks.reduce((acc, b) => acc + b.pages, 0);
  const totalPages = totalMainPages + totalCompanionPages; // 11,970
  
  const completedMainPages = books.filter(b => state.completedBooks.includes(b.id)).reduce((acc, b) => acc + b.pages, 0);
  const completedCompanionPages = companionBooks.filter(b => state.completedBooks.includes(b.id)).reduce((acc, b) => acc + b.pages, 0);
  const totalCompletedPages = completedMainPages + completedCompanionPages;
  const remainingPages = totalPages - totalCompletedPages;
  
  const simDate = state.simulatedDate;
  const timeDiff = CURRICULUM_END_DATE.getTime() - simDate.getTime();
  const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  
  // Daily Stoic companion countdown
  const stoicDateDiff = STOIC_START_DATE.getTime() - simDate.getTime();
  const stoicCountdownDays = Math.ceil(stoicDateDiff / (1000 * 60 * 60 * 24));
  const stoicStatusEl = document.getElementById("stoic-status-box");
  const stoicCardEl = document.getElementById("stoic-companion-card");
  
  if (stoicCountdownDays <= 0) {
    stoicStatusEl.innerHTML = `<span class="badge badge-active">Active (Daily Practice)</span>`;
    stoicCardEl.style.borderColor = "rgba(34, 197, 94, 0.3)";
  } else {
    stoicStatusEl.innerHTML = `<span class="badge badge-locked">Starts Jan 1 (In ${stoicCountdownDays} Days)</span>`;
    stoicCardEl.style.borderColor = "rgba(255,255,255,0.06)";
  }
  
  // Active focus month basing
  let activeMonthNum = 1;
  let focusLabel = "Habit & Narrative";
  let activeMonthSpan = "June 12 – July 12";
  
  const oneMonthMs = (CURRICULUM_END_DATE.getTime() - CURRICULUM_START_DATE.getTime()) / 12;
  const elapsedMs = simDate.getTime() - CURRICULUM_START_DATE.getTime();
  activeMonthNum = Math.min(12, Math.max(1, Math.floor(elapsedMs / oneMonthMs) + 1));
  
  const monthLabels = [
    { label: "Habit & Narrative", span: "June 12 – July 12" },
    { label: "Learning How to Learn", span: "July 12 – August 12" },
    { label: "Academic Foundation", span: "August 12 – September 12" },
    { label: "Academic Strategy & Flow", span: "September 12 – October 12" },
    { label: "Deep Work & Skills", span: "October 12 – November 12" },
    { label: "Mindset & Collaboration", span: "November 12 – December 12" },
    { label: "Winter Epic Reading", span: "December 12 – January 12" },
    { label: "Mind & Happiness", span: "January 12 – February 12" },
    { label: "Emotion & Courage", span: "February 12 – March 12" },
    { label: "Romance & Discipline", span: "March 12 – April 12" },
    { label: "Virtue & Foundation", span: "April 12 – May 12" },
    { label: "Classical Philosophy", span: "May 12 – June 12" }
  ];
  
  if (elapsedMs >= 0 && activeMonthNum <= 12) {
    focusLabel = monthLabels[activeMonthNum - 1].label;
    activeMonthSpan = monthLabels[activeMonthNum - 1].span;
  } else if (elapsedMs < 0) {
    activeMonthNum = 1;
    focusLabel = "Not Started Yet";
    activeMonthSpan = "Pre-Curriculum";
  } else {
    activeMonthNum = 12;
    focusLabel = "Curriculum Completed";
    activeMonthSpan = "Post-Curriculum";
  }
  
  const progressPercent = totalPages > 0 ? Math.round((totalCompletedPages / totalPages) * 100) : 0;
  
  document.getElementById("progress-percent").textContent = `${progressPercent}%`;
  document.getElementById("progress-fill").style.width = `${progressPercent}%`;
  document.getElementById("books-completed").innerHTML = `<strong>${totalCompleted}</strong> / ${totalBooksCount} Books`;
  document.getElementById("pages-completed").innerHTML = `<strong>${totalCompletedPages.toLocaleString()}</strong> / ${totalPages.toLocaleString()} Pages`;
  document.getElementById("current-focus-badge").textContent = `Month ${activeMonthNum}`;
  document.getElementById("current-focus-label").textContent = focusLabel;
  document.getElementById("current-month-span").textContent = activeMonthSpan;
}

// ==========================================================================
// RENDER VIEWS & GROUPS
// ==========================================================================
function renderCurriculumList() {
  const container = document.getElementById("curriculum-container");
  container.innerHTML = "";
  
  if (state.currentView === "timeline") {
    // Collect unique months
    const uniqueMonthsMap = new Map();
    
    // Pre-populate months 1-12 to ensure empty months are never deleted
    for (let i = 1; i <= 12; i++) {
      const defaultBook = DEFAULT_BOOKS.find(b => b.month === i);
      const label = defaultBook ? defaultBook.monthLabel : `Month ${i}`;
      uniqueMonthsMap.set(i, label);
    }
    
    books.forEach(b => {
      const m = b.month;
      const label = b.monthLabel || (typeof m === 'number' ? `Month ${m}` : m);
      uniqueMonthsMap.set(m, label);
    });

    const sortedMonths = Array.from(uniqueMonthsMap.keys()).sort((a, b) => {
      const aIsNum = !isNaN(a);
      const bIsNum = !isNaN(b);
      if (aIsNum && bIsNum) return Number(a) - Number(b);
      if (aIsNum) return -1;
      if (bIsNum) return 1;
      return String(a).localeCompare(String(b));
    });

    sortedMonths.forEach(monthVal => {
      const monthBooks = books.filter(b => b.month === monthVal);

      const oneMonthMs = (CURRICULUM_END_DATE.getTime() - CURRICULUM_START_DATE.getTime()) / 12;
      const elapsedMs = state.simulatedDate.getTime() - CURRICULUM_START_DATE.getTime();
      const currentActiveMonth = Math.min(12, Math.max(1, Math.floor(elapsedMs / oneMonthMs) + 1));
      const isActiveMonth = (typeof monthVal === 'number' || !isNaN(monthVal)) && currentActiveMonth === Number(monthVal);

      const groupEl = document.createElement("div");
      groupEl.className = "timeline-group";
      groupEl.id = `month-group-${monthVal}`;

      if (state.activeFilter !== "all" && String(state.activeFilter) !== String(monthVal)) {
        groupEl.style.display = "none";
      }

      const labelData = uniqueMonthsMap.get(monthVal);
      let dateSpan = "";
      if (labelData && labelData.includes(" (")) {
        dateSpan = labelData.split(' (')[1].replace(')', '');
      } else {
        dateSpan = "Custom Allocation";
      }

      // Calculate Metrics
      let actualTotalPages = 0;
      let effectiveTotalPages = 0;
      monthBooks.forEach(b => {
        let p = parseInt(b.pages) || 0;
        actualTotalPages += p;
        let diff = (b.difficulty || 'easy').toLowerCase();
        let mult = 1;
        if (diff === 'medium') mult = 1.5;
        if (diff === 'hard') mult = 2;
        effectiveTotalPages += (p * mult);
      });

      let daysInMonth = 30; // Default for generic months
      const valStr = String(monthVal).toLowerCase().trim();
      const parts = valStr.split(' ');
      if (parts.length >= 2) {
        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        let mIndex = monthNames.findIndex(m => m === parts[0]);
        if (mIndex !== -1 && !isNaN(parseInt(parts[1]))) {
          daysInMonth = new Date(parseInt(parts[1]), mIndex + 1, 0).getDate();
        }
      }
      
      const dailyGoal = Math.round(effectiveTotalPages / daysInMonth) || 0;

      // Save to localStorage
      let storedMetrics = JSON.parse(localStorage.getItem("curriculum_month_metrics") || "{}");
      storedMetrics[monthVal] = { actualTotalPages, dailyGoal, daysInMonth };
      localStorage.setItem("curriculum_month_metrics", JSON.stringify(storedMetrics));

      const displayTitle = typeof monthVal === 'number' || !isNaN(monthVal) ? `Month ${monthVal}` : monthVal;

      groupEl.innerHTML = `
        <div class="timeline-group-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px;">
          <div>
            <h2 class="timeline-group-title">
              ${displayTitle}
              ${isActiveMonth ? '<span class="badge badge-active" style="margin-bottom:0">Active Focus</span>' : ''}
            </h2>
            <span class="group-date">${dateSpan}</span>
          </div>
          <div class="month-metrics" style="background: rgba(255,255,255,0.03); padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); text-align: right;">
            <div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Monthly Targets</div>
            <div style="display: flex; gap: 20px; align-items: baseline;">
              <div style="font-size: 0.85rem; color: var(--color-secondary);"><strong style="color: var(--text-color); font-size: 1.1rem; font-weight: 700;">${actualTotalPages}</strong> total pages</div>
              <div style="font-size: 0.85rem; color: var(--color-secondary);"><strong style="color: var(--accent); font-size: 1.1rem; font-weight: 700;">${dailyGoal}</strong> base pages/day</div>
            </div>
          </div>
        </div>
        <div class="books-grid">
          ${monthBooks.length > 0 ? monthBooks.map(book => renderBookCard(book)).join("") : '<div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--color-secondary); background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1); font-size: 0.9rem;">No books assigned to this month.</div>'}
        </div>
      `;
      container.appendChild(groupEl);
    });
    
  } else {
    const themes = [...new Set(books.map(b => b.theme))];
    
    themes.forEach(themeName => {
      const themeBooks = books.filter(b => b.theme === themeName);
      if (themeBooks.length === 0) return;
      
      const groupEl = document.createElement("div");
      groupEl.className = "timeline-group";
      groupEl.id = `theme-group-${themeName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
      
      if (state.activeFilter !== "all" && state.activeFilter !== themeName) {
        groupEl.style.display = "none";
      }
      
      groupEl.innerHTML = `
        <div class="timeline-group-header">
          <h2 class="timeline-group-title">
            ${themeName} 
            <span class="group-badge">${themeBooks.length} books</span>
          </h2>
        </div>
        <div class="books-grid">
          ${themeBooks.map(book => renderBookCard(book)).join("")}
        </div>
      `;
      container.appendChild(groupEl);
    });
  }
  attachCardCheckboxListeners();
}

function renderBookCard(book) {
  const isCompleted = state.completedBooks.includes(book.id);
  const themeClass = book.themeClass || 'stoicism';
  const theme = book.theme || 'Stoicism';
  const author = book.author || 'Unknown';
  const description = book.description || '';
  const focusQuestion = book.focusQuestion || '';
  
  return `
    <article class="book-card ${isCompleted ? 'completed' : ''}" id="card-${book.id}">
      <div class="cover-container">
        <!-- SVG Cover Illustration -->
        ${renderBookCoverSvg(book)}
        
        <!-- Checkbox overlay -->
        <div class="check-overlay">
          <label class="checkbox-container" aria-label="Mark ${book.title} as read">
            <input type="checkbox" data-id="${book.id}" ${isCompleted ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      
      <div class="book-details">
        <span class="theme-tag ${themeClass}">${theme}</span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${author}</p>
        <p class="book-summary">${description}</p>
        
        <p class="book-summary" style="margin-top:-10px; border-top:1px dashed rgba(255,255,255,0.06); padding-top:10px; color:#cbd5e1; font-style:italic; font-size:0.75rem;">
          <strong>Focus:</strong> ${focusQuestion}
        </p>
        
        <div class="meta-stats-row">
          <div class="meta-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6 2z"/></svg>
            <span>${book.pages} pages</span>
          </div>
          <span class="difficulty-pill ${book.difficulty.toLowerCase()}">${book.difficulty}</span>
        </div>

        <!-- Dashboard Curricula Management Controls -->
        <div class="curriculum-controls">
          <button class="btn-ctrl btn-edit" onclick="editCurriculumBook('${book.id}')">Edit</button>
          <button class="btn-ctrl btn-move" onclick="moveBookInCurriculum('${book.id}', 'up')" title="Move Up">↑</button>
          <button class="btn-ctrl btn-move" onclick="moveBookInCurriculum('${book.id}', 'down')" title="Move Down">↓</button>
          <button class="btn-ctrl btn-delete" onclick="deleteCurriculumBook('${book.id}')" title="Delete" aria-label="Delete">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// FILTERS GENERATION
// ==========================================================================
function renderFilters() {
  const container = document.getElementById("filters-container");
  if (!container) return;
  container.innerHTML = "";
  
  const allChip = document.createElement("button");
  allChip.className = `filter-chip ${state.activeFilter === 'all' ? 'active' : ''}`;
  allChip.textContent = "Show All";
  allChip.addEventListener("click", () => selectFilter("all"));
  container.appendChild(allChip);
  
  if (state.currentView === "timeline") {
    const uniqueMonthsMap = new Map();
    books.forEach(b => {
      const m = b.month;
      const label = typeof m === 'number' || !isNaN(m) ? `Month ${m}` : m;
      uniqueMonthsMap.set(m, label);
    });

    const sortedMonths = Array.from(uniqueMonthsMap.keys()).sort((a, b) => {
      const aIsNum = !isNaN(a);
      const bIsNum = !isNaN(b);
      if (aIsNum && bIsNum) return Number(a) - Number(b);
      if (aIsNum) return -1;
      if (bIsNum) return 1;
      return String(a).localeCompare(String(b));
    });

    sortedMonths.forEach(m => {
      const label = uniqueMonthsMap.get(m);
      const chip = document.createElement("button");
      chip.className = `filter-chip ${String(state.activeFilter) === String(m) ? 'active' : ''}`;
      chip.textContent = label;
      chip.addEventListener("click", () => selectFilter(String(m)));
      container.appendChild(chip);
    });
  } else {
    const themes = [...new Set(books.map(b => b.theme))];
    themes.forEach(theme => {
      const chip = document.createElement("button");
      chip.className = `filter-chip ${state.activeFilter === theme ? 'active' : ''}`;
      chip.textContent = theme;
      chip.addEventListener("click", () => selectFilter(theme));
      container.appendChild(chip);
    });
  }
}

function selectFilter(filterValue) {
  state.activeFilter = filterValue;
  
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => chip.classList.remove("active"));
  
  renderCurriculumList();
  renderFilters();
}

// ==========================================================================
// INTERACTIVE COMPONENT LISTENERS
// ==========================================================================
function attachCardCheckboxListeners() {
  const checks = document.querySelectorAll(".book-card .checkbox-container input");
  checks.forEach(check => {
    check.addEventListener("change", (e) => {
      const bookId = e.target.getAttribute("data-id");
      const card = document.getElementById(`card-${bookId}`);
      
      if (e.target.checked) {
        if (!state.completedBooks.includes(bookId)) {
          state.completedBooks.push(bookId);
        }
        card.classList.add("completed");
      } else {
        state.completedBooks = state.completedBooks.filter(id => id !== bookId);
        card.classList.remove("completed");
      }
      
      saveProgress();
      updateDashboardMetrics();
      showSaveToast();
    });
  });
}

function attachCompanionListeners() {
  const mainCheck = document.getElementById("stoic-main-check");
  const journalCheck = document.getElementById("stoic-journal-check");
  const medCheck = document.getElementById("stoic-meditations-check");
  
  mainCheck.checked = state.completedBooks.includes("stoic-main");
  journalCheck.checked = state.completedBooks.includes("stoic-journal");
  medCheck.checked = state.completedBooks.includes("stoic-meditations");
  
  mainCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
      if (!state.completedBooks.includes("stoic-main")) state.completedBooks.push("stoic-main");
    } else {
      state.completedBooks = state.completedBooks.filter(id => id !== "stoic-main");
    }
    saveProgress();
    updateDashboardMetrics();
    showSaveToast();
  });
  
  journalCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
      if (!state.completedBooks.includes("stoic-journal")) state.completedBooks.push("stoic-journal");
    } else {
      state.completedBooks = state.completedBooks.filter(id => id !== "stoic-journal");
    }
    saveProgress();
    updateDashboardMetrics();
    showSaveToast();
  });
  
  medCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
      if (!state.completedBooks.includes("stoic-meditations")) state.completedBooks.push("stoic-meditations");
    } else {
      state.completedBooks = state.completedBooks.filter(id => id !== "stoic-meditations");
    }
    saveProgress();
    updateDashboardMetrics();
    showSaveToast();
  });
}

// View switches (Timeline vs Theme)
document.getElementById("btn-timeline-view").addEventListener("click", () => {
  document.getElementById("btn-timeline-view").classList.add("active");
  document.getElementById("btn-theme-view").classList.remove("active");
  state.currentView = "timeline";
  state.activeFilter = "all";
  renderFilters();
  renderCurriculumList();
});

document.getElementById("btn-theme-view").addEventListener("click", () => {
  document.getElementById("btn-theme-view").classList.add("active");
  document.getElementById("btn-timeline-view").classList.remove("active");
  state.currentView = "theme";
  state.activeFilter = "all";
  renderFilters();
  renderCurriculumList();
});

function showSaveToast() {
  const toast = document.getElementById("autosave-toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ==========================================================================
// SIMULATED DATE WIDGET
// ==========================================================================
function setupDateWidget() {
  const displayContainer = document.querySelector(".date-badge");
  displayContainer.style.cursor = "pointer";
  displayContainer.title = "Click to simulate calendar date & watch calculations adapt";
  
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = formatDateYMD(state.simulatedDate);
  dateInput.min = "2026-06-12";
  dateInput.max = "2027-06-12";
  dateInput.style.position = "absolute";
  dateInput.style.opacity = "0";
  dateInput.style.pointerEvents = "none";
  dateInput.style.width = "100%";
  displayContainer.appendChild(dateInput);
  
  displayContainer.addEventListener("click", () => {
    dateInput.showPicker();
  });
  
  dateInput.addEventListener("change", (e) => {
    const newDate = new Date(e.target.value + "T12:00:00");
    state.simulatedDate = newDate;
    state.hasManuallySelectedDate = true;
    
    const formattedDate = newDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    document.getElementById("current-date-display").textContent = formattedDate;
    
    // Automatically trigger daily streak evaluation on date switch
    recalculateStreak();
    updateDashboardMetrics();
    renderCurriculumList();
    updateProgressView();
  });
}

// ==========================================================================
// NAVIGATION & SPA NAVIGATION
// ==========================================================================
function setupViewNavigation() {
  const navDashboard = document.getElementById("nav-dashboard");
  const navProgress = document.getElementById("nav-progress");
  const dashboardView = document.getElementById("dashboard-view");
  const progressView = document.getElementById("progress-view");
  
  navDashboard.addEventListener("click", () => {
    navDashboard.classList.add("active");
    navProgress.classList.remove("active");
    dashboardView.classList.remove("hidden");
    progressView.classList.add("hidden");
    
    navDashboard.setAttribute("aria-selected", "true");
    navProgress.setAttribute("aria-selected", "false");
  });
  
  navProgress.addEventListener("click", () => {
    navProgress.classList.add("active");
    navDashboard.classList.remove("active");
    progressView.classList.remove("hidden");
    dashboardView.classList.add("hidden");
    
    navProgress.setAttribute("aria-selected", "true");
    navDashboard.setAttribute("aria-selected", "false");
    
    // Synchronize Form layout
    populateBookDropdown();
    updateProgressView();
  });
}

// ==========================================================================
// READING PROGRESS TRACKING SYSTEM
// ==========================================================================
function populateBookDropdown() {
  const select = document.getElementById("progress-book-select");
  if (!select) return;
  
  select.innerHTML = "";
  
  // Add curriculum books
  books.forEach(book => {
    const opt = document.createElement("option");
    opt.value = book.id;
    opt.textContent = `${book.title} (Month ${book.month} - ${book.difficulty})`;
    if (state.selectedBookId === book.id) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  // Add custom TBR books
  if (state.tbrList) {
    state.tbrList.forEach(book => {
      const opt = document.createElement("option");
      opt.value = book.id;
      const diffLabel = book.difficulty.charAt(0).toUpperCase() + book.difficulty.slice(1);
      opt.textContent = `[TBR] ${book.title} (${diffLabel})`;
      if (state.selectedBookId === book.id) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }
}

function calculateDynamicTarget() {
  const baseGoalInput = document.getElementById("progress-base-goal");
  const diffSelect = document.getElementById("progress-difficulty-select");
  
  const base = parseInt(baseGoalInput.value) || 30;
  const diff = diffSelect.value;
  
  let target = base;
  if (diff === "medium") {
    target = Math.round(base * (20/30));
  } else if (diff === "hard") {
    target = Math.round(base * (15/30));
  }
  return target;
}

function updateTargetDisplay() {
  const target = calculateDynamicTarget();
  document.getElementById("today-goal-pages").textContent = target;
}

function recalculateStreak() {
  const todayStr = formatDateYMD(state.simulatedDate);
  const yesterday = new Date(state.simulatedDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateYMD(yesterday);
  
  const todayLogged = state.dailyReadingLogs[todayStr] || 0;
  const todayTarget = state.dailyTargets[todayStr] || 30;
  const yesterdayLogged = state.dailyReadingLogs[yesterdayStr] || 0;
  const yesterdayTarget = state.dailyTargets[yesterdayStr] || 30;
  
  // If neither yesterday nor today met the dynamic target, the current streak resets to 0
  const yesterdayLimitDate = new Date("2026-06-12T00:00:00");
  const isYesterdayBeforeStart = yesterday < yesterdayLimitDate;
  
  if (todayLogged < todayTarget && (yesterdayLogged < yesterdayTarget && !isYesterdayBeforeStart)) {
    state.currentStreak = 0;
    saveProgress();
    return;
  }
  
  // Start counting backwards
  let streakDate = new Date(state.simulatedDate);
  // If today isn't completed yet but yesterday was, start tracking backwards from yesterday
  if (todayLogged < todayTarget && yesterdayLogged >= yesterdayTarget) {
    streakDate = yesterday;
  }
  
  let count = 0;
  while (true) {
    if (streakDate < new Date("2026-06-12T00:00:00")) {
      break;
    }
    const checkStr = formatDateYMD(streakDate);
    const logged = state.dailyReadingLogs[checkStr] || 0;
    const target = state.dailyTargets[checkStr] || 30;
    
    if (logged >= target) {
      count++;
      streakDate.setDate(streakDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  state.currentStreak = count;
  if (state.currentStreak > state.longestStreak) {
    state.longestStreak = state.currentStreak;
  }
  saveProgress();
}

function setupLogReadingListener() {
  const btn = document.getElementById("btn-log-reading");
  if (!btn) return;
  
  btn.addEventListener("click", () => {
    const bookSelect = document.getElementById("progress-book-select");
    const diffSelect = document.getElementById("progress-difficulty-select");
    const pagesInput = document.getElementById("progress-pages-input");
    const baseGoalInput = document.getElementById("progress-base-goal");
    
    const pagesVal = parseInt(pagesInput.value);
    if (isNaN(pagesVal) || pagesVal < 0) {
      alert("Please enter a valid page number.");
      return;
    }
    
    const todayStr = formatDateYMD(state.simulatedDate);
    const target = calculateDynamicTarget();
    
    // Save pages read for today
    state.dailyReadingLogs[todayStr] = pagesVal;
    state.dailyTargets[todayStr] = target;
    state.dailyDifficulties[todayStr] = diffSelect.value;
    
    state.selectedBookId = bookSelect.value;
    state.selectedDifficulty = diffSelect.value;
    state.baseGoal = parseInt(baseGoalInput.value) || 30;
    
    // Evaluate goals and trigger rewards/celebrations
    const feedbackBox = document.getElementById("reinforcement-feedback-box");
    const feedbackEmoji = document.getElementById("feedback-emoji");
    const feedbackText = document.getElementById("feedback-message-text");
    
    feedbackBox.classList.remove("hidden");
    
    if (pagesVal < target) {
      // Warm positive encouragement
      feedbackBox.className = "feedback-box";
      feedbackEmoji.textContent = "🌱";
      feedbackText.innerHTML = `Great effort logging <strong>${pagesVal}</strong> pages today! Every single page counts toward your reading habit. Keep taking small steps. Progress, not perfection!`;
      
      recalculateStreak();
    } else {
      // High celebration rewards
      feedbackBox.className = "feedback-box success";
      feedbackEmoji.textContent = "🔥";
      feedbackText.innerHTML = `Sensational! You completed <strong>${pagesVal}</strong> pages and hit your daily target of <strong>${target}</strong> pages for this book. You are transforming your identity as a reader!`;
      
      recalculateStreak();
      triggerConfetti();
    }
    
    saveProgress();
    updateDashboardMetrics();
    updateProgressView();
    showSaveToast();
  });
}

// ==========================================================================
// CONTRIBUTION GRAPH RENDER ENGINE
// ==========================================================================
function renderContributionCalendar() {
  const grid = document.getElementById("contribution-calendar-grid");
  if (!grid) return;
  grid.innerHTML = "";
  
  // Start Monday, June 8, 2026 (Mon of the week June 12 falls into)
  const startDate = new Date("2026-06-08T12:00:00");
  
  for (let i = 0; i < 371; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    const dateStr = formatDateYMD(cellDate);
    
    const isBeforeStart = cellDate < new Date("2026-06-12T00:00:00");
    const isAfterEnd = cellDate > new Date("2027-06-12T23:59:59");
    
    const cell = document.createElement("div");
    cell.className = "cal-cell";
    
    if (isBeforeStart || isAfterEnd) {
      cell.style.opacity = "0.1";
      cell.style.pointerEvents = "none";
      cell.className += " density-0";
    } else {
      const pages = state.dailyReadingLogs[dateStr] || 0;
      const target = state.dailyTargets[dateStr] || 30;
      
      let density = 0;
      if (pages > 0) {
        if (pages >= target) {
          density = 3;
        } else if (pages >= Math.round(target / 2)) {
          density = 2;
        } else {
          density = 1;
        }
      }
      cell.className += ` density-${density}`;
      
      if (dateStr === formatDateYMD(state.simulatedDate)) {
        cell.className += " today-highlight";
      }
      
      const formattedDate = cellDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      cell.title = `${formattedDate}: ${pages} pages logged (Goal: ${target})`;
    }
    grid.appendChild(cell);
  }
  renderCalendarMonthLabels(startDate);
}

function renderCalendarMonthLabels(startDate) {
  const monthsRow = document.getElementById("calendar-months-row");
  if (!monthsRow) return;
  monthsRow.innerHTML = "";
  
  let lastMonth = -1;
  for (let c = 0; c < 53; c++) {
    const colDate = new Date(startDate);
    colDate.setDate(startDate.getDate() + c * 7);
    
    const label = document.createElement("div");
    label.style.width = "11px";
    label.style.textAlign = "left";
    
    const currentMonth = colDate.getMonth();
    if (currentMonth !== lastMonth) {
      label.textContent = colDate.toLocaleString("en-US", { month: "short" }).substring(0, 3);
      lastMonth = currentMonth;
    }
    monthsRow.appendChild(label);
  }
}

function updateProgressView() {
  document.getElementById("progress-current-streak").textContent = state.currentStreak;
  document.getElementById("progress-longest-streak").textContent = state.longestStreak;
  
  // Reading Level Identification
  let level = "Level 1: Novice Page-Turner";
  if (state.longestStreak >= 30) {
    level = "Level 5: Philosophy Sage";
  } else if (state.longestStreak >= 15) {
    level = "Level 4: Focus Practitioner";
  } else if (state.longestStreak >= 7) {
    level = "Level 3: Deep Work Apprentice";
  } else if (state.longestStreak >= 3) {
    level = "Level 2: Habit Builder";
  }
  document.getElementById("progress-identity-level").textContent = level;
  
  renderContributionCalendar();
  
  // Calculate Volume metrics
  let totalLoggedPages = 0;
  let totalDaysWithReading = 0;
  
  const startDate = new Date("2026-06-12T12:00:00");
  const diffTime = Math.max(0, state.simulatedDate.getTime() - startDate.getTime());
  const elapsedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  Object.keys(state.dailyReadingLogs).forEach(key => {
    const pages = state.dailyReadingLogs[key] || 0;
    totalLoggedPages += pages;
    
    const target = state.dailyTargets[key] || 30;
    if (pages >= target) {
      totalDaysWithReading++;
    }
  });
  
  document.getElementById("total-logged-pages-count").textContent = `Total: ${totalLoggedPages.toLocaleString()} pages`;
  
  const consistencyPct = elapsedDays > 0 ? Math.round((totalDaysWithReading / elapsedDays) * 100) : 0;
  document.getElementById("consistency-rate-pct").textContent = `${consistencyPct}%`;
  document.getElementById("consistency-bar-fill").style.width = `${consistencyPct}%`;
}

// ==========================================================================
// HIGH PERFORMANCE CANVAS CONFETTI CELEBRATOR
// ==========================================================================
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimationId = null;

function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  
  confettiCtx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  confettiParticles = [];
  const colors = ["#f43f5e", "#ec4899", "#38bdf8", "#fbbf24", "#10b981"];
  
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: canvas.width / 2,
      y: canvas.height + 20,
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.random() * 12 - 6,
      vy: -(Math.random() * 15 + 10),
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5
    });
  }
  
  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  animateConfetti();
}

function animateConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas || confettiParticles.length === 0) return;
  
  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  let active = false;
  confettiParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4; // gravity physics
    p.vx *= 0.98; // air resistance friction
    p.rotation += p.rotationSpeed;
    
    if (p.y < canvas.height + 20) {
      active = true;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      confettiCtx.restore();
    }
  });
  
  if (active) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ==========================================================================
// LOCAL STORAGE PERSISTENCE
// ==========================================================================
function saveProgress() {
  localStorage.setItem("tbr_progress_completed", JSON.stringify(state.completedBooks));
  localStorage.setItem("tbr_reading_logs", JSON.stringify(state.dailyReadingLogs));
  localStorage.setItem("tbr_reading_targets", JSON.stringify(state.dailyTargets));
  localStorage.setItem("tbr_reading_difficulties", JSON.stringify(state.dailyDifficulties));
  localStorage.setItem("tbr_longest_streak", state.longestStreak);
  localStorage.setItem("tbr_current_streak", state.currentStreak);
  localStorage.setItem("tbr_base_goal", state.baseGoal);
  localStorage.setItem("tbr_selected_book", state.selectedBookId);
  localStorage.setItem("tbr_selected_difficulty", state.selectedDifficulty);
  localStorage.setItem("tbr_custom_list", JSON.stringify(state.tbrList));
  localStorage.setItem("tbr_curriculum_books", JSON.stringify(books));
  localStorage.setItem("tbr_categories", JSON.stringify(state.categories));
}

function loadProgress() {
  const saved = localStorage.getItem("tbr_progress_completed");
  if (saved) {
    try { state.completedBooks = JSON.parse(saved); } catch(e) { state.completedBooks = []; }
  }
  const savedLogs = localStorage.getItem("tbr_reading_logs");
  if (savedLogs) {
    try { state.dailyReadingLogs = JSON.parse(savedLogs); } catch(e) { state.dailyReadingLogs = {}; }
  }
  const savedTargets = localStorage.getItem("tbr_reading_targets");
  if (savedTargets) {
    try { state.dailyTargets = JSON.parse(savedTargets); } catch(e) { state.dailyTargets = {}; }
  }
  const savedDiffs = localStorage.getItem("tbr_reading_difficulties");
  if (savedDiffs) {
    try { state.dailyDifficulties = JSON.parse(savedDiffs); } catch(e) { state.dailyDifficulties = {}; }
  }
  
  state.longestStreak = parseInt(localStorage.getItem("tbr_longest_streak")) || 0;
  state.currentStreak = parseInt(localStorage.getItem("tbr_current_streak")) || 0;
  state.baseGoal = parseInt(localStorage.getItem("tbr_base_goal")) || 30;
  state.selectedBookId = localStorage.getItem("tbr_selected_book") || "atomic-habits";
  state.selectedDifficulty = localStorage.getItem("tbr_selected_difficulty") || "easy";

  const savedTbr = localStorage.getItem("tbr_custom_list");
  if (savedTbr) {
    try { state.tbrList = JSON.parse(savedTbr); } catch(e) { state.tbrList = []; }
  } else {
    state.tbrList = [];
  }

  const savedCurriculum = localStorage.getItem("tbr_curriculum_books");
  if (savedCurriculum) {
    try { books = JSON.parse(savedCurriculum); } catch(e) { books = [...DEFAULT_BOOKS]; }
  } else {
    books = [...DEFAULT_BOOKS];
  }

  const savedCat = localStorage.getItem("tbr_categories");
  if (savedCat) {
    try { state.categories = JSON.parse(savedCat); } catch(e) { state.categories = ["Fiction & Literature", "Learning & Habits", "Productivity & Focus", "Stoicism & Philosophy", "General Backlog"]; }
  } else {
    state.categories = ["Fiction & Literature", "Learning & Habits", "Productivity & Focus", "Stoicism & Philosophy", "General Backlog"];
  }

  // Restore Month 6 if completely missing (e.g. accidentally deleted)
  if (!books.some(b => b.month === 6 || String(b.month).includes("Month 6"))) {
    const month6Books = DEFAULT_BOOKS.filter(b => b.month === 6);
    if (month6Books.length > 0) {
      books.push(...month6Books);
      books.forEach((b, i) => b._sortIndex = i);
      books.sort((a, b) => {
        const aIsNum = !isNaN(a.month);
        const bIsNum = !isNaN(b.month);
        if (aIsNum && bIsNum) {
          if (Number(a.month) !== Number(b.month)) return Number(a.month) - Number(b.month);
        } else if (aIsNum) return -1;
        else if (bIsNum) return 1;
        else if (String(a.month) !== String(b.month)) return String(a.month).localeCompare(String(b.month));
        return a._sortIndex - b._sortIndex;
      });
      localStorage.setItem("tbr_curriculum_books", JSON.stringify(books));
    }
  }
}

// ==========================================================================
// CURRICULUM MANAGEMENT: EDITING & REARRANGING
// ==========================================================================
window.editCurriculumBook = function(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const cardEl = document.getElementById(`card-${id}`);
  if (!cardEl) return;

  cardEl.classList.add("editing-mode");
  cardEl.innerHTML = `
    <div class="card-edit-form" style="padding: 16px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px;">
      <h3 style="margin: 0 0 4px 0; font-size: 1.1rem; color: var(--text-color);">Edit Book</h3>
      
      <div class="form-group">
        <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Title</label>
        <input type="text" id="edit-curr-title-${id}" class="form-input" value="${book.title}" style="height: 36px; padding: 0 10px; border-radius: 6px;">
      </div>
      
      <div class="form-group">
        <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Author</label>
        <input type="text" id="edit-curr-author-${id}" class="form-input" value="${book.author}" style="height: 36px; padding: 0 10px; border-radius: 6px;">
      </div>

      <div class="form-row" style="display: flex; gap: 10px;">
        <div class="form-group" style="flex: 1;">
          <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Pages</label>
          <input type="number" id="edit-curr-pages-${id}" class="form-input" value="${book.pages}" style="height: 36px; padding: 0 10px; border-radius: 6px;">
        </div>
        <div class="form-group" style="flex: 1;">
          <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Difficulty</label>
          <select id="edit-curr-diff-${id}" class="form-select" style="height: 36px; padding: 0 8px; border-radius: 6px;">
            <option value="Easy" ${book.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
            <option value="Medium" ${book.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="Hard" ${book.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Month (e.g. 1 or October 2026)</label>
        <input type="text" id="edit-curr-month-${id}" class="form-input" value="${book.month}" style="height: 36px; padding: 0 10px; border-radius: 6px;">
      </div>

      <div class="form-group">
        <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Description</label>
        <textarea id="edit-curr-desc-${id}" class="form-input" style="height: 50px; padding: 8px 10px; resize: none; font-size: 0.8rem; border-radius: 6px;">${book.description}</textarea>
      </div>

      <div class="form-group">
        <label style="font-size: 0.75rem; font-weight:600; color: var(--color-secondary);">Focus Question</label>
        <input type="text" id="edit-curr-focus-${id}" class="form-input" value="${book.focusQuestion || ''}" style="height: 36px; padding: 0 10px; border-radius: 6px;">
      </div>

      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button class="log-action-btn" onclick="saveCurriculumBook('${id}')" style="margin:0; flex:1; height: 36px; font-size: 0.85rem; font-weight:700;">Save</button>
        <button class="log-action-btn" onclick="renderCurriculumList()" style="margin:0; flex:1; height: 36px; font-size: 0.85rem; font-weight:700; background: rgba(255,255,255,0.05); color: var(--text-color); border: 1px solid rgba(255,255,255,0.1);">Cancel</button>
      </div>
    </div>
  `;
};

window.saveCurriculumBook = function(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const titleInput = document.getElementById(`edit-curr-title-${id}`);
  const authorInput = document.getElementById(`edit-curr-author-${id}`);
  const pagesInput = document.getElementById(`edit-curr-pages-${id}`);
  const diffSelect = document.getElementById(`edit-curr-diff-${id}`);
  const monthInput = document.getElementById(`edit-curr-month-${id}`);
  const descInput = document.getElementById(`edit-curr-desc-${id}`);
  const focusInput = document.getElementById(`edit-curr-focus-${id}`);

  if (!titleInput || !authorInput || !monthInput) return;

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = parseInt(pagesInput.value) || 100;
  const difficulty = diffSelect.value;
  const monthVal = monthInput.value.trim();
  const description = descInput.value.trim();
  const focusQuestion = focusInput.value.trim();

  if (!title || !author || !monthVal) {
    alert("Title, Author, and Month are required.");
    return;
  }

  book.title = title;
  book.author = author;
  book.pages = pages;
  book.difficulty = difficulty;
  book.description = description;
  book.focusQuestion = focusQuestion;

  let newMonth = monthVal;
  if (monthVal.toLowerCase().startsWith("month ")) {
    const numPart = monthVal.substring(6).trim();
    const parsed = parseInt(numPart);
    if (!isNaN(parsed)) {
      newMonth = parsed;
    }
  } else if (!isNaN(parseInt(monthVal))) {
    newMonth = parseInt(monthVal);
  }

  if (book.month !== newMonth) {
    book.month = newMonth;
    if (typeof newMonth === 'number') {
      book.monthLabel = `Month ${newMonth}`;
    } else {
      book.monthLabel = newMonth;
    }
    
    // Sort array stably by month when month is manually edited
    books.forEach((b, i) => b._sortIndex = i);
    books.sort((a, b) => {
      const aIsNum = !isNaN(a.month);
      const bIsNum = !isNaN(b.month);
      if (aIsNum && bIsNum) {
        if (Number(a.month) !== Number(b.month)) return Number(a.month) - Number(b.month);
      } else if (aIsNum) return -1;
      else if (bIsNum) return 1;
      else if (String(a.month) !== String(b.month)) return String(a.month).localeCompare(String(b.month));
      return a._sortIndex - b._sortIndex;
    });
  }

  // Update main tracker if active
  if (state.selectedBookId === id) {
    state.selectedDifficulty = difficulty.toLowerCase();
    const activeDiffSelect = document.getElementById("progress-difficulty-select");
    if (activeDiffSelect) activeDiffSelect.value = difficulty.toLowerCase();
    updateTargetDisplay();
    updateProgressView();
  }

  saveProgress();
  populateBookDropdown();
  renderCurriculumList();
  renderFilters();
  updateProgressView();
  showSaveToast();
};

window.deleteCurriculumBook = function(id) {
  books = books.filter(b => b.id !== id);

  // Revert active book tracker selection if deleted
  if (state.selectedBookId === id) {
    state.selectedBookId = "atomic-habits";
    state.selectedDifficulty = "easy";

    const bookSelect = document.getElementById("progress-book-select");
    if (bookSelect) bookSelect.value = "atomic-habits";

    const diffSelect = document.getElementById("progress-difficulty-select");
    if (diffSelect) diffSelect.value = "easy";

    updateTargetDisplay();
    updateProgressView();
  }

  saveProgress();
  populateBookDropdown();
  renderCurriculumList();
  renderFilters();
  updateProgressView();
  showSaveToast();
};

window.moveBookInCurriculum = function(id, direction) {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return;

  if (direction === 'up') {
    if (idx === 0) return;
    const prevBook = books[idx - 1];
    
    // Check for gap
    if (typeof books[idx].month === 'number' && typeof prevBook.month === 'number') {
      if (prevBook.month < books[idx].month - 1) {
        books[idx].month = books[idx].month - 1;
        books[idx].monthLabel = `Month ${books[idx].month}`;
        saveProgress();
        renderCurriculumList();
        renderFilters();
        populateBookDropdown();
        updateProgressView();
        showSaveToast();
        return;
      }
    }
    
    // Swap months if crossing boundary
    if (books[idx].month !== prevBook.month) {
      books[idx].month = prevBook.month;
      books[idx].monthLabel = prevBook.monthLabel;
    }
    
    // Swap positions
    const temp = books[idx];
    books[idx] = books[idx - 1];
    books[idx - 1] = temp;
  } else if (direction === 'down') {
    if (idx === books.length - 1) return;
    const nextBook = books[idx + 1];
    
    // Check for gap
    if (typeof books[idx].month === 'number' && typeof nextBook.month === 'number') {
      if (nextBook.month > books[idx].month + 1) {
        books[idx].month = books[idx].month + 1;
        books[idx].monthLabel = `Month ${books[idx].month}`;
        saveProgress();
        renderCurriculumList();
        renderFilters();
        populateBookDropdown();
        updateProgressView();
        showSaveToast();
        return;
      }
    }
    
    // Swap months if crossing boundary
    if (books[idx].month !== nextBook.month) {
      books[idx].month = nextBook.month;
      books[idx].monthLabel = nextBook.monthLabel;
    }
    
    // Swap positions
    const temp = books[idx];
    books[idx] = books[idx + 1];
    books[idx + 1] = temp;
  }

  saveProgress();
  renderCurriculumList();
  renderFilters();
  populateBookDropdown();
  updateProgressView();
  showSaveToast();
};

// ==========================================================================
// TBR (TO BE READ) LIST BACKLOG MANAGEMENT
// ==========================================================================
function setupTbrManagement() {
  const btnAdd = document.getElementById("btn-tbr-add");
  const catSelect = document.getElementById("tbr-category-select");
  if (!btnAdd) return;

  // Populate category dropdown
  function populateCategories() {
    if (!catSelect) return;
    catSelect.innerHTML = state.categories.map(c => `<option value="${c}">${c}</option>`).join("") + 
      `<option value="new">+ Create New Category</option>`;
  }
  populateCategories();

  btnAdd.addEventListener("click", () => {
    const titleInput = document.getElementById("tbr-title-input");
    const authorInput = document.getElementById("tbr-author-input");
    const pagesInput = document.getElementById("tbr-pages-input");
    const diffSelect = document.getElementById("tbr-difficulty-select");
    const customCatInput = document.getElementById("tbr-custom-category-input");

    const title = titleInput.value.trim();
    const author = authorInput ? authorInput.value.trim() : "Unknown Author";
    const pages = pagesInput ? (parseInt(pagesInput.value) || 300) : 300;
    const difficulty = diffSelect.value;
    
    let category = "General Backlog";
    if (catSelect) {
      if (catSelect.value === "new") {
        const customCat = customCatInput.value.trim();
        if (customCat) {
          category = customCat;
          if (!state.categories.includes(category)) {
            state.categories.push(category);
            populateCategories(); // refresh dropdown
          }
        }
      } else {
        category = catSelect.value;
      }
    }

    if (!title) {
      alert("Please enter a book title.");
      return;
    }

    const newBook = {
      id: `tbr-${Date.now()}`,
      title: title,
      author: author,
      pages: pages,
      category: category,
      difficulty: difficulty
    };

    state.tbrList.push(newBook);
    
    titleInput.value = "";
    if (authorInput) authorInput.value = "";
    if (pagesInput) pagesInput.value = "";
    if (customCatInput) {
      customCatInput.value = "";
      customCatInput.style.display = "none";
    }
    if (catSelect) catSelect.value = state.categories[0];

    saveProgress();
    populateBookDropdown();
    renderTbrList();
    showSaveToast();
  });

  renderTbrList();
}

function renderTbrList() {
  const listEl = document.getElementById("tbr-list");
  if (!listEl) return;
  listEl.innerHTML = "";

  // Update datalist for monthly allocation
  let datalistEl = document.getElementById("existing-months");
  if (!datalistEl) {
    datalistEl = document.createElement("datalist");
    datalistEl.id = "existing-months";
    document.body.appendChild(datalistEl);
  }
  
  // Extract all unique months
  const uniqueMonths = [...new Set(books.map(b => b.month))];
  datalistEl.innerHTML = uniqueMonths.map(m => {
    const displayTitle = typeof m === 'number' || !isNaN(m) ? `Month ${m}` : m;
    return `<option value="${displayTitle}"></option>`;
  }).join("");

  if (!state.tbrList || state.tbrList.length === 0) {
    listEl.innerHTML = `<li class="tbr-empty-state">No backlog books yet. Add one above!</li>`;
    return;
  }

  state.tbrList.forEach(book => {
    const li = document.createElement("li");
    li.className = "tbr-item";
    li.id = `tbr-item-${book.id}`;

    const diffLabel = book.difficulty.charAt(0).toUpperCase() + book.difficulty.slice(1);

    li.innerHTML = `
      <div class="tbr-item-info">
        <span class="tbr-item-title" style="display:block; margin-bottom:4px;">${book.title}</span>
        <div style="font-size:0.75rem; color:var(--color-secondary); margin-bottom:8px; display:flex; gap:12px;">
          <span>${book.author || 'Unknown Author'}</span>
          <span>&bull;</span>
          <span>${book.pages || 300} pages</span>
          <span>&bull;</span>
          <span>${book.category || 'General Backlog'}</span>
        </div>
        <span class="difficulty-pill ${book.difficulty.toLowerCase()}">${diffLabel}</span>
      </div>
      <div class="tbr-item-actions">
        <div class="tbr-assign-controls">
          <input type="text" list="existing-months" placeholder="Assign Month" class="form-input tbr-month-input" id="tbr-month-input-${book.id}">
          <button class="btn-tbr-assign" onclick="assignBookToMonth('${book.id}')">Assign</button>
        </div>
        <button class="btn-tbr-edit" onclick="editTbrBook('${book.id}')">Edit</button>
        <button class="btn-tbr-delete" onclick="deleteTbrBook('${book.id}')" aria-label="Delete">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    `;
    listEl.appendChild(li);
  });
}

// Global actions exposed for inline HTML buttons
window.assignBookToMonth = function(id) {
  const bookIndex = state.tbrList.findIndex(b => b.id === id);
  if (bookIndex === -1) return;
  
  const monthInput = document.getElementById(`tbr-month-input-${id}`);
  const monthVal = monthInput ? monthInput.value.trim() : "";
  if (!monthVal) {
    alert("Please enter or select a month.");
    return;
  }
  
  let newMonth = monthVal;
  if (monthVal.toLowerCase().startsWith("month ")) {
    const numPart = monthVal.substring(6).trim();
    const parsed = parseInt(numPart);
    if (!isNaN(parsed)) {
      newMonth = parsed;
    }
  } else if (!isNaN(parseInt(monthVal))) {
    newMonth = parseInt(monthVal);
  }
  
  const book = state.tbrList[bookIndex];
  
  const curriculumBook = {
    id: book.id,
    title: book.title,
    author: book.author || "Unknown Author",
    month: newMonth,
    monthLabel: typeof newMonth === 'number' ? `Month ${newMonth}` : newMonth,
    theme: book.category || "General Backlog",
    themeClass: "stoicism",
    pages: book.pages || 300,
    difficulty: book.difficulty.charAt(0).toUpperCase() + book.difficulty.slice(1),
    description: "Added from TBR Backlog.",
    focusQuestion: "What are your core takeaways?",
    icon: "book",
    gradient: "linear-gradient(135deg, #1e293b 0%, #475569 100%)"
  };
  
  // Remove from TBR list
  state.tbrList.splice(bookIndex, 1);
  
  // Add to curriculum books
  books.push(curriculumBook);
  
  // Sort array stably by month to place it in the correct visual sequence
  books.forEach((b, i) => b._sortIndex = i);
  books.sort((a, b) => {
    const aIsNum = !isNaN(a.month);
    const bIsNum = !isNaN(b.month);
    if (aIsNum && bIsNum) {
      if (Number(a.month) !== Number(b.month)) return Number(a.month) - Number(b.month);
    } else if (aIsNum) return -1;
    else if (bIsNum) return 1;
    else if (String(a.month) !== String(b.month)) return String(a.month).localeCompare(String(b.month));
    return a._sortIndex - b._sortIndex;
  });
  
  saveProgress();
  populateBookDropdown();
  renderTbrList();
  renderCurriculumList();
  renderFilters();
  updateProgressView();
  showSaveToast();
};

window.editTbrBook = function(id) {
  const book = state.tbrList.find(b => b.id === id);
  if (!book) return;

  const itemEl = document.getElementById(`tbr-item-${id}`);
  if (!itemEl) return;

  itemEl.className = "tbr-item editing";
  itemEl.innerHTML = `
    <div class="tbr-item-edit-form" style="display:flex; flex-wrap:wrap; gap:8px;">
      <input type="text" id="edit-tbr-title-${id}" class="form-input edit-title-input" value="${book.title}" placeholder="Title" style="flex:2; min-width:120px;">
      <input type="text" id="edit-tbr-author-${id}" class="form-input" value="${book.author || ''}" placeholder="Author" style="flex:2; min-width:120px;">
      <input type="number" id="edit-tbr-pages-${id}" class="form-input" value="${book.pages || 300}" placeholder="Pages" style="flex:1; min-width:80px;">
      <select id="edit-tbr-cat-${id}" class="form-select" style="flex:1.5; min-width:120px;" onchange="const customInput = document.getElementById('edit-tbr-custom-cat-${id}'); if(this.value === 'new') { customInput.style.display = 'block'; customInput.focus(); } else { customInput.style.display = 'none'; }">
        ${state.categories.map(c => `<option value="${c}" ${book.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        <option value="new">+ Create New Category</option>
      </select>
      <input type="text" id="edit-tbr-custom-cat-${id}" class="form-input" placeholder="New Category" style="display:none; flex:1.5; min-width:120px;">
      <select id="edit-tbr-diff-${id}" class="form-select edit-diff-select" style="flex:1; min-width:100px;">
        <option value="easy" ${book.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
        <option value="medium" ${book.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="hard" ${book.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
      </select>
    </div>
    <div class="tbr-item-actions">
      <button class="btn-tbr-save" onclick="saveTbrBook('${id}')">Save</button>
      <button class="btn-tbr-cancel" onclick="renderTbrList()">Cancel</button>
    </div>
  `;
};

window.saveTbrBook = function(id) {
  const book = state.tbrList.find(b => b.id === id);
  if (!book) return;

  const titleInput = document.getElementById(`edit-tbr-title-${id}`);
  const authorInput = document.getElementById(`edit-tbr-author-${id}`);
  const pagesInput = document.getElementById(`edit-tbr-pages-${id}`);
  const catSelect = document.getElementById(`edit-tbr-cat-${id}`);
  const customCatInput = document.getElementById(`edit-tbr-custom-cat-${id}`);
  const diffSelect = document.getElementById(`edit-tbr-diff-${id}`);

  if (!titleInput || !diffSelect) return;

  const newTitle = titleInput.value.trim();
  if (!newTitle) {
    alert("Book title cannot be empty.");
    return;
  }

  book.title = newTitle;
  book.author = authorInput ? authorInput.value.trim() || "Unknown Author" : book.author;
  book.pages = pagesInput ? parseInt(pagesInput.value) || 300 : book.pages;
  book.difficulty = diffSelect.value;
  
  if (catSelect) {
    if (catSelect.value === "new") {
      const customCat = customCatInput.value.trim();
      if (customCat) {
        book.category = customCat;
        if (!state.categories.includes(book.category)) {
          state.categories.push(book.category);
        }
      }
    } else {
      book.category = catSelect.value;
    }
  }

  // If this is currently active, sync active settings
  if (state.selectedBookId === id) {
    state.selectedDifficulty = book.difficulty;
    const activeDiffSelect = document.getElementById("progress-difficulty-select");
    if (activeDiffSelect) activeDiffSelect.value = book.difficulty;
    updateTargetDisplay();
    updateProgressView();
  }

  saveProgress();
  populateBookDropdown();
  renderTbrList();
  showSaveToast();
};

window.deleteTbrBook = function(id) {
  state.tbrList = state.tbrList.filter(b => b.id !== id);

  // If the deleted book was active, revert to Atomic Habits
  if (state.selectedBookId === id) {
    state.selectedBookId = "atomic-habits";
    state.selectedDifficulty = "easy";

    const bookSelect = document.getElementById("progress-book-select");
    if (bookSelect) bookSelect.value = "atomic-habits";

    const diffSelect = document.getElementById("progress-difficulty-select");
    if (diffSelect) diffSelect.value = "easy";

    updateTargetDisplay();
    updateProgressView();
  }

  saveProgress();
  populateBookDropdown();
  renderTbrList();
  showSaveToast();
};

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
function init() {
  const torontoToday = getTorontoDate();
  state.simulatedDate = torontoToday < new Date("2026-06-13T12:00:00") ? new Date("2026-06-13T12:00:00") : torontoToday;
  
  loadProgress();
  initializeGradientDefs();
  setupDateWidget();
  
  // Set date badges and input values
  const year = state.simulatedDate.getFullYear();
  const month = String(state.simulatedDate.getMonth() + 1).padStart(2, '0');
  const day = String(state.simulatedDate.getDate()).padStart(2, '0');
  const dateInput = document.querySelector(".date-badge input");
  if (dateInput) {
    dateInput.value = `${year}-${month}-${day}`;
  }
  
  const formattedDate = state.simulatedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  document.getElementById("current-date-display").textContent = formattedDate;
  
  // Setup forms
  const baseGoalInput = document.getElementById("progress-base-goal");
  if (baseGoalInput) baseGoalInput.value = state.baseGoal;
  
  const diffSelect = document.getElementById("progress-difficulty-select");
  if (diffSelect) diffSelect.value = state.selectedDifficulty;
  
  // Setup navigation views
  setupViewNavigation();
  
  // Initial streak checking
  recalculateStreak();
  
  updateDashboardMetrics();
  renderCurriculumList();
  renderFilters();
  attachCompanionListeners();
  
  // Progress subview setups
  populateBookDropdown();
  setupLogReadingListener();
  
  const bookSelect = document.getElementById("progress-book-select");
  if (bookSelect) {
    bookSelect.value = state.selectedBookId;
    bookSelect.addEventListener("change", () => {
      const bookId = bookSelect.value;
      let book = books.find(b => b.id === bookId);
      if (!book && state.tbrList) {
        book = state.tbrList.find(b => b.id === bookId);
      }
      if (book) {
        diffSelect.value = book.difficulty.toLowerCase();
        updateTargetDisplay();
      }
    });
  }
  
  setupTbrManagement();
  
  if (diffSelect) {
    diffSelect.addEventListener("change", updateTargetDisplay);
  }
  if (baseGoalInput) {
    baseGoalInput.addEventListener("input", updateTargetDisplay);
  }
  
  updateTargetDisplay();
  updateProgressView();
  setupAutoRefresh();
  
  // Resize handler for full screen confetti canvas
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
