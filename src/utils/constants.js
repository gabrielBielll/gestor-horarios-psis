export const DIAS_SEMANA = [
    { key: 'seg', label: 'Segunda' },
    { key: 'ter', label: 'Terça' },
    { key: 'qua', label: 'Quarta' },
    { key: 'qui', label: 'Quinta' },
    { key: 'sex', label: 'Sexta' },
    { key: 'sab', label: 'Sábado' },
];

export const HORAS_TRABALHO = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00'
];

export const HORARIOS_INICIAL = DIAS_SEMANA.reduce((acc, dia) => ({ ...acc, [dia.key]: [] }), {});