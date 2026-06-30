import { useState } from 'react';
import { TEAM_MEMBERS } from '../data';
import { Linkedin, MessageSquare } from 'lucide-react';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  return (
    <section
      id="chi-siamo"
      className="py-24 px-6 md:px-10 bg-surface-900 border-b border-bordo overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Chi Siamo</p>
            <h2
              className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Un team di<br />specialisti verticali
            </h2>
          </div>
          <p className="text-grigio text-sm leading-relaxed max-w-sm font-light">
            Parlerai direttamente con chi lavora sulle tue campagne, landing page e video. Niente account manager commerciali.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() =>
                setSelectedMember(selectedMember === member.id ? null : member.id)
              }
              className={`group cursor-pointer relative overflow-hidden border transition-all duration-200 ${
                selectedMember === member.id
                  ? 'border-fuoco'
                  : 'border-bordo hover:border-inchiostro'
              }`}
              id={`team-card-${member.id}`}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-bordo">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inchiostro/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display font-black text-carta uppercase text-sm tracking-tight">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[9px] text-fuoco uppercase tracking-widest leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio reveal */}
              <div className={`overflow-hidden transition-all duration-300 ${selectedMember === member.id ? 'max-h-48' : 'max-h-0'}`}>
                <div className="p-4 bg-inchiostro">
                  <p className="text-carta/60 text-xs leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex gap-3">
                    <Linkedin className="w-3.5 h-3.5 text-carta/30 hover:text-fuoco transition-colors cursor-pointer" />
                    <MessageSquare className="w-3.5 h-3.5 text-carta/30 hover:text-fuoco transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
