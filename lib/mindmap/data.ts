import type { Node, Edge } from "reactflow";

// Typy dla węzłów mapy myśli
export interface MindMapNodeData {
  label: string;
  description?: string;
}

// Hardcoded mapa myśli dla MVP - tematyka: Biologia komórki
export const initialNodes: Node<MindMapNodeData>[] = [
  // Węzeł główny
  {
    id: "cell",
    type: "mindMapNode",
    position: { x: 400, y: 300 },
    data: { label: "Komórka", description: "Podstawowa jednostka życia" },
  },
  // Organelle
  {
    id: "nucleus",
    type: "mindMapNode",
    position: { x: 150, y: 150 },
    data: { label: "Jądro komórkowe", description: "Centrum kontroli komórki" },
  },
  {
    id: "mitochondrium",
    type: "mindMapNode",
    position: { x: 650, y: 150 },
    data: {
      label: "Mitochondrium",
      description: "Elektrownia komórki - produkcja ATP",
    },
  },
  {
    id: "ribosome",
    type: "mindMapNode",
    position: { x: 150, y: 450 },
    data: { label: "Rybosomy", description: "Synteza białek" },
  },
  {
    id: "er",
    type: "mindMapNode",
    position: { x: 650, y: 450 },
    data: {
      label: "Retikulum endoplazmatyczne",
      description: "Transport wewnątrzkomórkowy",
    },
  },
  {
    id: "golgi",
    type: "mindMapNode",
    position: { x: 400, y: 550 },
    data: {
      label: "Aparat Golgiego",
      description: "Modyfikacja i sortowanie białek",
    },
  },
  // Procesy
  {
    id: "respiration",
    type: "mindMapNode",
    position: { x: 850, y: 50 },
    data: {
      label: "Oddychanie komórkowe",
      description: "Proces wytwarzania energii",
    },
  },
  {
    id: "division",
    type: "mindMapNode",
    position: { x: 0, y: 50 },
    data: { label: "Podział komórki", description: "Mitoza i mejoza" },
  },
];

// Krawędzie łączące węzły
export const initialEdges: Edge[] = [
  // Połączenia z głównym węzłem
  { id: "e-cell-nucleus", source: "cell", target: "nucleus", animated: false },
  {
    id: "e-cell-mitochondrium",
    source: "cell",
    target: "mitochondrium",
    animated: false,
  },
  {
    id: "e-cell-ribosome",
    source: "cell",
    target: "ribosome",
    animated: false,
  },
  { id: "e-cell-er", source: "cell", target: "er", animated: false },
  { id: "e-cell-golgi", source: "cell", target: "golgi", animated: false },
  // Połączenia między organellami
  {
    id: "e-mitochondrium-respiration",
    source: "mitochondrium",
    target: "respiration",
    animated: false,
  },
  {
    id: "e-nucleus-division",
    source: "nucleus",
    target: "division",
    animated: false,
  },
  { id: "e-ribosome-er", source: "ribosome", target: "er", animated: false },
  { id: "e-er-golgi", source: "er", target: "golgi", animated: false },
];

// Lista wszystkich ID węzłów (przydatne do inicjalizacji wyników)
export const nodeIds = initialNodes.map((node) => node.id);
