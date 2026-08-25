'use client';

import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Copy,
  Eye,
  PencilSimple,
  Plus,
  Trash,
  X,
} from '@phosphor-icons/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ADDABLE_SECTIONS,
  COLOR_LABELS,
  type ColorChoice,
  type EditorSide,
  INITIAL_SECTIONS,
  INITIAL_SERVICES,
  LAYOUT_LABELS,
  type LayoutChoice,
  type PageSection,
  type SaveState,
  type SectionDesign,
  type SectionKind,
  type ServiceItem,
  moveItem,
  nextId,
} from '../page-content';
import { SiteCanvas } from '../SiteCanvas';
import styles from './guided-outline.module.css';

export function GuidedOutlineEditor() {
  const [editMode, setEditMode] = useState(true);
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState<EditorSide>('content');
  const [draftDesign, setDraftDesign] = useState<SectionDesign | null>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [toast, setToast] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState(0);

  const sectionElRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const canvasStageRef = useRef<HTMLDivElement>(null);
  const insertDialogRef = useRef<HTMLDivElement>(null);

  const selectedIndex = selectedId ? sections.findIndex((section) => section.id === selectedId) : -1;
  const selectedSection = selectedIndex >= 0 ? sections[selectedIndex] : null;

  const markChanged = useCallback(() => setSaveState('unsaved'), []);

  // Selecting a section (or clearing the selection) always resets which tab
  // is open and drops any un-applied design preview from the previous
  // section. Centralizing that here means every selection change stays
  // inside an event handler rather than an effect reacting to state.
  const selectSection = useCallback(
    (id: string | null, knownDesign?: SectionDesign) => {
      setSelectedId(id);
      setDrawerTab('content');
      setDraftDesign(
        id ? (knownDesign ?? sections.find((section) => section.id === id)?.design ?? null) : null,
      );
    },
    [sections],
  );

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
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') selectSection(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedId, selectSection]);

  useEffect(() => {
    if (insertIndex === null) return;
    insertDialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setInsertIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [insertIndex]);

  // Position the anchored drawer beside whichever section is selected.
  useLayoutEffect(() => {
    if (!selectedId) return;

    const measure = () => {
      const stage = canvasStageRef.current;
      const node = sectionElRefs.current[selectedId];
      if (!stage || !node) return;
      const stageRect = stage.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      setDrawerTop(Math.max(0, nodeRect.top - stageRect.top));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [selectedId, sections.length]);

  const updateSectionField = (id: string, changes: Partial<PageSection>) => {
    setSections((current) => current.map((section) => (section.id === id ? { ...section, ...changes } : section)));
    markChanged();
  };

  const updateServiceField = (id: string, changes: Partial<ServiceItem>) => {
    setServices((current) => current.map((service) => (service.id === id ? { ...service, ...changes } : service)));
    markChanged();
  };

  const applyDraftDesign = () => {
    if (!selectedId || !draftDesign) return;
    setSections((current) =>
      current.map((section) => (section.id === selectedId ? { ...section, design: draftDesign } : section)),
    );
    markChanged();
    setToast('Design applied to the page');
  };

  const cancelDraftDesign = () => {
    if (!selectedSection) return;
    setDraftDesign(selectedSection.design);
  };

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedId) return;
    setSections((current) => {
      const fromIndex = current.findIndex((section) => section.id === selectedId);
      const toIndex = fromIndex + direction;
      if (fromIndex < 0 || toIndex < 0 || toIndex >= current.length) return current;
      return moveItem(current, fromIndex, toIndex);
    });
    markChanged();
  };

  const duplicateSelected = () => {
    if (!selectedSection) return;
    const copy: PageSection = {
      ...selectedSection,
      id: nextId(`${selectedSection.kind}-copy`),
      label: `${selectedSection.label} copy`,
    };
    setSections((current) => {
      const index = current.findIndex((section) => section.id === selectedSection.id);
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
    selectSection(copy.id, copy.design);
    markChanged();
    setToast('Section duplicated');
  };

  const deleteSelected = () => {
    if (!selectedSection) return;
    const label = selectedSection.label;
    setSections((current) => current.filter((section) => section.id !== selectedSection.id));
    selectSection(null);
    markChanged();
    setToast(`${label} removed`);
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
    selectSection(created.id, created.design);
    setInsertIndex(null);
    markChanged();
    setToast(`${label} added to the page`);
  };

  const openInsertAfterSelected = () => {
    setInsertIndex(selectedIndex >= 0 ? selectedIndex + 1 : sections.length);
  };

  const publish = () => {
    setSaveState('saved');
    setToast('Your changes are now published');
  };

  const displaySections =
    selectedId && draftDesign
      ? sections.map((section) => (section.id === selectedId ? { ...section, design: draftDesign } : section))
      : sections;

  const designChanged =
    !!selectedSection && !!draftDesign
      ? draftDesign.colorTreatment !== selectedSection.design.colorTreatment ||
        draftDesign.layout !== selectedSection.design.layout
      : false;

  return (
    <main className={styles.app} aria-label="Front-end page editor — guided outline">
      <h1 className={styles.visuallyHidden}>Front-end page editor — guided outline variant</h1>

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
                selectSection(null);
              }}
            >
              <Eye aria-hidden="true" size={15} />
              <span>Previewing</span>
            </button>
          </div>

          <div className={styles.saveStatus} aria-live="polite">
            <span className={styles.statusDot} data-state={saveState} />
            {saveState === 'saved' ? 'Autosaved just now' : saveState === 'saving' ? 'Saving draft…' : 'Changes not saved yet'}
          </div>

          <button className={styles.publishButton} type="button" onClick={publish}>
            Publish
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {editMode ? (
          <aside className={styles.rail} aria-label="Page outline">
            <div className={styles.railHeading}>
              <h2>Page outline</h2>
              <p>Always visible</p>
            </div>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id} className={selectedId === section.id ? styles.railActive : ''}>
                  <button type="button" onClick={() => selectSection(section.id)}>
                    <span className={styles.railNode} aria-hidden="true" />
                    {section.label}
                  </button>
                  <span className={styles.railRowActions}>
                    <button
                      type="button"
                      disabled={index === 0}
                      aria-label={`Move ${section.label} up`}
                      onClick={() => {
                        selectSection(section.id);
                        setSections((current) => {
                          const toIndex = index - 1;
                          if (toIndex < 0) return current;
                          return moveItem(current, index, toIndex);
                        });
                        markChanged();
                      }}
                    >
                      <ArrowUp aria-hidden="true" size={12} />
                    </button>
                    <button
                      type="button"
                      disabled={index === sections.length - 1}
                      aria-label={`Move ${section.label} down`}
                      onClick={() => {
                        selectSection(section.id);
                        setSections((current) => {
                          const toIndex = index + 1;
                          if (toIndex >= current.length) return current;
                          return moveItem(current, index, toIndex);
                        });
                        markChanged();
                      }}
                    >
                      <ArrowDown aria-hidden="true" size={12} />
                    </button>
                  </span>
                </li>
              ))}
            </ol>
            <button type="button" className={styles.railAddButton} onClick={openInsertAfterSelected}>
              <Plus aria-hidden="true" size={16} />
              Add section
            </button>
          </aside>
        ) : null}

        <div className={styles.canvasStage} ref={canvasStageRef}>
          <div className={styles.canvasFrame}>
            <SiteCanvas
              sections={displaySections}
              services={services}
              editingSectionId={null}
              sectionRef={(id, node) => {
                sectionElRefs.current[id] = node;
              }}
              renderShell={(section, index, content) => {
                const isSelected = editMode && selectedId === section.id;
                return (
                  <div
                    className={`${styles.sectionShell} ${isSelected ? styles.sectionSelected : ''}`}
                    onClick={editMode ? () => selectSection(section.id) : undefined}
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
                  </div>
                );
              }}
            />
          </div>

          {editMode && selectedSection ? (
            <div
              className={styles.drawer}
              style={{ top: drawerTop }}
              role="dialog"
              aria-label={`${selectedSection.label} editor`}
            >
              <div className={styles.drawerHeader}>
                <span>{selectedSection.label}</span>
                <button type="button" onClick={() => selectSection(null)} aria-label="Close editor">
                  <X aria-hidden="true" size={16} />
                </button>
              </div>

              <div className={styles.drawerRow}>
                <div className={styles.tabSwitch} role="group" aria-label="Choose what to edit">
                  <button
                    type="button"
                    className={drawerTab === 'content' ? styles.tabActive : ''}
                    aria-pressed={drawerTab === 'content'}
                    onClick={() => setDrawerTab('content')}
                  >
                    Content
                  </button>
                  <button
                    type="button"
                    className={drawerTab === 'design' ? styles.tabActive : ''}
                    aria-pressed={drawerTab === 'design'}
                    onClick={() => setDrawerTab('design')}
                  >
                    Design
                  </button>
                </div>
                <div className={styles.drawerToolActions}>
                  <button
                    type="button"
                    aria-label={`Move ${selectedSection.label} up`}
                    disabled={selectedIndex === 0}
                    onClick={() => moveSelected(-1)}
                  >
                    <ArrowUp aria-hidden="true" size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${selectedSection.label} down`}
                    disabled={selectedIndex === sections.length - 1}
                    onClick={() => moveSelected(1)}
                  >
                    <ArrowDown aria-hidden="true" size={14} />
                  </button>
                  <button type="button" aria-label={`Duplicate ${selectedSection.label}`} onClick={duplicateSelected}>
                    <Copy aria-hidden="true" size={14} />
                  </button>
                  <button type="button" aria-label={`Delete ${selectedSection.label}`} onClick={deleteSelected}>
                    <Trash aria-hidden="true" size={14} />
                  </button>
                </div>
              </div>

              {drawerTab === 'content' ? (
                <div className={styles.drawerBody}>
                  <label className={styles.field}>
                    <span>Heading</span>
                    <input
                      type="text"
                      value={selectedSection.heading}
                      onChange={(event) => updateSectionField(selectedSection.id, { heading: event.target.value })}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Text</span>
                    <textarea
                      rows={3}
                      value={selectedSection.body}
                      onChange={(event) => updateSectionField(selectedSection.id, { body: event.target.value })}
                    />
                  </label>

                  {selectedSection.kind === 'services' ? (
                    <div className={styles.serviceFields}>
                      <span className={styles.subheading}>Services</span>
                      {services.map((service) => (
                        <div key={service.id} className={styles.serviceFieldGroup}>
                          <label className={styles.field}>
                            <span>Title</span>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(event) => updateServiceField(service.id, { title: event.target.value })}
                            />
                          </label>
                          <label className={styles.field}>
                            <span>Description</span>
                            <textarea
                              rows={2}
                              value={service.description}
                              onChange={(event) =>
                                updateServiceField(service.id, { description: event.target.value })
                              }
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className={styles.drawerBody}>
                  {selectedSection.kind === 'services' && draftDesign ? (
                    <fieldset className={styles.popoverGroup}>
                      <legend>Layout</legend>
                      <div className={styles.choiceRow}>
                        {(['simple', 'editorial', 'image-led'] as LayoutChoice[]).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            className={draftDesign.layout === choice ? styles.choiceActive : ''}
                            onClick={() => setDraftDesign((current) => (current ? { ...current, layout: choice } : current))}
                          >
                            {LAYOUT_LABELS[choice]}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {draftDesign ? (
                    <fieldset className={styles.popoverGroup}>
                      <legend>Background</legend>
                      <div className={styles.choiceRow}>
                        {(['light', 'brand', 'dark'] as ColorChoice[]).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            className={draftDesign.colorTreatment === choice ? styles.choiceActive : ''}
                            onClick={() =>
                              setDraftDesign((current) => (current ? { ...current, colorTreatment: choice } : current))
                            }
                          >
                            {COLOR_LABELS[choice]}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  <p className={styles.popoverHint}>
                    The page above previews your choice. Apply to publish it, or cancel to discard it.
                  </p>
                  <div className={styles.drawerApplyRow}>
                    <button type="button" onClick={cancelDraftDesign} disabled={!designChanged}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.applyButton}
                      onClick={applyDraftDesign}
                      disabled={!designChanged}
                    >
                      Apply design
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

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
          {toast}
        </div>
      ) : null}
    </main>
  );
}
