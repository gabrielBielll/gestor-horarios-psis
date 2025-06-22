import React from 'react';
import { Calendar, Clock, User, Edit, Eye, EyeOff } from 'lucide-react';
import { DIAS_SEMANA } from '../../utils/constants';

const ScheduleList = ({ horariosPsicologos, toggleCardExpansion, expandedCard, openEditModal }) => {
    if (!horariosPsicologos || horariosPsicologos.length === 0) {
        return (
            <div className="empty-state">
                <Calendar className="empty-state-icon" size={50} />
                <p>Nenhum horário de psicólogo cadastrado.</p>
            </div>
        );
    }

    return (
        <div className="schedule-grid">
            {horariosPsicologos.map(psicologo => (
                <div key={psicologo.id} className="schedule-card">
                    <div className="schedule-card-header">
                        <h3 className="schedule-card-title">
                            <User size={20} />
                            {psicologo.nome || psicologo.id}
                        </h3>
                        <div className="schedule-actions">
                            <button onClick={() => openEditModal(psicologo)} className="btn btn-icon btn-small btn-ghost">
                                <Edit size={20} />
                            </button>
                            <button onClick={() => toggleCardExpansion(psicologo.id)} className="btn btn-icon btn-small btn-ghost">
                                {expandedCard === psicologo.id ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className={`schedule-card-content ${expandedCard === psicologo.id ? 'expanded' : ''}`}>
                        <div className="schedule-display">
                            {DIAS_SEMANA.map(dia => (
                                <div key={dia.key} className="day-schedule">
                                    <p className="day-name">{dia.label}</p>
                                    <div className="time-slots">
                                        {psicologo.horarios[dia.key] && psicologo.horarios[dia.key].length > 0 ? (
                                            psicologo.horarios[dia.key].map(hora => (
                                                <span key={hora} className="time-slot">{hora}</span>
                                            ))
                                        ) : (
                                            <span className="no-psis">N/A</span>
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