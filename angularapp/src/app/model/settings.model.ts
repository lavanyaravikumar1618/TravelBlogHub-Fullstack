export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  privacy: {
    showEmail: boolean;
    showProfile: boolean;
    showActivity: boolean;
  };
  preferences: {
    defaultCategory: string;
    autoSave: boolean;
    draftTimeout: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

