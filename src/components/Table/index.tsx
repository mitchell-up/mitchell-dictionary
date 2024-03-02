import { ReactNode } from "react";

export default function Table({ children }: { children: ReactNode }) {
  return (<div className="customTable">{children}</div>)
}