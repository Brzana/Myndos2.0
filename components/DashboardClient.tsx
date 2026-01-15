"use client";

import { useState, useCallback } from "react";
import {
  MindMap,
  NodeDetailsModal,
  type UserScores,
} from "@/components/MindMap";
import { getNodeById, type MindMapNodeData } from "@/lib/mindmap/data";

interface DashboardClientProps {
  userScores: UserScores;
}

export function DashboardClient({ userScores }: DashboardClientProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Pobierz dane wybranego węzła
  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const selectedNodeData: MindMapNodeData | null = selectedNode?.data ?? null;
  const selectedNodeScore = selectedNodeId
    ? userScores[selectedNodeId] ?? null
    : null;

  return (
    <>
      {/* Mapa myśli */}
      <div className="h-[calc(100vh-200px)] min-h-[500px]">
        <MindMap userScores={userScores} onNodeClick={handleNodeClick} />
      </div>

      {/* Modal szczegółów węzła */}
      <NodeDetailsModal
        isOpen={selectedNodeId !== null}
        onClose={handleCloseModal}
        nodeData={selectedNodeData}
        score={selectedNodeScore}
      />
    </>
  );
}
