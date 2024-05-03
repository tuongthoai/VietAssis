import React from "react";
import {
  Stack,
  Divider,
  Typography,
  Box,
  Skeleton,
  Avatar,
  styled,
  Paper,
  Grid,
} from "@mui/material";
import { blue, grey, indigo } from "@mui/material/colors";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const TextMsg = ({ e }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={e.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      {e.incoming && (
        <Avatar src="bot.png" sx={{ bgcolor: blue[700] }}>
          V
        </Avatar>
      )}
      <Box
        p={2}
        margin={"0 10px"}
        sx={{
          backgroundColor: e.incoming ? "#f0f4f9" : blue[900],
          width: "max-content",
          maxWidth: "750px",
        }}
        borderRadius={1.5}
      >
        {e.incoming === false ? (
          <Typography variant="body2" color={e.incoming ? grey[900] : grey[50]}>
            {e.message}
          </Typography>
        ) : (
          <>
            <Typography
              variant="body2"
              paddingLeft={1}
              color={e.incoming ? grey[700] : grey[50]}
            >
              <ReactMarkdown>{e.message}</ReactMarkdown>
            </Typography>
            {e.isLoading === true ? (
              <>
                <Skeleton
                  sx={{ marginLeft: "10px" }}
                  animation="wave"
                  width={"90%"}
                />
                <Skeleton
                  sx={{ marginLeft: "10px" }}
                  animation="wave"
                  width={"90%"}
                />
                <Skeleton
                  sx={{ marginLeft: "10px" }}
                  animation="wave"
                  width={"60%"}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
      {e.outgoing && (
        <Avatar src="cat.png" sx={{ bgcolor: grey[50] }}>
          QA
        </Avatar>
      )}
    </Stack>
  );
};

const Timeline = ({ e }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%" />
      <Typography variant="caption">{e.text}</Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const EmptyMessage = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Stack direction={"column"} alignItems={"center"}>
        <img
          src="AIimage.jpg"
          width={"400px"}
          style={{ borderRadius: "20px" }}
          alt="AIimage"
        />
        <Typography
          textAlign={"center"}
          pt={3}
          fontSize={"70px"}
          color={blue[900]}
          fontWeight={"bold"}
          letterSpacing={2}
        >
          Welcome to VietAssist!
        </Typography>
      </Stack>
    </Box>
  );
};

const Loader = () => {
  return (
    <>
      <Skeleton sx={{ marginLeft: "10px" }} animation="wave" width={"90%"} />
      <Skeleton sx={{ marginLeft: "10px" }} animation="wave" width={"90%"} />
      <Skeleton sx={{ marginLeft: "10px" }} animation="wave" width={"60%"} />
    </>
  );
};

const Item = ({ onClick, message }) => {
  return (
    <Paper
      onClick={() => onClick(message)}
      sx={{
        backgroundColor: indigo[700],
        padding: "14px",
        textAlign: "center",
        color: indigo[50],
        transition: "0.2s",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          backgroundColor: indigo[400],
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
        },
        cursor: "pointer",
      }}
    >
      <ReactMarkdown>{message}</ReactMarkdown>
    </Paper>
  );
};

const SuggestMessage = ({ handleItemClick }) => {
  const onItemClick = (message) => {
    handleItemClick(message);
  };

  const messages = [
    "Lên một kịch bản video ngắn để quảng bá sản phẩm nước hoa",
    "Viết một email trả lời cho ứng viên xin việc với nội dung chuyên nghiệp",
    "Lên kế hoạch học tiếng Anh trong 3 tháng tới",
    "Viết một email với mong muốn giảng viên thực hiện việc dạy online",
  ];

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Stack direction={"column"} alignItems={"left"} spacing={6}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "300px",
            paddingTop: "50px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: +100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            style={{
              background: `-webkit-linear-gradient(left, #000046, #1cb5e0)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}
          >
            <Typography variant="h2" fontSize={"80px"} fontWeight={"bold"}>
              Welcome To VietAssist !
            </Typography>
            <Typography variant="h5" marginTop={"20px"}>
              How can I help you ?
            </Typography>
          </motion.div>
        </Box>
        <Box sx={{ width: "700px", marginTop: "20px" }}>
          <Grid container spacing={1.5}>
            {messages.map((message, index) => (
              <Grid item xs={6} key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  <Item onClick={onItemClick} message={message} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export { Timeline, TextMsg, EmptyMessage, Loader, SuggestMessage };
