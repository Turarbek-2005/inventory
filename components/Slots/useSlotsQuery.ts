import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";
import { KANBAN_DATA } from "./slots.data";
import type { IColumn, ICard } from "./slots.types";

export function useSlotsQuery() {
  return useQuery({
    queryKey: ["objects"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OBJECTS),
    select(data) {
      const newBoard: IColumn[] = KANBAN_DATA.map((column) => ({
        ...column,
        item: null,
      }));
      const deals = data.documents;

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id == deal.slot);
        if (column) {
          column.item = {
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            description: deal.description,
            quantity: deal.quantity,
            slot: deal.slot,
            image: deal.image,
          };
        }
      }
      return newBoard;
    },
  });
}
