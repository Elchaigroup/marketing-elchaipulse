"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionRootContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
};

type AccordionItemContextValue = {
  contentId: string;
  open: boolean;
  toggle: () => void;
  triggerId: string;
};

const AccordionRootContext = React.createContext<AccordionRootContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  collapsible?: boolean;
  defaultValue?: string;
  type: "single";
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ collapsible = false, defaultValue, type: _type, ...props }, ref) => {
    const [value, setCurrentValue] = React.useState<string | undefined>(defaultValue);

    const setValue = React.useCallback(
      (nextValue: string) => {
        setCurrentValue((currentValue) =>
          collapsible && currentValue === nextValue ? undefined : nextValue,
        );
      },
      [collapsible],
    );

    return (
      <AccordionRootContext.Provider value={{ value, setValue }}>
        <div ref={ref} {...props} />
      </AccordionRootContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const root = React.useContext(AccordionRootContext);
    const id = React.useId();

    if (!root) {
      throw new Error("AccordionItem must be used inside Accordion.");
    }

    const open = root.value === value;
    const triggerId = `accordion-trigger-${id}`;
    const contentId = `accordion-content-${id}`;

    return (
      <AccordionItemContext.Provider
        value={{ contentId, open, toggle: () => root.setValue(value), triggerId }}
      >
        <div
          ref={ref}
          className={cn("border-b", className)}
          data-state={open ? "open" : "closed"}
          {...props}
        />
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionTrigger must be used inside AccordionItem.");
  }

  return (
    <h3 className="flex">
      <button
        ref={ref}
        id={item.triggerId}
        type="button"
        aria-controls={item.contentId}
        aria-expanded={item.open}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        data-state={item.open ? "open" : "closed"}
        onClick={item.toggle}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
        />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionContent must be used inside AccordionItem.");
  }

  return (
    <div
      ref={ref}
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      aria-hidden={!item.open}
      className="accordion-content"
      data-state={item.open ? "open" : "closed"}
      {...props}
    >
      <div className="accordion-content-clip">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
