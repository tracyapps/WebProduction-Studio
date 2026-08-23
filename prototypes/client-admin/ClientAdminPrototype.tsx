'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Briefcase,
  CaretDown,
  ChatCircleDots,
  Check,
  Copy,
  DotsSixVertical,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  FloppyDisk,
  Gauge,
  ImageSquare,
  Moon,
  Palette,
  PencilSimple,
  Plus,
  Quotes,
  Rows,
  Sun,
  Trash,
  X,
} from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './client-admin.module.css';

type EditorSide = 'content' | 'design';
type Theme = 'dark' | 'light';
type SaveState = 'saved' | 'unsaved' | 'saving';
type LayoutChoice = 'simple' | 'editorial' | 'image-led';
type ColorChoice = 'light' | 'brand' | 'dark';
type EmphasisChoice = 'subtle' | 'balanced' | 'bold';

type SectionKind =
  | 'hero'
  | 'services'
  | 'testimonials'
  | 'contact'
  | 'faq'
  | 'text-image';

interface PageSection {
  id: string;
  kind: SectionKind;
  label: string;
  heading: string;
  introduction: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const INITIAL_SECTIONS: PageSection[] = [
  {
    id: 'hero',
    kind: 'hero',
    label: 'Hero',
    heading: 'Build with confidence.',
    introduction: 'Thoughtful websites for ambitious small businesses.',
  },
  {
    id: 'services',
    kind: 'services',
    label: 'Services',
    heading: 'Services that move your business forward.',
    introduction:
      'Everything we do is designed to help you attract more customers and keep them coming back.',
  },
  {
    id: 'testimonials',
    kind: 'testimonials',
    label: 'Testimonials',
    heading: 'Trusted by business owners like you.',
    introduction: 'Kind words from people we have helped grow.',
  },
  {
    id: 'contact',
    kind: 'contact',
    label: 'Contact',
    heading: 'Let’s start a conversation.',
    introduction: 'Have a question or a project in mind? We would love to hear about it.',
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    description: 'Custom, modern websites that look great and convert visitors into customers.',
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Faster sites, better SEO, and a smooth experience across every device.',
  },
  {
    id: 'support',
    title: 'Ongoing Support',
    description: 'Updates, backups, and reliable support whenever you need it.',
  },
];

const ADDABLE_SECTIONS: Array<{
  kind: SectionKind;
  label: string;
  description: string;
}> = [
  { kind: 'faq', label: 'Frequently asked questions', description: 'Answer common questions clearly.' },
  { kind: 'text-image', label: 'Text and image', description: 'Tell a focused story with supporting media.' },
  { kind: 'testimonials', label: 'Testimonials', description: 'Share customer proof and outcomes.' },
  { kind: 'contact', label: 'Call to action', description: 'Help visitors take the next step.' },
];

const SERVICE_ICONS = [Briefcase, Gauge, ChatCircleDots];

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export function ClientAdminPrototype() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [activeSectionId, setActiveSectionId] = useState<string | null>('services');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [editorSide, setEditorSide] = useState<EditorSide>('design');
  const [theme, setTheme] = useState<Theme>('dark');
  const [previewVisible, setPreviewVisible] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [layout, setLayout] = useState<LayoutChoice>('simple');
  const [colorTreatment, setColorTreatment] = useState<ColorChoice>('light');
  const [imageEmphasis, setImageEmphasis] = useState<EmphasisChoice>('balanced');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const sectionSequence = useRef(0);
  const serviceSequence = useRef(0);

  const activeSection = sections.find((section) => section.id === activeSectionId) ?? null;

  const activeSectionIndex = activeSection
    ? sections.findIndex((section) => section.id === activeSection.id)
    : -1;

  const markChanged = useCallback(() => setSaveState('unsaved'), []);

