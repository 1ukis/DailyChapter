import type { BookDifficulty } from "@/types/database";

export interface CurriculumTemplateBook {
  title: string;
  author: string;
  pages: number;
  month: number;
  month_label: string;
  theme: string;
  description: string;
  focus_question: string;
  icon: string;
  gradient: string;
  book_difficulty: BookDifficulty;
}

export interface CurriculumTemplate {
  id: string;
  name: string;
  description: string;
  books: CurriculumTemplateBook[];
}

export const FOUNDATION_READING_TEMPLATE: CurriculumTemplate = {
  id: "foundation-reading",
  name: "Foundation Reading",
  description:
    "A balanced starter list covering habits, fiction, and productivity — ideal for building a daily reading rhythm.",
  books: [
    {
      title: "Atomic Habits",
      author: "James Clear",
      pages: 320,
      month: 1,
      month_label: "Month 1",
      theme: "Learning & Habits",
      description:
        "Establish the systems, environments, and tiny routines required to read consistently.",
      focus_question:
        "What 2-minute habit can you design to anchor your daily reading?",
      icon: "atom",
      gradient: "linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)",
      book_difficulty: "easy",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      pages: 175,
      month: 1,
      month_label: "Month 1",
      theme: "Fiction & Literature",
      description:
        "An allegorical novel about finding purpose, momentum, and listening to the heart.",
      focus_question:
        "What is your Personal Legend, and how do you recognize the omens guiding you?",
      icon: "pyramid",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #f59e0b 100%)",
      book_difficulty: "easy",
    },
    {
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      pages: 95,
      month: 1,
      month_label: "Month 1",
      theme: "Fiction & Literature",
      description:
        "A classic story about friendship, love, and human nature viewed through a child's eyes.",
      focus_question:
        "How do grown-ups lose their capacity to see the essence of things?",
      icon: "scroll",
      gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)",
      book_difficulty: "easy",
    },
    {
      title: "Show Your Work!",
      author: "Austin Kleon",
      pages: 220,
      month: 1,
      month_label: "Month 1",
      theme: "Productivity & Focus",
      description:
        "Learn why generosity, documentation, and sharing your process beats self-promotion.",
      focus_question:
        "What small part of your learning process can you share with others today?",
      icon: "speech",
      gradient: "linear-gradient(135deg, #311005 0%, #ea580c 100%)",
      book_difficulty: "easy",
    },
    {
      title: "How to Read a Book",
      author: "Mortimer J. Adler",
      pages: 420,
      month: 2,
      month_label: "Month 2",
      theme: "Learning & Habits",
      description:
        "Learn the stages of active reading: inspectional, analytical, and syntopical.",
      focus_question:
        "How can you transition from passive scrolling to active critical reading?",
      icon: "book",
      gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)",
      book_difficulty: "hard",
    },
    {
      title: "Make It Stick",
      author: "Peter C. Brown",
      pages: 330,
      month: 2,
      month_label: "Month 2",
      theme: "Learning & Habits",
      description:
        "The science of memory, active recall, spaced repetition, and successful study design.",
      focus_question:
        "How will you replace ineffective rereading with active self-quizzing?",
      icon: "puzzle",
      gradient: "linear-gradient(135deg, #0f172a 0%, #8b5cf6 100%)",
      book_difficulty: "medium",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      pages: 296,
      month: 3,
      month_label: "Month 3",
      theme: "Productivity & Focus",
      description:
        "Develop the cognitive stamina to block distractions and concentrate intensely.",
      focus_question:
        "How will you schedule daily blocks of shallow work to protect your deep work?",
      icon: "lighthouse",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #6366f1 100%)",
      book_difficulty: "medium",
    },
    {
      title: "Mindset",
      author: "Carol S. Dweck",
      pages: 320,
      month: 3,
      month_label: "Month 3",
      theme: "Learning & Habits",
      description:
        "Shift from a fixed belief of intelligence to a growth mindset focused on practice.",
      focus_question:
        "When you make a mistake, do you focus on fixing it or defending your reputation?",
      icon: "mindset",
      gradient: "linear-gradient(135deg, #022c22 0%, #10b981 100%)",
      book_difficulty: "medium",
    },
  ],
};

export const CURRICULUM_TEMPLATES = [FOUNDATION_READING_TEMPLATE];
