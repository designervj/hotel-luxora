"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash, Globe, FileText, ExternalLink } from "lucide-react";
import { Confirm } from "./ui";
import type { CMSPage } from "./types";
import { PageEditor } from "./cms/PageEditor";

interface PagesCMSProps {
  pages: CMSPage[];
  onAdd: (page: CMSPage) => void | Promise<void>;
  onUpdate: (page: CMSPage) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}

function fmtDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function getTitleText(title: any): string {
  if (!title) return "Untitled Page";
  if (typeof title === "string") return title;
  return title.en || Object.values(title)[0] || "Untitled Page";
}

export default function PagesCMS({ pages, onAdd, onUpdate, onDelete }: PagesCMSProps) {
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [target, setTarget] = useState<CMSPage | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openEdit = (page: CMSPage) => {
    setTarget(page);
    setView("edit");
  };

  const openAdd = () => {
    setTarget(null);
    setView("add");
  };

  if (view === "add") {
    return (
      <PageEditor
        onSave={async (p) => {
          setIsSaving(true);
          try {
            await onAdd(p as CMSPage);
            setView("list");
          } finally {
            setIsSaving(false);
          }
        }}
        isLoading={isSaving}
        onCancel={() => setView("list")}
      />
    );
  }

  if (view === "edit" && target) {
    return (
      <PageEditor
        initialData={target}
        onSave={async (p) => {
          setIsSaving(true);
          try {
            await onUpdate(p as CMSPage);
            setView("list");
          } finally {
            setIsSaving(false);
          }
        }}
        isLoading={isSaving}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {delId && (
        <Confirm
          title="Delete Page"
          msg={`Are you sure you want to delete "${
            pages.find((p) => p.id === delId)?.title || "this page"
          }"? This cannot be undone.`}
          onOk={async () => {
            await onDelete(delId);
            setDelId(null);
          }}
          onCancel={() => setDelId(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pages CMS
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your website content pages and structure.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm shadow-lg shadow-slate-200 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add New Page
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-3.5 px-6 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  PAGE TITLE
                </th>
                <th className="py-3.5 px-6 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  SLUG
                </th>
                <th className="py-3.5 px-6 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  STATUS
                </th>
                <th className="py-3.5 px-6 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  LAST UPDATED
                </th>
                <th className="py-3.5 px-6 text-right font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-slate-400">
                    No CMS pages found. Create your first page!
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr
                    key={page.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Page Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 flex-shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-800 text-sm truncate">
                            {getTitleText(page.title)}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                            <Globe size={11} />
                            <span>/{page.slug === "home" ? "" : page.slug}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">
                      /{page.slug === "home" ? "" : page.slug}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          page.isPublished
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {fmtDate(page.updatedAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {page.isPublished && (
                          <a
                            href={page.slug === "home" ? "/" : `/${page.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            title="View live page"
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => openEdit(page)}
                          title="Edit Page"
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDelId(page.id)}
                          title="Delete Page"
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
