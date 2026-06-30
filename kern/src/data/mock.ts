export type CantiereStatus = 'in_corso' | 'pianificato' | 'completato' | 'sospeso';
export type FatturaStatus = 'pagata' | 'in_attesa' | 'scaduta' | 'bozza';
export type PreventivoStatus = 'accettato' | 'inviato' | 'bozza' | 'rifiutato';

export interface Cantiere {
  id: string;
  nome: string;
  cliente: string;
  localita: string;
  status: CantiereStatus;
  valore: number;
  avanzamento: number;
  dataInizio: string;
  dataFine: string;
  responsabile: string;
  speseSostenute: number;
  operai: number;
}

export interface Fattura {
  id: string;
  numero: string;
  cliente: string;
  cantiere: string;
  importo: number;
  status: FatturaStatus;
  dataEmissione: string;
  dataScadenza: string;
}

export interface Preventivo {
  id: string;
  numero: string;
  cliente: string;
  oggetto: string;
  importo: number;
  status: PreventivoStatus;
  data: string;
  validita: string;
}

export interface Rapportino {
  id: string;
  cantiere: string;
  data: string;
  operaio: string;
  ore: number;
  attivita: string;
  materiali: string;
  note: string;
}

export interface CashflowMonth {
  mese: string;
  entrate: number;
  uscite: number;
}

export const cantieri: Cantiere[] = [
  { id: 'c1', nome: 'Residenza Collina Verde', cliente: 'Famiglia Müller', localita: 'Lugano', status: 'in_corso', valore: 485000, avanzamento: 67, dataInizio: '2026-02-10', dataFine: '2026-09-30', responsabile: 'Marco Bianchi', speseSostenute: 198000, operai: 6 },
  { id: 'c2', nome: 'Ristrutturazione Villa Lago', cliente: 'Hoffmann SA', localita: 'Locarno', status: 'in_corso', valore: 320000, avanzamento: 42, dataInizio: '2026-03-01', dataFine: '2026-08-15', responsabile: 'Luca Ferretti', speseSostenute: 87000, operai: 4 },
  { id: 'c3', nome: 'Capannone Industriale Zona Nord', cliente: 'TechLogistic AG', localita: 'Bellinzona', status: 'in_corso', valore: 890000, avanzamento: 28, dataInizio: '2026-04-15', dataFine: '2027-02-28', responsabile: 'Marco Bianchi', speseSostenute: 145000, operai: 9 },
  { id: 'c4', nome: 'Appartamenti Via Roma 12', cliente: 'Immobiliare Rossi Srl', localita: 'Mendrisio', status: 'pianificato', valore: 1200000, avanzamento: 0, dataInizio: '2026-08-01', dataFine: '2027-12-31', responsabile: 'Sara Conti', speseSostenute: 0, operai: 0 },
  { id: 'c5', nome: 'Rifacimento Facciata Banca', cliente: 'UBS Filiale Lugano', localita: 'Lugano', status: 'completato', valore: 145000, avanzamento: 100, dataInizio: '2026-01-10', dataFine: '2026-04-30', responsabile: 'Luca Ferretti', speseSostenute: 98000, operai: 3 },
  { id: 'c6', nome: 'Parcheggio Multipiano Centro', cliente: 'Città di Chiasso', localita: 'Chiasso', status: 'sospeso', valore: 2100000, avanzamento: 15, dataInizio: '2026-01-15', dataFine: '2027-06-30', responsabile: 'Marco Bianchi', speseSostenute: 210000, operai: 0 },
];

export const fatture: Fattura[] = [
  { id: 'f1', numero: 'FAT-2026-041', cliente: 'Famiglia Müller', cantiere: 'Residenza Collina Verde', importo: 95000, status: 'pagata', dataEmissione: '2026-04-01', dataScadenza: '2026-04-30' },
  { id: 'f2', numero: 'FAT-2026-042', cliente: 'Hoffmann SA', cantiere: 'Ristrutturazione Villa Lago', importo: 48000, status: 'in_attesa', dataEmissione: '2026-05-15', dataScadenza: '2026-06-14' },
  { id: 'f3', numero: 'FAT-2026-043', cliente: 'TechLogistic AG', cantiere: 'Capannone Industriale', importo: 125000, status: 'in_attesa', dataEmissione: '2026-06-01', dataScadenza: '2026-06-30' },
  { id: 'f4', numero: 'FAT-2026-038', cliente: 'UBS Filiale Lugano', cantiere: 'Rifacimento Facciata', importo: 145000, status: 'pagata', dataEmissione: '2026-05-02', dataScadenza: '2026-06-01' },
  { id: 'f5', numero: 'FAT-2026-039', cliente: 'Immobiliare Rossi Srl', cantiere: 'Appartamenti Via Roma', importo: 35000, status: 'scaduta', dataEmissione: '2026-04-10', dataScadenza: '2026-05-10' },
  { id: 'f6', numero: 'FAT-2026-040', cliente: 'Hoffmann SA', cantiere: 'Ristrutturazione Villa Lago', importo: 32000, status: 'bozza', dataEmissione: '2026-06-25', dataScadenza: '2026-07-25' },
  { id: 'f7', numero: 'FAT-2026-044', cliente: 'Famiglia Müller', cantiere: 'Residenza Collina Verde', importo: 78000, status: 'in_attesa', dataEmissione: '2026-06-20', dataScadenza: '2026-07-20' },
];

