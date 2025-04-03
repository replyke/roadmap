import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useFeed } from "@replyke/core";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const TITLE_MIN = 10;
const TITLE_MAX = 120;
const DESCRIPTION_MIN = 30;
const DESCRIPTION_MAX = 500;

export default function AddTicket() {
  const { createEntity } = useFeed();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasTitle = title.trim().length > 0;

  const handleAddPost = async () => {
    if (!title || title.length < TITLE_MIN || title.length > TITLE_MAX) {
      toast("Please add a valid title");
      return;
    }

    if (
      !title ||
      description.length < DESCRIPTION_MIN ||
      description.length > DESCRIPTION_MAX
    ) {
      toast("Please add a valid description");
      return;
    }

    setSubmitting(true);
    await createEntity?.({
      resource: "roadmap",
      title,
      content: description,
      metadata: {
        stage: "backlog",
      },
    });

    toast.success("Request added successfully!");
    setTitle("");
    setDescription("");
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Add a request.."
        value={title}
        onChange={(e) => {
          if (e.target.value.length <= TITLE_MAX) {
            setTitle(e.target.value);
          }
        }}
        className="shadow-none h-7 bg-white text-xs placeholder:text-xs"
      />

      <AnimatePresence>
        {hasTitle && (
          <>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[10px] text-right text-muted-foreground">
                {TITLE_MAX - title.length} characters left
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                placeholder="Add more context (optional)"
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= DESCRIPTION_MAX) {
                    setDescription(e.target.value);
                  }
                }}
                className="bg-white text-xs placeholder:text-xs"
              />
              <div className="text-[10px] text-right text-muted-foreground mt-1">
                {DESCRIPTION_MAX - description.length} characters left
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-1 self-end"
            >
              <Button
                onClick={handleAddPost}
                disabled={submitting}
                size="sm"
                className="text-xs h-7"
              >
                {submitting && (
                  <LoaderCircle className="size-4 mr-2 animate-spin" />
                )}
                {submitting ? "Submitting.." : "Submit"}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
