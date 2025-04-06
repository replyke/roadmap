import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useEntity } from "@replyke/react-js";
import {
  SocialStyleCallbacks,
  SocialStyleConfig,
  useSocialComments,
  useSocialStyle,
  UseSocialStyleProps,
} from "@replyke/comments-social-react-js";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

function CommentSection() {
  const { entity } = useEntity();

  const callbacks: SocialStyleCallbacks = {
    loginRequiredCallback: () => {
      toast("Please log in first");
    },
    commentTooShortCallback: () => {
      toast("Your comment is too short");
    },
  };

  const customStyleConfig = useMemo<Partial<UseSocialStyleProps>>(
    () => ({
      newCommentFormProps: {
        paddingRight: 16,
      },
    }),
    []
  );
  const styleConfig: SocialStyleConfig = useSocialStyle(customStyleConfig);

  const { CommentSectionProvider, CommentsFeed, NewCommentForm } =
    useSocialComments({
      entityId: entity?.id,
      callbacks,
      styleConfig,
      limit: 10,
    });

  return (
    <CommentSectionProvider>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-white">
          <CommentsFeed />
          <div className="w-full h-4" />
        </ScrollArea>
        <div className="border-t">
          <NewCommentForm />
        </div>
      </div>
    </CommentSectionProvider>
  );
}

export default CommentSection;
