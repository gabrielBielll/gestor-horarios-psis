import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Clock, User, Edit, EyeOff, Plus, Save, UserPlus, Users, LayoutDashboard, ChevronsRight, X, CheckCircle, Send, Wrench } from 'lucide-react';

import GlobalLoader from './components/GlobalLoader';
import NotificationToast from './components/NotificationToast';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import TotalScheduleView from './components/TotalScheduleView';
import DevToolsView from './components/DevToolsView';

// import './App.css'; // Removido pois os estilos agora estão em index.css

const DIAS_SEMANA = [
  { key: 'seg', label: 'Segunda' }, { key: 'ter', label: 'Terça' },
  { key: 'qua', label: 'Quarta' }, { key: 'qui', label: 'Quinta' },
  { key: 'sex', label: 'Sexta' }, { key: 'sab', label: 'Sábado' },
];
const HORAS_TRABALHO = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];
const HORARIOS_INICIAL = DIAS_SEMANA.reduce((acc, dia) => ({ ...acc, [dia.key]: [] }), {});

function App() {
  const API_URL = 'https://lista-psis-api.onrender.com';

  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [expandedSchedules, setExpandedSchedules] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: ''});

  const [editId, setEditId] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [horariosSelecionados, setHorariosSelecionados] = useState(HORARIOS_INICIAL);

  const [createId, setCreateId] = useState('');
  const [createName, setCreateName] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  const fetchSchedules = useCallback(async () => {
    setIsLoading(true); setApiError(null);
    try {
        const response = await fetch(`${API_URL}/api/horarios`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Falha ao buscar dados da API.' }));
            throw new Error(errorData.message);
        }
        const data = await response.json();
        setSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { fetchSchedules(); }, [fetchSchedules]);

  const toggleScheduleExpansion = (id) => {
    setExpandedSchedules(current => current.includes(id) ? current.filter(expId => expId !== id) : [...current, id]);
  };

  const handleHorarioChange = (diaKey, hora) => {
    setHorariosSelecionados(current => {
        const horariosDia = current[diaKey] || [];
        const novosHorarios = horariosDia.includes(hora) ? horariosDia.filter(h => h !== hora) : [...horariosDia, hora].sort();
        return { ...current, [diaKey]: novosHorarios };
    });
  };

  const handleLoadForEdit = (psi) => {
    setEditId(psi.psicologa_id);
    setHorariosSelecionados({ ...HORARIOS_INICIAL, ...psi.horarios_disponiveis });
    setEditPassword('');
    setIsEditFormVisible(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault(); setIsSaving(true);
    try {
        const res = await fetch(`${API_URL}/api/horarios/editar`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: parseInt(editId), senha: editPassword, horarios: horariosSelecionados }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Erro ao atualizar.');
        fetchSchedules();
        setIsEditFormVisible(false);
        setNotification({show: true, message: 'Alterações salvas com sucesso!', type: 'success'});
    } catch (error) { alert(`Erro: ${error.message}`); } finally { setIsSaving(false); }
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault(); setIsSaving(true);
    try {
        const res = await fetch(`${API_URL}/api/horarios/criar`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: parseInt(createId), nome: createName, senha: createPassword }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Ocorreu um erro ao criar.');
        setCreateId(''); setCreatePassword(''); setCreateName('');
        fetchSchedules();
        setIsCreateFormVisible(false);
        setNotification({show: true, message: 'Psicóloga criada com sucesso!', type: 'success'});
    } catch (error) { alert(`Erro: ${error.message}`); } finally { setIsSaving(false); }
  };

  const handleSendCustomRequest = async (endpoint, body, setResponse) => {
      setIsSaving(true);
      try {
          const parsedBody = JSON.parse(body);
          const res = await fetch(`${API_URL}/api/horarios${endpoint}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(parsedBody),
          });
          const result = await res.json();
          setResponse({ ok: res.ok, data: result });
          if(res.ok) {
              fetchSchedules();
              setNotification({show: true, message: `Requisição para ${endpoint} enviada com sucesso!`, type: 'success'});
          }
      } catch (error) {
          setResponse({ ok: false, data: { message: error.message } });
      } finally {
          setIsSaving(false);
      }
  };

  const closeModal = () => {
      if(isSaving) return;
      setIsCreateFormVisible(false);
      setIsEditFormVisible(false);
  }

  return (
    <>
      {/* GlobalStyles component is removed as styles are now in index.css */}
      {isSaving && <GlobalLoader />}
      {notification.show && <NotificationToast message={notification.message} type={notification.type} onClose={() => setNotification({ show: false, message: '', type: ''})} />}

      {(isCreateFormVisible || isEditFormVisible) && !isSaving && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {isCreateFormVisible && <CreateForm {...{ handleCreateSubmit, createId, setCreateId, createName, setCreateName, createPassword, setCreatePassword, onClose: () => setIsCreateFormVisible(false) }}/>}
                {isEditFormVisible && <EditForm show={isEditFormVisible} {...{ handleEditSubmit, editId, editPassword, setEditPassword, horariosSelecionados, handleHorarioChange, onClose: () => setIsEditFormVisible(false) }} />}
            </div>
        </div>
      )}

      <div className="dashboard-layout">
        <aside className="sidebar">
            <div className="sidebar-header"><h1 className="sidebar-title">Gestão Psi</h1></div>

            <h3 className="sidebar-section-title"><ChevronsRight size={16} />Menu</h3>
            <nav className="nav-menu">
                <div onClick={() => setActiveView('dashboard')} className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}><LayoutDashboard size={20} /> Painel Individual</div>
                <div onClick={() => setActiveView('totalGrid')} className={`nav-link ${activeView === 'totalGrid' ? 'active' : ''}`}><Users size={20} /> Grade Geral</div>
                <div onClick={() => setActiveView('devtools')} className={`nav-link ${activeView === 'devtools' ? 'active' : ''}`}><Wrench size={20} /> Ferramentas</div>
            </nav>

            <h3 className="sidebar-section-title"><ChevronsRight size={16}/>Ações</h3>
            <nav className="nav-menu">
                <div onClick={() => setIsCreateFormVisible(true)} className={`nav-link`}><UserPlus size={20} /> Criar Psicóloga</div>
            </nav>
        </aside>

        <main className="app-container">
          <div className="main-content">
            <header className="app-header">
                <h1 className="app-title">Gestão de Horários das Psicólogas</h1>
            </header>

            {activeView === 'dashboard' && (
              <>
                <div className="section-card">
                  <div className="section-header"><Calendar size={24} /> <h2 className="section-title">Perfis Individuais</h2></div>
                  <div className="section-content">
                    {isLoading && <div className="loading-container"><div className="spinner"></div><p>A carregar...</p></div>}
                    {apiError && <div className="message-alert message-error"><span>⚠️</span>{apiError}</div>}
                    {!isLoading && !apiError && schedules.length === 0 && <div className="empty-state"><div className="empty-state-icon">📅</div><p>Nenhuma psicóloga encontrada.</p></div>}
                    {!isLoading && !apiError && schedules.length > 0 && (
                      <div className="schedule-grid">
                        {schedules.map(psi => (
                          <div key={psi.psicologa_id} className="schedule-card">
                            <div className="schedule-card-header">
                              <div className="schedule-card-title"><User size={20} /> <strong>{psi.nome}</strong> (ID: {psi.psicologa_id})</div>
                              <div className="schedule-actions">
                                <button onClick={() => toggleScheduleExpansion(psi.psicologa_id)} className="btn btn-ghost btn-small btn-icon" title={expandedSchedules.includes(psi.psicologa_id) ? 'Recolher' : 'Ver Horários'}><EyeOff size={16} /></button>
                                <button onClick={() => handleLoadForEdit(psi)} className="btn btn-secondary btn-small"><Edit size={16} /> Editar</button>
                              </div>
                            </div>
                            <div className={`schedule-card-content ${expandedSchedules.includes(psi.psicologa_id) ? 'expanded' : ''}`}>
                              <div className="schedule-display">
                                {DIAS_SEMANA.map(dia => (<div key={dia.key} className="day-schedule"><div className="day-name">{dia.label}</div><div className="time-slots">{psi.horarios_disponiveis && psi.horarios_disponiveis[dia.key]?.length > 0 ? psi.horarios_disponiveis[dia.key].map(hora => <div key={hora} className="time-slot">{hora}</div>) : <div className="time-slot" style={{opacity: 0.5, fontStyle: 'italic'}}>Indisponível</div>}</div></div>))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {activeView === 'totalGrid' && <TotalScheduleView schedules={schedules} />}
            {activeView === 'devtools' && <DevToolsView schedules={schedules} onSendRequest={handleSendCustomRequest} fetchSchedules={fetchSchedules}/>}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
