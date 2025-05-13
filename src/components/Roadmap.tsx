import { useState } from "react";
import {
  Entity,
  EntityProvider,
  EntityListProvider,
  ReplykeProvider,
} from "@replyke/react-js";
import SingleColumn from "./SingleColumn";
import { columns } from "../constants/columns-data";
import TicketDetailsModal from "./TicketDetailsModal";
import { Dialog } from "./ui/dialog";

function Roadmap({
  projectId,
  signedToken,
}: {
  projectId: string;
  signedToken?: string | null | undefined;
}) {
  const [selectedTicket, setSelectedTicket] = useState<Entity | null>(null);
  const [selectedTicketStage, setSelectedTicketStage] = useState<string | null>(
    null
  );

  return (
    <ReplykeProvider projectId={projectId} signedToken={signedToken}>
      <Dialog
        onOpenChange={(open) => {
          if (!open) setSelectedTicket(null);
        }}
      >
        <EntityProvider entity={selectedTicket ?? undefined}>
          <TicketDetailsModal
            selectedTicket={selectedTicket}
            columnId={selectedTicketStage}
          />
        </EntityProvider>
        <div className="w-max flex gap-4 h-full">
          {columns.map((column) => (
            <EntityListProvider
              sourceId="roadmap"
              metadataFilters={{
                includes: {
                  stage: column.id,
                },
              }}
              key={column.id}
            >
              <SingleColumn
                column={column}
                setSelectedTicket={(ticket) => {
                  setSelectedTicket(ticket);
                  setSelectedTicketStage(column.id);
                }}
              />
            </EntityListProvider>
          ))}
        </div>
      </Dialog>
    </ReplykeProvider>
  );
}

export default Roadmap;
