// Mock auth + data store persisted to localStorage.
// Frontend-only demo; no real backend.
import { useSyncExternalStore } from "react";

export type Role = "worker" | "buyer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photoURL: string;
  role: Role;
  coins: number;
  createdAt: string;
}

export interface Task {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  title: string;
  detail: string;
  requiredWorkers: number;
  payableAmount: number;
  completionDate: string;
  submissionInfo: string;
  imageUrl: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  payableAmount: number;
  workerEmail: string;
  workerName: string;
  buyerName: string;
  buyerEmail: string;
  submissionDetails: string;
  currentDate: string;
  status: "pending" | "approved" | "rejected";
}

export interface Withdrawal {
  id: string;
  workerEmail: string;
  workerName: string;
  withdrawalCoin: number;
  withdrawalAmount: number;
  paymentSystem: string;
  accountNumber: string;
  withdrawDate: string;
  status: "pending" | "approved";
}

export interface Payment {
  id: string;
  buyerEmail: string;
  coins: number;
  amount: number;
  date: string;
}

export interface Notification {
  id: string;
  message: string;
  toEmail: string;
  actionRoute: string;
  time: string;
  read: boolean;
}

interface StoreState {
  currentUserId: string | null;
  users: User[];
  tasks: Task[];
  submissions: Submission[];
  withdrawals: Withdrawal[];
  payments: Payment[];
  notifications: Notification[];
}

const KEY = "microtask_store_v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const seedUsers = (): User[] => [
  {
    id: "admin-1",
    name: "Platform Admin",
    email: "admin@microtask.io",
    password: "Admin@123",
    photoURL: "https://api.dicebear.com/7.x/notionists/svg?seed=admin",
    role: "admin",
    coins: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "buyer-1",
    name: "Nadia Rahman",
    email: "buyer@microtask.io",
    password: "Buyer@123",
    photoURL: "https://api.dicebear.com/7.x/notionists/svg?seed=nadia",
    role: "buyer",
    coins: 320,
    createdAt: new Date().toISOString(),
  },
  {
    id: "worker-1",
    name: "Arif Hasan",
    email: "worker@microtask.io",
    password: "Worker@123",
    photoURL: "https://api.dicebear.com/7.x/notionists/svg?seed=arif",
    role: "worker",
    coins: 420,
    createdAt: new Date().toISOString(),
  },
  ...["Sara", "Kenji", "Priya", "Diego", "Emma", "Liam"].map((n, i) => ({
    id: `worker-${i + 2}`,
    name: n + " " + ["Chen", "Ito", "Sharma", "Rossi", "Novak", "Walker"][i],
    email: `${n.toLowerCase()}@microtask.io`,
    password: "Worker@123",
    photoURL: `https://api.dicebear.com/7.x/notionists/svg?seed=${n}`,
    role: "worker" as Role,
    coins: 380 - i * 40,
    createdAt: new Date().toISOString(),
  })),
];

const seedTasks = (): Task[] => [
  {
    id: "task-1",
    buyerId: "buyer-1",
    buyerName: "Nadia Rahman",
    buyerEmail: "buyer@microtask.io",
    title: "Watch YouTube video and leave a thoughtful comment",
    detail:
      "Watch the linked 3-minute video and leave a genuine comment (min 15 words) reflecting on the content.",
    requiredWorkers: 25,
    payableAmount: 6,
    completionDate: new Date(Date.now() + 6 * 864e5).toISOString().slice(0, 10),
    submissionInfo: "Screenshot of your posted comment with visible username.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    buyerId: "buyer-1",
    buyerName: "Nadia Rahman",
    buyerEmail: "buyer@microtask.io",
    title: "Follow our Instagram & like the pinned post",
    detail:
      "Follow @studio.north on Instagram and like the top pinned post. Send screenshot proof.",
    requiredWorkers: 40,
    payableAmount: 4,
    completionDate: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
    submissionInfo: "Screenshot showing your username following the account.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 864e5).toISOString(),
  },
  {
    id: "task-3",
    buyerId: "buyer-1",
    buyerName: "Nadia Rahman",
    buyerEmail: "buyer@microtask.io",
    title: "Write a 5-star Google review for our cafe",
    detail:
      "Write an honest, detailed Google review for Sunrise Cafe. Please only leave a review if you have actually visited.",
    requiredWorkers: 15,
    payableAmount: 10,
    completionDate: new Date(Date.now() + 10 * 864e5).toISOString().slice(0, 10),
    submissionInfo: "Screenshot of the published review with your name.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 2 * 864e5).toISOString(),
  },
];