  useEffect(() => {
    if (saveState === 'unsaved') {
      const timer = window.setTimeout(() => setSaveState('saving'), 700);
      return () => window.clearTimeout(timer);
    }

    if (saveState === 'saving') {
      const timer = window.setTimeout(() => setSaveState('saved'), 500);
      return () => window.clearTimeout(timer);
    }
  }, [saveState]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!addDialogOpen) return;
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAddDialogOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [addDialogOpen]);

  useEffect(() => {
    if (!moreMenuOpen) return;

    const closeMenu = (event: MouseEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) setMoreMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreMenuOpen(false);
    };

    window.addEventListener('mousedown', closeMenu);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('mousedown', closeMenu);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [moreMenuOpen]);

  const updateSection = (changes: Partial<PageSection>) => {
    if (!activeSection) return;
    setSections((current) =>
      current.map((section) =>
        section.id === activeSection.id ? { ...section, ...changes } : section,
      ),
    );
    markChanged();
  };

  const updateService = (id: string, changes: Partial<ServiceItem>) => {
    setServices((current) =>
      current.map((service) => (service.id === id ? { ...service, ...changes } : service)),
    );
    markChanged();
  };

  const reorderSection = (id: string, direction: -1 | 1) => {
    setSections((current) => {
      const fromIndex = current.findIndex((section) => section.id === id);
      const toIndex = fromIndex + direction;
      if (fromIndex < 0 || toIndex < 0 || toIndex >= current.length) return current;
      return moveItem(current, fromIndex, toIndex);
    });
    markChanged();
  };

  const reorderService = (id: string, direction: -1 | 1) => {
    setServices((current) => {
      const fromIndex = current.findIndex((service) => service.id === id);
      const toIndex = fromIndex + direction;
      if (fromIndex < 0 || toIndex < 0 || toIndex >= current.length) return current;
      return moveItem(current, fromIndex, toIndex);
    });
    markChanged();
  };

  const dropSection = (targetId: string) => {
    if (!draggedSectionId || draggedSectionId === targetId) return;
    setSections((current) => {
      const fromIndex = current.findIndex((section) => section.id === draggedSectionId);
      const toIndex = current.findIndex((section) => section.id === targetId);
      if (fromIndex < 0 || toIndex < 0) return current;
      return moveItem(current, fromIndex, toIndex);
    });
    setDraggedSectionId(null);
    markChanged();
  };

  const addSection = (kind: SectionKind, label: string) => {
    sectionSequence.current += 1;
    const id = `${kind}-new-${sectionSequence.current}`;
    const newSection: PageSection = {
      id,
      kind,
      label,
      heading: label,
      introduction: 'Add the information your visitors need here.',
    };
    setSections((current) => {
      const activeIndex = activeSection
        ? current.findIndex((section) => section.id === activeSection.id)
        : current.length - 1;
      const next = [...current];
      next.splice(activeIndex + 1, 0, newSection);
      return next;
    });
    setActiveSectionId(id);
    setEditorSide('content');
    setAddDialogOpen(false);
    markChanged();
    setToast(`${label} added to the page`);
  };

  const duplicateActiveSection = () => {
    if (!activeSection) return;
    sectionSequence.current += 1;
    const duplicate: PageSection = {
      ...activeSection,
      id: `${activeSection.kind}-copy-${sectionSequence.current}`,
      label: `${activeSection.label} copy`,
    };
    setSections((current) => {
      const index = current.findIndex((section) => section.id === activeSection.id);
      const next = [...current];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
    setActiveSectionId(duplicate.id);
    setMoreMenuOpen(false);
    markChanged();
    setToast(`${activeSection.label} duplicated`);
  };

  const deleteActiveSection = () => {
    if (!activeSection) return;
    setSections((current) => current.filter((section) => section.id !== activeSection.id));
    setActiveSectionId(null);
    setMoreMenuOpen(false);
    markChanged();
    setToast(`${activeSection.label} removed`);
  };

  const moveActiveSectionTo = (toIndex: number) => {
    if (!activeSection || activeSectionIndex < 0 || activeSectionIndex === toIndex) return;
    setSections((current) => moveItem(current, activeSectionIndex, toIndex));
    setMoreMenuOpen(false);
    markChanged();
    setToast(`${activeSection.label} moved to position ${toIndex + 1}`);
  };

  const saveNow = () => {
    setSaveState('saving');
    setToast('Draft saved');
  };

  const publish = () => {
    setSaveState('saved');
    setToast('Your changes are now published');
  };

  const applyChanges = () => {
    markChanged();
    setToast(editorSide === 'content' ? 'Content applied to the draft' : 'Design applied to the draft');
  };

  return (
    <main
      className={`${styles.prototype} ${previewVisible ? '' : styles.previewHidden}`}
      data-theme={theme}
    >
      <header className={styles.taskbar}>
        <Link className={styles.backLink} href="/prototypes">
          <ArrowLeft aria-hidden="true" size={18} />
          <span>Back to prototypes</span>
        </Link>
        <div className={styles.pageTitle}>Home page</div>
        <div className={styles.taskActions}>
          <button className={styles.secondaryButton} type="button" onClick={saveNow}>
            <FloppyDisk aria-hidden="true" size={17} />
            Save
          </button>
          <div className={styles.saveStatus} aria-live="polite">
            <span className={styles.statusCheck}><Check aria-hidden="true" size={12} weight="bold" /></span>
            {saveState === 'saved'
              ? 'Autosaved just now'
              : saveState === 'saving'
                ? 'Saving draft…'
                : 'Changes not saved yet'}
          </div>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => setPreviewVisible((visible) => !visible)}
            aria-pressed={!previewVisible}
          >
            {previewVisible ? <EyeSlash aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
            {previewVisible ? 'Hide preview' : 'Show preview'}
          </button>
          <button className={styles.publishButton} type="button" onClick={publish}>Publish</button>
          <button
            className={styles.themeToggle}
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Sun aria-hidden="true" size={17} />
            <span className={styles.themeTrack}><span /></span>
            <Moon aria-hidden="true" size={17} />
          </button>
        </div>
      </header>

      <aside className={styles.pageMap} aria-label="Page map">
        <div className={styles.pageMapHeading}>
          <div>
            <h2>Page map</h2>
            <p>Drag to reorder</p>
          </div>
          <button
            type="button"
            className={styles.viewPageButton}
            onClick={() => {
              setActiveSectionId(null);
              setMoreMenuOpen(false);
            }}
            aria-pressed={activeSectionId === null}
          >
            View whole page
          </button>
        </div>
        <ol className={styles.sectionOutline}>
          {sections.map((section, index) => (
            <li
              key={section.id}
              className={section.id === activeSectionId ? styles.activeOutlineItem : ''}
              draggable
              onDragStart={() => setDraggedSectionId(section.id)}
              onDragEnd={() => setDraggedSectionId(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => dropSection(section.id)}
            >
              <button
                className={styles.outlineSelect}
                type="button"
                onClick={() => {
                  setActiveSectionId((current) => (current === section.id ? null : section.id));
                  setMoreMenuOpen(false);
                }}
                aria-current={section.id === activeSectionId ? 'true' : undefined}
              >
                <span className={styles.outlineNode} aria-hidden="true" />
                <DotsSixVertical className={styles.dragIcon} aria-hidden="true" size={18} weight="bold" />
                <span>{section.label}</span>
              </button>
              <span className={styles.reorderActions}>
                <button
                  type="button"
                  onClick={() => reorderSection(section.id, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${section.label} up`}
                >
                  <ArrowUp aria-hidden="true" size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => reorderSection(section.id, 1)}
                  disabled={index === sections.length - 1}
                  aria-label={`Move ${section.label} down`}
                >
                  <ArrowDown aria-hidden="true" size={14} />
                </button>
              </span>
            </li>
          ))}
        </ol>
        <button className={styles.addSectionButton} type="button" onClick={() => setAddDialogOpen(true)}>
          <Plus aria-hidden="true" size={18} />
          Add section
        </button>
      </aside>

      <section className={styles.editWorkspace} aria-label="Section editor">
        {activeSection ? (
          <section
            className={styles.editorCard}
            data-side={editorSide}
            aria-label={`${activeSection.label} ${editorSide} editor`}
          >
            <header className={styles.editorCardHeader}>
              <div className={styles.sectionIdentity}>
                <span>Editing section</span>
                <h1 id="editor-title">{activeSection.label}</h1>
              </div>

              <div className={styles.editorHeaderActions}>
                <div className={styles.sideSwitch} role="group" aria-label="Choose what to edit">
                  <button
                    type="button"
                    className={editorSide === 'content' ? styles.activeSwitch : ''}
                    onClick={() => setEditorSide('content')}
                    aria-pressed={editorSide === 'content'}
                  >
                    Content
                  </button>
                  <button
                    type="button"
                    className={editorSide === 'design' ? styles.activeSwitch : ''}
                    onClick={() => setEditorSide('design')}
                    aria-pressed={editorSide === 'design'}
                  >
                    Design
                  </button>
                </div>

                <div className={styles.moreMenu} ref={moreMenuRef}>
                  <button
                    type="button"
                    className={styles.moreMenuButton}
                    onClick={() => setMoreMenuOpen((open) => !open)}
                    aria-expanded={moreMenuOpen}
                    aria-haspopup="menu"
                    aria-label={`More actions for ${activeSection.label}`}
                  >
                    <DotsThreeVertical aria-hidden="true" size={20} weight="bold" />
                  </button>
                  {moreMenuOpen ? (
                    <div className={styles.moreMenuPopover} role="menu">
                      <button type="button" role="menuitem" onClick={duplicateActiveSection}>
                        <Copy aria-hidden="true" size={17} />
                        Duplicate section
                      </button>
                      <label>
                        <span>Move to position</span>
                        <select
                          value={activeSectionIndex}
                          onChange={(event) => moveActiveSectionTo(Number(event.target.value))}
                        >
                          {sections.map((section, index) => (
                            <option key={section.id} value={index}>
                              {index + 1} · {section.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        role="menuitem"
                        className={styles.deleteMenuItem}
                        onClick={deleteActiveSection}
                      >
                        <Trash aria-hidden="true" size={17} />
                        Delete section
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </header>

            {editorSide === 'content' ? (
              <ContentEditor
                section={activeSection}
                services={services}
                expandedServiceId={expandedServiceId}
                onSectionChange={updateSection}
                onServiceChange={updateService}
                onToggleService={(id) => setExpandedServiceId((current) => (current === id ? null : id))}
                onReorderService={reorderService}
                onAddService={() => {
                  serviceSequence.current += 1;
                  const id = `service-new-${serviceSequence.current}`;
                  setServices((current) => [
                    ...current,
                    { id, title: 'New service', description: 'Describe this service for your visitors.' },
                  ]);
                  setExpandedServiceId(id);
                  markChanged();
                }}
                onRemoveService={(id) => {
                  setServices((current) => current.filter((service) => service.id !== id));
                  markChanged();
                }}
                onApply={applyChanges}
              />
            ) : (
              <DesignEditor
                layout={layout}
                colorTreatment={colorTreatment}
                imageEmphasis={imageEmphasis}
                onLayoutChange={(value) => { setLayout(value); markChanged(); }}
                onColorChange={(value) => { setColorTreatment(value); markChanged(); }}
                onEmphasisChange={(value) => { setImageEmphasis(value); markChanged(); }}
                onApply={applyChanges}
              />
            )}
          </section>
        ) : (
          <div className={styles.wholePageState}>
            <span>Whole-page preview</span>
            <h1>No section selected</h1>
            <p>The preview is showing the complete page without dimming or edit outlines. Choose a section from the page map when you’re ready to focus.</p>
          </div>
        )}
      </section>

      {previewVisible ? (
        <SitePreview
          sections={sections}
          activeSectionId={activeSectionId}
          services={services}
          layout={layout}
          colorTreatment={colorTreatment}
          imageEmphasis={imageEmphasis}
        />
      ) : null}

      {addDialogOpen ? (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={() => setAddDialogOpen(false)}>
          <div
            className={styles.addDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-section-title"
            tabIndex={-1}
            ref={dialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeading}>
              <div>
                <h2 id="add-section-title">Add a section</h2>
                <p>Choose what this part of the page needs to do.</p>
              </div>
              <button type="button" onClick={() => setAddDialogOpen(false)} aria-label="Close">
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <div className={styles.sectionChoices}>
              {ADDABLE_SECTIONS.map((choice) => (
                <button key={choice.kind} type="button" onClick={() => addSection(choice.kind, choice.label)}>
                  <span>{choice.label}</span>
                  <small>{choice.description}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <div className={styles.toast} role="status"><Check aria-hidden="true" size={16} weight="bold" />{toast}</div> : null}
    </main>
  );
}

interface ContentEditorProps {
  section: PageSection;
  services: ServiceItem[];
  expandedServiceId: string | null;
  onSectionChange: (changes: Partial<PageSection>) => void;
  onServiceChange: (id: string, changes: Partial<ServiceItem>) => void;
  onToggleService: (id: string) => void;
  onReorderService: (id: string, direction: -1 | 1) => void;
  onAddService: () => void;
  onRemoveService: (id: string) => void;
  onApply: () => void;
}

function ContentEditor({
  section,
  services,
  expandedServiceId,
  onSectionChange,
  onServiceChange,
  onToggleService,
  onReorderService,
  onAddService,
  onRemoveService,
  onApply,
}: ContentEditorProps) {
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardIntroduction}>
        <span className={styles.cardIcon}><Rows aria-hidden="true" size={21} /></span>
        <div>
          <h2>Edit this section’s content</h2>
          <p>Focus on the information. Your approved design stays protected.</p>
        </div>
      </div>

      <label className={styles.field}>
        <span>Section heading</span>
        <input
          value={section.heading}
          onChange={(event) => onSectionChange({ heading: event.target.value })}
        />
        <small>{section.heading.length} / 80</small>
      </label>
      <label className={styles.field}>
        <span>Introduction</span>
        <textarea
          rows={3}
          value={section.introduction}
          onChange={(event) => onSectionChange({ introduction: event.target.value })}
        />
        <small>{section.introduction.length} / 180</small>
      </label>

      {section.kind === 'services' ? (
        <div className={styles.serviceEditor}>
          <div className={styles.groupLabel}>Service items</div>
          {services.map((service, index) => {
            const expanded = expandedServiceId === service.id;
            return (
              <article className={styles.serviceRow} key={service.id}>
                <div className={styles.serviceSummary}>
                  <DotsSixVertical aria-hidden="true" size={19} weight="bold" />
                  <span className={styles.serviceNumber}>{index + 1}</span>
                  <div><strong>{service.title}</strong><p>{service.description}</p></div>
                  <span className={styles.serviceActions}>
                    <button type="button" onClick={() => onReorderService(service.id, -1)} disabled={index === 0} aria-label={`Move ${service.title} up`}><ArrowUp aria-hidden="true" size={15} /></button>
                    <button type="button" onClick={() => onReorderService(service.id, 1)} disabled={index === services.length - 1} aria-label={`Move ${service.title} down`}><ArrowDown aria-hidden="true" size={15} /></button>
                    <button type="button" onClick={() => onToggleService(service.id)} aria-expanded={expanded} aria-label={`Edit ${service.title}`}><PencilSimple aria-hidden="true" size={17} /></button>
                    <button type="button" onClick={() => onToggleService(service.id)} aria-label={expanded ? 'Collapse service' : 'Expand service'}><CaretDown className={expanded ? styles.rotatedCaret : ''} aria-hidden="true" size={17} /></button>
                  </span>
                </div>
                {expanded ? (
                  <div className={styles.serviceFields}>
                    <label><span>Service name</span><input value={service.title} onChange={(event) => onServiceChange(service.id, { title: event.target.value })} /></label>
                    <label><span>Description</span><textarea rows={3} value={service.description} onChange={(event) => onServiceChange(service.id, { description: event.target.value })} /></label>
                    <button className={styles.removeButton} type="button" onClick={() => onRemoveService(service.id)}><Trash aria-hidden="true" size={16} />Remove service</button>
                  </div>
                ) : null}
              </article>
            );
          })}
          <button className={styles.inlineAddButton} type="button" onClick={onAddService}><Plus aria-hidden="true" size={16} />Add service</button>
        </div>
      ) : null}

      <CardFooter actionLabel="Apply content" onApply={onApply} />
    </div>
  );
}

interface DesignEditorProps {
  layout: LayoutChoice;
  colorTreatment: ColorChoice;
  imageEmphasis: EmphasisChoice;
  onLayoutChange: (value: LayoutChoice) => void;
  onColorChange: (value: ColorChoice) => void;
  onEmphasisChange: (value: EmphasisChoice) => void;
  onApply: () => void;
}

function DesignEditor({
  layout,
  colorTreatment,
  imageEmphasis,
  onLayoutChange,
  onColorChange,
  onEmphasisChange,
  onApply,
}: DesignEditorProps) {
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardIntroduction}>
        <span className={styles.cardIcon}><Palette aria-hidden="true" size={21} /></span>
        <div>
          <h2>Choose how this section looks</h2>
          <p>Your site’s design system keeps every option on-brand and accessible.</p>
        </div>
      </div>

      <div className={styles.layoutChoices} role="radiogroup" aria-label="Section appearance">
        <DesignThumbnail label="Simple" value="simple" selected={layout === 'simple'} onSelect={onLayoutChange} />
        <DesignThumbnail label="Editorial" value="editorial" selected={layout === 'editorial'} onSelect={onLayoutChange} />
        <DesignThumbnail label="Image-led" value="image-led" selected={layout === 'image-led'} onSelect={onLayoutChange} />
      </div>

      <ChoiceRow
        icon={<Palette aria-hidden="true" size={20} />}
        label="Color treatment"
        values={['light', 'brand', 'dark'] as const}
        selected={colorTreatment}
        onSelect={onColorChange}
      />
      <ChoiceRow
        icon={<ImageSquare aria-hidden="true" size={20} />}
        label="Image emphasis"
        values={['subtle', 'balanced', 'bold'] as const}
        selected={imageEmphasis}
        onSelect={onEmphasisChange}
      />

      <CardFooter actionLabel="Apply design" onApply={onApply} />
    </div>
  );
}

function DesignThumbnail({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: LayoutChoice;
  selected: boolean;
  onSelect: (value: LayoutChoice) => void;
}) {
  return (
    <button
      type="button"
      className={selected ? styles.selectedThumbnail : ''}
      onClick={() => onSelect(value)}
      role="radio"
      aria-checked={selected}
    >
      <span className={styles.thumbnailCanvas}>
        <Image
          src={`/prototypes/client-admin/layout-${value}.webp`}
          alt={`${label} Services section preview`}
          fill
          sizes="(max-width: 760px) 90vw, 220px"
        />
      </span>
      <span>{label}</span>
    </button>
  );
}

function ChoiceRow<T extends string>({
  icon,
  label,
  values,
  selected,
  onSelect,
}: {
  icon: ReactNode;
  label: string;
  values: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className={styles.choiceRow}>
      <div className={styles.choiceLabel}>{icon}<span>{label}</span></div>
      <div role="radiogroup" aria-label={label}>
        {values.map((value) => (
          <button
            key={value}
            type="button"
            className={selected === value ? styles.selectedChoice : ''}
            onClick={() => onSelect(value)}
            role="radio"
            aria-checked={selected === value}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function CardFooter({ actionLabel, onApply }: { actionLabel: string; onApply: () => void }) {
  return (
    <footer className={styles.cardFooter}>
      <div>
        <button className={styles.cancelButton} type="button">Cancel</button>
        <button className={styles.applyButton} type="button" onClick={onApply}>{actionLabel}</button>
      </div>
      <p>Preview updates as you choose. Changes are saved as a draft.</p>
    </footer>
  );
}

interface SitePreviewProps {
  sections: PageSection[];
  activeSectionId: string | null;
  services: ServiceItem[];
  layout: LayoutChoice;
  colorTreatment: ColorChoice;
  imageEmphasis: EmphasisChoice;
}

function SitePreview({
  sections,
  activeSectionId,
  services,
  layout,
  colorTreatment,
  imageEmphasis,
}: SitePreviewProps) {
  return (
    <aside className={styles.previewPane} aria-label="Site preview">
      <h2>Site preview</h2>
      <div className={styles.siteFrame}>
        <div className={styles.siteHeader}>
          <strong>Acme Co.</strong>
          <nav aria-label="Preview website navigation"><span>Services</span><span>About</span><span>Work</span><span>Contact</span></nav>
          <button type="button">Get in touch</button>
        </div>
        <div className={styles.sitePage} data-has-selection={activeSectionId !== null}>
          {sections.map((section) => {
            const active = section.id === activeSectionId;
            return (
              <section
                key={section.id}
                className={`${styles.previewSection} ${active ? styles.activePreviewSection : ''}`}
                data-kind={section.kind}
              >
                {active ? <span className={styles.previewingLabel}>Previewing: {section.label}</span> : null}
                <PreviewSectionContent
                  section={section}
                  services={services}
                  layout={layout}
                  colorTreatment={colorTreatment}
                  imageEmphasis={imageEmphasis}
                />
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function PreviewSectionContent({
  section,
  services,
  layout,
  colorTreatment,
  imageEmphasis,
}: {
  section: PageSection;
  services: ServiceItem[];
  layout: LayoutChoice;
  colorTreatment: ColorChoice;
  imageEmphasis: EmphasisChoice;
}) {
  if (section.kind === 'hero') {
    return (
      <div className={styles.previewHero}>
        <Image src="/prototypes/client-admin/architecture-hero.webp" alt="Modern stone and glass studio" fill sizes="(max-width: 1000px) 100vw, 34vw" priority />
        <div><span>Built around your goals</span><h3>{section.heading}</h3><p>{section.introduction}</p><button type="button">Get in touch</button></div>
      </div>
    );
  }

  if (section.kind === 'services') {
    return (
      <div className={styles.previewServices} data-layout={layout} data-color={colorTreatment} data-emphasis={imageEmphasis}>
        <div className={styles.previewSectionHeading}><span>What we do</span><h3>{section.heading}</h3><p>{section.introduction}</p></div>
        <div className={styles.previewServiceGrid}>
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
            return <article key={service.id}><Icon aria-hidden="true" size={25} /><strong>{service.title}</strong><p>{service.description}</p></article>;
          })}
        </div>
      </div>
    );
  }

  if (section.kind === 'testimonials') {
    return (
      <div className={styles.previewTestimonial}>
        <h3>{section.heading}</h3>
        <Quotes aria-hidden="true" size={28} weight="fill" />
        <p>“Our new site finally feels easy to keep current—and it still looks like us.”</p>
        <div><Image src="/prototypes/client-admin/testimonial-avatar.webp" alt="Sarah M." width={44} height={44} /><span><strong>Sarah M.</strong><small>Boutique owner</small></span></div>
      </div>
    );
  }

  if (section.kind === 'contact') {
    return <div className={styles.previewContact}><div><h3>{section.heading}</h3><p>{section.introduction}</p></div><button type="button">Get in touch</button></div>;
  }

  return <div className={styles.previewGeneric}><h3>{section.heading}</h3><p>{section.introduction}</p></div>;
}
