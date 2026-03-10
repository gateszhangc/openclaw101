import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutProps = {
  children: ReactNode;
  title?: string;
  tone?: "info" | "tip" | "warning";
};

type StepProps = {
  children: ReactNode;
  title: string;
  number?: string;
};

type CommandProps = {
  children: ReactNode;
  label?: string;
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

function GuideHeading({
  as: Tag,
  children,
  className,
  id,
  ...props
}: HeadingProps & {
  as: "h2" | "h3";
}) {
  return (
    <Tag id={id} className={className} {...props}>
      {children}
      {id ? (
        <a href={`#${id}`} className="heading-anchor" aria-label="Jump to section">
          #
        </a>
      ) : null}
    </Tag>
  );
}

export function Callout({ children, title, tone = "info" }: CalloutProps) {
  return (
    <aside
      data-testid="guide-callout"
      className={cn("guide-callout", `guide-callout-${tone}`)}
    >
      {title ? <p className="guide-callout-title">{title}</p> : null}
      <div className="guide-callout-body">{children}</div>
    </aside>
  );
}

export function Step({ children, title, number }: StepProps) {
  return (
    <section data-testid="guide-step" className="guide-step">
      <div className="guide-step-badge">{number || "Step"}</div>
      <div className="guide-step-body">
        <h3 className="guide-step-title">{title}</h3>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function Command({ children, label }: CommandProps) {
  const content = typeof children === "string" ? children.trim() : String(children).trim();

  return (
    <div data-testid="guide-command" className="guide-command">
      {label ? <p className="guide-command-label">{label}</p> : null}
      <pre className="guide-command-pre">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export const guideMdxComponents = {
  h2: (props: HeadingProps) => <GuideHeading as="h2" {...props} />,
  h3: (props: HeadingProps) => <GuideHeading as="h3" {...props} />,
  Callout,
  Step,
  Command,
};
