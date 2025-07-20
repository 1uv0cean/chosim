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
  padding: theme.spacing(4, 3),
  textAlign: 'center',
  background: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxWidth: '480px',
  width: '90%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 4),
    maxWidth: '520px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 5),
    maxWidth: '600px',
  },
}));

const LanguageContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 16,
  right: 16,
  zIndex: 1000,
  [theme.breakpoints.up('sm')]: {
    top: 24,
    right: 24,
  },
}));

const CenteredContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
});

const MainButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  padding: '12px 24px',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1.5),
  minWidth: '200px',
  width: '100%',
  maxWidth: '280px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1rem',
    padding: '14px 28px',
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(2),
    minWidth: '240px',
    width: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    padding: '16px 32px',
    marginTop: theme.spacing(4),
    minWidth: '250px',
  },
}));

const SecondaryLink = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2.5),
    '& a': {
      fontSize: '0.95rem',
    },
  },
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(3),
  },
}));

export default function Home() {
  const { locale } = useLanguage();
  
  return (
    <MainContainer>
      <LanguageContainer>
        <LanguageToggle />
      </LanguageContainer>
      
      <CenteredContent>
        <ContentPaper elevation={0}>
          <Box sx={{ mb: { xs: 3, sm: 3.5, md: 4 } }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                mb: { xs: 1.5, sm: 2 },
                fontWeight: 200,
                letterSpacing: '0.1em',
                lineHeight: 1.2
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
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                lineHeight: 1.5,
                px: { xs: 1, sm: 0 }
              }}
            >
              {t(locale, 'common.subtitle')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href="/journal" style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <MainButton 
                variant="contained" 
                size="large"
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
      </CenteredContent>
    </MainContainer>
  );
}
