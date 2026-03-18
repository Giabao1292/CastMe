import { Button } from 'react-bootstrap';
import { ReactNode } from 'react';

interface SocialButtonProps {
  provider: 'google' | 'apple';
  onClick?: () => void;
  icon?: ReactNode;
}

export function SocialButton({ provider, onClick, icon }: SocialButtonProps) {
  const styles = {
    google: {
      backgroundColor: '#1877F2',
      color: '#FFFFFF',
      border: 'none',
    },
    apple: {
      backgroundColor: '#FFFFFF',
      color: '#1F1F1F',
      border: '1px solid #D5D9DD',
    }
  };

  const labels = {
    google: 'Continue with Google',
    apple: 'Continue with Apple'
  };

  const icons = {
    google: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: '8px' }}>
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.181l-2.909-2.259c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
        <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9.001c0 1.452.348 2.827.957 4.041l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
      </svg>
    ),
    apple: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" style={{ marginRight: '8px' }}>
        <path d="M14.595 9.595c-.03 3.015 2.655 4.005 2.685 4.02-.015.075-.42 1.425-1.38 2.82-.84 1.2-1.71 2.4-3.06 2.415-1.335.03-1.755-.78-3.285-.78-1.53 0-2.01.75-3.27.795-1.32.045-2.31-1.29-3.165-2.475-1.74-2.43-3.075-6.87-1.29-9.855.9-1.485 2.49-2.43 4.215-2.445 1.305-.03 2.55.885 3.36.885.795 0 2.28-.885 3.87-.78.66.015 2.505.27 3.69 2.01-.09.06-2.205 1.29-2.19 3.855m-2.58-7.56c.69-.84 1.155-1.995 1.035-3.165-.99.045-2.22.66-2.94 1.485-.645.735-1.215 1.935-1.065 3.06 1.125.09 2.28-.57 2.97-1.38z"/>
      </svg>
    )
  };

  return (
    <Button
      variant="light"
      className="w-100 d-flex align-items-center justify-content-center"
      style={{
        ...styles[provider],
        padding: '12px 24px',
        fontWeight: 500,
        fontSize: '16px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
      }}
      onClick={onClick}
    >
      {icon || icons[provider]}
      {labels[provider]}
    </Button>
  );
}
