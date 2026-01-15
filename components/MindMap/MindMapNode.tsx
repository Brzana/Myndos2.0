"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { MindMapNodeData } from "@/lib/mindmap/data";
import { getNodeColor, getScoreLabel } from "@/lib/mindmap/utils";

export interface MindMapNodeProps extends NodeProps<MindMapNodeData> {
  data: MindMapNodeData & {
    score?: number | null;
  };
}

function MindMapNodeComponent({ data, selected }: MindMapNodeProps) {
  const score = data.score ?? null;
  const colors = getNodeColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <>
      {/* Handle górny - wejście */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0 !w-3 !h-3"
      />

      {/* Węzeł */}
      <div
        className={`
          px-4 py-3 rounded-xl shadow-lg
          min-w-[140px] max-w-[200px]
          transition-all duration-200
          ${
            selected
              ? "ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105"
              : ""
          }
        `}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: "2px",
          borderStyle: "solid",
          color: colors.text,
        }}
      >
        {/* Nazwa tematu */}
        <div className="font-semibold text-sm text-center leading-tight">
          {data.label}
        </div>

        {/* Wynik (jeśli nie jest null) */}
        {score !== null && (
          <div className="mt-1.5 text-xs text-center opacity-90">
            {score}% • {scoreLabel}
          </div>
        )}

        {/* Etykieta dla nieodkrytych */}
        {score === null && (
          <div className="mt-1.5 text-xs text-center opacity-75">
            {scoreLabel}
          </div>
        )}
      </div>

      {/* Handle dolny - wyjście */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0 !w-3 !h-3"
      />
    </>
  );
}

// Memo dla optymalizacji - węzeł rerenderuje się tylko gdy zmienią się props
export const MindMapNode = memo(MindMapNodeComponent);
