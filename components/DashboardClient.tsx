"use client";

import { useState, useCallback } from "react";
import { MindMap, NodeDetailsModal } from "@/components/MindMap";
import { getNodeById, type MindMapNodeData } from "@/lib/mindmap/data";

export function DashboardClient() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Pobierz dane wybranego węzła (score w data węzła)
  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const selectedNodeData: MindMapNodeData | null = selectedNode?.data ?? null;
  const selectedNodeScore = selectedNode?.data?.score ?? null;

  return (
    <>
      {/* Mapa myśli */}
      <div className="h-[calc(100vh-200px)] min-h-[500px]">
        <MindMap onNodeClick={handleNodeClick} />
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
