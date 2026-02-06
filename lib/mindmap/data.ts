import type { Node, Edge } from "reactflow";

// Typy dla węzłów mapy myśli
export interface MindMapNodeData {
  label: string;
  description?: string;
  article?: string; // Treść edukacyjna w formacie Markdown
  exampleQuestions?: string[]; // Przykładowe pytania do węzła
  /** Wynik użytkownika 0–100 lub null (nieodkryty). */
  score?: number | null;
}

// Helper function to calculate radial position
function radialPosition(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): { x: number; y: number } {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

// Layout configuration
const CENTER = { x: 0, y: 0 };
const INNER_RADIUS = 350; // First level children
const OUTER_RADIUS = 700; // Second level children

// Calculate positions for first-level nodes (6 main branches)
const firstLevelAngles = {
  logika_rozmyta: -Math.PI / 2 - Math.PI / 6, // top-left
  logika_nazw: -Math.PI / 2 + Math.PI / 12, // top
  algebry_logiczne: Math.PI / 2 + Math.PI / 4, // right
  reguły_wnioskowania: Math.PI / 2 - Math.PI / 6, // bottom-left
  podstawy_logiki_klasycznej: Math.PI / 2 + Math.PI / 12, // bottom
  logika_predykatow: -Math.PI / 12, // right
};

const baseNodes: Node<MindMapNodeData>[] = [
  // ============ CENTER NODE ============
  {
    id: "logika_matematyczna",
    type: "mindMapNode",
    position: CENTER,
    data: {
      label: "Logika (Matematyczna)",
      description: "Kompleksowe narzędzie do analizy rozumowań, języka matematyki oraz systemów wnioskowania.",
      article: `# Logika (Matematyczna)

Logika matematyczna to fundamentalna dziedzina matematyki, która stanowi kompleksowe narzędzie do precyzyjnej analizy rozumowań, języka matematyki oraz systemów wnioskowania. Zajmuje się formalizacją pojęć takich jak dowód, aksjomat, definicja czy twierdzenie, dążąc do ugruntowania matematyki na ściśle określonych podstawach logicznych.

## Główne obszary Logiki Matematycznej

### Rachunek Zdań (Logika Zdań)
Analizuje struktury zdań złożonych oraz zależności logiczne między nimi za pomocą spójników logicznych (negacja, koniunkcja, alternatywa, implikacja, równoważność). Pozwala oceniać prawdziwość lub fałszywość zdań bez wnikania w ich wewnętrzną strukturę.

### Rachunek Kwantyfikatorów (Logika Predykatów)
Rozszerza rachunek zdań o kwantyfikatory (egzystencjalny i ogólny), predykaty oraz zmienne. Umożliwia analizę struktury wewnętrznej zdań i wnioskowań, które zależą od właściwości obiektów i relacji między nimi. Jest to podstawa formalnego języka matematyki.

### Teoria Modeli
Bada relacje między formalnymi językami (np. językiem rachunku predykatów) a ich interpretacjami, czyli strukturami matematycznymi (modelami), w których te języki są prawdziwe. Pozwala na zrozumienie, w jaki sposób abstrakcyjne teorie matematyczne znajdują odzwierciedlenie w konkretnych obiektach.

### Teoria Dowodu
Skupia się na formalnych dowodach i ich strukturze. Analizuje systemy dedukcyjne, reguły wnioskowania oraz kompletność i niesprzeczność systemów formalnych. Zajmuje się tym, co można udowodnić w danym systemie formalnym.

### Teoria Mnogości
Choć jest odrębną dziedziną, stanowi fundament dla praktycznie całej współczesnej matematyki, dostarczając języka i narzędzi do opisu kolekcji obiektów. Jest ściśle związana z logiką matematyczną, zwłaszcza w kontekście aksjomatyki (np. aksjomatyka ZFC).

---

Logika matematyczna jest nie tylko teoretyczną podstawą matematyki, ale ma również kluczowe zastosowania w informatyce (np. w projektowaniu języków programowania, baz danych, weryfikacji programów), sztucznej inteligencji oraz filozofii, dostarczając narzędzi do precyzyjnego myślenia i wnioskowania.`,
      exampleQuestions: [
        "Czym zajmuje się teoria modeli?",
        "Jaka jest różnica między rachunkiem zdań a rachunkiem kwantyfikatorów?",
        "Dlaczego teoria mnogości jest istotna dla logiki matematycznej?",
        "Wymień główne obszary logiki matematycznej.",
      ],
    },
  },

  // ============ FIRST LEVEL - Main branches ============
  {
    id: "logika_rozmyta",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.logika_rozmyta
    ),
    data: {
      label: "Logika Rozmyta",
      description: "Wprowadzenie do koncepcji nieostrości i operacji logicznych na zdaniach rozmytych.",
      article: `# Logika Rozmyta: Wprowadzenie do Koncepcji Nieostrości

Logika Rozmyta to rozszerzenie klasycznej logiki dwuwartościowej, która pozwala na modelowanie i rozumowanie w kontekście nieprecyzyjnych, niejednoznacznych lub "rozmytych" informacji. Została wprowadzona przez L.A. Zadeha w połowie lat 60. XX wieku jako sposób na radzenie sobie z koncepcjami, które nie dają się jednoznacznie określić jako "prawdziwe" lub "fałszywe", a zamiast tego posiadają stopień przynależności lub prawdziwości.

## Koncepcja Nieostrości i Zbiory Rozmyte

W klasycznej logice i teorii zbiorów element albo należy do zbioru (prawda, 1), albo nie należy (fałsz, 0). W rzeczywistości wiele pojęć ma charakter nieostry. Na przykład, "wysoki człowiek", "ciepła woda" czy "szybki samochód" to określenia subiektywne, dla których trudno wskazać ścisłą granicę.

Logika Rozmyta wprowadza koncepcję **zbioru rozmytego**, w którym elementy mogą należeć do zbioru w pewnym stopniu, wyrażanym wartością z przedziału [0, 1]. Stopień przynależności elementu *x* do zbioru rozmytego *A* jest określany przez funkcję przynależności μA(x), gdzie:

- **μA(x) = 0** oznacza, że *x* w ogóle nie należy do zbioru *A*.
- **μA(x) = 1** oznacza, że *x* w pełni należy do zbioru *A*.
- **μA(x) ∈ (0, 1)** oznacza, że *x* należy do zbioru *A* w pewnym stopniu.

Tym samym, koncepcja nieostrości pozwala na opisanie płynnych przejść między stanami, zamiast ostrych granic.

## Operacje Logiczne na Zdaniach Rozmytych

W Logice Rozmytej tradycyjne operacje logiczne są uogólniane, aby działały na stopniach prawdziwości z przedziału [0, 1]. Jeżeli *P* i *Q* są zdaniami rozmytymi o stopniach prawdziwości odpowiednio μ(P) i μ(Q), to podstawowe operacje logiczne definiuje się następująco:

### Negacja (NOT)
Stopień prawdziwości negacji zdania rozmytego jest często definiowany jako dopełnienie do jedności stopnia prawdziwości oryginalnego zdania.
> **NOT(P) = 1 − μ(P)**

### Koniunkcja (AND)
Stopień prawdziwości koniunkcji dwóch zdań rozmytych jest zazwyczaj określany jako minimum ze stopni prawdziwości tych zdań.
> **P ∧ Q = min(μ(P), μ(Q))**

### Alternatywa (OR)
Stopień prawdziwości alternatywy dwóch zdań rozmytych jest najczęściej określany jako maksimum ze stopni prawdziwości tych zdań.
> **P ∨ Q = max(μ(P), μ(Q))**

Te definicje, znane jako operatory Zadeha, są najczęściej używanymi uogólnieniami klasycznych operacji logicznych i stanowią podstawę dla rozumowania w systemach rozmytych. Logika Rozmyta znajduje zastosowanie w wielu dziedzinach, takich jak sterowanie procesami, sztuczna inteligencja, analiza danych i systemy decyzyjne.`,
      exampleQuestions: [
        "Czym różni się logika rozmyta od klasycznej logiki dwuwartościowej?",
        "Co oznacza, że μA(x) wynosi 0.5?",
        "Jak definiuje się negację w logice rozmytej?",
        "Kto jest twórcą logiki rozmytej?",
      ],
    },
  },
  {
    id: "logika_nazw",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.logika_nazw
    ),
    data: {
      label: "Logika Nazw",
      description: "Badanie zakresu, znaczenia i klasyfikacji pojęć oraz operacji na nazwach.",
      article: `# Logika Nazw

Logika Nazw, stanowiąca fundamentalny dział logiki, koncentruje się na analizie i zrozumieniu pojęć oraz sposobów ich wyrażania poprzez nazwy. Jej głównym celem jest systematyczne badanie kluczowych aspektów związanych z pojęciami i ich językową reprezentacją.

## Kluczowe Obszary Badania

### Zakres Pojęć
Analiza zakresu odnosi się do zbioru wszystkich obiektów, do których dana nazwa może się odnosić. Jest to zbiór desygnatów, czyli konkretnych przedmiotów lub bytów, które wpadają pod dane pojęcie. Rozróżnianie zakresu pozwala na precyzyjne określenie, o czym dokładnie mówimy, używając danej nazwy.

### Znaczenie Pojęć
Badanie znaczenia (inaczej intensji, konotacji) dotyczy zespołu cech, właściwości lub atrybutów, które charakteryzują dane pojęcie. Obejmuje ono zestaw warunków, które musi spełniać obiekt, aby mógł być zaliczony do zakresu danego pojęcia. Zrozumienie znaczenia jest kluczowe dla właściwego definiowania i komunikacji.

### Klasyfikacja Pojęć
Logika Nazw zajmuje się również porządkowaniem i kategoryzacją pojęć. Klasyfikacja polega na grupowaniu pojęć w zależności od ich wspólnych cech i różnic, tworząc hierarchiczne struktury, które ułatwiają analizę i systematyzację wiedzy. Prawidłowa klasyfikacja jest podstawą dla budowania spójnych systemów pojęciowych.

### Operacje na Nazwach
Ten aspekt obejmuje zasady i metody przeprowadzania różnych działań na nazwach. Do najważniejszych operacji należą definicje (wyjaśnianie znaczenia nazw), podziały (rozbijanie pojęcia na podrzędne), a także relacje między nazwami, takie jak równoznaczność, podrzędność czy sprzeczność. Opanowanie tych operacji jest niezbędne do precyzyjnego myślenia i argumentowania.

---

Podsumowując, Logika Nazw dostarcza narzędzi do precyzyjnej analizy języka naturalnego w kontekście logicznym, umożliwiając jednoznaczne formułowanie myśli i unikanie błędów wynikających z niejasności pojęciowych.`,
      exampleQuestions: [
        "Czym jest zakres pojęcia?",
        "Na czym polega klasyfikacja pojęć?",
        "Jakie są najważniejsze operacje na nazwach?",
        "Dlaczego zrozumienie znaczenia pojęć jest istotne?",
      ],
    },
  },
  {
    id: "algebry_logiczne",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.algebry_logiczne
    ),
    data: {
      label: "Algebry Logiczne",
      description: "Analiza zmiennych i funkcji logicznych oraz ich właściwości algebraicznych.",
      article: `# Algebry Logiczne

Algebry Logiczne, znane również jako algebry Boole’a, stanowią fundamentalny dział logiki matematycznej i informatyki. Koncentrują się na analizie zmiennych i funkcji logicznych oraz ich właściwościach algebraicznych. Jest to formalny system matematyczny, który opisuje relacje między wartościami prawda i fałsz (często reprezentowanymi jako 1 i 0) za pomocą zbioru operacji i aksjomatów.

W przeciwieństwie do arytmetyki liczb rzeczywistych, algebra Boole’a operuje na skończonym zbiorze wartości, co czyni ją idealnym narzędziem do projektowania układów cyfrowych i analizy zagadnień logicznych.

## Zmienne i Funkcje Logiczne

W algebrze logicznej zmienne logiczne przyjmują tylko dwie wartości: **Prawda (1)** lub **Fałsz (0)**.

Funkcje logiczne to przyporządkowania, które dla każdej kombinacji wartości zmiennych wejściowych (argumentów) przypisują jedną wartość logiczną jako wynik. Funkcje te mogą być reprezentowane za pomocą:
- Tabel prawdy
- Wyrażeń algebraicznych
- Schematów logicznych

## Podstawowe Operacje Logiczne

Trzy podstawowe operacje logiczne, na których opiera się algebra Boole’a, to:

1. **Koniunkcja (AND)**
   Oznaczana jako $x \\land y$ (lub $x \\cdot y$), jest prawdziwa (1) tylko wtedy, gdy wszystkie jej argumenty są prawdziwe.

2. **Alternatywa (OR)**
   Oznaczana jako $x \\lor y$ (lub $x + y$), jest prawdziwa (1), gdy przynajmniej jeden z jej argumentów jest prawdziwy.

3. **Negacja (NOT)**
   Oznaczana jako $\\neg x$ (lub $\\bar{x}$), odwraca wartość logiczną argumentu. Jeśli argument jest prawdziwy (1), negacja jest fałszywa (0) i odwrotnie.

## Właściwości Algebraiczne i Aksjomaty

Algebra Boole’a charakteryzuje się zestawem aksjomatów i praw, które umożliwiają upraszczanie wyrażeń logicznych.

### Prawa przemienności (komutatywność)
- $x \\land y = y \\land x$
- $x \\lor y = y \\lor x$

### Prawa łączności (asocjatywność)
- $x \\land (y \\land z) = (x \\land y) \\land z$
- $x \\lor (y \\lor z) = (x \\lor y) \\lor z$

### Prawa rozdzielności (dystrybutywność)
- $x \\land (y \\lor z) = (x \\land y) \\lor (x \\land z)$
- $x \\lor (y \\land z) = (x \\lor y) \\land (x \\lor z)$

### Prawa absorpcji
- $x \\land (x \\lor y) = x$
- $x \\lor (x \\land y) = x$

### Prawa dopełnienia
- $x \\land \\neg x = 0$ (Fałsz)
- $x \\lor \\neg x = 1$ (Prawda)

### Elementy neutralne
- $x \\land 1 = x$
- $x \\lor 0 = x$

### Prawa de Morgana
Kluczowe prawa pozwalające zamieniać koniunkcję na alternatywę i odwrotnie przy użyciu negacji:
- $\\neg(x \\land y) = \\neg x \\lor \\neg y$
- $\\neg(x \\lor y) = \\neg x \\land \\neg y$

## Zastosowania

Algebry logiczne mają szerokie zastosowania, w szczególności w:
- **Elektronice cyfrowej**: projektowanie bramek logicznych i układów scalonych.
- **Informatyce**: teoria obwodów logicznych, optymalizacja zapytań w bazach danych, sztuczna inteligencja.
- **Logice formalnej**: analiza poprawności rozumowań.

Zrozumienie algebry Boole'a jest kluczowe dla każdego, kto zajmuje się podstawami funkcjonowania komputerów i systemów cyfrowych.`,
      exampleQuestions: [
        "Jakie są trzy podstawowe operacje w algebrze Boole'a?",
        "Na czym polegają prawa de Morgana?",
        "Jaka jest różnica między prawem rozdzielności dla koniunkcji a dla alternatywy?",
        "Dlaczego algebra Boole'a jest ważna w informatyce?",
      ],
    },
  },
  {
    //TODO: ogarnij artykul i pytania tutaj
    id: "reguły_wnioskowania",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.reguły_wnioskowania
    ),
    data: {
      label: "Reguły Wnioskowania",
      description:
        "Zasady i schematy poprawnego wyprowadzania wniosków z przesłanek.",
    },
  },
  {
    id: "podstawy_logiki_klasycznej",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.podstawy_logiki_klasycznej
    ),
    data: {
      label: "Podstawy Logiki Klasycznej",
      description: "Wprowadzenie do zasad logiki zdań, języka formalnego i jego struktur.",
      article: `# Podstawy Logiki Klasycznej

Wprowadzenie do podstaw logiki klasycznej rozpoczyna się od zrozumienia jej fundamentalnych zasad, które stanowią trzon racjonalnego myślenia i precyzyjnego rozumowania. Jest to dziedzina zajmująca się analizą poprawności wnioskowań i strukturą argumentów, niezależnie od ich konkretnej treści. Głównym celem jest dostarczenie narzędzi do formalizowania procesów myślowych, co pozwala na obiektywną ocenę ich spójności i prawdziwości.

## Logika Zdań

Jednym z kluczowych elementów logiki klasycznej jest logika zdań, zwana również rachunkiem zdań. Zajmuje się ona badaniem relacji między zdaniami prostymi i złożonymi. Podstawowymi elementami są zdania atomowe (proste, niedające się dalej rozłożyć) oraz spójniki logiczne.

Logika zdań pozwala na konstruowanie i analizowanie skomplikowanych wyrażeń logicznych oraz ocenę ich wartości logicznej (prawda/fałsz) na podstawie wartości logicznych ich składników.

### Podstawowe spójniki logiczne:
- **Koniunkcja (AND):** $P \\land Q$
- **Alternatywa (OR):** $P \\lor Q$
- **Negacja (NOT):** $\\neg P$
- **Implikacja (IF...THEN...):** $P \\to Q$
- **Równoważność (IF AND ONLY IF):** $P \\leftrightarrow Q$

## Język Formalny i Jego Struktury

Aby precyzyjnie analizować argumenty, logika klasyczna wykorzystuje języki formalne. Język formalny jest to system symboli i reguł, który pozwala na jednoznaczne wyrażanie myśli bez niejasności typowych dla języka naturalnego. Jego struktury obejmują:

1. **Alfabety**
   Zbiory symboli, z których buduje się wyrażenia (np. zmienne zdaniowe P, Q, R, spójniki logiczne, nawiasy).

2. **Reguły tworzenia**
   Zasady określające, które ciągi symboli są poprawnie zbudowanymi formułami (tzw. dobrze zbudowane formuły – ZBF). Definiują one syntaktyczną poprawność wyrażeń.

3. **Semantyka**
   Przypisywanie znaczenia (wartości logicznej) formułom. Dla logiki zdań, semantyka określa, w jaki sposób wartość logiczna złożonej formuły zależy od wartości logicznych jej składników.

4. **Reguły wnioskowania**
   Zasady pozwalające na wyprowadzanie nowych, prawdziwych formuł z już istniejących, prawdziwych formuł (np. *modus ponens*, *modus tollens*). Stanowią one podstawę formalnego dowodzenia twierdzeń.

---

Zrozumienie tych podstaw jest kluczowe dla dalszego studiowania bardziej zaawansowanych zagadnień logicznych, takich jak logika predykatów, teoria mnogości czy podstawy informatyki teoretycznej. Logika klasyczna dostarcza fundamentów dla wielu dziedzin nauki i techniki, kształtując zdolność do precyzyjnego i krytycznego myślenia.`,
      exampleQuestions: [
        "Czym zajmuje się logika zdań?",
        "Wymień i opisz podstawowe spójniki logiczne.",
        "Co składa się na strukturę języka formalnego?",
        "Do czego służą reguły wnioskowania?",
      ],
    },
  },
  {
    id: "logika_predykatow",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      INNER_RADIUS,
      firstLevelAngles.logika_predykatow
    ),
    data: {
      label: "Logika Predykatów",
      description: "Formalizacja zdań z użyciem predykatów i kwantyfikatorów, budowa systemów formalnych.",
      article: `# Logika Predykatów

Logika Predykatów, znana również jako rachunek predykatów pierwszego rzędu, stanowi rozszerzenie logiki zdań, umożliwiając analizę wewnętrznej struktury zdań. W przeciwieństwie do logiki zdań, która traktuje całe zdania jako nierozerwalne jednostki, logika predykatów wnika w szczegóły, pozwalając na formalizację właściwości obiektów, relacji między nimi oraz zakresu, do którego te właściwości i relacje się odnoszą.

Kluczowym elementem logiki predykatów jest zdolność do formalizacji zdań złożonych z użyciem predykatów i kwantyfikatorów, co umożliwia precyzyjny opis światów modelowych i wnioskowanie na ich podstawie.

## Predykaty

**Predykaty** są symbolami reprezentującymi właściwości obiektów lub relacje między nimi. Mogą być jednoargumentowe (właściwość jednego obiektu) lub wieloargumentowe (relacja między wieloma obiektami).

Przykładowo:
- Predykat jednoargumentowy "jest_człowiekiem" może być oznaczony jako $C(x)$, gdzie $x$ jest zmienną reprezentującą obiekt.
- Predykat dwuargumentowy "jest_rodzicem" może być oznaczony jako $R(x,y)$, co oznacza, że $x$ jest rodzicem $y$.

Zmienne w predykatach reprezentują argumenty, które mogą być podstawiane przez stałe (np. imiona, konkretne obiekty) lub inne zmienne.

## Kwantyfikatory

Kwantyfikatory określają zasięg, do którego odnosi się predykat. W logice predykatów wyróżniamy dwa podstawowe kwantyfikatory:

### Kwantyfikator ogólny (uniwersalny)
Oznaczany symbolem $\\forall$ (czyt. "dla każdego", "dla wszystkich"). Stosowany jest do wyrażania, że pewna właściwość lub relacja dotyczy każdego elementu w dziedzinie.

> Przykład: Zdanie "Każdy człowiek jest śmiertelny" można sformalizować jako $\\forall x(C(x) \\Rightarrow M(x))$, gdzie $C(x)$ oznacza "x jest człowiekiem", a $M(x)$ "x jest śmiertelny".

### Kwantyfikator egzystencjalny
Oznaczany symbolem $\\exists$ (czyt. "istnieje", "dla pewnego"). Używany jest do stwierdzenia, że istnieje przynajmniej jeden element w dziedzinie, który posiada określoną właściwość lub dla którego zachodzi pewna relacja.

> Przykład: Zdanie "Istnieje człowiek, który jest śmiertelny" można sformalizować jako $\\exists x(C(x) \\land M(x))$.

## Formalizacja Zdań

Formalizacja zdań polega na tłumaczeniu zdań języka naturalnego na precyzyjne formuły logiki predykatów. Proces ten wymaga zidentyfikowania predykatów, stałych, zmiennych oraz odpowiedniego zastosowania kwantyfikatorów i spójników logicznych (takich jak koniunkcja $\\land$, alternatywa $\\lor$, implikacja $\\Rightarrow$, negacja $\\neg$) pochodzących z logiki zdań. Dzięki formalizacji możliwe jest jednoznaczne przedstawienie treści, co jest kluczowe dla analizy argumentów i wnioskowań.

## Budowa Systemów Formalnych

Logika predykatów służy jako fundament do budowy złożonych systemów formalnych. Taki system składa się z:

1. **Alfabetu**: Zbioru symboli (stałych, zmiennych, predykatów, spójników, kwantyfikatorów, nawiasów).
2. **Gramatyki (reguł formowania)**: Definiujących, które sekwencje symboli są poprawnie zbudowanymi formułami (tzw. WFF – Well-Formed Formulas).
3. **Aksjomatów**: Zbioru formuł uznanych za prawdziwe bez dowodu.
4. **Reguł wnioskowania**: Zasad pozwalających na wyprowadzanie nowych prawdziwych formuł (twierdzeń) z aksjomatów i już udowodnionych twierdzeń. Najpopularniejszą regułą jest *modus ponens*.

Budowa takich systemów pozwala na precyzyjną analizę poprawności wnioskowań, dowodzenie twierdzeń oraz rozwój teorii matematycznych i filozoficznych na solidnych podstawach logicznych.`,
      exampleQuestions: [
        "Czym różni się logika predykatów od logiki zdań?",
        "Jakie są dwa podstawowe rodzaje kwantyfikatorów?",
        "Sformalizuj zdanie 'Każdy człowiek jest śmiertelny'.",
        "Z jakich elementów składa się system formalny?",
      ],
    },
  },

  // ============ SECOND LEVEL - Logika Rozmyta children ============
  {
    id: "zbiory_i_zdania_rozmyte",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_rozmyta - 0.25
    ),
    data: {
      label: "Zbiory i Zdania Rozmyte",
      description: "Zbiory z funkcją przynależności przyjmującą wartości z przedziału [0,1] oraz zdania o niejednoznacznych wartościach prawdy.",
      article: `# Zbiory i Zdania Rozmyte

Zbiory rozmyte stanowią rozszerzenie klasycznych zbiorów, w których przynależność elementu do zbioru nie jest kwestią binarną (należy/nie należy), lecz stopniowalną.

## Zbiory Rozmyte i Funkcja Przynależności

Kluczowym elementem zbioru rozmytego jest **funkcja przynależności**, która każdemu elementowi przestrzeni przyporządkowuje wartość z przedziału **[0,1]**.

- **0** oznacza całkowity brak przynależności.
- **1** oznacza pełną przynależność.
- **Wartości pośrednie (np. 0.5)** wskazują na częściową przynależność do zbioru.

## Zdania Rozmyte

Zdania rozmyte, będące częścią logiki rozmytej, odchodzą od klasycznej dychotomii prawda/fałsz. W przeciwieństwie do logiki dwuwartościowej, gdzie zdanie jest albo w pełni prawdziwe (1), albo w pełni fałszywe (0), zdania rozmyte mogą przyjmować **niejednoznaczne wartości prawdy z przedziału [0,1]**.

Oznacza to, że zdanie może być częściowo prawdziwe, co pozwala na bardziej elastyczne modelowanie nieprecyzyjnych i nieostrych informacji, często spotykanych w języku naturalnym i procesach decyzyjnych.`,
      exampleQuestions: [
        "Czym jest funkcja przynależności?",
        "Jaka jest różnica między zdaniem klasycznym a rozmytym?",
        "Co oznacza wartość 0.5 w kontekście zbiorów rozmytych?",
        "Gdzie znajdują zastosowanie zdania rozmyte?",
      ],
    },
  },
  {
    id: "operacje_logiczne_rozmyte",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_rozmyta - 0.5
    ),
    data: {
      label: "Operacje Logiczne Rozmyte",
      description: "Negacja, koniunkcja, alternatywa, implikacja i równoważność w kontekście wartości rozmytych.",
      article: `# Operacje Logiczne Rozmyte

Operacje logiczne rozmyte stanowią fundament logiki rozmytej, rozszerzając klasyczne operatory Boole'a na dziedzinę wartości rozmytych. W odróżnieniu od logiki binarnej, gdzie wartości logiczne są ograniczone do prawdy (1) lub fałszu (0), logika rozmyta pozwala na stopnie prawdy reprezentowane przez liczby rzeczywiste w przedziale **[0, 1]**.

Oznacza to, że zdanie może być częściowo prawdziwe, na przykład w stopniu 0.7.

## Negacja Rozmyta
Negacja rozmyta (**NOT**) jest operacją jednoargumentową, która odwraca stopień przynależności. Najczęściej stosowana standardowa negacja jest zdefiniowana jako:

$$N(A) = 1 - A$$

Gdzie $A$ jest wartością rozmytą z przedziału [0, 1].
> Przykład: Jeśli zdanie jest prawdziwe w stopniu 0.8, jego negacja jest prawdziwa w stopniu $1 - 0.8 = 0.2$.

## Koniunkcja Rozmyta
Koniunkcja rozmyta (**AND**) jest operacją dwuargumentową. W logice rozmytej istnieje wiele funkcji spełniających aksjomaty koniunkcji (tzw. T-normy). Najpopularniejsze to:

- **Operator minimum (Gödel):**
  $$T(A, B) = \\min(A, B)$$

- **Operator iloczynu (Goguen):**
  $$T(A, B) = A \\cdot B$$

- **T-norma Łukasiewicza:**
  $$T(A, B) = \\max(0, A + B - 1)$$

## Alternatywa Rozmyta
Alternatywa rozmyta (**OR**) reprezentuje stopień prawdy, gdy co najmniej jeden z argumentów jest prawdziwy (tzw. S-normy lub T-konormy):

- **Operator maksimum (Gödel):**
  $$S(A, B) = \\max(A, B)$$

- **Operator sumy probabilistycznej:**
  $$S(A, B) = A + B - A \\cdot B$$

- **S-norma Łukasiewicza (suma ograniczona):**
  $$S(A, B) = \\min(1, A + B)$$

## Implikacja Rozmyta
Implikacja rozmyta (**IF...THEN...**) odgrywa kluczową rolę w systemach reguł rozmytych.

- **Implikacja Kleene'a-Dienesa:**
  $$I(A, B) = \\max(1 - A, B)$$

- **Implikacja Gödela:**
  $$I(A, B) = \\begin{cases} 1 & \\text{jeśli } A \\le B \\\\ B & \\text{jeśli } A > B \\end{cases}$$

- **Implikacja Łukasiewicza:**
  $$I(A, B) = \\min(1, 1 - A + B)$$

## Równoważność Rozmyta
Równoważność rozmyta (**IFF**) mierzy stopień, w jakim dwie rozmyte wartości są identyczne. Często jest definiowana jako:

- **Na podstawie różnicy (podobieństwo):**
  $$E(A, B) = 1 - |A - B|$$

- **Jako dwukierunkowa implikacja:**
  $$E(A, B) = T(I(A, B), I(B, A))$$`,
      exampleQuestions: [
        "Jak oblicza się negację w logice rozmytej?",
        "Czym są T-normy i S-normy?",
        "Jaka jest różnica między operatorem minimum a iloczynu w koniunkcji?",
        "Podaj przykład obliczenia implikacji Łukasiewicza dla A=0.6 i B=0.4.",
      ],
    },
  },
  {
    //TODO: ogarnij artykul i pytania tutaj
    id: "pojecie_nieostrosci",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_rozmyta + 0.1
    ),
    data: {
      label: "Pojęcie Nieostrości",
      description:
        "Koncept rozmycia i niedokładności w logice i matematyce, wychodzący poza binarność.",
    },
  },

  // ============ SECOND LEVEL - Logika Nazw children ============
  {
    id: "typologia_nazw",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_nazw - 0.2
    ),
    data: {
      label: "Typologia Nazw",
      description: "Klasyfikacja nazw na puste, jednostkowe, ogólne, konkretne, abstrakcyjne, pozytywne, negatywne, względne, niewzględne.",
      article: `# Typologia Nazw

W logice, typologia nazw odnosi się do klasyfikacji terminów lub wyrażeń ze względu na ich właściwości semantyczne i odniesienie do rzeczywistości. Prawidłowe rozróżnianie typów nazw jest kluczowe dla precyzyjnego formułowania myśli i argumentów.

## Klasyfikacja nazw

### Nazwy puste
Są to nazwy, które nie mają żadnego desygnatu w rzeczywistości, czyli nie wskazują na żaden istniejący przedmiot.
> Przykłady: "jednorożec" (jeśli traktujemy go jako nieistniejącą istotę), "kwadratowe koło" lub "największa liczba pierwsza".

### Nazwy jednostkowe
Odnoszą się do dokładnie jednego, konkretnego przedmiotu. Desygnatem nazwy jednostkowej jest zawsze pojedynczy obiekt.
> Przykłady: "Polska" (państwo), "najwyższy szczyt świata" (Mount Everest) lub "obecny prezydent Stanów Zjednoczonych".

### Nazwy ogólne
Odnoszą się do więcej niż jednego desygnatu, czyli do całej klasy przedmiotów. Ich desygnatami są co najmniej dwa przedmioty, a często wiele.
> Przykłady: "człowiek", "drzewo", "rzeka" czy "miasto".

### Nazwy konkretne
Wskazują na konkretne przedmioty, istoty lub zjawiska, które mają byt fizyczny lub dają się doświadczyć zmysłowo. Mogą to być rzeczy, osoby, zwierzęta.
> Przykłady: "stół", "pies", "Jan Kowalski", "góra".

### Nazwy abstrakcyjne
Odnoszą się do cech, właściwości, stanów, relacji lub pojęć, które nie mają bytu fizycznego i nie są uchwytne zmysłowo, ale są wynikiem abstrakcji.
> Przykłady: "piękno", "mądrość", "sprawiedliwość", "miłość", "suma", "relacja".

### Nazwy pozytywne
Wskazują na posiadanie jakiejś cechy, właściwości lub atrybutu. Określają, czym coś jest.
> Przykłady: "biały", "mądry", "istniejący", "zdolny".

### Nazwy negatywne
Wskazują na brak jakiejś cechy, właściwości lub atrybutu. Określają, czym coś nie jest. Często tworzone są z przedrostkiem "nie-" lub innymi formami negacji.
> Przykłady: "nie-biały", "niemądry", "nieistniejący", "niezdolny", "ślepy" (jako brak wzroku).

### Nazwy względne (relatywne)
Ich znaczenie lub desygnacja zależy od odniesienia do innego przedmiotu lub pojęcia. Wymagają kontekstu, aby móc je w pełni zrozumieć.
> Przykłady: "ojciec" (zawsze ojciec kogoś), "szef" (szef czegoś/kogoś), "większy" (większy od czegoś), "przyjaciel".

### Nazwy niewzględne (nierelatywne)
Ich znaczenie jest zrozumiałe samo przez się i nie wymaga odniesienia do innego przedmiotu, aby je określić.
> Przykłady: "człowiek", "drzewo", "kamień", "zielony" (o kolorze).`,
      exampleQuestions: [
        "Jaka jest różnica między nazwą jednostkową a ogólną?",
        "Podaj przykład nazwy abstrakcyjnej.",
        "Co oznacza, że nazwa jest pusta?",
        "Czym charakteryzują się nazwy względne?",
      ],
    },
  },
  {
    id: "operacje_na_nazwach",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_nazw + 0.15
    ),
    data: {
      label: "Operacje na Nazwach",
      description: "Działania takie jak ograniczenie, uogólnienie, dodawanie (suma), mnożenie (przekrój), odejmowanie i podział nazw.",
      article: `# Operacje na Nazwach

W kontekście logiki, operacje na nazwach stanowią fundamentalne działania pozwalające na manipulowanie i analizowanie zakresów pojęciowych. Obejmują one szereg działań, które umożliwiają precyzyjne określanie, łączenie, różnicowanie i dzielenie zbiorów desygnatów nazw.

## Rodzaje Operacji na Nazwach

### Ograniczenie nazwy
Jest to operacja polegająca na zmniejszeniu zakresu nazwy poprzez dodanie do niej cech. W rezultacie powstaje nazwa o węższym zakresie desygnatów, ale często o bogatszej treści.
> Przykład: Ograniczenie nazwy "pies" przez dodanie cechy "rasowy" daje "pies rasowy".

### Uogólnienie nazwy
To działanie odwrotne do ograniczenia. Polega na usunięciu niektórych cech z nazwy, co prowadzi do rozszerzenia jej zakresu. Nazwa staje się bardziej ogólna, obejmując większą liczbę desygnatów, kosztem jej treści.
> Przykład: Uogólnienie nazwy "róża" może dać "kwiat".

### Dodawanie nazw (Suma)
Operacja ta polega na utworzeniu nowej nazwy, której zakres desygnatów jest sumą zakresów desygnatów nazw składowych. Desygnatem nowej nazwy jest wszystko, co jest desygnatem którejkolwiek z dodawanych nazw. Jest to odpowiednik sumy zbiorów.

### Mnożenie nazw (Przekrój)
W wyniku tej operacji powstaje nazwa, której zakres desygnatów obejmuje wyłącznie te desygnaty, które należą jednocześnie do zakresów wszystkich mnożonych nazw. Jest to odpowiednik przekroju zbiorów.

### Odejmowanie nazw
Polega na utworzeniu nazwy, której zakres desygnatów to te desygnaty pierwszej nazwy, które nie należą do zakresu drugiej nazwy. Jest to odpowiednik różnicy zbiorów.

### Podział nazw
Ta operacja polega na rozłożeniu zakresu danej nazwy na mniejsze, wzajemnie wykluczające się i łącznie wyczerpujące zakresy nazw podrzędnych. Celem jest usystematyzowanie i uporządkowanie wiedzy o danym pojęciu.
> Przykład: Podział nazwy "zwierzę" na "ssak", "ptak", "gad" itd.

---

Zrozumienie tych operacji jest kluczowe dla precyzyjnego myślenia i argumentowania w ramach logiki, pozwalając na jasne definiowanie pojęć i relacji między nimi.`,
      exampleQuestions: [
        "Na czym polega różnica między ograniczeniem a uogólnieniem nazwy?",
        "Jak definiuje się mnożenie nazw (przekrój)?",
        "Podaj przykład podziału logicznego nazwy.",
        "Co jest celem stosowania operacji na nazwach?",
      ],
    },
  },
  {
    id: "zakres_i_znaczenie",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_nazw + 0.4
    ),
    data: {
      label: "Zakres i Znaczenie",
      description: "Zbiór desygnatów (zakres) i zespół cech (znaczenie) definiujące nazwę.",
      article: `# Zakres i Znaczenie

W dziedzinie logiki, kluczowe jest rozróżnienie i zrozumienie pojęć zakresu oraz znaczenia nazwy. Są to dwa fundamentalne aspekty, które definiują każdą nazwę, umożliwiając precyzyjne komunikowanie się i rozumowanie.

## Zakres Nazwy
Zakres nazwy, znany również jako **ekstensja** lub **denotacja**, odnosi się do zbioru wszystkich desygnatów, czyli konkretnych bytów, przedmiotów, osób lub zjawisk, do których dana nazwa może być poprawnie odniesiona.

Jest to klasa wszystkich elementów, które spełniają kryteria bycia określoną nazwą.
> Przykład: Zakres nazwy „stół” obejmuje wszystkie stoły, które kiedykolwiek istniały, istnieją i będą istnieć. Im więcej obiektów pasuje do danej nazwy, tym szerszy jest jej zakres.

## Znaczenie Nazwy
Znaczenie nazwy, nazywane również **intensją**, **konotacją** lub **treścią**, to zespół cech, które musi posiadać dany obiekt, aby mógł być poprawnie określony daną nazwą. Są to te właściwości, które wspólnie definiują nazwę i odróżniają ją od innych.

> Przykład: Znaczenie nazwy „stół” może obejmować takie cechy jak: mebel, posiadający płaską powierzchnię, zwykle na nogach, służący do spożywania posiłków, pracy itp. Im więcej cech musi spełniać obiekt, tym bogatsze jest znaczenie nazwy.

## Zależność między Zakresem a Znaczeniem
Pomiędzy zakresem a znaczeniem nazwy istnieje odwrotna zależność:

1. **Im bogatsze (obszerniejsze) znaczenie nazwy** (więcej cech charakteryzujących), tym węższy (mniejszy) jest jej zakres (mniej desygnatów spełnia wszystkie te cechy).
2. **Im uboższe (mniej cech) znaczenie nazwy**, tym szerszy jest jej zakres (więcej desygnatów może być nią nazwane).

> Przykład: Nazwa „ssak” ma bardzo szeroki zakres, ale jej znaczenie jest stosunkowo ubogie w porównaniu do nazwy „pies rasy labrador”, która ma znacznie węższy zakres, ale bogatsze znaczenie (znacznie więcej specyficznych cech).

W logice precyzyjne operowanie tymi dwoma pojęciami jest fundamentem dla jasnego definiowania terminów i budowania poprawnych rozumowań.`,
      exampleQuestions: [
        "Czym różni się zakres nazwy od jej znaczenia?",
        "Jakie inne terminy stosuje się na określenie zakresu i znaczenia?",
        "Jaka zależność występuje między treścią a zakresem nazwy?",
        "Podaj przykład nazwy o szerokim zakresie i ubogim znaczeniu.",
      ],
    },
  },

  // ============ SECOND LEVEL - Algebry Logiczne children ============
  {
    id: "zmienne_i_funkcje_logiczne",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.algebry_logiczne + 0.25
    ),
    data: {
      label: "Zmienne i Funkcje Logiczne",
      description: "Zmienne przyjmujące wartości logiczne (0 lub 1) oraz funkcje przetwarzające te wartości.",
      article: `# Zmienne i Funkcje Logiczne

## Wprowadzenie

W kontekście logiki, **zmienne logiczne** to podstawowe elementy, które mogą przyjmować jedynie dwie wartości: **0 (fałsz)** lub **1 (prawda)**. Są one fundamentem dla analizy i projektowania obwodów cyfrowych oraz w informatyce teoretycznej.

**Funkcje logiczne**, znane również jako bramki logiczne, to operacje przetwarzające te wartości logiczne. Przyjmują one jedną lub więcej zmiennych logicznych jako wejście i generują jedną zmienną logiczną jako wyjście. Ich działanie jest ściśle określone **tabelami prawdy**, które przedstawiają wszystkie możliwe kombinacje wejść i odpowiadające im wyjścia.

## Podstawowe Funkcje Logiczne

- **NEGACJA (NOT):**
  Funkcja jednoargumentowa, która odwraca wartość logiczną. Jeśli wejście to 0, wyjście to 1; jeśli wejście to 1, wyjście to 0.

- **KONIUNKCJA (AND):**
  Funkcja dwuargumentowa, która daje wynik 1 tylko wtedy, gdy wszystkie jej wejścia mają wartość 1. W przeciwnym razie wynik to 0.

- **ALTERNATYWA (OR):**
  Funkcja dwuargumentowa, która daje wynik 1, jeśli co najmniej jedno z jej wejść ma wartość 1. Wynik to 0 tylko wtedy, gdy wszystkie wejścia mają wartość 0.

- **SUMA MODULO 2 (XOR - exclusive OR):**
  Funkcja dwuargumentowa, która daje wynik 1, jeśli wejścia mają różne wartości (jedno 0, drugie 1). Jeśli wejścia mają te same wartości (oba 0 lub oba 1), wynik to 0.

---

Zmienne i funkcje logiczne stanowią podstawę algebry Boole’a, która jest niezastąpionym narzędziem w projektowaniu systemów cyfrowych, programowaniu oraz w wielu dziedzinach informatyki i elektroniki.`,
      exampleQuestions: [
        "Jakie wartości mogą przyjmować zmienne logiczne?",
        "Na czym polega działanie funkcji XOR?",
        "Co to jest tabela prawdy?",
        "Jaka jest różnica między funkcją AND a OR?",
      ],
    },
  },
  {
    id: "algebra_boolea",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.algebry_logiczne
    ),
    data: {
      label: "Algebra Boole’a",
      description: "Struktura algebraiczna z operacjami koniunkcji, alternatywy i negacji, fundamentalna dla cyfrowych układów.",
      article: `# Algebra Boole’a

Algebra Boole’a jest strukturą algebraiczną, która stanowi fundamentalną podstawę dla projektowania i analizy cyfrowych układów elektronicznych.

Charakteryzuje się ona zastosowaniem specyficznych operacji logicznych, takich jak:
- **Koniunkcja** (AND)
- **Alternatywa** (OR)
- **Negacja** (NOT)

Te operacje są kluczowe dla manipulacji wartościami logicznymi (prawdą i fałszem, często reprezentowanymi jako 1 i 0), co jest niezbędne w cyfrowych układach logicznych.

Jej zasady są nieodzowne w informatyce, elektronice cyfrowej oraz teorii obwodów, umożliwiając tworzenie i optymalizację złożonych systemów logicznych z prostych elementów.`,
      exampleQuestions: [
        "Jakie są podstawowe operacje w algebrze Boole'a?",
        "Dlaczego algebra Boole'a jest ważna dla układów cyfrowych?",
        "Co oznaczają wartości 1 i 0 w algebrze Boole'a?",
      ],
    },
  },
  {
    id: "własnosci_algebr_logicznych",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.algebry_logiczne - 0.2
    ),
    data: {
      label: "Własności Algebr Logicznych",
      description: "Prawa przemienności, łączności, rozdzielczości i dopełnienia obowiązujące w algebrach logicznych.",
      article: `# Własności Algebr Logicznych

Algebry logiczne, znane również jako algebry Boole’a, stanowią fundamentalny element matematyki dyskretnej i informatyki, opisujący operacje na wartościach logicznych (prawda/fałsz lub 1/0).

Ich struktura opiera się na zbiorze elementów wraz z dwoma działaniami binarnymi (sumą logiczną "LUB" i iloczynem logicznym "I") oraz jednym działaniem unarnym (negacją "NIE"). Kluczowymi dla zrozumienia algebr logicznych są prawa, które nimi rządzą.

## Prawa przemienności
Prawa przemienności stwierdzają, że kolejność operandów w działaniach sumy i iloczynu logicznego nie ma wpływu na wynik.

- **Sumowanie logiczne:** $A \\lor B = B \\lor A$
- **Mnożenie logiczne:** $A \\land B = B \\land A$

## Prawa łączności
Prawa łączności dotyczą grupowania operandów w przypadku wykonywania tych samych działań wielokrotnie. Kolejność wykonywania operacji nie wpływa na wynik, co pozwala na swobodne grupowanie wyrażeń.

- **Dla sumy logicznej:** $(A \\lor B) \\lor C = A \\lor (B \\lor C)$
- **Dla iloczynu logicznego:** $(A \\land B) \\land C = A \\land (B \\land C)$

## Prawa rozdzielczości
Prawa rozdzielczości opisują, jak działania logiczne oddziałują na siebie nawzajem. W algebrze logicznej występują dwie formy tych praw:

1. **Iloczyn logiczny jest rozdzielny względem sumy logicznej:**
   $$A \\land (B \\lor C) = (A \\land B) \\lor (A \\land C)$$

2. **Suma logiczna jest rozdzielna względem iloczynu logicznego:**
   $$A \\lor (B \\land C) = (A \\lor B) \\land (A \\lor C)$$

## Prawa dopełnienia
Prawa dopełnienia (negacji) dotyczą relacji między elementem a jego negacją. W algebrze Boole’a każdy element ma swoje dopełnienie, które ma następujące właściwości:

- **Suma logiczna elementu i jego dopełnienia** zawsze daje element neutralny dla iloczynu (Prawda/1):
  $$A \\lor \\neg A = 1$$

- **Iloczyn logiczny elementu i jego dopełnienia** zawsze daje element neutralny dla sumy (Fałsz/0):
  $$A \\land \\neg A = 0$$

Te fundamentalne prawa stanowią podstawę dla upraszczania wyrażeń logicznych, projektowania układów cyfrowych oraz w wielu innych zastosowaniach informatyki i matematyki.`,
      exampleQuestions: [
        "Na czym polegają prawa przemienności?",
        "Jaki jest wynik sumy logicznej elementu i jego dopełnienia?",
        "Wymień dwie formy praw rozdzielczości.",
        "Czy kolejność grupowania ma znaczenie w algebrze logicznej?",
      ],
    },
  },

  // ============ SECOND LEVEL - Reguły Wnioskowania children ============
  {
    id: "reguły_inferencyjne",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.reguły_wnioskowania - 0.35
    ),
    data: {
      label: "Reguły Inferencyjne",
      description: "Zbiór zasad używanych do generowania nowych zdań z istniejących, np. Modus Ponens.",
      article: `# Reguły Inferencyjne w Logice

Reguły inferencyjne, znane również jako reguły wnioskowania, to zbiór zasad używanych do generowania nowych zdań lub konkluzji z istniejących przesłanek. Stanowią one fundamentalny element logiki, umożliwiając systematyczne i formalne wyprowadzanie wniosków, które są logicznie konieczne, jeśli przesłanki są prawdziwe.

Głównym celem reguł inferencyjnych jest zapewnienie, że proces wnioskowania jest poprawny. Oznacza to, że jeśli zaczniemy od prawdziwych przesłanek i zastosujemy uznane reguły inferencyjne, otrzymamy konkluzję, która również musi być prawdziwa. Dzięki temu logika dostarcza narzędzi do analizy argumentów i sprawdzania ich ważności.

## Przykłady Reguł Inferencyjnych

### Modus Ponens (tryb potwierdzający)
Jest to jedna z najbardziej podstawowych i najczęściej stosowanych reguł inferencyjnych. Mówi ona, że jeśli mamy dwie przesłanki: jedną w formie implikacji („Jeśli P, to Q”) i drugą, która stwierdza prawdziwość poprzednika (P), to możemy logicznie wnioskować o prawdziwości następnika (Q).

Formalnie, Modus Ponens można przedstawić następująco:
$$ (P \\to Q) \\land P \\implies Q $$

Co oznacza: jeśli P implikuje Q, i P jest prawdziwe, to Q musi być prawdziwe.

> **Przykład:**
> - **Przesłanka 1:** Jeśli pada deszcz, to ulice są mokre.
> - **Przesłanka 2:** Pada deszcz.
> - **Konkluzja:** Ulice są mokre.

Reguły inferencyjne są kluczowe w wielu dziedzinach, od filozofii i matematyki po informatykę (zwłaszcza w systemach eksperckich i sztucznej inteligencji), gdzie precyzyjne i formalne rozumowanie jest niezbędne.`,
      exampleQuestions: [
        "Na czym polega reguła Modus Ponens?",
        "Jaki jest główny cel stosowania reguł inferencyjnych?",
        "Co musi być spełnione, aby konkluzja była prawdziwa?",
        "W jakich dziedzinach wykorzystuje się reguły wnioskowania?",
      ],
    },
  },
  {
    id: "schematy_wnioskowan",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.reguły_wnioskowania - 0.1
    ),
    data: {
      label: "Schematy Wnioskowań",
      description: "Formalne struktury reprezentujące procesy dedukcyjne.",
      article: `# Schematy Wnioskowań

Schematy wnioskowań, w kontekście logiki, stanowią formalne struktury reprezentujące procesy dedukcyjne. Są to ogólne wzorce rozumowań, które pozwalają na wyprowadzanie konkluzji z przesłanek w sposób poprawny logicznie.

Ich fundamentalnym zadaniem jest zapewnienie niezawodności procesu wnioskowania, co oznacza, że jeśli wszystkie przesłanki są prawdziwe, to konkluzja również musi być prawdziwa. Obejmują one abstrakcyjne formy argumentów, gdzie konkretne zdania są zastąpione zmiennymi logicznymi.

## Wybrane Powszechne Schematy Wnioskowań

### Modus Ponens
Jeśli P, to Q. P. Zatem Q.
> Ten schemat stwierdza, że z implikacji oraz potwierdzenia jej poprzednika wynika potwierdzenie następnika.

### Modus Tollens
Jeśli P, to Q. Nieprawda, że Q. Zatem nieprawda, że P.
> Opiera się na zaprzeczeniu następnika implikacji, co prowadzi do zaprzeczenia poprzednika.

### Sylogizm Hipotetyczny
Jeśli P, to Q. Jeśli Q, to R. Zatem jeśli P, to R.
> Ten schemat pozwala na łączenie dwóch implikacji w jedną, tworząc łańcuch przyczynowo-skutkowy.

### Dysjunktywny Sylogizm
P lub Q. Nieprawda, że P. Zatem Q.
> Stwierdza, że jeśli mamy alternatywę i zaprzeczamy jednemu jej członowi, to drugi musi być prawdziwy.

### Prawo Dylematu Konstruktywnego
(P lub R) i (jeśli P, to Q) i (jeśli R, to S). Zatem (Q lub S).
> Pozwala na wyciągnięcie alternatywnej konkluzji z alternatywnych przesłanek, gdzie każda z nich prowadzi do określonego skutku.

---

Schematy wnioskowań są podstawą weryfikacji poprawności argumentów. Argument jest poprawny, jeśli jego struktura odpowiada walidnemu schematowi wnioskowania. Niepoprawne schematy (błędy logiczne) nie gwarantują prawdziwości konkluzji, nawet jeśli przesłanki są prawdziwe.`,
      exampleQuestions: [
        "Na czym polega schemat Modus Ponens?",
        "Czym różni się Modus Tollens od Modus Ponens?",
        "Podaj przykład zastosowania sylogizmu hipotetycznego.",
        "Kiedy argument uznajemy za poprawny formalnie?",
      ],
    },
  },
  {
    id: "logika_zdan_jako_system_aksjomatyczny",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.reguły_wnioskowania + 0.15
    ),
    data: {
      label: "Logika Zdań jako System Aksjomatyczny",
      description: "Przedstawienie logiki zdań jako formalnego systemu z aksjomatami i regułami wnioskowania.",
      article: `# Logika Zdań jako System Aksjomatyczny

Logika zdań, przedstawiona jako system aksjomatyczny, stanowi formalne podejście do wnioskowania, gdzie pewne fundamentalne prawdy (aksjomaty) są przyjmowane bez dowodu, a wszystkie inne twierdzenia są wyprowadzane z nich za pomocą ściśle określonych reguł wnioskowania. Taki system pozwala na precyzyjne definiowanie pojęć takich jak dowód, twierdzenie i spójność.

## Podstawowe Elementy Systemu Aksjomatycznego

### Alfabet
Alfabet formalnego systemu logiki zdań składa się z następujących symboli:
- **Zmienne zdaniowe**: Symbolizują proste zdania, np. $p, q, r$ lub $P_1, P_2, ...$
- **Spójniki logiczne**: Najczęściej są to negacja ($\\neg$) i implikacja ($\\to$). Inne spójniki, takie jak koniunkcja ($\\land$), alternatywa ($\\lor$) czy równoważność ($\\leftrightarrow$), mogą być definiowane za ich pomocą.
- **Symbole pomocnicze**: Nawiasy okrągłe $(, )$ służące do grupowania formuł.

### Formuły Dobrze Zbudowane (FZZ)
Formuły dobrze zbudowane (FZZ) to poprawnie skonstruowane wyrażenia systemu, tworzone rekurencyjnie:
1. Każda zmienna zdaniowa jest FZZ.
2. Jeśli $A$ jest FZZ, to $(\\neg A)$ jest FZZ.
3. Jeśli $A$ i $B$ są FZZ, to $(A \\to B)$ jest FZZ.

## Aksjomaty

Aksjomaty to wybrane FZZ, przyjmowane jako prawdziwe bez dowodu. W systemie Hilberta często stosuje się następujące schematy aksjomatów (dla dowolnych formuł $\\phi, \\psi, \\chi$):

1. **A1:** $\\phi \\to (\\psi \\to \\phi)$
2. **A2:** $(\\phi \\to (\\psi \\to \\chi)) \\to ((\\phi \\to \\psi) \\to (\\phi \\to \\chi))$
3. **A3:** $(\\neg \\psi \\to \\neg \\phi) \\to (\\phi \\to \\psi)$

## Reguły Wnioskowania

Reguły wnioskowania określają, jak z aksjomatów lub twierdzeń wyprowadzać nowe twierdzenia. Najważniejszą regułą jest **Reguła Odrywania (Modus Ponens, MP)**:

> Jeśli mamy formuły $A$ oraz $A \\to B$, to możemy wyprowadzić formułę $B$.

Zapis formalny:
$$ \\frac{A, A \\to B}{B} $$

## Pojęcie Dowodu i Twierdzenia

- **Dowód**: Skończony ciąg formuł, gdzie każda jest aksjomatem lub wynika z wcześniejszych formuł na mocy reguł wnioskowania.
- **Twierdzenie**: Formuła, dla której istnieje dowód w systemie.

## Właściwości Systemu Aksjomatycznego

- **Spójność**: System jest spójny, jeśli nie można w nim udowodnić zarówno formuły $\\phi$, jak i jej negacji $\\neg \\phi$.
- **Pełność**: System jest pełny, jeśli wszystkie tautologie są twierdzeniami tego systemu.
- **Rozstrzygalność**: Istnieje algorytm, który pozwala stwierdzić, czy dana formuła jest twierdzeniem systemu.`,
      exampleQuestions: [
        "Czym różni się aksjomat od twierdzenia?",
        "Na czym polega reguła Modus Ponens?",
        "Kiedy system aksjomatyczny uznajemy za spójny?",
        "Jak definiuje się formuły dobrze zbudowane?",
      ],
    },
  },

  // ============ SECOND LEVEL - Podstawy Logiki Klasycznej children ============
  {
    id: "operacje_logiczne_na_zdaniach",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.podstawy_logiki_klasycznej - 0.15
    ),
    data: {
      label: "Operacje Logiczne na Zdaniach",
      description: "Funkcje i spójniki logiczne takie jak negacja, koniunkcja, alternatywa, implikacja i równoważność.",
      article: `# Operacje Logiczne na Zdaniach

Operacje logiczne na zdaniach, nazywane również funkcjami lub spójnikami logicznymi, to fundamentalne narzędzia w logice matematycznej i informatyce, które pozwalają na łączenie prostych zdań w zdania złożone oraz na określanie ich wartości logicznej.

Każda operacja logiczna przypisuje wartość logiczną (prawda lub fałsz) zdaniu złożonemu na podstawie wartości logicznych zdań składowych.

## Podstawowe spójniki logiczne

### Negacja ($\neg P$)
Negacja zdania $P$ jest operacją jednoargumentową, która odwraca wartość logiczną zdania $P$. Jeśli $P$ jest prawdziwe, to $\neg P$ jest fałszywe, i odwrotnie.
> Czytamy ją jako „nieprawda, że P” lub „nie jest tak, że P”.

### Koniunkcja ($P \land Q$)
Koniunkcja dwóch zdań $P$ i $Q$ jest prawdziwa tylko wtedy, gdy oba zdania $P$ i $Q$ są prawdziwe. We wszystkich innych przypadkach koniunkcja jest fałszywa.
> Spójnik „i” jest jej naturalnym językowym odpowiednikiem.

### Alternatywa ($P \lor Q$)
Alternatywa dwóch zdań $P$ i $Q$ (nazywana również alternatywą zwykłą lub inkluzywną) jest prawdziwa, jeśli co najmniej jedno ze zdań $P$ lub $Q$ jest prawdziwe. Jest fałszywa tylko wtedy, gdy oba zdania są fałszywe.
> Odpowiada jej spójnik „lub” w języku potocznym.

### Implikacja ($P \to Q$)
Implikacja, czytana jako „jeżeli P, to Q”, jest fałszywa tylko w jednym przypadku: gdy poprzednik ($P$) jest prawdziwy, a następnik ($Q$) jest fałszywy. We wszystkich pozostałych przypadkach implikacja jest prawdziwa.
> $P$ jest warunkiem wystarczającym dla $Q$, a $Q$ jest warunkiem koniecznym dla $P$.

### Równoważność ($P \leftrightarrow Q$)
Równoważność dwóch zdań $P$ i $Q$ jest prawdziwa wtedy i tylko wtedy, gdy oba zdania mają tę samą wartość logiczną – to znaczy, gdy oba są prawdziwe, albo gdy oba są fałszywe.
> Czytamy ją jako „P wtedy i tylko wtedy, gdy Q” lub „P jest równoważne Q”.`,
      exampleQuestions: [
        "Kiedy implikacja jest fałszywa?",
        "Jaka jest różnica między koniunkcją a alternatywą?",
        "Jakie są symbole podstawowych spójników logicznych?",
        "Co oznacza, że dwa zdania są równoważne?",
      ],
    },
  },
  {
    id: "podstawy_i_formalizacja_zdan",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.podstawy_logiki_klasycznej + 0.15
    ),
    data: {
      label: "Podstawy i Formalizacja Zdań",
      description: "Kluczowe pojęcia logiki i proces przekształcania zdań naturalnych w formuły formalne.",
      article: `# Podstawy i Formalizacja Zdań

Kluczowe pojęcia logiki obejmują zdolność do analizowania i reprezentowania argumentów w sposób precyzyjny. Proces formalizacji zdań jest fundamentem logiki, pozwalającym na przekształcanie zdań wyrażonych w języku naturalnym w jednoznaczne formuły logiczne. Dzięki temu możliwe jest obiektywne badanie ich struktury, wartości logicznej oraz wzajemnych relacji, niezależnie od zawiłości języka potocznego.

## Podstawowe Pojęcia Logiki Zdań

### Zdanie (Propozycja)
W logice zdaniem nazywamy wyrażenie, któremu można jednoznacznie przypisać jedną z dwóch wartości logicznych: prawdę (true, T) lub fałsz (false, F). Zdania nie mogą być pytaniami, rozkazami czy wykrzyknieniami.

> **Przykłady:**
> - "Słońce świeci." (Może być prawdziwe lub fałszywe)
> - "2 + 2 = 4." (Prawdziwe)
> - "Każdy kot jest psem." (Fałszywe)

### Wartość Logiczna
Każdemu zdaniu przypisujemy wartość **PRAWDA** lub **FAŁSZ**. Jest to fundamentalna zasada dwuwartościowej logiki klasycznej.

### Spójniki Logiczne (Funktory Prawdziwościowe)
Służą do łączenia zdań prostych w zdania złożone. Wartość logiczna zdania złożonego zależy wyłącznie od wartości logicznych zdań składowych i rodzaju spójnika.

- **Negacja (NIE):** Oznaczana jako $\\neg$. Zmienia wartość logiczną zdania na przeciwną. Jeśli $p$ jest prawdziwe, $\\neg p$ jest fałszywe i odwrotnie.
- **Koniunkcja (I):** Oznaczana jako $\\land$. Zdanie $p \\land q$ jest prawdziwe tylko wtedy, gdy oba zdania $p$ i $q$ są prawdziwe.
- **Alternatywa (LUB):** Oznaczana jako $\\lor$. Zdanie $p \\lor q$ jest prawdziwe, gdy co najmniej jedno ze zdań $p$ lub $q$ jest prawdziwe. Fałszywe jest tylko wtedy, gdy oba są fałszywe.
- **Implikacja (JEŻELI... TO...):** Oznaczana jako $\\to$. Zdanie $p \\to q$ jest fałszywe tylko wtedy, gdy poprzednik $p$ jest prawdziwy, a następnik $q$ jest fałszywy. W pozostałych przypadkach jest prawdziwe.
- **Równoważność (WTEDY I TYLKO WTEDY, GDY):** Oznaczana jako $\\leftrightarrow$. Zdanie $p \\leftrightarrow q$ jest prawdziwe, gdy oba zdania $p$ i $q$ mają tę samą wartość logiczną.

## Proces Formalizacji Zdań
Formalizacja polega na przekształcaniu zdań języka naturalnego w symboliczny język logiki, co ułatwia analizę i rozumowanie.

1. **Identyfikacja Zdań Prostych:** Wydzielenie podstawowych, nieredukowalnych zdań (atomowych).
   > *Przykład:* "Jeśli pada deszcz, to ulice są mokre." -> "Pada deszcz", "Ulice są mokre".
2. **Przypisanie Symboli:** Każdą unikalną propozycję prostą reprezentujemy za pomocą zmiennej zdaniowej (np. $p, q, r$).
   > $p$: "Pada deszcz.", $q$: "Ulice są mokre."
3. **Zastąpienie Spójników:** Spójniki języka naturalnego są zastępowane symbolami logicznymi.
   > "Jeśli... to..." -> $\\to$
4. **Konstrukcja Formuły:** Budowa ostatecznego wyrażenia.
   > Formalizacja: $p \\to q$

## Przykłady Formalizacji

**"Pada deszcz i wieje wiatr."**
- $p$: "Pada deszcz."
- $q$: "Wieje wiatr."
- **Formalizacja:** $p \\land q$

**"Nie pójdę do kina, chyba że kupię bilet."**
- $p$: "Pójdę do kina."
- $q$: "Kupię bilet."
- **Formalizacja:** $\\neg p \\lor q$ (lub równoważnie $p \\to q$)

**"Ania jest w domu wtedy i tylko wtedy, gdy nie ma zajęć."**
- $a$: "Ania jest w domu."
- $z$: "Ania ma zajęcia."
- **Formalizacja:** $a \\leftrightarrow \\neg z$`,
      exampleQuestions: [
        "Czym charakteryzuje się zdanie w sensie logicznym?",
        "Jakie są etapy formalizacji zdań?",
        "Sformalizuj zdanie: 'Jeśli nie zjem śniadania, to będę głodny'.",
        "Kiedy koniunkcja jest prawdziwa?",
      ],
    },
  },
  {
    id: "tautologie_i_rownowaznosc",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.podstawy_logiki_klasycznej + 0.4
    ),
    data: {
      label: "Tautologie i Równoważność",
      description: "Formuły zawsze prawdziwe oraz relacje między formułami posiadającymi te same wartości logiczne.",
      article: `# Tautologie i Równoważność

W kontekście logiki, kluczowe jest zrozumienie, czym są formuły zawsze prawdziwe oraz jakie relacje zachodzą między formułami, które posiadają te same wartości logiczne. Koncepcje tautologii i równoważności logicznej stanowią fundamentalne narzędzia do analizy i upraszczania wyrażeń logicznych.

## Tautologie

Tautologia to formuła logiczna, która jest **zawsze prawdziwa**, niezależnie od wartości logicznych swoich zmiennych atomowych. Oznacza to, że dla każdej możliwej kombinacji wartości logicznych (prawda/fałsz) przypisanych do zmiennych występujących w formule, wynikowa wartość logiczna całej formuły jest zawsze prawdą.

Tautologie są podstawą wnioskowania logicznego, ponieważ stanowią zawsze prawdziwe stwierdzenia.

### Przykłady tautologii:
- **Prawo wyłączonego środka:**
  $$p \\lor \\neg p$$
- **Prawo niesprzeczności:**
  $$\\neg(p \\land \\neg p)$$
- **Prawo implikacji:**
  $$(p \\land (p \\to q)) \\to q$$

Prawdziwość tautologii można zweryfikować za pomocą tabeli wartości logicznych. Jeśli ostatnia kolumna tabeli zawiera wyłącznie wartości Prawda, to formuła jest tautologią.

## Równoważność Logiczna

Dwie formuły logiczne, $A$ i $B$, są logicznie równoważne (symbolizujemy to jako $A \\equiv B$), wtedy i tylko wtedy, gdy posiadają one te same wartości logiczne dla każdej możliwej kombinacji wartości logicznych zmiennych atomowych.

Innymi słowy, formuły $A$ i $B$ są równoważne, jeśli ich tabele wartości logicznych są identyczne. Równoważność logiczna jest ściśle związana z tautologią: dwie formuły są równoważne, jeśli formuła $A \\leftrightarrow B$ jest tautologią.

### Przykłady równoważności logicznych:
- **Prawo podwójnej negacji:**
  $$p \\equiv \\neg\\neg p$$
- **Prawa de Morgana:**
  $$\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$$
  $$\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$$
- **Rozdzielczość koniunkcji względem alternatywy:**
  $$p \\land (q \\lor r) \\equiv (p \\land q) \\lor (p \\land r)$$

Zrozumienie tautologii i równoważności logicznej pozwala na przekształcanie formuł bez zmiany ich wartości logicznej, co jest kluczowe w dowodzeniu twierdzeń, optymalizacji wyrażeń logicznych oraz w projektowaniu układów cyfrowych.`,
      exampleQuestions: [
        "Czym jest tautologia?",
        "Podaj przykład prawa de Morgana.",
        "Kiedy dwie formuły są logicznie równoważne?",
        "Jak sprawdzić, czy formuła jest tautologią?",
      ],
    },
  },

  // ============ SECOND LEVEL - Logika Predykatów children ============
  {
    id: "system_formalny_logiki_predykatow",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_predykatow + 0.2
    ),
    data: {
      label: "System Formalny Logiki Predykatów",
      description: "Zasady budowy logiki predykatów jako systemu aksjomatycznego, włączając podstawy teorii mnogości.",
      article: `# System Formalny Logiki Predykatów

System formalny logiki predykatów, znanej również jako logika pierwszego rzędu, stanowi fundamentalne narzędzie w matematyce i informatyce do precyzyjnego wyrażania i analizowania rozumowań dotyczących obiektów, ich właściwości oraz relacji między nimi. Jest to rozszerzenie logiki zdań, które pozwala na kwantyfikację zmiennych.

## Logika Predykatów jako System Aksjomatyczny

Logika predykatów jest często konstruowana jako system aksjomatyczny, co oznacza, że opiera się na zbiorze podstawowych założeń (aksjomatów) i reguł wnioskowania. Budowa takiego systemu obejmuje następujące kluczowe elementy:

### Alfabet (Język)
Definiuje zbiór symboli używanych do konstruowania wyrażeń. Zawiera symbole logiczne (spójniki, kwantyfikatory, równość, nawiasy, zmienne) oraz symbole nielogiczne (stałe, symbole funkcyjne, symbole predykatywne, każdy z określoną arnością).

### Reguły Tworzenia
Określają syntaktycznie poprawne konstrukcje języka, czyli termy i formuły dobrze zbudowane (FWB).
- **Termy:** Mogą być zmiennymi, stałymi lub wynikami zastosowania symbolu funkcyjnego do innych termów.
- **Formuły Atomowe:** Składają się z symbolu predykatywnego zastosowanego do termów lub równości dwóch termów.
- **Formuły Złożone:** Tworzone są z formuł atomowych za pomocą spójników logicznych ($\neg, \land, \lor, \to, \leftrightarrow$) oraz kwantyfikatorów ($\forall, \exists$).

### Aksjomaty
Zbiór formuł, które są przyjmowane za prawdziwe bez dowodu. Mogą to być aksjomaty logiczne (np. tautologie logiki zdaniowej, aksjomaty dotyczące kwantyfikatorów) lub aksjomaty nielogiczne, specyficzne dla danej teorii (np. aksjomaty arytmetyki Peana).

### Reguły Wnioskowania
Pozwalają na wyprowadzanie nowych twierdzeń z aksjomatów i już udowodnionych twierdzeń. Najważniejsze reguły to:
- **Modus Ponens:** Z formuł $A$ i $A \to B$ można wnioskować $B$.
- **Generalizacja (wprowadzenie kwantyfikatora ogólnego):** Z $A(x)$ można wnioskować $\forall x A(x)$, pod pewnymi warunkami.

## Podstawy Teorii Mnogości

Teoria mnogości stanowi fundament dla formalizacji logiki predykatów, dostarczając narzędzi do precyzyjnego definiowania jej semantyki i struktur, w których formuły są interpretowane.

### Uniwersum Rozważań (Dziedzina)
W interpretacji formuł, uniwersum to niepusty zbiór, którego elementy są obiektami, o których mowa w logice.

### Interpretacja Symboli
Symbole nielogiczne języka logiki predykatów są interpretowane jako konkretne obiekty, funkcje lub relacje w obrębie danego uniwersum.
- Symbole stałych są interpretowane jako konkretne elementy zbioru uniwersum.
- Symbole funkcyjne są interpretowane jako funkcje na elementach uniwersum.
- Symbole predykatywne są interpretowane jako relacje na elementach uniwersum.

### Model
Jest to struktura składająca się z dziedziny oraz interpretacji wszystkich symboli nielogicznych, w której wszystkie aksjomaty danej teorii są prawdziwe. Teoria mnogości umożliwia precyzyjne definiowanie takich modeli i badania ich właściwości (spełnialność, prawdziwość, ważność formuł).`,
      exampleQuestions: [
        "Co wchodzi w skład alfabetu logiki predykatów?",
        "Na czym polega reguła generalizacji?",
        "Czym jest model w logice predykatów?",
        "Jaka jest rola teorii mnogości w logice formalnej?",
      ],
    },
  },
  {
    id: "definicje_i_rodzaje",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_predykatow - 0.05
    ),
    data: {
      label: "Definicje i Rodzaje",
      description: "Charakterystyka predykatów (jedno-, dwu-, trójargumentowych) jako wyrażeń opisujących właściwości lub relacje.",
      article: `# Definicje i Rodzaje Predykatów w Logice

W kontekście logiki, predykaty stanowią fundamentalne wyrażenia, które pozwalają na opisywanie właściwości obiektów lub relacji między nimi. Są kluczowym elementem rachunku predykatów, rozszerzającym rachunek zdań o możliwość analizy wewnętrznej struktury zdań.

## Definicja Predykatu

**Predykat** to funkcja zdaniowa (lub formuła atomowa z wolnymi zmiennymi), która po podstawieniu za swoje argumenty odpowiednich stałych lub zmiennych, staje się zdaniem (prawdziwym lub fałszywym).

Predykaty charakteryzują się określoną liczbą argumentów, co nazywamy ich **arnością**. Każdy predykat ma przypisany zbiór, z którego pochodzą argumenty, zwany dziedziną.

## Rodzaje Predykatów ze względu na Liczbę Argumentów

Predykaty klasyfikuje się przede wszystkim na podstawie liczby argumentów, które przyjmują.

### 1. Predykaty jednoargumentowe (właściwości)
Opisują pewną właściwość lub cechę pojedynczego obiektu. Przyjmują jeden argument i dla danego obiektu stwierdzają, czy posiada on daną właściwość.

> **Przykład:** "jest czerwony", "jest człowiekiem".
> Jeśli $P(x)$ oznacza "x jest czerwony", to $P(\\text{samochód})$ jest zdaniem oznaczającym "samochód jest czerwony".

### 2. Predykaty dwuargumentowe (relacje binarne)
Opisują relację między dwoma obiektami.

> **Przykład:** "jest większe niż", "jest rodzicem".
> Jeśli $R(x, y)$ oznacza "x jest większe niż y", to $R(5, 3)$ jest zdaniem "5 jest większe niż 3".

### 3. Predykaty trójargumentowe
Opisują relację między trzema obiektami.

> **Przykład:** "x jest między y a z".
> Jeśli $M(x, y, z)$ oznacza "x jest między y a z", to $M(\\text{Warszawa}, \\text{Kraków}, \\text{Gdańsk})$ może oznaczać relację geograficzną.

## Znaczenie w Logice

Predykaty są podstawą do konstruowania formuł atomowych, które z kolei są budulcem bardziej złożonych zdań w logice pierwszego rzędu. Poprzez łączenie predykatów ze stałymi, zmiennymi oraz kwantyfikatorami, możliwe jest wyrażanie skomplikowanych twierdzeń i modelowanie różnych dziedzin wiedzy.`,
      exampleQuestions: [
        "Czym jest predykat w logice?",
        "Co to jest arność predykatu?",
        "Podaj przykład predykatu dwuargumentowego.",
        "Jaka jest różnica między predykatem jedno- a trójargumentowym?",
      ],
    },
  },
  {
    id: "kwantyfikatory_i_kwadrat_logiczny",
    type: "mindMapNode",
    position: radialPosition(
      CENTER.x,
      CENTER.y,
      OUTER_RADIUS,
      firstLevelAngles.logika_predykatow - 0.3
    ),
    data: {
      label: "Kwantyfikatory i Kwadrat Logiczny",
      description: "Symbole (∀, ∃) używane do wyrażania ogólności lub istnienia oraz graficzna reprezentacja relacji między sądami kategorycznymi.",
      article: `# Kwantyfikatory i Kwadrat Logiczny

Temat ten odnosi się do fundamentalnych narzędzi używanych w logice formalnej do precyzowania zakresu zdań oraz do graficznej analizy relacji między nimi. Kwantyfikatory pozwalają wyrazić ogólność lub istnienie, natomiast Kwadrat Logiczny wizualizuje powiązania między sądami kategorycznymi.

## Kwantyfikatory

Kwantyfikatory to symbole używane do określania, ile elementów danej dziedziny spełnia pewną własność lub predykat.

### Kwantyfikator ogólny (uniwersalny)
Symbol: **$\\forall$** (czytaj: "dla każdego", "dla wszystkich", "każdy").
Używany jest do stwierdzenia, że pewna własność przysługuje wszystkim elementom danego zbioru.

> **Przykład:** $\\forall x(P(x) \\implies Q(x))$
> Oznacza: "Dla każdego x, jeśli x ma własność P, to x ma własność Q."

### Kwantyfikator egzystencjalny (szczegółowy)
Symbol: **$\\exists$** (czytaj: "istnieje", "dla pewnego", "niektóre").
Używany jest do stwierdzenia, że istnieje przynajmniej jeden element danego zbioru, który spełnia pewną własność.

> **Przykład:** $\\exists x(P(x) \\land Q(x))$
> Oznacza: "Istnieje x takie, że x ma własność P i x ma własność Q."

## Kwadrat Logiczny

Kwadrat Logiczny (Kwadrat Opozycji) jest graficzną reprezentacją relacji logicznych między czterema typami sądów kategorycznych.

### Sądy kategoryczne
- **A (uniwersalny twierdzący):** "Każde S jest P." (np. "Wszyscy ludzie są śmiertelni.")
- **E (uniwersalny przeczący):** "Żadne S nie jest P." (np. "Żaden człowiek nie jest nieśmiertelny.")
- **I (szczegółowy twierdzący):** "Niektóre S są P." (np. "Niektórzy ludzie są naukowcami.")
- **O (szczegółowy przeczący):** "Niektóre S nie są P." (np. "Niektórzy ludzie nie są naukowcami.")

### Relacje logiczne w Kwadracie Opozycji

1. **Sprzeczność (Contradiction):**
   Występuje między sądami **A i O** oraz **E i I**. Sądy sprzeczne nie mogą być jednocześnie prawdziwe ani jednocześnie fałszywe.

2. **Przeciwieństwo (Contrariety):**
   Występuje między sądami **A i E**. Nie mogą być jednocześnie prawdziwe, ale mogą być jednocześnie fałszywe.

3. **Podprzeciwieństwo (Subcontrariety):**
   Występuje między sądami **I i O**. Nie mogą być jednocześnie fałszywe, ale mogą być jednocześnie prawdziwe.

4. **Podporządkowanie (Subalternation):**
   Występuje między **A i I** oraz **E i O**. Z prawdziwości sądu uniwersalnego wynika prawdziwość odpowiadającego mu sądu szczegółowego.`,
      exampleQuestions: [
        "Jakie są dwa rodzaje kwantyfikatorów?",
        "Na czym polega relacja sprzeczności?",
        "Wymień cztery typy sądów kategorycznych.",
        "Co oznacza symbol $\\forall$?",
      ],
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e-logika_predykatow-system_formalny_logiki_predykatow",
    source: "logika_predykatow",
    target: "system_formalny_logiki_predykatow",
    label: "tworzy",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-logika_predykatow",
    source: "logika_matematyczna",
    target: "logika_predykatow",
    label: "rozwija się w",
    animated: false,
  },
  {
    id: "e-logika_nazw-typologia_nazw",
    source: "logika_nazw",
    target: "typologia_nazw",
    label: "obejmuje",
    animated: false,
  },
  {
    id: "e-reguły_wnioskowania-reguły_inferencyjne",
    source: "reguły_wnioskowania",
    target: "reguły_inferencyjne",
    label: "stosuje",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-reguły_wnioskowania",
    source: "logika_matematyczna",
    target: "reguły_wnioskowania",
    label: "definiuje",
    animated: false,
  },
  {
    id: "e-podstawy_logiki_klasycznej-operacje_logiczne_na_zdaniach",
    source: "podstawy_logiki_klasycznej",
    target: "operacje_logiczne_na_zdaniach",
    label: "opisuje",
    animated: false,
  },
  {
    id: "e-algebry_logiczne-zmienne_i_funkcje_logiczne",
    source: "algebry_logiczne",
    target: "zmienne_i_funkcje_logiczne",
    label: "opiera się na",
    animated: false,
  },
  {
    id: "e-logika_nazw-operacje_na_nazwach",
    source: "logika_nazw",
    target: "operacje_na_nazwach",
    label: "wykonuje",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-logika_nazw",
    source: "logika_matematyczna",
    target: "logika_nazw",
    label: "analizuje",
    animated: false,
  },
  {
    id: "e-logika_rozmyta-zbiory_i_zdania_rozmyte",
    source: "logika_rozmyta",
    target: "zbiory_i_zdania_rozmyte",
    label: "opisuje",
    animated: false,
  },
  {
    id: "e-logika_predykatow-kwantyfikatory_i_kwadrat_logiczny",
    source: "logika_predykatow",
    target: "kwantyfikatory_i_kwadrat_logiczny",
    label: "wykorzystuje",
    animated: false,
  },
  {
    id: "e-podstawy_logiki_klasycznej-podstawy_i_formalizacja_zdan",
    source: "podstawy_logiki_klasycznej",
    target: "podstawy_i_formalizacja_zdan",
    label: "zawiera",
    animated: false,
  },
  {
    id: "e-logika_rozmyta-operacje_logiczne_rozmyte",
    source: "logika_rozmyta",
    target: "operacje_logiczne_rozmyte",
    label: "stosuje",
    animated: false,
  },
  {
    id: "e-algebry_logiczne-algebra_boolea",
    source: "algebry_logiczne",
    target: "algebra_boolea",
    label: "jest przykładem",
    animated: false,
  },
  {
    id: "e-logika_rozmyta-pojecie_nieostrosci",
    source: "logika_rozmyta",
    target: "pojecie_nieostrosci",
    label: "wprowadza",
    animated: false,
  },
  {
    id: "e-logika_nazw-zakres_i_znaczenie",
    source: "logika_nazw",
    target: "zakres_i_znaczenie",
    label: "dotyczy",
    animated: false,
  },
  {
    id: "e-reguły_wnioskowania-schematy_wnioskowan",
    source: "reguły_wnioskowania",
    target: "schematy_wnioskowan",
    label: "formalizuje przez",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-logika_rozmyta",
    source: "logika_matematyczna",
    target: "logika_rozmyta",
    label: "wprowadza",
    animated: false,
  },
  {
    id: "e-reguły_wnioskowania-logika_zdan_jako_system_aksjomatyczny",
    source: "reguły_wnioskowania",
    target: "logika_zdan_jako_system_aksjomatyczny",
    label: "przedstawia jako",
    animated: false,
  },
  {
    id: "e-podstawy_logiki_klasycznej-tautologie_i_rownowaznosc",
    source: "podstawy_logiki_klasycznej",
    target: "tautologie_i_rownowaznosc",
    label: "bada",
    animated: false,
  },
  {
    id: "e-algebry_logiczne-własnosci_algebr_logicznych",
    source: "algebry_logiczne",
    target: "własnosci_algebr_logicznych",
    label: "charakteryzują",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-algebry_logiczne",
    source: "logika_matematyczna",
    target: "algebry_logiczne",
    label: "wykorzystuje",
    animated: false,
  },
  {
    id: "e-logika_predykatow-definicje_i_rodzaje",
    source: "logika_predykatow",
    target: "definicje_i_rodzaje",
    label: "bazuje na",
    animated: false,
  },
  {
    id: "e-logika_matematyczna-podstawy_logiki_klasycznej",
    source: "logika_matematyczna",
    target: "podstawy_logiki_klasycznej",
    label: "obejmuje",
    animated: false,
  },
];

