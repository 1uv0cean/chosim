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
  padding: theme.spacing(2, 2),
  textAlign: 'center',
  background: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxWidth: '440px',
  width: '92%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5, 3),
    maxWidth: '480px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3, 3.5),
    maxWidth: '520px',
  },
}));

const LanguageContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 12,
  right: 12,
  zIndex: 1000,
  [theme.breakpoints.up('sm')]: {
    top: 16,
    right: 16,
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
  fontSize: '0.95rem',
  padding: '10px 20px',
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  minWidth: '180px',
  width: '100%',
  maxWidth: '260px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
    padding: '12px 24px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minWidth: '200px',
    width: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem',
    padding: '14px 28px',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
    minWidth: '220px',
  },
}));

const SecondaryLink = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.8rem',
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1.5),
    '& a': {
      fontSize: '0.875rem',
    },
  },
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(2),
    '& a': {
      fontSize: '0.95rem',
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
      
      <CenteredContent>
        <ContentPaper elevation={0}>
          <Box sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 } }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3.25rem' },
                mb: { xs: 0.5, sm: 1 },
                fontWeight: 200,
                letterSpacing: '0.08em',
                lineHeight: 1.0
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
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
                lineHeight: 1.3,
                px: { xs: 0.5, sm: 0 }
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
