'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LockPeriod } from '@chosim/types';
import { TypingAnimation } from '@/components/TypingAnimation';
import { JournalForm } from '@/features/journal/JournalForm';
import { apiClient } from '@/lib/api';
import { t } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';

const JournalContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
  padding: theme.spacing(4),
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  padding: theme.spacing(4),
}));

export default function JournalPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { locale } = useLanguage();

  const handleAnimationComplete = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (content: string, lockPeriod: LockPeriod, title?: string) => {
    try {
      await apiClient.createJournalEntry({
        content,
        lockPeriodDays: lockPeriod,
        title,
      });
      router.push('/entries');
    } catch (error) {
      console.error('Failed to create entry:', error);
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
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 300,
              letterSpacing: '0.05em',
              lineHeight: 1.4,
              minHeight: '80px',
            }}
          >
            <TypingAnimation 
              text={t(locale, 'journal.question')}
              className=""
              onComplete={handleAnimationComplete}
            />
          </Typography>
        </QuestionContainer>

        <Fade in={showForm} timeout={800}>
          <Box>
            {showForm && (
              <JournalForm onSubmit={handleFormSubmit} />
            )}
          </Box>
        </Fade>
      </Container>
    </JournalContainer>
  );
}