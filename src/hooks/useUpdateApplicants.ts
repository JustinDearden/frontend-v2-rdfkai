import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Applicant, Application } from '../types';

type UpdateApplicantsPayload = {
  applicationId: string;
  applicants: Applicant[];
};

export const useUpdateApplicants = () => {
  const queryClient = useQueryClient();

  return useMutation<Application, Error, UpdateApplicantsPayload>({
    mutationFn: async ({ applicationId, applicants }) => {
      const response = await api.put<Application>(
        `/applications/${applicationId}`,
        {
          applicants,
        },
      );
      return response.data;
    },
    onSuccess: (updatedApplication, { applicationId }) => {
      // Update the cached application with new applicants
      queryClient.setQueryData(
        ['application', applicationId],
        updatedApplication,
      );
    },
  });
};
