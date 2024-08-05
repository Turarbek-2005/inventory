import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";

export function useFreeSlotsQuery() {
  return useQuery({
    queryKey: ["objects"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OBJECTS),
    select(data) {
      return data.documents;
    },
  });
}
