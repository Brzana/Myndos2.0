"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MindMap, NodeDetailsModal } from "@/components/MindMap";
import { ExamConfig } from "@/components/ExamConfig";
import { getNodeById, type MindMapNodeData } from "@/lib/mindmap/data";
import { generateExam } from "@/actions/exam";
import type { ExamMode } from "@/lib/exam";

export function DashboardClient() {
  const router = useRouter();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isGeneratingExam, setIsGeneratingExam] = useState(false);
  const [examError, setExamError] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleStartExam = useCallback(async (mode: ExamMode) => {
    setIsGeneratingExam(true);
    setExamError(null);

    try {
      const result = await generateExam(mode);

      if (!result.success) {
        setExamError(result.error);
        return;
      }

      // Zapisz egzamin do localStorage i przekieruj do widoku egzaminu
      localStorage.setItem("current_exam", JSON.stringify(result.exam));
      router.push("/exam");
    } catch (error) {
      console.error("Błąd podczas generowania egzaminu:", error);
      setExamError(
        error instanceof Error
          ? error.message
          : "Wystąpił nieoczekiwany błąd."
      );
    } finally {
      setIsGeneratingExam(false);
    }
  }, [router]);

  // Pobierz dane wybranego węzła (score w data węzła)
  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const selectedNodeData: MindMapNodeData | null = selectedNode?.data ?? null;
  const selectedNodeScore = selectedNode?.data?.score ?? null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa myśli - zajmuje 2/3 szerokości na większych ekranach */}
        <div className="lg:col-span-2">
          <div className="h-[calc(100vh-200px)] min-h-[500px]">
            <MindMap onNodeClick={handleNodeClick} />
          </div>
        </div>

        {/* Panel konfiguracji egzaminu - 1/3 szerokości */}
        <div className="lg:col-span-1">
          <ExamConfig
            onStartExam={handleStartExam}
            isLoading={isGeneratingExam}
          />
          {examError && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
              <strong>Błąd:</strong> {examError}
            </div>
          )}
        </div>
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
