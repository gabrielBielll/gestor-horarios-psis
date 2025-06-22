import React, { useState } from 'react';
import { Send, Wrench } from 'lucide-react';

const DevToolsView = ({ schedules, onSendRequest, fetchSchedules }) => {
    const [endpoint, setEndpoint] = useState('/criar');
    const [requestBody, setRequestBody] = useState('{
  "id": 123,
  "senha": "nova-senha"
}');
    const [response, setResponse] = useState(null);

    const handlePresetChange = (e) => {
        const selectedEndpoint = e.target.value;
        setEndpoint(selectedEndpoint);

        if (selectedEndpoint === '/criar') {
            setRequestBody('{
  "id": 123,
  "senha": "nova-senha"
}');
        } else if (selectedEndpoint === '/editar') {
            setRequestBody('{
  "id": 123,
  "senha": "senha-antiga",
  "horarios": {
    "seg": ["09:00", "10:00"],
    "ter": []
  }
}');
        } else {
            setRequestBody('{}');
        }
    };

    return (
        <div>
            <div className="section-card">
                <div className="section-header"><h2 className="section-title">Visualizador de JSON</h2></div>
                <div className="section-content">
                    <button className="btn btn-secondary" style={{width: 'auto', marginBottom: '1rem'}} onClick={fetchSchedules}>Atualizar Dados</button>
                    <pre className="json-viewer">{JSON.stringify(schedules, null, 2)}</pre>
                </div>
            </div>
            <div className="section-card">
                <div className="section-header"><h2 className="section-title">Enviar Requisição Manual</h2></div>
                <div className="section-content">
                    <div className="form-group">
                        <label className="form-label">Presets de Requisição</label>
                        <select onChange={handlePresetChange} className="form-select" defaultValue="">
                            <option value="" disabled>Selecione um preset...</option>
                            <option value="/criar">Criar Psicóloga</option>
                            <option value="/editar">Editar Horários</option>
                        </select>
                    </div>
                    <div className="form-group" style={{marginTop: '1rem'}}>
                        <label className="form-label">Endpoint (prefixo: /api/horarios)</label>
                        <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="form-input" placeholder="/exemplo"/>
                    </div>
                    <div className="form-group" style={{marginTop: '1rem'}}>
                        <label className="form-label">Corpo da Requisição (JSON)</label>
                        <textarea className="json-viewer request-sender" rows="10" value={requestBody} onChange={(e) => setRequestBody(e.target.value)}></textarea>
                    </div>
                     <button className="btn btn-tertiary" style={{width: 'auto', marginTop: '1rem'}} onClick={() => onSendRequest(endpoint, requestBody, setResponse)}>
                        <Send size={18}/> Enviar Requisição
                    </button>
                    {response && (
                        <div className="form-group" style={{marginTop: '1.5rem'}}>
                            <label className="form-label">Resposta da API</label>
                            <pre className="json-viewer" style={{backgroundColor: response.ok ? '#e8f5e8' : '#fdeaea', color: response.ok ? '#2d5016' : '#721c24' }}>
                                {JSON.stringify(response.data, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DevToolsView;