import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import GlobalLoader from './components/GlobalLoader';
import NotificationToast from './components/NotificationToast';
import Sidebar from './components/Sidebar';
import CreateForm from './features/auth/CreateForm';
import EditForm from './features/schedules/EditForm';
import ScheduleList from './features/schedules/ScheduleList';
import TotalScheduleView from './features/schedules/TotalScheduleView';
import useScheduleManagement from './hooks/useScheduleManagement';

function App() {
    const [activeSection, setActiveSection] = useState('horarios');
    const {
        horariosPsicologos,
        expandedCard,
        loading,
        globalLoading,
        notification,
        showCreateModal,
        setShowCreateModal,
        showEditModal,
        setShowEditModal,
        createId,
        setCreateId,
        createPassword,
        setCreatePassword,
        editId,
        setEditId,
        editPassword,
        setEditPassword,
        horariosSelecionados,
        setHorariosSelecionados,
        toggleCardExpansion,
        showNotification,
        closeNotification,
        handleCreateSubmit,
        handleEditSubmit,
        handleHorarioChange,
        openEditModal,
    } = useScheduleManagement();

    return (
        <>
            <GlobalStyles />
            <div className="dashboard-layout">
                <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

                <div className="app-container">
                    <header className="app-header">
                        <h1 className="app-title">Painel de Agendamentos</h1>
                    </header>

                    <main className="main-content">
                        {activeSection === 'horarios' && (
                            <section className="section-card">
                                <div className="section-header">
                                    <h2 className="section-title">Meus Horários</h2>
                                </div>
                                <div className="section-content">
                                    {loading ? (
                                        <div className="loading-container">
                                            <div className="spinner"></div>
                                            <p>Carregando horários...</p>
                                        </div>
                                    ) : (
                                        <ScheduleList
                                            horariosPsicologos={horariosPsicologos}
                                            toggleCardExpansion={toggleCardExpansion}
                                            expandedCard={expandedCard}
                                            openEditModal={openEditModal}
                                        />
                                    )}
                                </div>
                            </section>
                        )}

                        {activeSection === 'total' && (
                            <section className="section-card">
                                <div className="section-header">
                                    <h2 className="section-title">Todos os Horários Disponíveis</h2>
                                </div>
                                <div className="section-content">
                                    {loading ? (
                                        <div className="loading-container">
                                            <div className="spinner"></div>
                                            <p>Carregando horários...</p>
                                        </div>
                                    ) : (
                                        <TotalScheduleView horariosPsicologos={horariosPsicologos} />
                                    )}
                                </div>
                            </section>
                        )}

                        {activeSection === 'criar' && (
                            <section className="section-card">
                                <div className="section-header">
                                    <h2 className="section-title">Criar Novo Psicólogo</h2>
                                </div>
                                <div className="section-content">
                                    <CreateForm
                                        handleCreateSubmit={handleCreateSubmit}
                                        createId={createId}
                                        setCreateId={setCreateId}
                                        createPassword={createPassword}
                                        setCreatePassword={setCreatePassword}
                                        onClose={() => setShowCreateModal(false)}
                                    />
                                </div>
                            </section>
                        )}

                        {activeSection === 'dev-tools' && (
                            <section className="section-card">
                                <div className="section-header">
                                    <h2 className="section-title">Ferramentas de Desenvolvimento</h2>
                                </div>
                                <div className="section-content">
                                    <p>Aqui você pode adicionar ferramentas para desenvolvedores, como visualizadores de JSON, simuladores de API, etc.</p>
                                    {/* Exemplo de visualizador JSON */}
                                    <h3 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--charcoal)'}}>Dados dos Psicólogos (JSON)</h3>
                                    <pre className="json-viewer">{JSON.stringify(horariosPsicologos, null, 2)}</pre>
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>

            {globalLoading && <GlobalLoader message="Processando..." />}
            {notification && (
                <NotificationToast
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}

            {showCreateModal && (
                <div className="modal-overlay">
                    <CreateForm
                        handleCreateSubmit={handleCreateSubmit}
                        createId={createId}
                        setCreateId={setCreateId}
                        createPassword={createPassword}
                        setCreatePassword={setCreatePassword}
                        onClose={() => setShowCreateModal(false)}
                    />
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay">
                    <EditForm
                        show={showEditModal}
                        handleEditSubmit={handleEditSubmit}
                        editId={editId}
                        editPassword={editPassword}
                        setEditPassword={setEditPassword}
                        horariosSelecionados={horariosSelecionados}
                        handleHorarioChange={handleHorarioChange}
                        onClose={() => setShowEditModal(false)}
                    />
                </div>
            )}
        </>
    );
}

export default App;