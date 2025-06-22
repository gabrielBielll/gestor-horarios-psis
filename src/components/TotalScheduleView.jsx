import React, { useMemo } from 'react';

const DIAS_SEMANA = [
  { key: 'seg', label: 'Segunda' }, { key: 'ter', label: 'Terça' },
  { key: 'qua', label: 'Quarta' }, { key: 'qui', label: 'Quinta' },
  { key: 'sex', label: 'Sexta' }, { key: 'sab', label: 'Sábado' },
];
const HORAS_TRABALHO = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const TotalScheduleView = ({ schedules }) => {
    const totalSchedule = useMemo(() => {
        const aggregated = {};
        DIAS_SEMANA.forEach(dia => { aggregated[dia.key] = {}; HORAS_TRABALHO.forEach(hora => { aggregated[dia.key][hora] = []; }); });
        schedules.forEach(psi => { DIAS_SEMANA.forEach(dia => { if (psi.horarios_disponiveis && psi.horarios_disponiveis[dia.key]) { psi.horarios_disponiveis[dia.key].forEach(hora => { if (aggregated[dia.key][hora]) aggregated[dia.key][hora].push(psi.psicologa_id); }); } }); });
        return aggregated;
    }, [schedules]);

    return (<div className="total-schedule-grid">{DIAS_SEMANA.map(dia => (<div key={dia.key} className="total-day-column"><h3 className="total-day-title">{dia.label}</h3>{HORAS_TRABALHO.map(hora => (<div key={hora} className="total-time-slot"><strong>{hora}</strong><div className="available-psis-list">{totalSchedule[dia.key][hora].length > 0 ? ( totalSchedule[dia.key][hora].map(psiId => ( <span key={psiId} className="psi-badge">ID: {psiId}</span> )) ) : ( <span className="no-psis">Indisponível</span> )}</div></div>))}</div>))}</div>);
};

export default TotalScheduleView;
