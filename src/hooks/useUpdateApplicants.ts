import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Applicant, Application } from '../types';

export type UpdateApplicantsPayload = {
  applicationId: string;
  applicants: Applicant[];
};

export const useUpdateApplicants = () => {
  const queryClient = useQueryClient();

  return useMutation<Application, Error, UpdateApplicantsPayload>({
    mutationFn: async ({
      applicationId,
      applicants,
    }: UpdateApplicantsPayload) => {
      const { data } = await api.put<Application>(
        `/applications/${applicationId}`,
        { applicants },
      );
      return data;
    },
    onSuccess: (updatedApplication, { applicationId }) => {
      queryClient.setQueryData(
        ['application', applicationId],
        updatedApplication,
      );
    },
  });
};
