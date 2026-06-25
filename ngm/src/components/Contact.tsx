import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check, Send, CheckCircle2, User, Mail, Briefcase, Phone, MessageSquare, Euro } from 'lucide-react';

export default function Contact() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactBudget, setContactBudget] = useState('1k-3k');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const [availableDays, setAvailableDays] = useState<{ label: string; dateStr: string }[]>([]);

  useEffect(() => {
    const daysList: { label: string; dateStr: string }[] = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      if (d.getDay() === 0) continue;
      daysList.push({ label: d.toLocaleDateString('it-IT', options), dateStr: d.toISOString().split('T')[0] });
    }
    setAvailableDays(daysList);
    if (daysList.length > 0) setSelectedDate(daysList[0].dateStr);
  }, []);

  const timeSlots = ['10:00', '11:30', '14:30', '16:00', '17:30'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !bookingName || !bookingEmail) {
      alert('Compila i campi obbligatori per confermare l\'appuntamento.');
      return;
    }
    const payload = { id: `booking-${Date.now()}`, date: selectedDate, time: selectedTime, name: bookingName, email: bookingEmail, company: bookingCompany, phone: bookingPhone, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('ngm_bookings') || '[]');
    existing.push(payload);
    localStorage.setItem('ngm_bookings', JSON.stringify(existing));
    setBookingSuccess(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Compila i campi obbligatori del form contatti.');
      return;
    }
    const payload = { id: `message-${Date.now()}`, name: contactName, email: contactEmail, company: contactCompany, phone: contactPhone, budget: contactBudget, message: contactMessage, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('ngm_messages') || '[]');
    existing.push(payload);
    localStorage.setItem('ngm_messages', JSON.stringify(existing));
    setContactSuccess(true);
  };

  const inputClass = "w-full bg-white border border-bordo py-3 px-4 text-xs text-inchiostro placeholder-grigio/50 focus:border-fuoco focus:outline-none transition-all";
  const labelClass = "block font-mono text-[9px] text-grigio uppercase tracking-widest mb-1.5";

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-10 bg-surface-900 border-b border-bordo"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Iniziamo un Progetto</p>
          <h2
            className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Prenota un<br />appuntamento
          </h2>
          <p className="mt-4 text-grigio text-sm leading-relaxed font-light">
            Scegli una data per una sessione strategica gratuita, o inviaci un messaggio con i dettagli della tua azienda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Calendar booking */}
          <div className="lg:col-span-7 bg-carta border border-bordo p-8 flex flex-col" id="calendar-booking-module">
            {bookingSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-16 flex-1 gap-5">
                <CheckCircle2 className="w-12 h-12 text-fuoco" />
                <h3 className="font-display font-black text-2xl text-inchiostro uppercase">Chiamata Confermata</h3>
                <p className="text-grigio text-sm max-w-md leading-relaxed">
                  Il tuo slot per il <strong className="text-inchiostro">{selectedDate}</strong> alle <strong className="text-inchiostro">{selectedTime}</strong> è prenotato. Riceverai il link Google Meet via email.
                </p>
                <button onClick={() => { setBookingName(''); setBookingEmail(''); setBookingCompany(''); setBookingPhone(''); setSelectedTime(''); setBookingSuccess(false); }}
                  className="mt-2 px-6 py-2.5 border border-bordo hover:border-inchiostro text-xs font-bold tracking-wider text-inchiostro uppercase transition-all cursor-pointer">
                  Prenota un altro slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-8 h-full">
                <div>
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-bordo">
                    <Calendar className="w-4 h-4 text-fuoco" />
                    <span className="font-mono text-[10px] text-inchiostro uppercase tracking-widest font-bold">1. Scegli data e ora</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                    {availableDays.map((day) => (
                      <button type="button" key={day.dateStr} onClick={() => setSelectedDate(day.dateStr)}
                        className={`py-3 px-2 border text-xs font-bold uppercase transition-all flex flex-col items-center cursor-pointer ${
                          selectedDate === day.dateStr ? 'bg-inchiostro border-inchiostro text-carta' : 'bg-white border-bordo text-grigio hover:border-inchiostro hover:text-inchiostro'
                        }`}>
                        <span className="text-[9px] opacity-70">{day.label.split(' ')[0]}</span>
                        <span className="text-sm font-black mt-0.5">{day.label.split(' ')[1]}</span>
                        <span className="text-[9px] opacity-70">{day.label.split(' ')[2]}</span>
                      </button>
                    ))}
                  </div>

                  <p className={labelClass}>Orari disponibili:</p>
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {timeSlots.map((time) => (
                      <button type="button" key={time} onClick={() => setSelectedTime(time)}
                        className={`py-2.5 border text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          selectedTime === time ? 'bg-fuoco border-fuoco text-carta' : 'bg-white border-bordo text-grigio hover:border-fuoco hover:text-fuoco'
                        }`}>
                        <Clock className="w-3 h-3 opacity-60" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-bordo">
                    <User className="w-4 h-4 text-fuoco" />
                    <span className="font-mono text-[10px] text-inchiostro uppercase tracking-widest font-bold">2. I tuoi dati</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Nome Completo *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-grigio/50" />
                        <input type="text" required value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder="Mario Rossi" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-grigio/50" />
                        <input type="email" required value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} placeholder="mario@azienda.it" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Azienda</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-grigio/50" />
                        <input type="text" value={bookingCompany} onChange={(e) => setBookingCompany(e.target.value)} placeholder="Nome S.r.l." className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Telefono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-grigio/50" />
                        <input type="tel" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} placeholder="+39 333 123456" className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={!selectedTime}
                  className={`mt-auto py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    selectedTime ? 'bg-inchiostro text-carta hover:bg-fuoco' : 'bg-bordo text-grigio cursor-not-allowed'
                  }`}>
                  <Check className="w-4 h-4" />
                  Conferma Appuntamento
                </button>
              </form>
            )}
          </div>

          {/* Message form */}
          <div className="lg:col-span-5 bg-carta border border-bordo p-8 flex flex-col" id="direct-message-module">
            {contactSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-16 flex-1 gap-5">
                <CheckCircle2 className="w-12 h-12 text-fuoco" />
                <h3 className="font-display font-black text-xl text-inchiostro uppercase">Messaggio Inviato</h3>
                <p className="text-grigio text-xs leading-relaxed max-w-sm">Risponderemo via email entro 24 ore lavorative.</p>
                <button onClick={() => { setContactName(''); setContactEmail(''); setContactCompany(''); setContactPhone(''); setContactMessage(''); setContactSuccess(false); }}
                  className="mt-2 px-5 py-2 border border-bordo hover:border-inchiostro text-[10px] font-bold tracking-wider text-inchiostro uppercase transition-all cursor-pointer">
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col justify-between h-full gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1 pb-4 border-b border-bordo">
                    <MessageSquare className="w-4 h-4 text-fuoco" />
                    <span className="font-mono text-[10px] text-inchiostro uppercase tracking-widest font-bold">Messaggio Diretto</span>
                  </div>
                  <div>
                    <label className={labelClass}>Nome completo *</label>
                    <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Nome Cognome" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="email@esempio.com" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Azienda</label>
                      <input type="text" value={contactCompany} onChange={(e) => setContactCompany(e.target.value)} placeholder="Nome Srl" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Telefono</label>
                      <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+39..." className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Budget Pubblicitario Mensile</label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-3.5 w-4 h-4 text-grigio/50" />
                      <select value={contactBudget} onChange={(e) => setContactBudget(e.target.value)}
                        className={`${inputClass} pl-10 appearance-none bg-white`}>
                        <option value="1k-3k">1,000 € – 3,000 € / mese</option>
                        <option value="3k-10k">3,000 € – 10,000 € / mese</option>
                        <option value="10k-30k">10,000 € – 30,000 € / mese</option>
                        <option value="30k+">Oltre 30,000 € / mese</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Obiettivi da raggiungere *</label>
                    <textarea required rows={4} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Breve descrizione della tua attività e del tuo target..." className={`${inputClass} resize-none`} />
                  </div>
                </div>
                <button type="submit"
                  className="py-4 bg-inchiostro text-carta text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-fuoco transition-colors duration-200">
                  <Send className="w-3.5 h-3.5" />
                  Invia Candidatura
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
