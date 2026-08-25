'use client';

import { Briefcase, ChatCircleDots, Gauge, LockSimple } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import type { PageSection, ServiceItem } from './page-content';
import styles from './site-canvas.module.css';

const SERVICE_ICONS = [Briefcase, Gauge, ChatCircleDots];

interface SiteCanvasProps {
  sections: PageSection[];
  services: ServiceItem[];
  /** Section whose text fields should render as live inline inputs. */
  editingSectionId?: string | null;
  onFieldChange?: (sectionId: string, changes: Partial<PageSection>) => void;
  onServiceChange?: (serviceId: string, changes: Partial<ServiceItem>) => void;
  /** Wraps each rendered section so a variant can attach its own selection chrome. */
  renderShell: (section: PageSection, index: number, content: ReactNode) => ReactNode;
  /** Lets a variant measure/position UI relative to a section's live DOM node. */
  sectionRef?: (sectionId: string, node: HTMLDivElement | null) => void;
  /** Optional gap renderer, called once before each section and once after the last (index = insert position). */
  renderBetween?: (index: number) => ReactNode;
}

export function SiteCanvas({
  sections,
  services,
  editingSectionId,
  onFieldChange,
  onServiceChange,
  renderShell,
  sectionRef,
  renderBetween,
}: SiteCanvasProps) {
  return (
    <div className={styles.site}>
      <div className={styles.navLockWrap} title="Navigation isn’t part of this page editor yet">
        <header className={styles.siteNav}>
          <span className={styles.siteLogo}>Acme Co.</span>
          <nav aria-label="Example site navigation">
            <span>Services</span>
            <span>About</span>
            <span>Work</span>
            <span>Contact</span>
          </nav>
          <span className={styles.navCta}>Get in touch</span>
        </header>
        <div className={styles.navLockBadge}>
          <LockSimple aria-hidden="true" size={12} weight="bold" />
          Navigation is managed separately
        </div>
      </div>

      {sections.map((section, index) => {
        const editing = editingSectionId === section.id;

        return (
          <div key={section.id}>
            {renderBetween ? renderBetween(index) : null}
            <div ref={sectionRef ? (node) => sectionRef(section.id, node) : undefined}>
              {renderShell(
                section,
                index,
                <SectionBody
                  section={section}
                  services={services}
                  editing={editing}
                  onFieldChange={onFieldChange}
                  onServiceChange={onServiceChange}
                />,
              )}
            </div>
          </div>
        );
      })}
      {renderBetween ? renderBetween(sections.length) : null}
    </div>
  );
}

interface SectionBodyProps {
  section: PageSection;
  services: ServiceItem[];
  editing: boolean;
  onFieldChange?: (sectionId: string, changes: Partial<PageSection>) => void;
  onServiceChange?: (serviceId: string, changes: Partial<ServiceItem>) => void;
}

function SectionBody({ section, services, editing, onFieldChange, onServiceChange }: SectionBodyProps) {
  const heading = editing ? (
    <EditableText
      as="input"
      value={section.heading}
      onChange={(value) => onFieldChange?.(section.id, { heading: value })}
      label={`${section.label} heading`}
      className={styles.editableHeading}
    />
  ) : (
    section.heading
  );

  const body = editing ? (
    <EditableText
      as="textarea"
      value={section.body}
      onChange={(value) => onFieldChange?.(section.id, { body: value })}
      label={`${section.label} text`}
      className={styles.editableBody}
    />
  ) : (
    section.body
  );

  switch (section.kind) {
    case 'hero':
      return (
        <div className={styles.hero} data-treatment={section.design.colorTreatment}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Built around your goals</span>
            <h1 className={styles.heroHeading}>{heading}</h1>
            <p className={styles.heroBody}>{body}</p>
            <span className={styles.ctaButton}>{section.cta ?? 'Get in touch'}</span>
          </div>
          <div className={styles.heroImage} aria-hidden="true" />
        </div>
      );

    case 'services':
      return (
        <div
          className={styles.services}
          data-treatment={section.design.colorTreatment}
          data-layout={section.design.layout ?? 'simple'}
        >
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>What we do</span>
            <h2 className={styles.sectionHeading}>{heading}</h2>
            <p className={styles.sectionBody}>{body}</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => {
              const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
              return (
                <div className={styles.serviceCard} key={service.id}>
                  <span className={styles.serviceIcon}>
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  {editing ? (
                    <>
                      <EditableText
                        as="input"
                        value={service.title}
                        onChange={(value) => onServiceChange?.(service.id, { title: value })}
                        label={`${service.title} title`}
                        className={styles.editableCardTitle}
                      />
                      <EditableText
                        as="textarea"
                        value={service.description}
                        onChange={(value) => onServiceChange?.(service.id, { description: value })}
                        label={`${service.title} description`}
                        className={styles.editableCardBody}
                      />
                    </>
                  ) : (
                    <>
                      <strong>{service.title}</strong>
                      <p>{service.description}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className={styles.testimonials} data-treatment={section.design.colorTreatment}>
          <h2 className={styles.sectionHeading}>{heading}</h2>
          <span className={styles.quoteMark} aria-hidden="true">
            “”
          </span>
          <p className={styles.quoteBody}>{body}</p>
          <div className={styles.testimonialPerson}>
            <span className={styles.avatar} aria-hidden="true" />
            <div>
              <strong>Sarah M.</strong>
              <span>Boutique owner</span>
            </div>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className={styles.contact} data-treatment={section.design.colorTreatment}>
          <div>
            <h2 className={styles.sectionHeading}>{heading}</h2>
            <p className={styles.sectionBody}>{body}</p>
          </div>
          <span className={styles.ctaButton}>{section.cta ?? 'Get in touch'}</span>
        </div>
      );

    default:
      return (
        <div className={styles.placeholderSection} data-treatment={section.design.colorTreatment}>
          <h2 className={styles.sectionHeading}>{heading}</h2>
          <p className={styles.sectionBody}>{body}</p>
          <p className={styles.placeholderNote}>
            New sections start with placeholder content until you fill them in.
          </p>
        </div>
      );
  }
}

interface EditableTextProps {
  as: 'input' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  label: string;
  className: string;
}

function EditableText({ as, value, onChange, label, className }: EditableTextProps) {
  if (as === 'textarea') {
    return (
      <textarea
        className={`${styles.editableField} ${className}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        rows={3}
      />
    );
  }

  return (
    <input
      className={`${styles.editableField} ${className}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
      type="text"
    />
  );
}
