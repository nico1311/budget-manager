import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { LoginPayload, SignUpPayload } from '../types';

class ApiClient {
  static api: AxiosInstance = axios.create();

  static apiCall (
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: unknown
  ): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method,
        url: `/api/${path}`
      }
      if (method === 'POST' && body) config.data = body;
      this.api(config).then((res) => {
        resolve(res);
      }).catch(reject);
    });
  }

  static async login(data: LoginPayload) {
    return this.apiCall('auth/login', 'POST', data);
  }

  static async signUp(data: SignUpPayload) {
    return this.apiCall('users', 'POST', data);
  }

  static async getUserInfo() {
    return this.apiCall('users/me');
  }

}

export default ApiClient;
