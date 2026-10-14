"use client";

import React from "react";
import { 
  CmsSection, 
  CmsHeading, 
  CmsParagraph, 
  CmsImage, 
  CmsButton, 
  CmsList,
  CmsCta,
  CmsCards,
  CmsFeatures,
  CmsTestimonial
} from "./blocks/CmsBlocks";
import type { PageBlock } from "../types";

interface CmsRendererProps {
  content: any[];
  isNested?: boolean;
}

export const CmsRenderer: React.FC<CmsRendererProps> = ({ content, isNested = false }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="w-full">
      {content.map((item) => {
        // If it's a section container (type is "section" or contains "section" or has columns/items in content)
        const isSection =
          item.type === "section" ||
          (typeof item.type === "string" && (item.type.includes("section") || item.type.startsWith("nestcraft.") || item.type.startsWith("luxora."))) ||
          (item.content && typeof item.content === "object" && !Array.isArray(item.content));

        if (isSection) {
          const layout = item.layout || item.variant || "grid-1";
          const columns =
            item.columns && item.columns.length > 0
              ? item.columns
              : (item.content?.columns && item.content.columns.length > 0
                  ? item.content.columns
                  : [item.content?.items || (Array.isArray(item.content) ? item.content : [])]);

          return (
            <CmsSection key={item.id} layout={layout} isNested={isNested}>
              {columns.map((col: any[], colIdx: number) => (
                <div key={colIdx} className="w-full h-full">
                  <CmsRenderer content={col} isNested={true} />
                </div>
              ))}
            </CmsSection>
          );
        }

        switch (item.type) {
          case "heading":
            return <CmsHeading key={item.id} text={item.text} level={item.level} />;
          case "paragraph":
            return <CmsParagraph key={item.id} text={item.text} />;
          case "image":
            return <CmsImage key={item.id} url={item.url} alt={item.alt} />;
          case "button":
            return <CmsButton key={item.id} label={item.label} link={item.link} />;
          case "cta":
            return <CmsCta key={item.id} {...item} />;
          case "cards":
            return <CmsCards key={item.id} items={item.items} />;
          case "features":
            return <CmsFeatures key={item.id} items={item.items} />;
          case "testimonial":
            return <CmsTestimonial key={item.id} {...item} />;
          case "list":
            return <CmsList key={item.id} items={item.items} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
