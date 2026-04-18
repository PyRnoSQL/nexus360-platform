import { useAuth } from '../contexts/AuthContext';

export const useRBAC = () => {
  const { user } = useAuth();
  const role = user?.role;

  const canAccessForms = () => role === 'OFFICIER' || role === 'SUPER_ADMIN';
  const canEditForms = () => role === 'OFFICIER' || role === 'SUPER_ADMIN';
  const canDeleteForms = () => role === 'SUPER_ADMIN';
  const canAccessDashboard = (name) => {
    if (role === 'SUPER_ADMIN' || role === 'DG') return true;
    if (role === 'COMMISSAIRE' && ['operations', 'logistique', 'formation'].includes(name)) return true;
    return false;
  };

  return {
    role,
    canAccessForms: canAccessForms(),
    canEditForms: canEditForms(),
    canDeleteForms: canDeleteForms(),
    canAccessDashboard,
  };
};