/** Wyniki użytkownika per węzeł (w przyszłości z bazy). Wbudowane w initialNodes. */
const NODE_SCORES: Record<string, number | null> = {
  logika_matematyczna: 88,
  logika_rozmyta: 72,
  logika_nazw: 55,
  algebry_logiczne: 91,
  reguły_wnioskowania: 38,
  podstawy_logiki_klasycznej: 65,
  logika_predykatow: 42,
  zbiory_i_zdania_rozmyte: 78,
  operacje_logiczne_rozmyte: 28,
  pojecie_nieostrosci: null,
  typologia_nazw: null,
  operacje_na_nazwach: 15,
  zakres_i_znaczenie: null,
  zmienne_i_funkcje_logiczne: 82,
  algebra_boolea: 94,
  własnosci_algebr_logicznych: null,
  reguły_inferencyjne: 61,
  schematy_wnioskowan: null,
  logika_zdan_jako_system_aksjomatyczny: 47,
  operacje_logiczne_na_zdaniach: 70,
  podstawy_i_formalizacja_zdan: 53,
  tautologie_i_rownowaznosc: null,
  system_formalny_logiki_predykatow: 35,
  definicje_i_rodzaje: null,
  kwantyfikatory_i_kwadrat_logiczny: 59,
};

export const initialNodes: Node<MindMapNodeData>[] = baseNodes.map((node) => ({
  ...node,
  data: { ...node.data, score: NODE_SCORES[node.id] ?? null },
}));

