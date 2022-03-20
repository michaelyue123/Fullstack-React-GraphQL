import { useRouter } from "next/router";

// ToDo: Convert this hook to generic type so that it can work with any query parameter
export const useGetIntId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return intId;
};
