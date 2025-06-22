import React from 'react';
import { Calendar, User, Edit, Eye, EyeOff } from 'lucide-react';
import { DIAS_SEMANA } from '../../utils/constants';

const ScheduleList = ({ schedules, toggleScheduleExpansion, expandedSchedules, handleLoadForEdit, isLoading, apiError }) => {
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>A carregar...</p>
            </div>
        );
    }

    if (apiError) {
        return (
            <div className="message-alert message-error">
                <span>⚠️</span>{apiError}
            </div>
        );
    }

    if (!schedules || schedules.length === 0) {
        return (
            <div className="empty-state">
                <Calendar className="empty-state-icon" size={50} />
                <p>Nenhuma psicóloga encontrada.</p>
            </div>
        );
    }

    return (
        <div className="schedule-grid">
            {schedules.map(psi => (
                <div key={psi.psicologa_id} className="schedule-card">
                    <div className="schedule-card-header">
                        <div className="schedule-card-title">
                            <User size={20} /> Psicóloga ID: {psi.psicologa_id}
                        </div>
                        <div className="schedule-actions">
                            <button onClick={() => toggleScheduleExpansion(psi.psicologa_id)} className="btn btn-ghost btn-small btn-icon" title={expandedSchedules.includes(psi.psicologa_id) ? 'Recolher' : 'Ver Horários'}>
                                {expandedSchedules.includes(psi.psicologa_id) ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button onClick={() => handleLoadForEdit(psi)} className="btn btn-secondary btn-small">
                                <Edit size={16} /> Editar
                            </button>
                        </div>
                    </div>
                    <div className={`schedule-card-content ${expandedSchedules.includes(psi.psicologa_id) ? 'expanded' : ''}`}>
                        <div className="schedule-display">
                            {DIAS_SEMANA.map(dia => (
                                <div key={dia.key} className="day-schedule">
                                    <div className="day-name">{dia.label}</div>
                                    <div className="time-slots">
                                        {psi.horarios_disponiveis && psi.horarios_disponiveis[dia.key]?.length > 0 ? (
                                            psi.horarios_disponiveis[dia.key].map(hora => (
                                                <div key={hora} className="time-slot">{hora}</div>
                                            ))
                                        ) : (
                                            <div className="time-slot" style={{opacity: 0.5, fontStyle: 'italic'}}>Indisponível</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScheduleList;