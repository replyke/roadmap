import { useState } from "react";
import {
  Entity,
  EntityProvider,
  FeedProvider,
  ReplykeProvider,
} from "@replyke/core";
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
        <div className="p-4 w-max overflow-x-auto flex gap-4 flex-1">
          {columns.map((column) => (
            <FeedProvider
              resource="roadmap"
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
            </FeedProvider>
          ))}
        </div>
      </Dialog>
    </ReplykeProvider>
  );
}

export default Roadmap;
