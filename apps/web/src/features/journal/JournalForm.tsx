'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Button, 
  Paper, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio,
  Fade,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LockPeriod } from '@chosim/types';
import { t } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'rgba(17, 17, 17, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  maxWidth: '800px',
  margin: '0 auto',
}));

const ContentTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '300px',
    alignItems: 'flex-start',
    '& textarea': {
      resize: 'vertical',
    },
  },
}));

const LockPeriodOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  background: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  '&.selected': {
    borderColor: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: '16px 48px',
  marginTop: theme.spacing(4),
  minWidth: '200px',
}));

interface JournalFormProps {
  onSubmit: (content: string, lockPeriod: LockPeriod, title?: string) => Promise<void>;
}

export function JournalForm({ onSubmit }: JournalFormProps) {
  const { locale } = useLanguage();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [lockPeriod, setLockPeriod] = useState<LockPeriod>(LockPeriod.THIRTY_DAYS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length < 10) {
      alert(t(locale, 'journal.minimumCharacters'));
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), lockPeriod, title.trim() || undefined);
    } catch (error) {
      console.error('Error submitting entry:', error);
      alert(t(locale, 'journal.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const lockPeriodOptions = [
    { 
      value: LockPeriod.THIRTY_DAYS, 
      label: t(locale, 'journal.lockPeriodOptions.30.label'), 
      description: t(locale, 'journal.lockPeriodOptions.30.description') 
    },
    { 
      value: LockPeriod.ONE_HUNDRED_DAYS, 
      label: t(locale, 'journal.lockPeriodOptions.100.label'), 
      description: t(locale, 'journal.lockPeriodOptions.100.description') 
    },
    { 
      value: LockPeriod.ONE_YEAR, 
      label: t(locale, 'journal.lockPeriodOptions.365.label'), 
      description: t(locale, 'journal.lockPeriodOptions.365.description') 
    },
  ];

  return (
    <Fade in timeout={600}>
      <FormContainer elevation={0}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t(locale, 'journal.titlePlaceholder')}
              inputProps={{ maxLength: 100 }}
              sx={{ mb: 3 }}
            />
            
            <ContentTextField
              fullWidth
              multiline
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t(locale, 'journal.contentPlaceholder')}
              inputProps={{ maxLength: 5000 }}
            />
            
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {t(locale, 'journal.characterCount', { current: content.length.toString(), max: '5000' })}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 400 }}>
              {t(locale, 'journal.lockPeriodTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t(locale, 'journal.lockPeriodDescription')}
            </Typography>
            
            <FormControl component="fieldset">
              <RadioGroup
                value={lockPeriod}
                onChange={(e) => setLockPeriod(Number(e.target.value) as LockPeriod)}
              >
                {lockPeriodOptions.map((option) => (
                  <LockPeriodOption
                    key={option.value}
                    className={lockPeriod === option.value ? 'selected' : ''}
                    onClick={() => setLockPeriod(option.value)}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio sx={{ color: 'grey.600' }} />}
                      label={
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {option.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      }
                      sx={{ margin: 0, width: '100%' }}
                    />
                  </LockPeriodOption>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}
            <SubmitButton
              type="submit"
              variant="contained"
              disabled={isSubmitting || content.trim().length < 10}
              size="large"
            >
              {isSubmitting ? t(locale, 'journal.submitting') : t(locale, 'journal.submitButton')}
            </SubmitButton>
          </Box>
        </Box>
      </FormContainer>
    </Fade>
  );
}