export const preventivi: Preventivo[] = [
  { id: 'p1', numero: 'PRV-2026-018', cliente: 'Studio Arch. Rezzonico', oggetto: 'Ristrutturazione completa appartamento 180mq', importo: 240000, status: 'inviato', data: '2026-06-15', validita: '2026-07-15' },
  { id: 'p2', numero: 'PRV-2026-019', cliente: 'Hotel Splendide Lugano', oggetto: 'Rifacimento copertura e isolamento termico', importo: 380000, status: 'inviato', data: '2026-06-18', validita: '2026-07-18' },
  { id: 'p3', numero: 'PRV-2026-017', cliente: 'Comune di Capolago', oggetto: 'Manutenzione straordinaria edificio scolastico', importo: 165000, status: 'accettato', data: '2026-06-05', validita: '2026-07-05' },
  { id: 'p4', numero: 'PRV-2026-016', cliente: 'Villa Primavera SA', oggetto: 'Costruzione piscina e sistemazione esterna', importo: 95000, status: 'rifiutato', data: '2026-05-20', validita: '2026-06-20' },
  { id: 'p5', numero: 'PRV-2026-020', cliente: 'Farmacia Lugano Centro', oggetto: 'Adeguamento normativo antincendio', importo: 42000, status: 'bozza', data: '2026-06-28', validita: '2026-07-28' },
];

export const rapportini: Rapportino[] = [
  { id: 'r1', cantiere: 'Residenza Collina Verde', data: '2026-06-30', operaio: 'Giovanni Esposito', ore: 8, attivita: 'Posa pavimento piano primo', materiali: 'Piastrelle 60x60, malta', note: '' },
  { id: 'r2', cantiere: 'Residenza Collina Verde', data: '2026-06-30', operaio: 'Ahmed Hassan', ore: 8, attivita: 'Impianto elettrico cucina', materiali: 'Cavi, scatole derivazione', note: 'Attesa ispezione ENEL' },
  { id: 'r3', cantiere: 'Ristrutturazione Villa Lago', data: '2026-06-30', operaio: 'Florin Ionescu', ore: 7, attivita: 'Demolizione pareti interne', materiali: '', note: 'Scoperto tubo non in mappa' },
  { id: 'r4', cantiere: 'Capannone Industriale Zona Nord', data: '2026-06-30', operaio: 'Marco Bianchi', ore: 9, attivita: 'Supervisione getto fondamenta', materiali: 'Calcestruzzo C25/30', note: 'Getto completato, curing in corso' },
  { id: 'r5', cantiere: 'Capannone Industriale Zona Nord', data: '2026-06-30', operaio: 'Piotr Kowalski', ore: 8, attivita: 'Armatura pilastri', materiali: 'Ferro ø16, legature', note: '' },
  { id: 'r6', cantiere: 'Residenza Collina Verde', data: '2026-06-29', operaio: 'Giovanni Esposito', ore: 8, attivita: 'Intonaco bagno padronale', materiali: 'Intonaco rasante', note: '' },
];

export const cashflow: CashflowMonth[] = [
  { mese: 'Gen', entrate: 145000, uscite: 98000 },
  { mese: 'Feb', entrate: 89000, uscite: 112000 },
  { mese: 'Mar', entrate: 210000, uscite: 134000 },
  { mese: 'Apr', entrate: 320000, uscite: 178000 },
  { mese: 'Mag', entrate: 185000, uscite: 145000 },
  { mese: 'Giu', entrate: 276000, uscite: 192000 },
];

export const kpi = {
  fatturatoAnno: 1842000,
  margineNetto: 348000,
  cantieriAttivi: 3,
  creditiAperti: 155000,
  percentualeMargine: 18.9,
};
