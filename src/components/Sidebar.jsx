import React from 'react';
import { Calendar, User, LayoutDashboard, UserPlus, Wrench } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">Painel Psicólogos</h1>
            </div>
            <nav className="nav-menu">
                <div className="sidebar-section-title">
                    <LayoutDashboard size={18} />
                    Geral
                </div>
                <a
                    className={`nav-link ${activeSection === 'horarios' ? 'active' : ''}`}
                    onClick={() => setActiveSection('horarios')}
                >
                    <Calendar size={20} />
                    Meus Horários
                </a>
                <a
                    className={`nav-link ${activeSection === 'total' ? 'active' : ''}`}
                    onClick={() => setActiveSection('total')}
                >
                    <Users size={20} />
                    Todos os Horários
                </a>

                <div className="sidebar-section-title">
                    <User size={18} />
                    Gerenciamento
                </div>
                <a
                    className={`nav-link ${activeSection === 'criar' ? 'active' : ''}`}
                    onClick={() => setActiveSection('criar')}
                >
                    <UserPlus size={20} />
                    Criar ID Psicólogo
                </a>
                <a
                    className={`nav-link ${activeSection === 'dev-tools' ? 'active' : ''}`}
                    onClick={() => setActiveSection('dev-tools')}
                >
                    <Wrench size={20} />
                    Ferramentas Dev
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;