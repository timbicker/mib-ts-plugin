export type Country = {
  code: string
  label: string
  phone: string
  deeplCode: string
  suggested: string
  clausePrecedence: string
  clauseExclusiveValidity: string
}
export const countries: Country[] = [
  {
    code: "CN",
    label: "Chinese (simpl.)",
    phone: "86",
    deeplCode: "zh",
    suggested: "most used",
    clausePrecedence: "如果原始版本（左栏）和翻译版本（右栏）之间存在差异，则以原始版本为准。",
    clauseExclusiveValidity:
      "如果原始版本（左栏）和翻译版本（右栏）之间存在差异，只适用原始版本。翻译版本仅供参考，不构成法律交易的一部分。",
  },

  {
    code: "GB",
    label: "English (British)",
    phone: "44",
    suggested: "most used",
    deeplCode: "en-gb",
    clausePrecedence:
      "In case of discrepancies between the original version (left column) and the translated version (right column), the original version takes precedence.",
    clauseExclusiveValidity:
      "In case of discrepancies between the original version (left column) and the translated version (right column), only the original version shall apply. The translated version is for information purposes only and does not form part of the legal transaction.",
  },
  {
    code: "US",
    label: "English (American)",
    phone: "1",
    suggested: "most used",
    deeplCode: "en-us",
    clausePrecedence:
      "In case of discrepancies between the original version (left column) and the translated version (right column), the original version takes precedence.",
    clauseExclusiveValidity:
      "In case of discrepancies between the original version (left column) and the translated version (right column), only the original version shall apply. The translated version is for information purposes only and is not part of the legal transaction.",
  },

  {
    code: "ES",
    label: "Spanish",
    phone: "34",
    deeplCode: "es",
    suggested: "most used",
    clausePrecedence:
      "En caso de discrepancias entre la versión original (columna izquierda) y la versión traducida (columna derecha), prevalece la versión original.",
    clauseExclusiveValidity:
      "En caso de discrepancias entre la versión original (columna izquierda) y la versión traducida (columna derecha), sólo se aplicará la versión original. La versión traducida es meramente informativa y no forma parte del negocio jurídico.",
  },
  {
    code: "FR",
    label: "French",
    phone: "33",
    suggested: "most used",
    deeplCode: "fr",
    clausePrecedence:
      "En cas de divergence entre la version originale (colonne de gauche) et la version traduite (colonne de droite), la version originale prévaut.",
    clauseExclusiveValidity:
      "En cas de divergence entre la version originale (colonne de gauche) et la version traduite (colonne de droite), seule la version originale fait foi. La version traduite n'est fournie qu'à titre d'information et ne fait pas partie de l'acte juridique.",
  },

  {
    code: "BG",
    label: "Bulgarian",
    phone: "359",
    deeplCode: "bg",
    suggested: "more languages",
    clausePrecedence:
      "В случай на несъответствия между оригиналната версия (лявата колона) и преведената версия (дясната колона), предимство има оригиналната версия.",
    clauseExclusiveValidity:
      "В случай на несъответствия между оригиналната версия (лявата колона) и преведената версия (дясната колона) се прилага само оригиналната версия. Преведената версия е само за информационни цели и не представлява част от правната сделка.",
  },

  {
    code: "CZ",
    label: "Czech",
    phone: "420",
    deeplCode: "cs",
    suggested: "more languages",
    clausePrecedence:
      "V případě rozporů mezi původní verzí (levý sloupec) a přeloženou verzí (pravý sloupec) má přednost původní verze.",
    clauseExclusiveValidity:
      "V případě rozporů mezi původní verzí (levý sloupec) a přeloženou verzí (pravý sloupec) se použije pouze původní verze. Přeložená verze má pouze informativní charakter a není součástí právního úkonu.",
  },
  {
    code: "DE",
    label: "German",
    phone: "49",
    deeplCode: "de",
    suggested: "more languages",
    clausePrecedence:
      "Im Falle von Abweichungen zwischen der Originalfassung (linke Spalte) und der übersetzten Fassung (rechte Spalte) hat die Originalfassung Vorrang.",
    clauseExclusiveValidity:
      "Im Falle von Abweichungen zwischen der Originalfassung (linke Spalte) und der übersetzten Fassung (rechte Spalte) gilt nur die Originalfassung. Die übersetzte Fassung dient nur der Information und ist nicht Bestandteil des Rechtsgeschäftes.",
  },

  {
    code: "DK",
    label: "Danish",
    phone: "45",
    deeplCode: "da",
    suggested: "more languages",
    clausePrecedence:
      "I tilfælde af uoverensstemmelser mellem den originale version (venstre kolonne) og den oversatte version (højre kolonne), har den originale version forrang.",
    clauseExclusiveValidity:
      "I tilfælde af uoverensstemmelser mellem den originale version (venstre kolonne) og den oversatte version (højre kolonne) er det kun den originale version, der gælder. Den oversatte udgave er kun til orientering og udgør ikke en del af den juridiske transaktion.",
  },

  {
    code: "EE",
    label: "Estonian",
    phone: "372",
    deeplCode: "et",
    suggested: "more languages",
    clausePrecedence:
      "Kui originaalversiooni (vasakpoolne veerg) ja tõlgitud versiooni (parempoolne veerg) vahel esineb lahknevusi, on originaalversioon ülimuslik.",
    clauseExclusiveValidity:
      "Kui originaalversiooni (vasakpoolne veerg) ja tõlgitud versiooni (parempoolne veerg) vahel esineb lahknevusi, kohaldatakse ainult originaalversiooni. Tõlgitud versioon on ainult teavitamise eesmärgil ja ei ole osa juriidilisest tehingust.",
  },

  {
    code: "FI",
    label: "Finnish",
    phone: "358",
    deeplCode: "fi",
    suggested: "more languages",
    clausePrecedence:
      "Jos alkuperäisen version (vasen sarake) ja käännetyn version (oikea sarake) välillä on eroja, alkuperäinen versio on etusijalla.",
    clauseExclusiveValidity:
      "Jos alkuperäisen version (vasen sarake) ja käännetyn version (oikea sarake) välillä on eroja, sovelletaan ainoastaan alkuperäistä versiota. Käännetty versio on tarkoitettu ainoastaan tiedoksi, eikä se ole osa oikeustoimia.",
  },

  {
    code: "GR",
    label: "Greek",
    phone: "30",
    deeplCode: "el",
    suggested: "more languages",
    clausePrecedence:
      "Σε περίπτωση ασυμφωνίας μεταξύ της πρωτότυπης έκδοσης (αριστερή στήλη) και της μεταφρασμένης έκδοσης (δεξιά στήλη), υπερισχύει η πρωτότυπη έκδοση.",
    clauseExclusiveValidity:
      "Σε περίπτωση ασυμφωνίας μεταξύ της πρωτότυπης έκδοσης (αριστερή στήλη) και της μεταφρασμένης έκδοσης (δεξιά στήλη), ισχύει μόνο η πρωτότυπη έκδοση. Η μεταφρασμένη έκδοση έχει μόνο ενημερωτικό χαρακτήρα και δεν αποτελεί μέρος της νομικής συναλλαγής.",
  },

  {
    code: "HU",
    label: "Hungarian",
    phone: "36",
    deeplCode: "hu",
    suggested: "more languages",
    clausePrecedence:
      "Az eredeti változat (bal oldali oszlop) és a lefordított változat (jobb oldali oszlop) közötti eltérések esetén az eredeti változat az irányadó.",
    clauseExclusiveValidity:
      "Az eredeti változat (bal oldali oszlop) és a lefordított változat (jobb oldali oszlop) közötti eltérések esetén csak az eredeti változatot kell alkalmazni. A lefordított változat kizárólag tájékoztató jellegű, és nem képezi a jogi tranzakció részét.",
  },
  {
    code: "ID",
    label: "Indonesian",
    phone: "62",
    deeplCode: "id",
    suggested: "more languages",
    clausePrecedence:
      "Apabila terdapat perbedaan antara versi asli (kolom kiri) dan versi terjemahan (kolom kanan), maka versi asli yang diutamakan.",
    clauseExclusiveValidity:
      "Apabila terdapat perbedaan antara versi asli (kolom kiri) dan versi terjemahan (kolom kanan), maka yang berlaku adalah versi asli. Versi terjemahan ini hanya untuk tujuan informasi dan bukan merupakan bagian dari transaksi hukum.",
  },
  {
    code: "IT",
    label: "Italian",
    phone: "39",
    deeplCode: "it",
    suggested: "more languages",
    clausePrecedence:
      "In caso di discrepanze tra la versione originale (colonna di sinistra) e la versione tradotta (colonna di destra), la versione originale ha la precedenza.",
    clauseExclusiveValidity:
      "In caso di discrepanze tra la versione originale (colonna di sinistra) e la versione tradotta (colonna di destra), si applica solo la versione originale. La versione tradotta è solo a scopo informativo e non fa parte del negozio legale.",
  },
  {
    code: "JP",
    label: "Japanese",
    phone: "81",
    deeplCode: "ja",
    suggested: "more languages",
    clausePrecedence: "原文（左欄）と訳文（右欄）に相違がある場合は、原文が優先されます。",
    clauseExclusiveValidity:
      "原文（左欄）と訳文（右欄）に相違がある場合は、原文のみが適用されるものとします。翻訳版は情報提供のみを目的としたものであり、法的取引の一部を構成するものではありません。",
  },
  {
    code: "KR",
    label: "Korean",
    deeplCode: "ko",
    suggested: "more languages",
    clausePrecedence:
      "원본 버전(왼쪽 열)과 번역 버전(오른쪽 열)이 일치하지 않는 경우 원본 버전이 우선합니다.",
    clauseExclusiveValidity:
      "원본 버전(왼쪽 열)과 번역된 버전(오른쪽 열)이 일치하지 않는 경우 원본 버전만 우선합니다. 번역된 버전은 정보 제공 목적으로만 제공되며 법적 거래의 일부를 구성하지 않습니다.",
    phone: "82",
  },

  {
    code: "LT",
    label: "Lithuanian",
    phone: "370",
    deeplCode: "lt",
    suggested: "more languages",
    clausePrecedence:
      "Jei originalo versija (kairiajame stulpelyje) ir išversta versija (dešiniajame stulpelyje) nesutampa, pirmenybė teikiama originaliai versijai.",
    clauseExclusiveValidity:
      "Esant originalo (kairėje skiltyje) ir išverstos versijos (dešinėje skiltyje) neatitikimams, taikoma tik originalo versija. Išversta versija yra tik informacinio pobūdžio ir nėra teisinio sandorio dalis.",
  },

  {
    code: "LV",
    label: "Latvian",
    phone: "371",
    deeplCode: "lv",
    suggested: "more languages",
    clausePrecedence:
      "Ja oriģinālversija (kreisajā slejā) un tulkotā versija (labajā slejā) atšķiras, priekšroka tiek dota oriģinālversijai.",
    clauseExclusiveValidity:
      "Neatbilstību gadījumā starp oriģinālversiju (kreisā sleja) un tulkoto versiju (labā sleja) piemēro tikai oriģinālversiju. Tulkotā versija ir paredzēta tikai informatīviem nolūkiem un nav daļa no juridiskā darījuma.",
  },

  {
    code: "NL",
    label: "Dutch",
    phone: "31",
    deeplCode: "nl",
    suggested: "more languages",
    clausePrecedence:
      "Bij verschillen tussen de oorspronkelijke versie (linkerkolom) en de vertaalde versie (rechterkolom) heeft de oorspronkelijke versie voorrang.",
    clauseExclusiveValidity:
      "In geval van verschillen tussen de oorspronkelijke versie (linkerkolom) en de vertaalde versie (rechterkolom) geldt alleen de oorspronkelijke versie. De vertaalde versie is alleen ter informatie en maakt geen deel uit van de juridische transactie.",
  },

  {
    code: "PL",
    label: "Polish",
    phone: "48",
    deeplCode: "pl",
    suggested: "more languages",
    clausePrecedence:
      "W przypadku rozbieżności pomiędzy wersją oryginalną (lewa kolumna) a wersją przetłumaczoną (prawa kolumna), pierwszeństwo ma wersja oryginalna.",
    clauseExclusiveValidity:
      "W przypadku rozbieżności pomiędzy wersją oryginalną (lewa kolumna) a wersją przetłumaczoną (prawa kolumna), obowiązuje wyłącznie wersja oryginalna. Wersja przetłumaczona służy wyłącznie celom informacyjnym i nie stanowi części transakcji prawnej.",
  },
  {
    code: "NO",
    label: "Norwegian (Bokmål)",
    deeplCode: "nb",
    suggested: "more languages",
    clausePrecedence:
      "Ved uoverensstemmelser mellom originalversjonen (venstre kolonne) og den oversatte versjonen (høyre kolonne) skal originalversjonen gjelde.",
    clauseExclusiveValidity:
      "Ved uoverensstemmelser mellom originalversjonen (venstre kolonne) og den oversatte versjonen (høyre kolonne), skal kun originalversjonen gjelde. Den oversatte versjonen er kun for informasjonsformål og utgjør ikke en del av den juridiske transaksjonen.",
    phone: "47",
  },
  {
    code: "PT",
    label: "Portuguese",
    phone: "351",
    deeplCode: "pt-pt",
    suggested: "more languages",
    clausePrecedence:
      "Em caso de discrepâncias entre a versão original (coluna da esquerda) e a versão traduzida (coluna da direita), a versão original tem precedência.",
    clauseExclusiveValidity:
      "Em caso de discrepâncias entre a versão original (coluna da esquerda) e a versão traduzida (coluna da direita), apenas a versão original é aplicável. A versão traduzida é apenas para fins informativos e não faz parte da transacção legal.",
  },

  {
    code: "BR",
    label: "Portuguese (Brazil)",
    phone: "55",
    deeplCode: "pt-br",
    suggested: "more languages",
    clausePrecedence:
      "Em caso de discrepâncias entre a versão original (coluna da esquerda) e a versão traduzida (coluna da direita), a versão original tem precedência.",
    clauseExclusiveValidity:
      "Em caso de discrepâncias entre a versão original (coluna da esquerda) e a versão traduzida (coluna da direita), somente a versão original será aplicável. A versão traduzida é apenas para fins informativos e não faz parte da transação legal.",
  },

  {
    code: "RO",
    label: "Romanian",
    phone: "40",
    deeplCode: "ro",
    suggested: "more languages",
    clausePrecedence:
      "În cazul în care există discrepanțe între versiunea originală (coloana din stânga) și versiunea tradusă (coloana din dreapta), versiunea originală are prioritate.",
    clauseExclusiveValidity:
      "În cazul unor discrepanțe între versiunea originală (coloana din stânga) și versiunea tradusă (coloana din dreapta), se aplică numai versiunea originală. Versiunea tradusă are doar scop informativ și nu face parte din tranzacția juridică.",
  },

  {
    code: "RU",
    label: "Russian",
    phone: "7",
    deeplCode: "ru",
    suggested: "more languages",
    clausePrecedence:
      "В случае расхождений между оригинальной версией (левая колонка) и переведенной версией (правая колонка) приоритет отдается оригинальной версии.",
    clauseExclusiveValidity:
      "В случае расхождений между оригинальной версией (левая колонка) и переведенной версией (правая колонка) применяется только оригинальная версия. Переведенная версия предназначена только для информационных целей и не является частью юридической сделки.",
  },

  {
    code: "SI",
    label: "Slovenian",
    phone: "386",
    deeplCode: "sl",
    suggested: "more languages",
    clausePrecedence:
      "V primeru razlik med izvirno različico (levi stolpec) in prevedeno različico (desni stolpec) ima prednost izvirna različica.",
    clauseExclusiveValidity:
      "V primeru razlik med izvirno različico (levi stolpec) in prevedeno različico (desni stolpec) se uporablja samo izvirna različica. Prevedena različica je zgolj informativnega značaja in ni del pravnega posla.",
  },

  {
    code: "SK",
    label: "Slovakian",
    phone: "421",
    deeplCode: "sk",
    suggested: "more languages",
    clausePrecedence:
      "V prípade rozdielov medzi pôvodnou verziou (ľavý stĺpec) a preloženou verziou (pravý stĺpec) má prednosť pôvodná verzia.",
    clauseExclusiveValidity:
      "V prípade rozdielov medzi pôvodnou verziou (ľavý stĺpec) a preloženou verziou (pravý stĺpec) sa uplatňuje len pôvodná verzia. Preložená verzia má len informatívny charakter a nie je súčasťou právneho úkonu.",
  },

  {
    code: "SE",
    label: "Sweden",
    phone: "46",
    deeplCode: "sv",
    suggested: "more languages",
    clausePrecedence:
      "Vid skillnader mellan originalversionen (vänster kolumn) och den översatta versionen (höger kolumn) har originalversionen företräde.",
    clauseExclusiveValidity:
      "Vid avvikelser mellan originalversionen (vänster kolumn) och den översatta versionen (höger kolumn) ska endast originalversionen gälla. Den översatta versionen är endast avsedd för information och utgör inte en del av den rättsliga transaktionen.",
  },

  {
    code: "TR",
    label: "Turkish",
    phone: "90",
    deeplCode: "tr",
    suggested: "more languages",
    clausePrecedence:
      "Orijinal versiyon (sol sütun) ile çevrilmiş versiyon (sağ sütun) arasında farklılıklar olması durumunda, orijinal versiyon önceliklidir.",
    clauseExclusiveValidity:
      "Orijinal versiyon (sol sütun) ile tercüme edilmiş versiyon (sağ sütun) arasında tutarsızlık olması durumunda, yalnızca orijinal versiyon geçerli olacaktır. Tercüme edilmiş versiyon sadece bilgi amaçlıdır ve yasal işlemin bir parçasını oluşturmaz.",
  },

  {
    code: "UA",
    label: "Ukrainian",
    phone: "380",
    deeplCode: "ua",
    suggested: "more languages",
    clausePrecedence:
      "У разі розбіжностей між оригінальною версією (ліва колонка) та перекладеною версією (права колонка) перевагу має оригінальна версія.",
    clauseExclusiveValidity:
      "У разі розбіжностей між оригінальною версією (ліва колонка) та перекладеною версією (права колонка) застосовується лише оригінальна версія. Перекладена версія надається виключно в інформаційних цілях і не є частиною юридичної угоди.",
  },
]
