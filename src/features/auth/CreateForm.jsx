import React from 'react';
import { UserPlus, Plus, X } from 'lucide-react';

const CreateForm = ({ handleCreateSubmit, createId, setCreateId, createPassword, setCreatePassword, onClose }) => (
    <div className="section-card" style={{margin: 0, width: '500px', maxWidth: '90vw'}}>
        <div className="section-header"><UserPlus size={24} /><h2 className="section-title">Criar Nova Psicóloga</h2></div>
        <div className="section-content">
            <form onSubmit={handleCreateSubmit}>
                <div className="form-grid" style={{gridTemplateColumns: '1fr'}}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="new-psi-id">ID da Psicóloga:</label>
                        <input
                            type="number"
                            id="new-psi-id"
                            value={createId}
                            onChange={(e) => setCreateId(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="new-psi-password">Senha Inicial:</label>
                        <input
                            type="password"
                            id="new-psi-password"
                            value={createPassword}
                            onChange={(e) => setCreatePassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                </div>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center'}}>
                        <button type="button" onClick={onClose} className="btn btn-ghost" style={{width: 'auto'}}><X size={18}/> Cancelar</button>
                        <button type="submit" className="btn btn-tertiary" style={{width: 'auto'}}><Plus size={18}/> Criar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
);

export default CreateForm;