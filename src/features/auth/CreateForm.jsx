import React from 'react';
import { UserPlus, Save, X } from 'lucide-react';

const CreateForm = ({ handleCreateSubmit, createId, setCreateId, createPassword, setCreatePassword, onClose }) => (
    <div className="section-card" style={{margin: 0, width: '500px', maxWidth: '90vw'}}>
        <div className="section-header">
            <UserPlus size={24} />
            <h2 className="section-title">Novo ID e Senha</h2>
        </div>
        <div className="section-content">
            <form onSubmit={handleCreateSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="createId" className="form-label">ID do Psicólogo</label>
                        <input
                            type="text"
                            id="createId"
                            className="form-input"
                            value={createId}
                            onChange={(e) => setCreateId(e.target.value)}
                            placeholder="Ex: Dra. Ana"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="createPassword" className="form-label">Senha Temporária</label>
                        <input
                            type="password"
                            id="createPassword"
                            className="form-input"
                            value={createPassword}
                            onChange={(e) => setCreatePassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="submit" className="btn btn-primary">
                        <Save size={20} />
                        Salvar ID e Senha
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

export default CreateForm;