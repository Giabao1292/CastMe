import { Card } from 'react-bootstrap';

interface SelectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectionCard({ icon, title, description, selected, onClick }: SelectionCardProps) {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: selected ? '2px solid #14A800' : '2px solid #E5E7EB',
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.2s ease',
        backgroundColor: selected ? '#F7FFF5' : '#FFFFFF',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      className="h-100"
    >
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div style={{ fontSize: '32px' }}>
          {icon}
        </div>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: selected ? '2px solid #14A800' : '2px solid #D5D9DD',
            backgroundColor: selected ? '#14A800' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {selected && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      
      <div>
        <h5 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px', color: '#1F1F1F' }}>
          {title}
        </h5>
        <p style={{ fontSize: '14px', color: '#656565', marginBottom: 0 }}>
          {description}
        </p>
      </div>
    </Card>
  );
}
