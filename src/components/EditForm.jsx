import React from 'react';
import { Edit, Save, X, Clock } from 'lucide-react';

const DIAS_SEMANA = [
  { key: 'dom', label: 'Domingo' }, { key: 'seg', label: 'Segunda' },
  { key: 'ter', label: 'Terça' }, { key: 'qua', label: 'Quarta' },
  { key: 'qui', label: 'Quinta' }, { key: 'sex', label: 'Sexta' },
  { key: 'sab', label: 'Sábado' },
];
const HORAS_TRABALHO = [
  '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

const EditForm = ({ show, handleEditSubmit, editId, editPassword, setEditPassword, horariosSelecionados, handleHorarioChange, onClose }) => {
    if (!show) return null;
    return (
        <div id="edit-form-section" className="section-card" style={{margin: 0, width: '900px', maxWidth: '90vw'}}>
            <div className="section-header"><Edit size={24} /><h2 className="section-title">Editar Horários (ID: {editId})</h2></div>
            <div className="section-content">
                <form onSubmit={handleEditSubmit}>
                    <div className="form-grid">
                        <div className="form-group"><label className="form-label" htmlFor="psi-id">ID da Psicóloga</label><input type="number" id="psi-id" value={editId} required readOnly className="form-input"/></div>
                        <div className="form-group"><label className="form-label" htmlFor="psi-password">Senha (obrigatória)</label><input type="password" id="psi-password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} required placeholder="Senha para confirmar alteração" className="form-input"/></div>
                    </div>
                    <div className="form-group" style={{marginTop: '1.5rem'}}>
                        <label className="form-label"><Clock size={18} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}}/>Selecione os Horários</label>
                        <div className="time-selection-grid">
                            {DIAS_SEMANA.map(dia => (<div key={dia.key} className="day-selection"><div className="day-selection-title">{dia.label}</div><div className="checkbox-list">{HORAS_TRABALHO.map(hora => (<div key={hora} className="checkbox-item"><input type="checkbox" id={`${dia.key}-${hora}`} checked={horariosSelecionados[dia.key]?.includes(hora) || false} onChange={() => handleHorarioChange(dia.key, hora)} className="checkbox-input"/><label htmlFor={`${dia.key}-${hora}`} className="checkbox-label">{hora}</label></div>))}</div></div>))}
                        </div>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center'}}>
                            <button type="button" onClick={onClose} className="btn btn-ghost" style={{width: 'auto'}}><X size={18}/> Cancelar</button>
                            <button type="submit" className="btn btn-primary" style={{width: 'auto'}}><Save size={18}/>Salvar Alterações</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
