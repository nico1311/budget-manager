import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { LoginPayload, SignUpPayload, Transaction as ITransaction } from '../types';

class ApiClient {
  static api: AxiosInstance = axios.create();

  static apiCall(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: unknown,
  ): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method,
        url: `/api/${path}`,
      };
      if (['POST', 'PATCH'].includes(method) && body) config.data = body;
      this.api(config).then((res) => {
        resolve(res);
      }).catch(reject);
    });
  }

  static async login(body: LoginPayload): Promise<AxiosResponse> {
    return this.apiCall('auth/login', 'POST', body);
  }

  static async logout(): Promise<AxiosResponse> {
    return this.apiCall('auth/logout', 'POST');
  }

  static async getTransactions(params?: { limit?: number, page?: number }): Promise<AxiosResponse> {
    const query = new URLSearchParams(params as Record<string, string> | undefined).toString();
    return this.apiCall(`transactions${query ? `?${query}` : ''}`);
  }

  static async createTransaction(body: Partial<ITransaction>): Promise<AxiosResponse> {
    return this.apiCall('transactions', 'POST', body);
  }

  static async editTransaction(id: number, body: Partial<ITransaction>): Promise<AxiosResponse> {
    return this.apiCall(`transactions/${id}`, 'PATCH', body);
  }

  static async deleteTransaction(id: number): Promise<AxiosResponse> {
    return this.apiCall(`transactions/${id}`, 'DELETE');
  }

  static async signUp(body: SignUpPayload): Promise<AxiosResponse> {
    return this.apiCall('users', 'POST', body);
  }

  static async getUserInfo(): Promise<AxiosResponse> {
    return this.apiCall('users/me');
  }
}

export default ApiClient;
