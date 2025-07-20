"use client";

import { TypingAnimation } from "@/components/TypingAnimation";
import { JournalForm } from "@/features/journal/JournalForm";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/api";
import { t } from "@/lib/translations";
import { LockPeriod } from "@chosim/types";
import { Box, Container, Fade, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JournalContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "linear-gradient(180deg, #000000 0%, #111111 100%)",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(1),
  },
}));

export default function JournalPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { locale } = useLanguage();

  const handleAnimationComplete = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (
    content: string,
    lockPeriod: LockPeriod,
    title?: string
  ) => {
    try {
      await apiClient.createJournalEntry({
        content,
        lockPeriodDays: lockPeriod,
        title,
      });
      router.push("/entries");
    } catch (error) {
      console.error("Failed to create entry:", error);
      throw error;
    }
  };

  return (
    <JournalContainer>
      <Container maxWidth="lg">
        <QuestionContainer>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
              fontWeight: 300,
              letterSpacing: "0.05em",
              lineHeight: 1.3,
              minHeight: { xs: "60px", sm: "70px", md: "80px" },
            }}
          >
            <TypingAnimation
              text={t(locale, "journal.question")}
              className=""
              onComplete={handleAnimationComplete}
            />
          </Typography>
        </QuestionContainer>

        <Fade in={showForm} timeout={800}>
          <Box>{showForm && <JournalForm onSubmit={handleFormSubmit} />}</Box>
        </Fade>
      </Container>
    </JournalContainer>
  );
}
