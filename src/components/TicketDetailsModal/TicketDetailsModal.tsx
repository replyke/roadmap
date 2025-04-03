import { useState } from "react";
import { Entity } from "@replyke/core";
import { DialogContent } from "../ui/dialog";
import CommentSection from "../CommentSection";
import { AnimatePresence } from "framer-motion";
import ReportTicketView from "./ReportTicketView";
import TicketMeta from "./TicketMeta";
import TicketContent from "./TicketContent";

function TicketDetailsModal({
  selectedTicket,
  columnId,
}: {
  selectedTicket: Entity | null;
  columnId: string | null;
}) {
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  if (!selectedTicket) return null;

  return (
    <DialogContent className="sm:max-w-5xl p-0 min-h-2/3 max-h-4/5 overflow-hidden">
      <div className="grid grid-cols-3 w-full divide-x relative">
        <div className="col-span-2 flex flex-col divide-y gap-8">
          <TicketContent selectedTicket={selectedTicket} />
          <CommentSection />
        </div>

        <TicketMeta
          columnId={columnId}
          selectedTicket={selectedTicket}
          showReportOverlay={() => setShowReportOverlay(true)}
        />

        {/* Animated overlay */}
        <AnimatePresence>
          {showReportOverlay && (
            <ReportTicketView
              hideReportTicketView={() => setShowReportOverlay(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </DialogContent>
  );
}

export default TicketDetailsModal;
