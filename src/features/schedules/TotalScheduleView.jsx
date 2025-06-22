import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DIAS_SEMANA, HORAS_TRABALHO } from '../../utils/constants';

const TotalScheduleView = ({ schedules }) => {
    const totalSchedule = useMemo(() => {
        const aggregated = {};
        DIAS_SEMANA.forEach(dia => { aggregated[dia.key] = {}; HORAS_TRABALHO.forEach(hora => { aggregated[dia.key][hora] = []; }); });
        schedules.forEach(psi => { DIAS_SEMANA.forEach(dia => { if (psi.horarios_disponiveis && psi.horarios_disponiveis[dia.key]) { psi.horarios_disponiveis[dia.key].forEach(hora => { if (aggregated[dia.key][hora]) aggregated[dia.key][hora].push(psi.psicologa_id); }); } }); });
        return aggregated;
    }, [schedules]);

    return (
        <div className="total-schedule-grid">
            {DIAS_SEMANA.map(dia => (
                <div key={dia.key} className="total-day-column section-card">
                    <h3 className="total-day-title">
                        <Calendar size={18} style={{ marginRight: '0.5rem' }} />
                        {dia.label}
                    </h3>
                    {
                        HORAS_TRABALHO.map(hora => (
                            <div key={hora} className="total-time-slot">
                                <strong><Clock size={16} style={{ marginRight: '0.25rem' }} />{hora}</strong>
                                <div className="available-psis-list">
                                    {totalSchedule[dia.key][hora].length > 0 ? (
                                        totalSchedule[dia.key][hora].map(psiId => (
                                            <span key={psiId} className="psi-badge">ID: {psiId}</span>
                                        ))
                                    ) : (
                                        <span className="no-psis">Indisponível</span>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
};

export default TotalScheduleView;