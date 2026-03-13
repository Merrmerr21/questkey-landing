import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import type { Analysis, RunAnalysisRequest } from "@workspace/api-client-react/src/generated/api.schemas";

export function useAnalyses(propertyId: number) {
  return useQuery({
    queryKey: ['/api/properties', propertyId, 'analyses'],
    queryFn: () => fetchApi<Analysis[]>(`/properties/${propertyId}/analyses`),
    enabled: !!propertyId,
  });
}

export function useRunAnalysis(propertyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RunAnalysisRequest) => 
      fetchApi<Analysis>(`/properties/${propertyId}/analyses`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties', propertyId, 'analyses'] });
    },
  });
}