function loadState(): StoreState {
  if (typeof window === "undefined") {
    return {
      currentUserId: null,
      users: seedUsers(),
      tasks: seedTasks(),
      submissions: [],
      withdrawals: [],
      payments: [],
      notifications: [],
    };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const initial: StoreState = {
    currentUserId: null,
    users: seedUsers(),
    tasks: seedTasks(),
    submissions: [],
    withdrawals: [],
    payments: [],
    notifications: [],
  };
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

let state: StoreState = loadState();
const listeners = new Set<() => void>();

function save() {
  if (typeof window !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export const store = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  set: (updater: (s: StoreState) => StoreState) => {
    state = updater(state);
    save();
  },
};

export function useStore<T>(selector: (s: StoreState) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(state),
    () => selector(state),
  );
}

// ---- auth ----
export function register(input: {
  name: string;
  email: string;
  password: string;
  photoURL: string;
  role: Role;
}) {
  const exists = state.users.find((u) => u.email === input.email);
  if (exists) throw new Error("An account with this email already exists.");
  const user: User = {
    id: uid(),
    ...input,
    coins: input.role === "buyer" ? 50 : 10,
    createdAt: new Date().toISOString(),
  };
  store.set((s) => ({ ...s, users: [...s.users, user], currentUserId: user.id }));
  localStorage.setItem("microtask_token", uid() + uid());
  return user;
}

export function login(email: string, password: string) {
  const u = state.users.find(
    (x) => x.email === email && x.password === password,
  );
  if (!u) throw new Error("Invalid email or password.");
  store.set((s) => ({ ...s, currentUserId: u.id }));
  localStorage.setItem("microtask_token", uid() + uid());
  return u;
}

export function googleLogin() {
  // Demo: sign in as the first worker if not signed in.
  const u = state.users.find((x) => x.role === "worker")!;
  store.set((s) => ({ ...s, currentUserId: u.id }));
  localStorage.setItem("microtask_token", uid() + uid());
  return u;
}

export function logout() {
  store.set((s) => ({ ...s, currentUserId: null }));
  localStorage.removeItem("microtask_token");
}

export function currentUser(): User | null {
  return state.users.find((u) => u.id === state.currentUserId) ?? null;
}

// ---- notifications ----
export function notify(
  toEmail: string,
  message: string,
  actionRoute: string,
) {
  store.set((s) => ({
    ...s,
    notifications: [
      {
        id: uid(),
        toEmail,
        message,
        actionRoute,
        time: new Date().toISOString(),
        read: false,
      },
      ...s.notifications,
    ],
  }));
}

// ---- tasks ----
export function addTask(t: Omit<Task, "id" | "createdAt">) {
  store.set((s) => ({
    ...s,
    tasks: [{ ...t, id: uid(), createdAt: new Date().toISOString() }, ...s.tasks],
    users: s.users.map((u) =>
      u.id === t.buyerId
        ? { ...u, coins: u.coins - t.requiredWorkers * t.payableAmount }
        : u,
    ),
  }));
}

export function updateTask(id: string, patch: Partial<Task>) {
  store.set((s) => ({
    ...s,
    tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
  }));
}

export function deleteTask(id: string) {
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;
  const refill = task.requiredWorkers * task.payableAmount;
  store.set((s) => ({
    ...s,
    tasks: s.tasks.filter((t) => t.id !== id),
    users: s.users.map((u) =>
      u.id === task.buyerId ? { ...u, coins: u.coins + refill } : u,
    ),
  }));
}

// ---- submissions ----
export function submitTask(sub: Omit<Submission, "id" | "currentDate" | "status">) {
  const submission: Submission = {
    ...sub,
    id: uid(),
    currentDate: new Date().toISOString(),
    status: "pending",
  };
  store.set((s) => ({
    ...s,
    submissions: [submission, ...s.submissions],
    tasks: s.tasks.map((t) =>
      t.id === sub.taskId ? { ...t, requiredWorkers: t.requiredWorkers - 1 } : t,
    ),
  }));
  notify(
    sub.buyerEmail,
    `${sub.workerName} submitted "${sub.taskTitle}" for review`,
    "/dashboard",
  );
}

export function decideSubmission(id: string, decision: "approved" | "rejected") {
  const sub = state.submissions.find((s) => s.id === id);
  if (!sub) return;
  store.set((s) => ({
    ...s,
    submissions: s.submissions.map((x) =>
      x.id === id ? { ...x, status: decision } : x,
    ),
    users:
      decision === "approved"
        ? s.users.map((u) =>
            u.email === sub.workerEmail
              ? { ...u, coins: u.coins + sub.payableAmount }
              : u,
          )
        : s.users,
    tasks:
      decision === "rejected"
        ? s.tasks.map((t) =>
            t.id === sub.taskId
              ? { ...t, requiredWorkers: t.requiredWorkers + 1 }
              : t,
          )
        : s.tasks,
  }));
  notify(
    sub.workerEmail,
    decision === "approved"
      ? `You earned ${sub.payableAmount} coins from ${sub.buyerName} for "${sub.taskTitle}"`
      : `Your submission for "${sub.taskTitle}" was rejected by ${sub.buyerName}`,
    "/dashboard",
  );
}

// ---- withdrawals ----
export function requestWithdrawal(w: Omit<Withdrawal, "id" | "withdrawDate" | "status">) {
  store.set((s) => ({
    ...s,
    withdrawals: [
      {
        ...w,
        id: uid(),
        withdrawDate: new Date().toISOString(),
        status: "pending",
      },
      ...s.withdrawals,
    ],
  }));
}

export function approveWithdrawal(id: string) {
  const w = state.withdrawals.find((x) => x.id === id);
  if (!w) return;
  store.set((s) => ({
    ...s,
    withdrawals: s.withdrawals.map((x) =>
      x.id === id ? { ...x, status: "approved" } : x,
    ),
    users: s.users.map((u) =>
      u.email === w.workerEmail ? { ...u, coins: u.coins - w.withdrawalCoin } : u,
    ),
  }));
  notify(
    w.workerEmail,
    `Your withdrawal of $${w.withdrawalAmount} has been approved`,
    "/dashboard",
  );
}

// ---- payments ----
export function purchaseCoins(buyerEmail: string, coins: number, amount: number) {
  store.set((s) => ({
    ...s,
    payments: [
      {
        id: uid(),
        buyerEmail,
        coins,
        amount,
        date: new Date().toISOString(),
      },
      ...s.payments,
    ],
    users: s.users.map((u) =>
      u.email === buyerEmail ? { ...u, coins: u.coins + coins } : u,
    ),
  }));
}

// ---- admin ----
export function updateUserRole(id: string, role: Role) {
  store.set((s) => ({
    ...s,
    users: s.users.map((u) => (u.id === id ? { ...u, role } : u)),
  }));
}
export function deleteUser(id: string) {
  store.set((s) => ({ ...s, users: s.users.filter((u) => u.id !== id) }));
}