// Lista wszystkich ID węzłów (przydatne do inicjalizacji wyników)
export const nodeIds = initialNodes.map((node) => node.id);

/** Typ wyników użytkownika: nodeId → score 0–100 lub null (nieodkryty). Używany przy API / utils. */
export type UserScores = Record<string, number | null>;

// Klucz localStorage dla score'ów węzłów
const STORAGE_KEY = "mindmap_node_scores";

/**
 * Sprawdza czy kod działa w przeglądarce (dostępne localStorage)
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Pobiera wszystkie score'y z localStorage lub zwraca domyślne z NODE_SCORES
 */
export function getNodeScores(): UserScores {
  if (!isBrowser()) {
    return NODE_SCORES;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserScores;
      // Merge z domyślnymi wartościami - localStorage ma priorytet, ale jeśli węzeł nie istnieje, użyj domyślnego
      return { ...NODE_SCORES, ...parsed };
    }
  } catch (error) {
    console.error("Błąd odczytu score'ów z localStorage:", error);
  }

  return NODE_SCORES;
}

/**
 * Aktualizuje score konkretnego węzła w localStorage
 * @param nodeId - ID węzła
 * @param newScore - Nowy score (0-100 lub null)
 */
export function updateNodeScore(
  nodeId: string,
  newScore: number | null
): void {
  if (!isBrowser()) {
    console.warn("localStorage niedostępne - nie można zaktualizować score");
    return;
  }

  try {
    const currentScores = getNodeScores();
    currentScores[nodeId] = newScore;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentScores));
  } catch (error) {
    console.error("Błąd zapisu score do localStorage:", error);
  }
}

/**
 * Aktualizuje wiele score'ów jednocześnie
 * @param scores - Obiekt z score'ami do zaktualizowania
 */
export function updateNodeScores(scores: Partial<UserScores>): void {
  if (!isBrowser()) {
    console.warn("localStorage niedostępne - nie można zaktualizować score");
    return;
  }

  try {
    const currentScores = getNodeScores();
    Object.assign(currentScores, scores);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentScores));
  } catch (error) {
    console.error("Błąd zapisu score'ów do localStorage:", error);
  }
}

/**
 * Inicjalizuje score'y z localStorage (używane przy starcie aplikacji)
 * Zwraca węzły z zaktualizowanymi score'ami
 */
export function initializeNodesWithScores(): Node<MindMapNodeData>[] {
  const scores = getNodeScores();
  return baseNodes.map((node) => ({
    ...node,
    data: { ...node.data, score: scores[node.id] ?? null },
  }));
}

// Funkcja pomocnicza do pobierania danych węzła po ID
export function getNodeById(id: string): Node<MindMapNodeData> | undefined {
  return initialNodes.find((node) => node.id === id);
}