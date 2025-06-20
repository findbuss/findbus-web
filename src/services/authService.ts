// Tipos de dados para autenticação
export interface UserData {
  name?: string;
  email: string;
  password?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
}

/**
 * Função para registrar um novo usuário.
 * No futuro, esta função fará uma chamada para o endpoint de registro do backend.
 */
export const registrarUsuario = async (userData: UserData): Promise<ApiResponse> => {
  console.log('Registrando usuário:', userData);
  // Simula uma chamada de API bem-sucedida
  return Promise.resolve({ success: true, message: 'Usuário registrado com sucesso!' });
};

/**
 * Função para autenticar um usuário existente.
 * No futuro, esta função fará uma chamada para o endpoint de login do backend.
 */
export const autenticarUsuario = async (credentials: UserData): Promise<ApiResponse> => {
  console.log('Autenticando usuário:', credentials);
  // Simula uma chamada de API bem-sucedida
  return Promise.resolve({ success: true, token: 'fake-jwt-token' });
};

