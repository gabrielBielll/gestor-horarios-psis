import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import GlobalLoader from './components/GlobalLoader';
import NotificationToast from './components/NotificationToast';
import Sidebar from './components/Sidebar';
import CreateForm from './features/auth/CreateForm';
import EditForm from './features/schedules/EditForm';
import ScheduleList from './features/schedules/ScheduleList';
import TotalScheduleView from './features/schedules/TotalScheduleView';
import DevToolsView from './features/DevToolsView';
import useScheduleManagement from './hooks/useScheduleManagement';
import { ChevronsRight } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const {
    schedules,
    isLoading,
    apiError,
    expandedSchedules,
    isCreateFormVisible,
    setIsCreateFormVisible,
    isEditFormVisible,
    setIsEditFormVisible,
    isSaving,
    notification,
    setNotification,
    editId,
    setEditId,
    editPassword,
    setEditPassword,
    horariosSelecionados,
    setHorariosSelecionados,
    createId,
    setCreateId,
    createPassword,
    setCreatePassword,
    fetchSchedules,
    toggleScheduleExpansion,
    handleHorarioChange,
    handleLoadForEdit,
    handleEditSubmit,
    handleCreateSubmit,
    handleSendCustomRequest,
    closeModal,
  } = useScheduleManagement();

  return (
    <>
      <GlobalStyles />
      {isSaving && <GlobalLoader />}
      {notification.show && <NotificationToast message={notification.message} type={notification.type} onClose={() => setNotification({ show: false, message: '', type: ''})} />}

      {(isCreateFormVisible || isEditFormVisible) && !isSaving && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {isCreateFormVisible && <CreateForm {...{ handleCreateSubmit, createId, setCreateId, createPassword, setCreatePassword, onClose: () => setIsCreateFormVisible(false) }}/>}
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
              <section className="section-card">
                <div className="section-header"><Calendar size={24} /> <h2 className="section-title">Perfis Individuais</h2></div>
                <div className="section-content">
                    <ScheduleList
                        schedules={schedules}
                        isLoading={isLoading}
                        apiError={apiError}
                        expandedSchedules={expandedSchedules}
                        toggleScheduleExpansion={toggleScheduleExpansion}
                        handleLoadForEdit={handleLoadForEdit}
                    />
                </div>
              </section>
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