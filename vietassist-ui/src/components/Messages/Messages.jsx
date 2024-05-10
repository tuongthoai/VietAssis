import React from "react";
import { Box, Stack } from "@mui/material";
import ReactMarkdown from "react-markdown";
import {
  EmptyMessage,
  Loader,
  SuggestMessage,
  TextMsg,
  Timeline,
} from "./MessageType";

export default function Messages({ chatHistory, handleItemClick }) {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatHistory.map((e) => {
          switch (e.type) {
            case "divider":
              return <Timeline e={e} />;
            case "msg":
              switch (e.subtype) {
                case "img":
                  break;
                case "doc":
                  break;
                case "link":
                  break;
                case "reply":
                  break;
                default:
                  return <TextMsg e={e} />;
              }
              break;

            case "empty":
              return <EmptyMessage />;
            case "loader":
              return <Loader />;
            case "suggest":
              return <SuggestMessage handleItemClick={handleItemClick} />;
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
}
