import React from 'react';

// Card Component
export const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="card margin-bottom--lg">
    {title && <div className="card__header"><h3>{title}</h3></div>}
    <div className="card__body">{children}</div>
  </div>
);

// Columns Component
export const Columns = ({ children, cols }: { children: React.ReactNode; cols?: number }) => (
  <div className="row">{children}</div>
);

export const Column = ({ children }: { children: React.ReactNode }) => (
  <div className="col">{children}</div>
);

// Admonition Components
export const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="admonition admonition-note alert alert--info">
    <div className="admonition-heading">
      <h5><span className="admonition-icon">ℹ️</span>Note</h5>
    </div>
    <div className="admonition-content">{children}</div>
  </div>
);

export const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="admonition admonition-tip alert alert--success">
    <div className="admonition-heading">
      <h5><span className="admonition-icon">💡</span>Tip</h5>
    </div>
    <div className="admonition-content">{children}</div>
  </div>
);

export const Info = ({ children }: { children: React.ReactNode }) => (
  <div className="admonition admonition-info alert alert--info">
    <div className="admonition-heading">
      <h5><span className="admonition-icon">ℹ️</span>Info</h5>
    </div>
    <div className="admonition-content">{children}</div>
  </div>
);

// Step Component
export const Step = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="margin-bottom--md padding--md" style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '4px' }}>
    {title && <h4 style={{ marginTop: 0 }}>{title}</h4>}
    {children}
  </div>
);

// Steps Component (container for Step components)
export const Steps = ({ children }: { children: React.ReactNode }) => (
  <div className="steps-container margin-bottom--lg">
    {children}
  </div>
);

// Accordion Component
export const Accordion = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <details className="details toggle" open={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <summary className="details__summary">
        <strong>{title}</strong>
      </summary>
      <div className="details__content">{children}</div>
    </details>
  );
};

// AccordionGroup and AccordionItem components (for Mintlify compatibility)
export const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="accordion-group">{children}</div>
);

export const AccordionItem = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <details className="details toggle margin-bottom--md" open={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <summary className="details__summary">
        <strong>{title}</strong>
      </summary>
      <div className="details__content margin-top--sm">{children}</div>
    </details>
  );
};

// Export all components
const MDXComponents = {
  Card,
  Columns,
  Column,
  Note,
  Tip,
  Info,
  Step,
  Steps,
  Accordion,
  AccordionGroup,
  AccordionItem,
};

export default MDXComponents;