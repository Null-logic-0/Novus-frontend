import { formatDate } from "../../helper/formatDate";
import { renderMessageContent } from "../../util/render/renderMessageContent";

import MediaGallery from "../Posts/MediaGallery";
import ProfileAvatar from "../ProfileAvatar";
import MessageList from "./MessageList";

function MessageItem({ isSender, messages }) {
  return (
    <div
      className={`w-full flex ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex mt-24 mb-24 gap-2  max-w-[288px] w-full p-2 ${
          isSender ? "flex-row-reverse items-end" : "items-start"
        }`}
      >
        <ProfileAvatar
          img={messages[0]?.sender?.profileImage}
          alt={messages[0]?.sender?.fullName}
        />
        <ul className="flex flex-col gap-1 w-full">
          {messages.map((message) => (
            <MessageList isSender={isSender} key={message._id}>
              {message?.media?.length > 0 && (
                <MediaGallery
                  media={message.media}
                  className="flex flex-wrap items-center justify-center gap-2"
                  mediaStyle="w-50"
                />
              )}

              {renderMessageContent(message?.content)}
              <p className="text-[#747881] text-sm font-semibold mt-1">
                {message?.sender?.fullName}
                <span className="ml-2 font-medium">
                  {formatDate(message.createdAt)}
                </span>
              </p>
            </MessageList>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageItem;
