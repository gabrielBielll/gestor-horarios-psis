import { useState, useEffect, useCallback } from 'react';
import { HORARIOS_INICIAL } from '../utils/constants';

const API_URL = 'https://lista-psis-api.onrender.com';

const useScheduleManagement = () => {
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const [expandedSchedules, setExpandedSchedules] = useState([]);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: ''});

    const [editId, setEditId] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [horariosSelecionados, setHorariosSelecionados] = useState(HORARIOS_INICIAL);
    
    const [createId, setCreateId] = useState('');
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
    }, []);

    useEffect(() => { fetchSchedules(); }, [fetchSchedules]);
    
    const toggleScheduleExpansion = useCallback((id) => {
        setExpandedSchedules(current => current.includes(id) ? current.filter(expId => expId !== id) : [...current, id]);
    }, []);

    const handleHorarioChange = useCallback((diaKey, hora) => {
        setHorariosSelecionados(current => {
            const horariosDia = current[diaKey] || [];
            const novosHorarios = horariosDia.includes(hora) ? horariosDia.filter(h => h !== hora) : [...horariosDia, hora].sort();
            return { ...current, [diaKey]: novosHorarios };
        });
    }, []);

    const handleLoadForEdit = useCallback((psi) => {
        setEditId(psi.psicologa_id);
        setHorariosSelecionados({ ...HORARIOS_INICIAL, ...psi.horarios_disponiveis });
        setEditPassword('');
        setIsEditFormVisible(true);
    }, []);

    const handleEditSubmit = useCallback(async (event) => {
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
        } catch (error) { 
            setNotification({show: true, message: `Erro: ${error.message}`, type: 'error'});
        } finally { setIsSaving(false); }
    }, [editId, editPassword, horariosSelecionados, fetchSchedules]);

    const handleCreateSubmit = useCallback(async (event) => {
        event.preventDefault(); setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/horarios/criar`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: parseInt(createId), senha: createPassword }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Ocorreu um erro ao criar.');
            setCreateId(''); setCreatePassword('');
            fetchSchedules();
            setIsCreateFormVisible(false);
            setNotification({show: true, message: 'Psicóloga criada com sucesso!', type: 'success'});
        } catch (error) { 
            setNotification({show: true, message: `Erro: ${error.message}`, type: 'error'});
        } finally { setIsSaving(false); }
    }, [createId, createPassword, fetchSchedules]);

    const handleSendCustomRequest = useCallback(async (endpoint, body, setResponse) => {
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
            } else {
                setNotification({show: true, message: `Erro na requisição para ${endpoint}: ${result.message || 'Erro desconhecido'}`, type: 'error'});
            }
        } catch (error) {
            setResponse({ ok: false, data: { message: error.message } });
            setNotification({show: true, message: `Erro ao enviar requisição: ${error.message}`, type: 'error'});
        } finally {
            setIsSaving(false);
        }
    }, [fetchSchedules]);

    const closeModal = useCallback(() => {
        if(isSaving) return;
        setIsCreateFormVisible(false);
        setIsEditFormVisible(false);
    }, [isSaving]);

    return {
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
    };
};

export default useScheduleManagement;