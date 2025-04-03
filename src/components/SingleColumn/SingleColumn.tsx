import { useState } from "react";
import { Entity, EntityProvider, useFeed } from "@replyke/core";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { Column } from "../column";
import AddTicket from "./AddTicket";
import { Button } from "../ui/button";
import SingleTicket from "./SingleTicket";
import StageBadge from "../shared/StageBadge";

function SingleColumn({
  column,
  setSelectedTicket,
}: {
  column: Column;
  setSelectedTicket: (ticket: Entity) => void;
}) {
  const { entities, resetting } = useFeed();
  const [showInput, setShowInput] = useState(false);

  return (
    <div key={column.id} className="flex-shrink-0 w-80">
      <div className="bg-gray-50 rounded-lg p-3 h-full flex flex-col w-full">
        <div className="flex justify-between items-center mb-3">
          <StageBadge columnId={column.id} />

          {column.withInput && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setShowInput((prev) => !prev)}
            >
              {showInput ? "↑ Cancel" : "+ Add"}
            </Button>
          )}
        </div>

        <AnimatePresence>
          {showInput && (
            <motion.div
              key="add-ticket"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AddTicket />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 flex-grow mt-2 w-full">
          {resetting ? (
            <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />
          ) : (entities || []).length === 0 ? (
            <p className="text-center text-gray-400 text-lg p-4">
              Nothing here yet
            </p>
          ) : (
            entities?.map((entity) => (
              <EntityProvider entity={entity} key={entity.id}>
                <SingleTicket setSelectedTicket={setSelectedTicket} />
              </EntityProvider>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleColumn;
