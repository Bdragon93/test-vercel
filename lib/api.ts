interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

interface ResponseData {
  error?: any;
  success?: boolean;
}

export class apiGateway {
  private _request<T>(
    method: string,
    url: string,
    { headers, body }: RequestOptions = {},
  ): Promise<T | ResponseData | undefined> {
    const reqHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers || {}),
    };

    return fetch(url, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
    }).then(async (res) => {
      try {
        if (res.ok) {
          try {
            const json: T = await res.json();
            return json;
          } catch (error) {
            console.error(error);
            return res.ok as unknown as T;
          }
        }

        const json: any = await res.json();
        return { error: json, success: false };
      } catch (error) {
        console.error(`Error making request ${method} ${url}: ${error}`);
      }

      return undefined;
    });
  }

  post<T>(url: string, { headers = {}, body }: RequestOptions = {}): Promise<T | ResponseData | undefined> {
    return this._request<T>('POST', url, { headers, body });
  }

  get<T>(url: string, { headers = {} }: RequestOptions = {}): Promise<T | ResponseData | undefined> {
    return this._request<T>('GET', url, { headers });
  }

  put<T>(url: string, { headers = {}, body }: RequestOptions = {}): Promise<T | ResponseData | undefined> {
    return this._request<T>('PUT', url, { headers, body });
  }

  patch<T>(url: string, { headers = {}, body }: RequestOptions = {}): Promise<T | ResponseData | undefined> {
    return this._request<T>('PATCH', url, { headers, body });
  }

  delete<T>(url: string, { headers = {}, body }: RequestOptions = {}): Promise<T | ResponseData | undefined> {
    return this._request<T>('DELETE', url, { headers, body });
  }
}

const api = new apiGateway();
export default api;
