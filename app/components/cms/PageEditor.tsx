"use client";

import React, { useState } from "react";
import { SectionBlock } from "./SectionBlock";
import { Save, PlusCircle, Settings, Layout, Eye, ArrowLeft } from "lucide-react";
import { Inp, Btn, Toggle } from "../ui";
import type { CMSPage, PageBlock } from "../types";

// Using CMSPage instead of Page from Redux
interface PageEditorProps {
  initialData?: Partial<CMSPage>;
  onSave: (page: Partial<CMSPage>) => Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
}

function getInitialString(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val.en || Object.values(val)[0] || "";
}

function normalizeContent(initialData?: Partial<CMSPage>): PageBlock[] {
  if (initialData?.content && Array.isArray(initialData.content) && initialData.content.length > 0) {
    return (initialData.content as any[]).map((item, idx) => {
      // If it's already a standard PageBlock with layout & columns
      if (item.layout && item.columns && Array.isArray(item.columns)) {
        return item as PageBlock;
      }
      // If it's a KalpSection with content: { items, columns, adminTitle } or props.legacyEditor
      const legacy = item.props?.legacyEditor;
      if (legacy) {
        return {
          id: item.id || `sec_${idx}`,
          type: item.type || "section",
          layout: legacy.layout || item.variant || "grid-1",
          adminTitle: item.content?.adminTitle || legacy.adminTitle || item.type,
          content: legacy.content || item.content?.items || [],
          columns: legacy.columns?.length ? legacy.columns : (item.content?.columns?.length ? item.content.columns : [legacy.content || item.content?.items || []])
        };
      }
      if (item.content && typeof item.content === "object" && !Array.isArray(item.content)) {
        const cols = item.content.columns && item.content.columns.length > 0
          ? item.content.columns
          : [item.content.items || []];
        return {
          id: item.id || `sec_${idx}`,
          type: item.type || "section",
          layout: item.variant || "grid-1",
          adminTitle: item.content.adminTitle || item.type,
          content: item.content.items || [],
          columns: cols
        };
      }
      if (item.columns && Array.isArray(item.columns)) {
        return {
          id: item.id || `sec_${idx}`,
          type: item.type || "section",
          layout: item.layout || "grid-1",
          adminTitle: item.adminTitle || `Section ${idx + 1}`,
          content: item.content || [],
          columns: item.columns
        };
      }
      return {
        id: item.id || `sec_${idx}`,
        type: item.type || "section",
        layout: "grid-1",
        adminTitle: item.adminTitle || `Section ${idx + 1}`,
        content: Array.isArray(item.content) ? item.content : [],
        columns: [Array.isArray(item.content) ? item.content : []]
      };
    });
  }

  // Auto-bridge from plain text content if present
  if (typeof initialData?.content === "string" && initialData.content.trim() !== "") {
    const rawText: string = initialData.content;
    const paragraphs: string[] = rawText.split(/\n\n+/).filter(Boolean);
    const secId = `sec_${Date.now()}`;
    return [
      {
        id: secId,
        type: "section",
        layout: "grid-1",
        adminTitle: "Main Content",
        content: [],
        columns: [
          paragraphs.map((p: string, idx: number) => ({
            id: `${secId}_p_${idx}`,
            type: "paragraph",
            text: p.trim()
          }))
        ]
      }
    ];
  }

  // Auto-bridge from legacy sections if content is empty (e.g. for home, about, or legal)
  if (initialData?.sections && Array.isArray(initialData.sections) && initialData.sections.length > 0) {
    return (initialData.sections as any[]).map((sec, idx) => {
      const secId = sec.id || `sec_${idx}_${Date.now()}`;
      if (sec.type === "legal-block") {
        return {
          id: secId,
          type: "section",
          layout: "grid-1",
          adminTitle: sec.heading || "Legal Section",
          content: [],
          columns: [
            [
              { id: `${secId}_h3`, type: "heading", level: "h3", text: sec.heading || "" },
              { id: `${secId}_p`, type: "paragraph", text: sec.description || "" }
            ]
          ]
        };
      }
      if (sec.type === "hero") {
        return {
          id: secId,
          type: "section",
          layout: "grid-1",
          adminTitle: "Hero Section",
          content: [],
          columns: [
            [
              { id: `${secId}_h1`, type: "heading", level: "h1", text: `${sec.title || ""} ${sec.titleEm || ""}`.trim() },
              { id: `${secId}_sub`, type: "paragraph", text: sec.subtitle || "" },
              { id: `${secId}_btn`, type: "button", label: sec.primaryButtonLabel || "Explore Rooms", link: sec.primaryButtonLink || "/book" },
              ...(sec.images?.[0]?.url ? [{ id: `${secId}_img`, type: "image", url: sec.images[0].url, alt: "Hero Banner" }] : []),
            ]
          ]
        };
      }
      if (sec.type === "text-image") {
        return {
          id: secId,
          type: "section",
          layout: "grid-2",
          adminTitle: sec.heading || "Text & Image Section",
          content: [],
          columns: [
            [
              { id: `${secId}_h2`, type: "heading", level: "h2", text: sec.heading || "" },
              { id: `${secId}_p`, type: "paragraph", text: sec.description || "" },
            ],
            [
              ...((sec.image || sec.images?.[0]?.url) ? [{ id: `${secId}_img`, type: "image", url: sec.image || sec.images?.[0]?.url, alt: sec.heading || "Image" }] : [])
            ]
          ]
        };
      }
      if (sec.type === "quote") {
        return {
          id: secId,
          type: "section",
          layout: "grid-1",
          adminTitle: "Quote Section",
          content: [],
          columns: [
            [
              { id: `${secId}_eyebrow`, type: "heading", level: "h4", text: sec.eyebrow || "Our Philosophy" },
              { id: `${secId}_quote`, type: "paragraph", text: sec.text || "" },
            ]
          ]
        };
      }
      return {
        id: secId,
        type: "section",
        layout: "grid-1",
        adminTitle: sec.heading || `Section ${idx + 1}`,
        content: [],
        columns: [[]]
      };
    });
  }
  return [];
}

