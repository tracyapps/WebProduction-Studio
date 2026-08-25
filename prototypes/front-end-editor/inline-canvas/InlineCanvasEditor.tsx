'use client';

import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Copy,
  Eye,
  ListBullets,
  PencilSimple,
  Palette,
  Plus,
  Trash,
  X,
} from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ADDABLE_SECTIONS,
  COLOR_LABELS,
  type ColorChoice,
  INITIAL_SECTIONS,
  INITIAL_SERVICES,
  LAYOUT_LABELS,
  type LayoutChoice,
  type PageSection,
  type SaveState,
  type SectionKind,
  type ServiceItem,
  moveItem,
  nextId,
} from '../page-content';
import { SiteCanvas } from '../SiteCanvas';
import styles from './inline-canvas.module.css';

type ActivePanel = 'content' | 'design' | null;

interface RemovedSection {
  section: PageSection;
  index: number;
}

export function InlineCanvasEditor() {
  const [editMode, setEditMode] = useState(true);
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [toast, setToast] = useState<{ message: string; actionLabel?: string; onAction?: () => void } | null>(
    null,
  );

  const sectionElRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastRemoved = useRef<RemovedSection | null>(null);
  const insertDialogRef = useRef<HTMLDivElement>(null);

  const markChanged = useCallback(() => setSaveState('unsaved'), []);

  useEffect(() => {
    if (saveState === 'unsaved') {
      const timer = window.setTimeout(() => setSaveState('saving'), 650);
      return () => window.clearTimeout(timer);
    }
    if (saveState === 'saving') {
      const timer = window.setTimeout(() => setSaveState('saved'), 500);
      return () => window.clearTimeout(timer);
    }
  }, [saveState]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (insertIndex === null) return;
    insertDialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setInsertIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [insertIndex]);

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
        setActivePanel(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedId]);

  const selectSection = (id: string) => {
    setSelectedId((current) => {
      if (current === id) {
        setActivePanel(null);
        return null;
      }
      setActivePanel(null);
      return id;
    });
  };

  const toggleContentEdit = (id: string) => {
    setSelectedId(id);
    setActivePanel((current) => (current === 'content' ? null : 'content'));
  };

  const toggleDesign = (id: string) => {
    setSelectedId(id);
    setActivePanel((current) => (current === 'design' ? null : 'design'));
  };

  const updateSectionField = (id: string, changes: Partial<PageSection>) => {
    setSections((current) => current.map((section) => (section.id === id ? { ...section, ...changes } : section)));
    markChanged();
  };

  const updateSectionDesign = (id: string, changes: Partial<PageSection['design']>) => {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, design: { ...section.design, ...changes } } : section,
      ),
    );
    markChanged();
  };

  const updateServiceField = (id: string, changes: Partial<ServiceItem>) => {
    setServices((current) => current.map((service) => (service.id === id ? { ...service, ...changes } : service)));
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

  const duplicateSection = (id: string) => {
    setSections((current) => {
      const index = current.findIndex((section) => section.id === id);
      if (index < 0) return current;
      const source = current[index];
      const copy: PageSection = { ...source, id: nextId(`${source.kind}-copy`), label: `${source.label} copy` };
      const next = [...current];
      next.splice(index + 1, 0, copy);
      setSelectedId(copy.id);
      setActivePanel(null);
      return next;
    });
    markChanged();
    setToast({ message: 'Section duplicated' });
  };

  const removeSection = (id: string) => {
    setSections((current) => {
      const index = current.findIndex((section) => section.id === id);
      if (index < 0) return current;
      lastRemoved.current = { section: current[index], index };
      return current.filter((section) => section.id !== id);
    });
    setSelectedId((current) => (current === id ? null : current));
    setActivePanel(null);
    markChanged();
    setToast({
      message: 'Section removed',
      actionLabel: 'Undo',
      onAction: () => {
        const removed = lastRemoved.current;
        if (!removed) return;
        setSections((current) => {
          const next = [...current];
          next.splice(removed.index, 0, removed.section);
          return next;
        });
        setToast(null);
      },
    });
  };

  const insertSection = (kind: SectionKind, label: string) => {
    if (insertIndex === null) return;
    const created: PageSection = {
      id: nextId(kind),
      kind,
      label,
      heading: label,
      body: 'Add the information your visitors need here.',
      design: { colorTreatment: 'light' },
    };
    setSections((current) => {
      const next = [...current];
      next.splice(insertIndex, 0, created);
      return next;
    });
    setSelectedId(created.id);
    setActivePanel('content');
    setInsertIndex(null);
    markChanged();
    setToast({ message: `${label} added to the page` });
  };

  const publish = () => {
    setSaveState('saved');
    setToast({ message: 'Your changes are now published' });
  };

  const jumpToSection = (id: string) => {
    selectSectionOnly(id);
    sectionElRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const selectSectionOnly = (id: string) => {
    setSelectedId(id);
    setActivePanel(null);
  };

  return (
    <main className={styles.app} data-editing={editMode} aria-label="Front-end page editor — inline canvas">
      <h1 className={styles.visuallyHidden}>Front-end page editor — inline canvas variant</h1>

      <header className={styles.topbar}>
        <Link className={styles.backLink} href="/prototypes">
          <ArrowLeft aria-hidden="true" size={17} />
          <span>Back to prototypes</span>
        </Link>

        <div className={styles.pageTitle}>Home page</div>

        <div className={styles.topbarActions}>
          <div className={styles.modeSwitch} role="group" aria-label="Edit mode">
            <button
              type="button"
              className={editMode ? styles.modeActive : ''}
              aria-pressed={editMode}
              onClick={() => setEditMode(true)}
            >
              <PencilSimple aria-hidden="true" size={15} />
              <span>Editing</span>
            </button>
            <button
              type="button"
              className={!editMode ? styles.modeActive : ''}
              aria-pressed={!editMode}
              onClick={() => {
                setEditMode(false);
                setSelectedId(null);
                setActivePanel(null);
                setOutlineOpen(false);
              }}
            >
              <Eye aria-hidden="true" size={15} />
              <span>Previewing</span>
            </button>
          </div>

          {editMode ? (
            <button
              type="button"
              className={styles.outlineButton}
              onClick={() => setOutlineOpen((open) => !open)}
              aria-expanded={outlineOpen}
              aria-controls="inline-outline-panel"
            >
              <ListBullets aria-hidden="true" size={17} />
              <span>Outline</span>
            </button>
          ) : null}

          <div className={styles.saveStatus} aria-live="polite">
            <span className={styles.statusDot} data-state={saveState} />
            {saveState === 'saved' ? 'Autosaved just now' : saveState === 'saving' ? 'Saving draft…' : 'Changes not saved yet'}
          </div>

          <button className={styles.publishButton} type="button" onClick={publish}>
            Publish
          </button>
        </div>
      </header>

      <div className={styles.canvasArea}>
        <div
          className={styles.canvasFrame}
          onClick={() => {
            if (!editMode) return;
            setSelectedId(null);
            setActivePanel(null);
          }}
        >
          <SiteCanvas
            sections={sections}
            services={services}
            editingSectionId={editMode && activePanel === 'content' ? selectedId : null}
            onFieldChange={updateSectionField}
            onServiceChange={updateServiceField}
            sectionRef={(id, node) => {
              sectionElRefs.current[id] = node;
            }}
            renderBetween={
              editMode
                ? (index) => (
                    <div className={styles.insertGap}>
                      <button
                        type="button"
                        className={styles.insertButton}
                        onClick={() => setInsertIndex(index)}
                        aria-label={`Add a section at position ${index + 1}`}
                      >
                        <Plus aria-hidden="true" size={13} weight="bold" />
                        Add section
                      </button>
                    </div>
                  )
                : undefined
            }
            renderShell={(section, index, content) => {
              const isSelected = editMode && selectedId === section.id;

              return (
                <div
                  className={`${styles.sectionShell} ${isSelected ? styles.sectionSelected : ''}`}
                  onClick={
                    editMode
                      ? (event) => {
                          event.stopPropagation();
                          selectSection(section.id);
                        }
                      : undefined
                  }
                  onKeyDown={
                    editMode
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            selectSection(section.id);
                          }
                        }
                      : undefined
                  }
                  role={editMode ? 'button' : undefined}
                  tabIndex={editMode ? 0 : undefined}
                  aria-pressed={editMode ? isSelected : undefined}
                  aria-label={editMode ? `${section.label} section` : undefined}
                >
                  {editMode ? <span className={styles.sectionChip}>{section.label}</span> : null}

                  {content}

                  {isSelected ? (
                    <div
                      className={styles.toolbar}
                      role="toolbar"
                      aria-label={`${section.label} actions`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        aria-pressed={activePanel === 'content'}
                        aria-label="Edit text"
                        onClick={() => toggleContentEdit(section.id)}
                      >
                        <PencilSimple aria-hidden="true" size={16} />
                      </button>
                      <button
                        type="button"
                        aria-pressed={activePanel === 'design'}
                        aria-label="Change design"
                        onClick={() => toggleDesign(section.id)}
                      >
                        <Palette aria-hidden="true" size={16} />
                      </button>
                      <span className={styles.toolbarDivider} aria-hidden="true" />
                      <button
                        type="button"
                        aria-label={`Move ${section.label} up`}
                        disabled={index === 0}
                        onClick={() => reorderSection(section.id, -1)}
                      >
                        <ArrowUp aria-hidden="true" size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${section.label} down`}
                        disabled={index === sections.length - 1}
                        onClick={() => reorderSection(section.id, 1)}
                      >
                        <ArrowDown aria-hidden="true" size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Duplicate ${section.label}`}
                        onClick={() => duplicateSection(section.id)}
                      >
                        <Copy aria-hidden="true" size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${section.label}`}
                        onClick={() => removeSection(section.id)}
                      >
                        <Trash aria-hidden="true" size={15} />
                      </button>
                    </div>
                  ) : null}

                  {isSelected && activePanel === 'design' ? (
                    <div
                      className={styles.designPopover}
                      role="dialog"
                      aria-label={`${section.label} design`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {section.kind === 'services' ? (
                        <fieldset className={styles.popoverGroup}>
                          <legend>Layout</legend>
                          <div className={styles.choiceRow}>
                            {(['simple', 'editorial', 'image-led'] as LayoutChoice[]).map((choice) => (
                              <button
                                key={choice}
                                type="button"
                                className={section.design.layout === choice ? styles.choiceActive : ''}
                                onClick={() => updateSectionDesign(section.id, { layout: choice })}
                              >
                                {LAYOUT_LABELS[choice]}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      ) : null}
                      <fieldset className={styles.popoverGroup}>
                        <legend>Background</legend>
                        <div className={styles.choiceRow}>
                          {(['light', 'brand', 'dark'] as ColorChoice[]).map((choice) => (
                            <button
                              key={choice}
                              type="button"
                              className={section.design.colorTreatment === choice ? styles.choiceActive : ''}
                              onClick={() => updateSectionDesign(section.id, { colorTreatment: choice })}
                            >
                              {COLOR_LABELS[choice]}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <p className={styles.popoverHint}>Choices apply to the page immediately.</p>
                      <div className={styles.popoverActions}>
                        <button type="button" onClick={() => setActivePanel(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }}
          />
        </div>
      </div>

      {outlineOpen && editMode ? (
        <div id="inline-outline-panel" className={styles.outlinePanel} aria-label="Page outline">
          <div className={styles.outlinePanelHeader}>
            <h2>Page outline</h2>
            <button type="button" onClick={() => setOutlineOpen(false)} aria-label="Close page outline">
              <X aria-hidden="true" size={18} />
            </button>
          </div>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id} className={selectedId === section.id ? styles.outlineActive : ''}>
                <button type="button" onClick={() => jumpToSection(section.id)}>
                  {section.label}
                </button>
                <span className={styles.outlineRowActions}>
                  <button
                    type="button"
                    disabled={index === 0}
                    aria-label={`Move ${section.label} up`}
                    onClick={() => reorderSection(section.id, -1)}
                  >
                    <ArrowUp aria-hidden="true" size={13} />
                  </button>
                  <button
                    type="button"
                    disabled={index === sections.length - 1}
                    aria-label={`Move ${section.label} down`}
                    onClick={() => reorderSection(section.id, 1)}
                  >
                    <ArrowDown aria-hidden="true" size={13} />
                  </button>
                </span>
              </li>
            ))}
          </ol>
          <button type="button" className={styles.outlineAddButton} onClick={() => setInsertIndex(sections.length)}>
            <Plus aria-hidden="true" size={16} />
            Add section
          </button>
        </div>
      ) : null}

      {insertIndex !== null ? (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={() => setInsertIndex(null)}>
          <div
            className={styles.insertDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="insert-dialog-title"
            tabIndex={-1}
            ref={insertDialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeading}>
              <div>
                <h2 id="insert-dialog-title">Add a section</h2>
                <p>Choose what this part of the page needs to do.</p>
              </div>
              <button type="button" onClick={() => setInsertIndex(null)} aria-label="Close">
                <X aria-hidden="true" size={19} />
              </button>
            </div>
            <div className={styles.sectionChoices}>
              {ADDABLE_SECTIONS.map((choice) => (
                <button key={choice.kind} type="button" onClick={() => insertSection(choice.kind, choice.label)}>
                  <span>{choice.label}</span>
                  <small>{choice.description}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className={styles.toast} role="status">
          <Check aria-hidden="true" size={15} weight="bold" />
          <span>{toast.message}</span>
          {toast.actionLabel ? (
            <button type="button" onClick={toast.onAction}>
              {toast.actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
