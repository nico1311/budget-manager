import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  static api: AxiosInstance = axios.create();

  static apiCall (
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: Record<string, unknown>
  ): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method,
        url: `/api/${path}`
      }
      if (method === 'POST') config.data = body;
      this.api(config).then((res) => {
        resolve(res);
      }).catch(reject);
    });
  }

  static async login({email, password}: {email: string, password: string}) {
    return this.apiCall('auth/login', 'POST', { email, password });
  }

  static async getUserInfo () {
    return this.apiCall('users/me');
  }

}

export default ApiClient;