export const PageEditor: React.FC<PageEditorProps> = ({
  initialData,
  onSave,
  isLoading = false,
  onCancel
}) => {
  const [page, setPage] = useState<any>({
    title: getInitialString(initialData?.title),
    slug: initialData?.slug || "",
    content: normalizeContent(initialData),
    metaTitle: getInitialString(initialData?.metaTitle),
    metaDescription: getInitialString(initialData?.metaDescription),
    isPublished: initialData?.isPublished ?? false,
    id: initialData?.id,
    _id: (initialData as any)?._id,
    currentRevisionId: initialData?.currentRevisionId,
    publishedRevisionId: initialData?.publishedRevisionId,
    headVersion: initialData?.headVersion || 1,
    status: initialData?.status || (initialData?.isPublished ? "published" : "draft"),
  });

  const [activeTab, setActiveTab] = useState<"content" | "settings">("content");

  const addSection = () => {
    const newSection: PageBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: "section",
      layout: "grid-1",
      adminTitle: "New Section",
      content: [],
      columns: [[]]
    };
    setPage({ ...page, content: [...(page.content as PageBlock[]), newSection] });
  };

  const updateSection = (sectionId: string, updates: any) => {
    setPage({
      ...page,
      content: (page.content as PageBlock[]).map((sec) =>
        sec.id === sectionId ? { ...sec, ...updates } : sec,
      ),
    });
  };

  const removeSection = (sectionId: string) => {
    setPage({
      ...page,
      content: (page.content as PageBlock[]).filter((sec) => sec.id !== sectionId),
    });
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const newContent = [...(page.content as PageBlock[])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newContent.length) return;

    [newContent[index], newContent[targetIndex]] = [
      newContent[targetIndex],
      newContent[index],
    ];
    setPage({ ...page, content: newContent });
  };

  const handleSave = async () => {
    if (!page.title || !page.slug) {
      alert("Please provide a title and slug for the page.");
      return;
    }

    const now = new Date().toISOString();
    const revId = `pagerev_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;
    const isPublished = Boolean(page.isPublished);

    // Format content into Nestcraft / Kalp Studio schema
    const formattedContent = (page.content as PageBlock[]).map((block, idx) => {
      const existingKalp = (block as any).version === "1.0" ? (block as any) : null;
      const secId = block.id || `sec-${idx + 1}`;
      const secType = block.type?.includes(".")
        ? block.type
        : (block.type === "section" ? `nestcraft.section.${block.layout || "grid-1"}` : `nestcraft.${block.type}`);
      const variant = block.layout || existingKalp?.variant || "grid-1";
      const columns = block.columns || [block.content || []];
      const flatItems = columns.flat();

      return {
        ...(existingKalp || {}),
        id: secId,
        type: secType,
        version: "1.0",
        enabled: (existingKalp?.enabled !== undefined) ? existingKalp.enabled : true,
        variant,
        content: {
          items: flatItems,
          columns,
          adminTitle: block.adminTitle || ""
        },
        props: {
          ...(existingKalp?.props || {}),
          legacyEditor: {
            id: secId,
            type: block.type,
            layout: block.layout || variant,
            props: existingKalp?.props?.legacyEditor?.props || {},
            content: block.content || flatItems,
            columns
          }
        },
        dataSource: existingKalp?.dataSource || { kind: "static" },
        visibility: existingKalp?.visibility || {},
        style: existingKalp?.style || {},
        provenance: existingKalp?.provenance || {
          origin: "kalp_admin_page_editor",
          editor: "page-editor-v2-adapter"
        }
      };
    });

    const savedPage: Partial<CMSPage> = {
      ...initialData,
      id: page.id || initialData?.id || `pg_${Date.now()}`,
      _id: (initialData as any)?._id || page.id || initialData?.id || `pg_${Date.now()}`,
      slug: page.slug,
      title: {
        en: page.title || ""
      },
      content: formattedContent as any,
      metaTitle: {
        en: page.metaTitle || ""
      },
      metaDescription: {
        en: page.metaDescription || ""
      },
      isPublished,
      status: isPublished ? "published" : "draft",
      currentRevisionId: revId,
      publishedRevisionId: isPublished ? (initialData?.publishedRevisionId || revId) : initialData?.publishedRevisionId,
      headVersion: ((initialData as any)?.headVersion || 0) + 1,
      createdAt: initialData?.createdAt || now,
      updatedAt: now
    };

    await onSave(savedPage);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <button
            className="h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            onClick={onCancel}
            title="Back to pages"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {initialData?.title ? "Edit Page" : "Create New Page"}
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              CMS Editor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
            <Toggle
              checked={page.isPublished!}
              onChange={(val) => setPage({ ...page, isPublished: val })}
              label={page.isPublished ? "Published" : "Draft"}
            />
          </div>
          <Btn
            variant="outline"
            style={{ borderRadius: "12px", border: "1px solid #e2e8f0", color: "#475569", fontWeight: "bold" }}
            disabled={isLoading}
            onClick={() => {
              const url = page.slug === "home" ? "/" : `/${page.slug}`;
              window.open(url, "_blank");
            }}
          >
            <Eye size={16} /> Preview
          </Btn>
          <Btn
            onClick={handleSave}
            disabled={isLoading}
            style={{ background: "#0f172a", color: "#fff", borderRadius: "12px", fontWeight: "bold", padding: "10px 24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
          >
            {isLoading ? "Saving..." : <><Save size={16} /> {initialData?.title ? "Update Page" : "Save Page"}</>}
          </Btn>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-slate-100 p-1 rounded-2xl h-12">
        <button
           className={`rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all cursor-pointer ${activeTab === 'content' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
           onClick={() => setActiveTab('content')}
        >
          <Layout size={16} /> Content
        </button>
        <button
           className={`rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all cursor-pointer ${activeTab === 'settings' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
           onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} /> SEO & Settings
        </button>
      </div>

      {activeTab === 'content' && (
        <div className="space-y-8 outline-none animate-in fade-in">
          <div className="flex flex-col gap-8">
            <div className="w-full space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                      Page Title
                    </label>
                    <Inp
                      placeholder="e.g. About Us"
                      value={page.title || ""}
                      onChange={(e) =>
                        setPage({ ...page, title: e.target.value })
                      }
                      style={{ height: '48px', fontSize: '18px', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                      Slug Path
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold select-none">
                        /
                      </span>
                      <Inp
                        placeholder="about-us"
                        value={page.slug || ""}
                        onChange={(e) =>
                          setPage({
                            ...page,
                            slug: e.target.value
                              .toLowerCase()
                              .replace(/ /g, "-"),
                          })
                        }
                        style={{ height: '48px', fontSize: '15px', paddingLeft: '32px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                    Page Blocks
                  </h3>
                  <Btn
                    variant="outline"
                    onClick={addSection}
                    style={{ borderRadius: "12px", border: "1px solid #e2e8f0", color: "#475569" }}
                  >
                    <PlusCircle size={16} /> Add Section
                  </Btn>
                </div>

                {!page.content || page.content.length === 0 ? (
                  <div className="h-64 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 gap-4">
                    <Layout size={40} className="opacity-20" />
                    <p className="text-sm font-medium text-slate-400">
                      Your page is empty. Start by adding a section.
                    </p>
                    <Btn
                      variant="outline"
                      onClick={addSection}
                      style={{ borderRadius: "12px", border: "1px solid #e2e8f0", color: "#475569", fontWeight: "bold" }}
                    >
                      Add First Section
                    </Btn>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(page.content as PageBlock[]).map((section, idx) => (
                      <SectionBlock
                        key={section.id}
                        section={section}
                        onUpdate={(updates) =>
                          updateSection(section.id, updates)
                        }
                        onRemove={() => removeSection(section.id)}
                        onMoveUp={() => moveSection(idx, "up")}
                        onMoveDown={() => moveSection(idx, "down")}
                        isFirst={idx === 0}
                        isLast={idx === (page.content as PageBlock[]).length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-8 text-white shadow-xl shadow-slate-200 mt-12 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span> Quick Help
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white flex-shrink-0">
                    1
                  </div>
                  <p className="text-slate-400">
                    Add **Sections** to organize your page layout.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white flex-shrink-0">
                    2
                  </div>
                  <p className="text-slate-400">
                    Inside each section, add **Content Blocks** like headings
                    or images.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white flex-shrink-0">
                    3
                  </div>
                  <p className="text-slate-400">
                    Use the arrows on the top-right of each block to reorder.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-8 outline-none animate-in fade-in">
          <div className="max-w-2xl bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Search Engine Optimization (SEO)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Meta Title
                </label>
                <Inp
                  placeholder="Page title as it appears in search results"
                  value={page.metaTitle || ""}
                  onChange={(e) =>
                    setPage({ ...page, metaTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Meta Description
                </label>
                <textarea
                  placeholder="A short summary of the page for search engines"
                  value={page.metaDescription || ""}
                  onChange={(e) =>
                    setPage({ ...page, metaDescription: e.target.value })
                  }
                  className="textarea min-h-[120px]"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
