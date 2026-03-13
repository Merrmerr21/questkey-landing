import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import type { Property, CreatePropertyRequest, SuccessResponse } from "@workspace/api-client-react/src/generated/api.schemas";

export function useProperties() {
  return useQuery({
    queryKey: ['/api/properties'],
    queryFn: () => fetchApi<Property[]>('/properties'),
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: ['/api/properties', id],
    queryFn: () => fetchApi<Property>(`/properties/${id}`),
    enabled: !!id,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePropertyRequest) => 
      fetchApi<Property>('/properties', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => 
      fetchApi<SuccessResponse>(`/properties/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
    },
  });
}
