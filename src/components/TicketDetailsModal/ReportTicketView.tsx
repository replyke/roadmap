import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  handleError,
  ReportReasonKey,
  reportReasons,
  useEntity,
  useCreateReport,
  useUser,
} from "@replyke/react-js";
import { Flag, LoaderCircle, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/button";

function ReportTicketView({
  hideReportTicketView,
}: {
  hideReportTicketView: () => void;
}) {
  const { user } = useUser();
  console.log({ user: user });
  const { entity } = useEntity();
  const { createEntityReport } = useCreateReport();

  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState<ReportReasonKey | null>(null);

  const buttonActive = useMemo(() => !!reason && !!entity, [reason, entity]);

  const handleSubmitReport = async () => {
    try {
      if (!entity) throw new Error("No entity to report selected");
      if (!reason) throw new Error("No reason to report selected");
      if (!user) {
        toast("Oops! Login Required");
        return;
      }

      setSubmitting(true);
      await createEntityReport({ targetId: entity.id, reason });
      hideReportTicketView();
      setReason(null);
      toast.success("Report submitted successfully");
    } catch (err) {
      handleError(err, "Submitting report failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-30 flex justify-center"
    >
      <button
        onClick={hideReportTicketView}
        className="absolute top-4 right-4 hover:opacity-80 transition"
      >
        <X className="size-5" />
      </button>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-lg leading-none font-semibold">
          <Flag className="size-5 mr-2" />
          Submit a report
        </div>
        <p className="text-muted-foreground text-sm mt-3">
          Thank you fo looking out for our community. Let us know what is
          happening, and we'll look into it.
        </p>
        <div className="flex flex-row flex-wrap gap-1.5 mt-6">
          {Object.entries(reportReasons).map(([key, value], index) => (
            <Button
              onClick={() => setReason(key as ReportReasonKey)}
              size="sm"
              variant="secondary"
              className={cn(
                "px-2 py-1 text-xs",
                key === reason
                  ? "bg-stone-800 hover:bg-stone-800 text-white"
                  : "bg-secondary hover:bg-secondary"
              )}
              key={index}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="flex-1" />
        {/* <Button
          variant="outline"
          onClick={hideReportTicketView}
          disabled={submitting}
        >
          Cancel
        </Button> */}
        <Button
          // variant="destructive"
          onClick={handleSubmitReport}
          disabled={!buttonActive}
          className="w-max self-end"
        >
          {submitting && <LoaderCircle className="size-4 mr-2 animate-spin" />}
          {submitting ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </motion.div>
  );
}

export default ReportTicketView;
