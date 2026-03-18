interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = {
    sm: '24px',
    md: '32px',
    lg: '40px'
  };

  return (
    <div className="logo">
      <span 
        style={{ 
          fontSize: sizes[size], 
          fontWeight: 700,
          color: variant === 'dark' ? '#1F1F1F' : '#FFFFFF',
          letterSpacing: '-0.5px'
        }}
      >
        CastMe
      </span>
    </div>
  );
}
