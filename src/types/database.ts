export type BookDifficulty = "easy" | "medium" | "hard";
export type LogDifficulty = "easy" | "medium" | "hard" | "difficult";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          timezone: string;
          base_goal: number;
          selected_book_id: string | null;
          default_log_difficulty: LogDifficulty;
          setup_completed: boolean;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          timezone?: string;
          base_goal?: number;
          selected_book_id?: string | null;
          default_log_difficulty?: LogDifficulty;
          setup_completed?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          timezone?: string;
          base_goal?: number;
          selected_book_id?: string | null;
          default_log_difficulty?: LogDifficulty;
          setup_completed?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      book_categories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          color?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          color?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      books: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          title: string;
          author: string | null;
          pages: number;
          month: number | null;
          month_label: string | null;
          theme: string | null;
          description: string | null;
          focus_question: string | null;
          icon: string;
          gradient: string | null;
          book_difficulty: BookDifficulty;
          sort_order: number;
          completed_at: string | null;
          is_companion: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          title: string;
          author?: string | null;
          pages?: number;
          month?: number | null;
          month_label?: string | null;
          theme?: string | null;
          description?: string | null;
          focus_question?: string | null;
          icon?: string;
          gradient?: string | null;
          book_difficulty?: BookDifficulty;
          sort_order?: number;
          completed_at?: string | null;
          is_companion?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          title?: string;
          author?: string | null;
          pages?: number;
          month?: number | null;
          month_label?: string | null;
          theme?: string | null;
          description?: string | null;
          focus_question?: string | null;
          icon?: string;
          gradient?: string | null;
          book_difficulty?: BookDifficulty;
          sort_order?: number;
          completed_at?: string | null;
          is_companion?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          pages: number;
          target_pages: number;
          difficulty: LogDifficulty;
          book_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          pages?: number;
          target_pages: number;
          difficulty?: LogDifficulty;
          book_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          pages?: number;
          target_pages?: number;
          difficulty?: LogDifficulty;
          book_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      streaks: {
        Row: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_log_date: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_log_date?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          current_streak?: number;
          longest_streak?: number;
          last_log_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      backlog: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          title: string;
          author: string | null;
          pages: number;
          difficulty: BookDifficulty;
          assigned_month: number | null;
          notes: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          title: string;
          author?: string | null;
          pages?: number;
          difficulty?: BookDifficulty;
          assigned_month?: number | null;
          notes?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          title?: string;
          author?: string | null;
          pages?: number;
          difficulty?: BookDifficulty;
          assigned_month?: number | null;
          notes?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stoic_tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stoic_task_completions: {
        Row: {
          id: string;
          user_id: string;
          task_id: string;
          completion_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          task_id: string;
          completion_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          task_id?: string;
          completion_date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      reading_identity_levels: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          min_streak: number;
          min_total_pages: number;
          description: string | null;
          icon: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          min_streak?: number;
          min_total_pages?: number;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          min_streak?: number;
          min_total_pages?: number;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      book_difficulty: BookDifficulty;
      log_difficulty: LogDifficulty;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Book = Database["public"]["Tables"]["books"]["Row"];
export type Log = Database["public"]["Tables"]["logs"]["Row"];
export type Streak = Database["public"]["Tables"]["streaks"]["Row"];
export type BacklogItem = Database["public"]["Tables"]["backlog"]["Row"];
export type StoicTask = Database["public"]["Tables"]["stoic_tasks"]["Row"];
export type BookCategory = Database["public"]["Tables"]["book_categories"]["Row"];
export type ReadingIdentityLevel =
  Database["public"]["Tables"]["reading_identity_levels"]["Row"];
