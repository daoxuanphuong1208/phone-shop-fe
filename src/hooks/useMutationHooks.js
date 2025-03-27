import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (callback) => {
  const mutation = useMutation({
    mutationFn: callback,
  });
  return mutation;
};
