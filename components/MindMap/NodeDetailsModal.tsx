"use client";

import { useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MindMapNodeData } from "@/lib/mindmap/data";
import { getNodeColor, getScoreLabel } from "@/lib/mindmap/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface NodeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: MindMapNodeData | null;
  score: number | null;
}

export function NodeDetailsModal({
  isOpen,
  onClose,
  nodeData,
  score,
}: NodeDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus within the modal
  useFocusTrap(modalRef, isOpen);

  // Zamknięcie modalu klawiszem Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !nodeData) return null;

  const colors = getNodeColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-slate-700 flex items-start justify-between gap-4"
          style={{ backgroundColor: colors.background + "20" }}
        >
          <div className="flex-1">
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-1">
              {nodeData.label}
            </h2>
            {nodeData.description && (
              <p className="text-slate-400 text-sm">{nodeData.description}</p>
            )}
          </div>

          {/* Score badge */}
          <div
            className="px-4 py-2 rounded-xl text-center min-w-[100px]"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderWidth: "2px",
              borderStyle: "solid",
              color: colors.text,
            }}
          >
            {score !== null ? (
              <>
                <div className="text-2xl font-bold">{score}%</div>
                <div className="text-xs opacity-90">{scoreLabel}</div>
              </>
            ) : (
              <div className="text-sm">{scoreLabel}</div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Zamknij"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Article */}
          {nodeData.article && (
            <article className="prose prose-invert prose-slate max-w-none mb-8 prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400 prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-800 prose-table:text-slate-300 prose-th:text-slate-200 prose-td:border-slate-700 prose-th:border-slate-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {nodeData.article}
              </ReactMarkdown>
            </article>
          )}

          {/* Example questions */}
          {nodeData.exampleQuestions &&
            nodeData.exampleQuestions.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Przykładowe pytania
                </h3>
                <ul className="space-y-2">
                  {nodeData.exampleQuestions.map((question, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full">
                        {index + 1}
                      </span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
        </div>
      </div>
    </div>
  );
}
