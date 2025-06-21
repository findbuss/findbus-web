import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000, // Aumentando o timeout para dar margem para as tentativas
});

// Adiciona um interceptor de resposta para lidar com retries
api.interceptors.response.use(
  (response) => response, // Retorna a resposta se for bem-sucedida
  async (error) => {
    // A propriedade `config` é onde o axios armazena a configuração da requisição original.
    // A propriedade `_retryCount` é customizada e será adicionada ao objeto de configuração.
    const config = error.config as any;

    // Se não houver config, não podemos tentar novamente.
    if (!config) {
      return Promise.reject(error);
    }

    // Inicializa ou recupera o contador de tentativas.
    config._retryCount = config._retryCount || 0;

    // Define o número máximo de tentativas.
    const MAX_RETRIES = 3;
    if (config._retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // A lógica de retry só será aplicada para erros de servidor (status 5xx).
    const shouldRetry = error.response && error.response.status >= 500;
    if (!shouldRetry) {
      return Promise.reject(error);
    }

    // Incrementa o contador de tentativas.
    config._retryCount += 1;

    // Calcula o tempo de espera (exponential backoff).
    const delay = Math.pow(2, config._retryCount) * 500; // 1s, 2s, 4s

    // Cria uma promise de delay para aguardar antes de tentar novamente.
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Reenvia a requisição com a configuração atualizada.
    return api(config);
  }
);

export default api;


