import React from 'react';
import { Save, X, Edit } from 'lucide-react';
import { DIAS_SEMANA, HORAS_TRABALHO } from '../../utils/constants';

const EditForm = ({ show, handleEditSubmit, editId, editPassword, setEditPassword, horariosSelecionados, handleHorarioChange, onClose }) => {
    if (!show) return null;
    return (
        <div id="edit-form-section" className="section-card" style={{margin: 0, width: '900px', maxWidth: '90vw'}}>
            <div className="section-header">
                <Edit size={24} />
                <h2 className="section-title">Editar ID {editId}</h2>
            </div>
            <div className="section-content">
                <form onSubmit={handleEditSubmit}>
                     <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="editId" className="form-label">ID do Psicólogo</label>
                            <input
                                type="text"
                                id="editId"
                                className="form-input"
                                value={editId}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editPassword" className="form-label">Nova Senha (opcional)</label>
                            <input
                                type="password"
                                id="editPassword"
                                className="form-input"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                placeholder="Deixe em branco para manter a atual"
                            />
                        </div>
                    </div>
                    <h3 style={{marginTop: '2rem', marginBottom: '1.5rem', color: 'var(--sage-green)'}}>Selecione os horários disponíveis</h3>
                    <div className="time-selection-grid">
                        {DIAS_SEMANA.map(dia => (
                            <div key={dia.key} className="day-selection">
                                <h4 className="day-selection-title">{dia.label}</h4>
                                <div className="checkbox-list">
                                    {HORAS_TRABALHO.map(hora => (
                                        <label key={hora} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                className="checkbox-input"
                                                checked={horariosSelecionados[dia.key]?.includes(hora) || false}
                                                onChange={() => handleHorarioChange(dia.key, hora)}
                                            />
                                            <span className="checkbox-label">{hora}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary">
                             <Save size={20} />
                             Salvar Alterações
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                             <X size={20} />
                             Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;