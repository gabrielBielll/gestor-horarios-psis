import { useState, useEffect, useCallback } from 'react';
import { HORARIOS_INICIAL } from '../utils/constants';

const useScheduleManagement = () => {
    const [horariosPsicologos, setHorariosPsicologos] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [createId, setCreateId] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [editId, setEditId] = useState(null);
    const [editPassword, setEditPassword] = useState('');
    const [horariosSelecionados, setHorariosSelecionados] = useState(HORARIOS_INICIAL);

    // Carregar dados iniciais (simulado)
    useEffect(() => {
        setLoading(true);
        // Simula uma chamada de API
        setTimeout(() => {
            setHorariosPsicologos([
                { id: 'psico1', nome: 'Dra. Ana Silva', horarios: { seg: ['09:00', '10:00'], ter: ['14:00', '15:00'] } },
                { id: 'psico2', nome: 'Dr. João Pereira', horarios: { seg: ['11:00'], qui: ['16:00', '17:00'], sex: ['10:00'] } },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    // Resetar estado de formulário ao fechar modal
    useEffect(() => {
        if (!showCreateModal) {
            setCreateId('');
            setCreatePassword('');
        }
        if (!showEditModal) {
            setEditId(null);
            setEditPassword('');
            setHorariosSelecionados(HORARIOS_INICIAL);
        }
    }, [showCreateModal, showEditModal]);

    const toggleCardExpansion = useCallback((id) => {
        setExpandedCard(expandedCard === id ? null : id);
    }, [expandedCard]);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
    }, []);

    const closeNotification = useCallback(() => {
        setNotification(null);
    }, []);

    const handleCreateSubmit = useCallback(async (e) => {
        e.preventDefault();
        setGlobalLoading(true);
        // Simula a criação
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Criar:', { id: createId, password: createPassword });
        setGlobalLoading(false);
        setShowCreateModal(false);
        showNotification(`Psicólogo ${createId} criado com sucesso!`);
        // Adicionar o novo psicólogo à lista (simulado)
        setHorariosPsicologos(prev => [...prev, { id: createId, nome: `Psicólogo ${createId}`, horarios: {} }]);
    }, [createId, createPassword, showNotification]);

    const handleEditSubmit = useCallback(async (e) => {
        e.preventDefault();
        setGlobalLoading(true);
        // Simula a edição
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Editar:', { id: editId, password: editPassword, horarios: horariosSelecionados });
        setGlobalLoading(false);
        setShowEditModal(false);
        showNotification(`Psicólogo ${editId} atualizado com sucesso!`);
        // Atualizar o psicólogo na lista (simulado)
        setHorariosPsicologos(prev => prev.map(psi =>
            psi.id === editId ? { ...psi, nome: editPassword ? `Psicólogo ${editId}` : psi.nome, horarios: horariosSelecionados } : psi
        ));
    }, [editId, editPassword, horariosSelecionados, showNotification]);

    const handleHorarioChange = useCallback((diaKey, hora) => {
        setHorariosSelecionados(prev => {
            const novosHorariosDia = prev[diaKey].includes(hora)
                ? prev[diaKey].filter(h => h !== hora)
                : [...prev[dia.key], hora].sort();
            return { ...prev, [diaKey]: novosHorariosDia };
        });
    }, []);

    const openEditModal = useCallback((psicologo) => {
        setEditId(psicologo.id);
        setEditPassword(''); // A senha não é carregada para edição, deve ser definida novamente se desejado
        setHorariosSelecionados(psicologo.horarios || HORARIOS_INICIAL);
        setShowEditModal(true);
    }, [HORARIOS_INICIAL]);

    return {
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
    };
};

export default useScheduleManagement;