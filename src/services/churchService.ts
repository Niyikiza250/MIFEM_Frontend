import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

export interface Church {
  id: string;
  name: string;
  code?: string;
  districtId: string;
  fieldId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

interface QueryParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  districtId?: string;
  fieldId?: string;
}

const buildParams = (params?: QueryParams) => {
  const clean: Record<string, string> = {};
  if (!params) return clean;
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') clean[k] = String(v);
  }
  return clean;
};

export function useChurches(params?: QueryParams) {
  return useQuery({
    queryKey: ['churches', params],
    queryFn: async () => {
      const { data } = await apiClient.get<Church[]>('/churches', {
        params: buildParams(params),
      });
      return data;
    },
  });
}

export function useChurch(id: string) {
  return useQuery({
    queryKey: ['churches', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Church>(`/churches/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
