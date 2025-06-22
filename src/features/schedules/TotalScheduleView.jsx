import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DIAS_SEMANA, HORAS_TRABALHO } from '../../utils/constants';

const TotalScheduleView = ({ horariosPsicologos }) => {
    const totalHorariosDisponiveis = useMemo(() => {
        const initial = HORAS_TRABALHO.reduce((acc, hora) => {
            acc[hora] = {};
            DIAS_SEMANA.forEach(dia => {
                acc[hora][dia.key] = [];
            });
            return acc;
        }, {});

        horariosPsicologos.forEach(psicologo => {
            DIAS_SEMANA.forEach(dia => {
                psicologo.horarios[dia.key]?.forEach(hora => {
                    if (initial[hora]) {
                        initial[hora][dia.key].push(psicologo.nome || psicologo.id);
                    }
                });
            });
        });

        return initial;
    }, [horariosPsicologos]);

    return (
        <div className="total-schedule-grid">
            {DIAS_SEMANA.map(dia => (
                <div key={dia.key} className="total-day-column section-card">
                    <h3 className="total-day-title">
                        <Calendar size={18} style={{ marginRight: '0.5rem' }} />
                        {dia.label}
                    </h3>
                    {
                        HORAS_TRABALHO.map(hora => {
                            const psisDisponiveis = totalHorariosDisponiveis[hora]?.[dia.key] || [];
                            return (
                                <div key={hora} className="total-time-slot">
                                    <strong><Clock size={16} style={{ marginRight: '0.25rem' }} />{hora}</strong>
                                    <div className="available-psis-list">
                                        {psisDisponiveis.length > 0 ? (
                                            psisDisponiveis.map(psi => (
                                                <span key={psi} className="psi-badge">{psi}</span>
                                            ))
                                        ) : (
                                            <span className="no-psis">Nenhum</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            ))}
        </div>
    );
};

export default TotalScheduleView;