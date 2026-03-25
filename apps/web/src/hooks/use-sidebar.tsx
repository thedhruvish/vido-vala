import * as React from "react";

const SidebarContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: true,
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggle = () => setIsOpen((prev) => !prev);

  return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => React.useContext(SidebarContext);
