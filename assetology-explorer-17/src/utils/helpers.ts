
/**
 * Helper functions for app-wide utilities
 */

export const getAppSettings = () => {
  const settings = localStorage.getItem('appSettings');
  if (settings) {
    return JSON.parse(settings);
  }
  return {
    appName: 'Assetology',
    logo: null,
    theme: 'light',
  };
};

export const saveAppSettings = (settings: { 
  appName?: string; 
  logo?: string | null;
  theme?: 'light' | 'dark';
}) => {
  const currentSettings = getAppSettings();
  const updatedSettings = { ...currentSettings, ...settings };
  localStorage.setItem('appSettings', JSON.stringify(updatedSettings));
  return updatedSettings;
};
