import type { Node, Edge } from "reactflow";

// Typy dla węzłów mapy myśli
export interface MindMapNodeData {
  label: string;
  description?: string;
  article?: string; // Treść edukacyjna w formacie Markdown
  exampleQuestions?: string[]; // Przykładowe pytania do węzła
}

// Hardcoded mapa myśli dla MVP - tematyka: Biologia komórki
export const initialNodes: Node<MindMapNodeData>[] = [
  // Węzeł główny
  {
    id: "cell",
    type: "mindMapNode",
    position: { x: 400, y: 300 },
    data: {
      label: "Komórka",
      description: "Podstawowa jednostka życia",
      article: `# Komórka - podstawowa jednostka życia

Komórka jest **najmniejszą strukturalną i funkcjonalną jednostką** wszystkich organizmów żywych. Została odkryta w 1665 roku przez Roberta Hooke'a.

## Typy komórek

Wyróżniamy dwa główne typy komórek:

1. **Komórki prokariotyczne** - bez wyodrębnionego jądra (bakterie, archeony)
2. **Komórki eukariotyczne** - z jądrem komórkowym (rośliny, zwierzęta, grzyby)

## Wspólne cechy wszystkich komórek

- Błona komórkowa
- Cytoplazma
- Materiał genetyczny (DNA)
- Rybosomy

> Teoria komórkowa głosi, że wszystkie organizmy żywe zbudowane są z komórek, a każda komórka pochodzi od innej komórki.`,
      exampleQuestions: [
        "Kto i kiedy odkrył komórkę?",
        "Jakie są główne różnice między komórką prokariotyczną a eukariotyczną?",
        "Wymień wspólne cechy wszystkich komórek.",
        "Co głosi teoria komórkowa?",
      ],
    },
  },
  // Organelle
  {
    id: "nucleus",
    type: "mindMapNode",
    position: { x: 150, y: 150 },
    data: {
      label: "Jądro komórkowe",
      description: "Centrum kontroli komórki",
      article: `# Jądro komórkowe

Jądro komórkowe (łac. *nucleus*) to najważniejsze organellum komórki eukariotycznej, często nazywane **"mózgiem komórki"**.

## Budowa jądra

- **Otoczka jądrowa** - podwójna błona z porami jądrowymi
- **Chromatyna** - kompleks DNA i białek histonowych
- **Jąderko** - miejsce syntezy rRNA

## Funkcje jądra

1. Przechowywanie informacji genetycznej
2. Kontrola ekspresji genów
3. Koordynacja podziału komórki
4. Synteza RNA

## Pory jądrowe

Pory jądrowe umożliwiają **selektywny transport** substancji między jądrem a cytoplazmą. Przepuszczają:
- mRNA (na zewnątrz)
- Białka regulatorowe (do środka)`,
      exampleQuestions: [
        "Z jakich elementów zbudowane jest jądro komórkowe?",
        "Jaką rolę pełnią pory jądrowe?",
        "Co to jest chromatyna i z czego się składa?",
        "Wymień główne funkcje jądra komórkowego.",
      ],
    },
  },
  {
    id: "mitochondrium",
    type: "mindMapNode",
    position: { x: 650, y: 150 },
    data: {
      label: "Mitochondrium",
      description: "Elektrownia komórki - produkcja ATP",
      article: `# Mitochondrium - elektrownia komórki

Mitochondria to organella odpowiedzialne za **produkcję energii** w postaci ATP (adenozynotrifosforanu).

## Budowa mitochondrium

- **Błona zewnętrzna** - gładka, przepuszczalna
- **Błona wewnętrzna** - pofałdowana (grzebienie/cristae)
- **Macierz mitochondrialna** - zawiera enzymy, własne DNA i rybosomy

## Teoria endosymbiozy

Mitochondria posiadają **własne DNA** (mtDNA), które:
- Jest koliste (jak u bakterii)
- Dziedziczy się tylko po matce
- Koduje część białek mitochondrialnych

## Fosforylacja oksydacyjna

W błonie wewnętrznej zachodzi **łańcuch transportu elektronów**, który:
1. Przenosi elektrony przez kompleksy białkowe
2. Pompuje protony do przestrzeni międzybłonowej
3. Napędza syntazę ATP`,
      exampleQuestions: [
        "Dlaczego mitochondrium nazywane jest 'elektrownią komórki'?",
        "Co to jest teoria endosymbiozy?",
        "Opisz budowę mitochondrium.",
        "Na czym polega fosforylacja oksydacyjna?",
      ],
    },
  },
  {
    id: "ribosome",
    type: "mindMapNode",
    position: { x: 150, y: 450 },
    data: {
      label: "Rybosomy",
      description: "Synteza białek",
      article: `# Rybosomy - fabryki białek

Rybosomy to struktury odpowiedzialne za **syntezę białek** (translację). Występują we wszystkich typach komórek.

## Budowa rybosomu

Rybosom składa się z dwóch podjednostek:
- **Duża podjednostka** - katalizuje tworzenie wiązań peptydowych
- **Mała podjednostka** - wiąże mRNA i tRNA

### Współczynnik sedymentacji
- Prokariota: **70S** (50S + 30S)
- Eukariota: **80S** (60S + 40S)

## Lokalizacja rybosomów

1. **Wolne rybosomy** - w cytoplazmie, syntetyzują białka cytoplazmatyczne
2. **Związane z ER** - na siateczce śródplazmatycznej, syntetyzują białka wydzielnicze

## Proces translacji

\`\`\`
mRNA → Rybosom → Białko
        ↑
       tRNA (aminokwasy)
\`\`\``,
      exampleQuestions: [
        "Z czego zbudowany jest rybosom?",
        "Czym różnią się rybosomy prokariotyczne od eukariotycznych?",
        "Gdzie w komórce znajdują się rybosomy?",
        "Jaka jest funkcja rybosomów?",
      ],
    },
  },
  {
    id: "er",
    type: "mindMapNode",
    position: { x: 650, y: 450 },
    data: {
      label: "Retikulum endoplazmatyczne",
      description: "Transport wewnątrzkomórkowy",
      article: `# Retikulum endoplazmatyczne (ER)

Retikulum endoplazmatyczne (siateczka śródplazmatyczna) to system **błon i kanalików** połączonych z otoczką jądrową.

## Typy retikulum

### Szorstkie ER (RER)
- Pokryte rybosomami
- Synteza białek wydzielniczych i błonowych
- Modyfikacja białek (glikozylacja)

### Gładkie ER (SER)
- Bez rybosomów
- Synteza lipidów i steroidów
- Detoksykacja (w wątrobie)
- Magazynowanie Ca²⁺ (w mięśniach)

## Funkcje ER

| Funkcja | Typ ER |
|---------|--------|
| Synteza białek | RER |
| Synteza lipidów | SER |
| Detoksykacja | SER |
| Transport białek | RER + SER |`,
      exampleQuestions: [
        "Jakie są różnice między szorstkim a gładkim ER?",
        "Jakie funkcje pełni retikulum endoplazmatyczne?",
        "Dlaczego szorstkie ER jest 'szorstkie'?",
        "Gdzie zachodzi synteza lipidów w komórce?",
      ],
    },
  },
  {
    id: "golgi",
    type: "mindMapNode",
    position: { x: 400, y: 550 },
    data: {
      label: "Aparat Golgiego",
      description: "Modyfikacja i sortowanie białek",
      article: `# Aparat Golgiego

Aparat Golgiego (kompleks Golgiego) to organellum odpowiedzialne za **modyfikację, sortowanie i pakowanie** białek i lipidów.

## Budowa

Składa się ze stosu spłaszczonych cystern (diktiosomów):
- **Strona cis** - przyjmuje pęcherzyki z ER
- **Strona trans** - wysyła produkty do miejsc docelowych

## Funkcje aparatu Golgiego

1. **Modyfikacja białek**
   - Glikozylacja (dodawanie cukrów)
   - Fosforylacja
   - Proteoliza

2. **Sortowanie i pakowanie**
   - Kierowanie białek do lizosomów
   - Wydzielanie na zewnątrz komórki
   - Transport do błony komórkowej

## Szlak wydzielniczy

\`ER → Aparat Golgiego → Pęcherzyki → Błona/Zewnątrz\``,
      exampleQuestions: [
        "Jaką funkcję pełni aparat Golgiego?",
        "Co to jest strona cis i trans aparatu Golgiego?",
        "Jakie modyfikacje białek zachodzą w aparacie Golgiego?",
        "Opisz szlak wydzielniczy białek.",
      ],
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
      article: `# Oddychanie komórkowe

Oddychanie komórkowe to proces **utleniania związków organicznych** w celu uwolnienia energii i zmagazynowania jej w ATP.

## Równanie sumaryczne

**C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energia (ATP)**

## Etapy oddychania

### 1. Glikoliza (cytoplazma)
- Rozkład glukozy do pirogronianu
- Zysk: **2 ATP** + 2 NADH

### 2. Cykl Krebsa (macierz mitochondrium)
- Utlenianie acetylo-CoA
- Zysk: **2 ATP** + 6 NADH + 2 FADH₂

### 3. Łańcuch oddechowy (błona wewnętrzna mitochondrium)
- Fosforylacja oksydacyjna
- Zysk: **~34 ATP**

## Bilans energetyczny

| Etap | ATP |
|------|-----|
| Glikoliza | 2 |
| Cykl Krebsa | 2 |
| Łańcuch oddechowy | ~34 |
| **Suma** | **~38 ATP** |`,
      exampleQuestions: [
        "Jakie są etapy oddychania komórkowego?",
        "Gdzie zachodzi glikoliza?",
        "Ile ATP powstaje w wyniku pełnego utlenienia jednej cząsteczki glukozy?",
        "Co to jest cykl Krebsa i gdzie zachodzi?",
      ],
    },
  },
  {
    id: "division",
    type: "mindMapNode",
    position: { x: 0, y: 50 },
    data: {
      label: "Podział komórki",
      description: "Mitoza i mejoza",
      article: `# Podział komórki

Podział komórki to proces, w którym komórka macierzysta dzieli się na **komórki potomne**. Wyróżniamy dwa główne typy: mitozę i mejozę.

## Mitoza

Podział **somatyczny** (komórek ciała):
- Powstają **2 komórki diploidalne** (2n)
- Komórki potomne są genetycznie identyczne

### Fazy mitozy
1. **Profaza** - kondensacja chromosomów
2. **Metafaza** - ustawienie w płytce metafazowej
3. **Anafaza** - rozdzielenie chromatyd
4. **Telofaza** - dekondensacja, podział cytoplazmy

## Mejoza

Podział **redukcyjny** (komórki rozrodcze):
- Powstają **4 komórki haploidalne** (n)
- Zachodzi crossing-over (rekombinacja)

### Mejoza I vs Mejoza II
| Cecha | Mejoza I | Mejoza II |
|-------|----------|-----------|
| Redukcja | 2n → n | n → n |
| Crossing-over | Tak | Nie |`,
      exampleQuestions: [
        "Czym różni się mitoza od mejozy?",
        "Wymień fazy mitozy.",
        "Co to jest crossing-over i kiedy zachodzi?",
        "Ile komórek powstaje w wyniku mejozy?",
      ],
    },
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

// Funkcja pomocnicza do pobierania danych węzła po ID
export function getNodeById(id: string): Node<MindMapNodeData> | undefined {
  return initialNodes.find((node) => node.id === id);
}
