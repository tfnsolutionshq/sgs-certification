export type AuthContextType = {
  user: {
    emailAddress: string;
    role: string;
  } | null;
  login: (
    emailAddress: string,
    password: string,
  ) => { success: boolean; message?: string };
  logout: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
