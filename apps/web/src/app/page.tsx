'use client';

import Link from "next/link";
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { t } from '@/lib/translations';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
  position: 'relative',
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  background: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxWidth: '600px',
  width: '100%',
}));

const LanguageContainer = styled(Box)({
  position: 'absolute',
  top: 24,
  right: 24,
  zIndex: 10,
});

const MainButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: '16px 32px',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  minWidth: '250px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
  },
}));

const SecondaryLink = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.95rem',
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

export default function Home() {
  const { locale } = useLanguage();
  
  return (
    <MainContainer>
      <LanguageContainer>
        <LanguageToggle />
      </LanguageContainer>
      
      <Container maxWidth="md">
        <ContentPaper elevation={0}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                fontWeight: 200,
                letterSpacing: '0.1em'
              }}
            >
              {t(locale, 'common.title')}
            </Typography>
            <Typography 
              variant="h4" 
              component="p" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                lineHeight: 1.6
              }}
            >
              {t(locale, 'common.subtitle')}
            </Typography>
          </Box>

          <Box>
            <Link href="/journal" style={{ textDecoration: 'none' }}>
              <MainButton 
                variant="contained" 
                size="large"
                fullWidth={false}
              >
                {t(locale, 'home.beginReflection')}
              </MainButton>
            </Link>
            
            <SecondaryLink>
              <Link href="/entries">
                {t(locale, 'home.viewPastReflections')}
              </Link>
            </SecondaryLink>
          </Box>
        </ContentPaper>
      </Container>
    </MainContainer>
  );
}
