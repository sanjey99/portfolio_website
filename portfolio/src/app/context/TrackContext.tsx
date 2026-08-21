import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type WorkView = "selected" | "quant" | "ml" | "product" | "archive";

export interface WorkViewConfig {
  id: WorkView;
  label: string;
  description: string;
}

export const WORK_VIEWS: WorkViewConfig[] = [
  {
    id: "selected",
    label: "Selected",
    description: "Three flagship systems",
  },
  {
    id: "quant",
    label: "Quant Systems",
    description: "Research and risk infrastructure",
  },
  {
    id: "ml",
    label: "Applied ML",
    description: "Models built into working systems",
  },
  {
    id: "product",
    label: "Product Systems",
    description: "APIs, interfaces, and operations",
  },
  {
    id: "archive",
    label: "Archive",
    description: "Compact record of additional proof",
  },
];

interface WorkViewContextValue {
  workView: WorkView;
  setWorkView: (view: WorkView) => void;
}

const WorkViewContext = createContext<WorkViewContextValue | null>(null);

export function WorkViewProvider({ children }: { children: ReactNode }) {
  const [workView, setWorkView] = useState<WorkView>("selected");

  return (
    <WorkViewContext.Provider value={{ workView, setWorkView }}>
      {children}
    </WorkViewContext.Provider>
  );
}

export function useWorkView() {
  const context = useContext(WorkViewContext);
  if (!context) {
    throw new Error("useWorkView must be used inside WorkViewProvider");
  }
  return context;
}
