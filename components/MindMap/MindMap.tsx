"use client";

//TODO: refactor it so it works with the data that ill provide (like it is used in knowledgemaps.ua)

import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  initialNodes,
  initialEdges,
  type MindMapNodeData,
} from "@/lib/mindmap/data";
import { getNodeColor } from "@/lib/mindmap/utils";
import { MindMapNode } from "./MindMapNode";

interface MindMapProps {
  onNodeClick?: (nodeId: string) => void;
}

// Rejestracja custom node types
const nodeTypes: NodeTypes = {
  mindMapNode: MindMapNode,
};

export function MindMap({ onNodeClick }: MindMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handler kliknięcia w węzeł
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<MindMapNodeData>) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [onNodeClick]
  );

  // Funkcja do kolorowania minimapy
  const getMinimapNodeColor = useCallback(
    (node: Node<MindMapNodeData>) => {
      const score = node.data?.score ?? null;
      return getNodeColor(score).background;
    },
    []
  );

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-900 rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5,
        }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "#64748b", // slate-500
            strokeWidth: 2,
          },
        }}
      >
        {/* Tło z siatką */}
        <Background color="#334155" gap={20} size={1} />

        {/* Kontrolki zoom/pan */}
        <Controls
          className="!bg-slate-800 !border-slate-600 !rounded-lg [&>button]:!bg-slate-700 [&>button]:!border-slate-600 [&>button]:!text-slate-200 [&>button:hover]:!bg-slate-600"
          showInteractive={false}
        />

        {/* Minimapa */}
        <MiniMap
          nodeColor={getMinimapNodeColor}
          maskColor="rgba(15, 23, 42, 0.8)"
          className="!bg-slate-800 !border-slate-600 !rounded-lg"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
