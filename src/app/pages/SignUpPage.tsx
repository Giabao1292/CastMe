import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SelectionCard } from '../components/common/SelectionCard';

type UserType = 'client' | 'business' | null;

export function SignUpPage() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (!selectedType) return;
    console.log('Create account as:', selectedType);
    // TODO: Navigate to registration form
  };

  const handleLogin = () => {
    console.log('Navigate to login');
    // TODO: Navigate to login page
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h2 
            className="text-center mb-5" 
            style={{ 
              fontSize: '32px', 
              fontWeight: 500,
              color: '#1F1F1F'
            }}
          >
            Join as a client or business
          </h2>

          <Row className="g-4 mb-4">
            <Col md={6}>
              <SelectionCard
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                }
                title="I'm a client, looking for services"
                description="I want to hire professionals for my projects"
                selected={selectedType === 'client'}
                onClick={() => setSelectedType('client')}
              />
            </Col>
            <Col md={6}>
              <SelectionCard
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="I'm a business/shop owner"
                description="I want to offer my services and grow my business"
                selected={selectedType === 'business'}
                onClick={() => setSelectedType('business')}
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button
              className="mb-3"
              disabled={!selectedType}
              style={{
                backgroundColor: selectedType ? '#14A800' : '#D5D9DD',
                border: 'none',
                padding: '12px 48px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                cursor: selectedType ? 'pointer' : 'not-allowed',
                color: selectedType ? '#FFFFFF' : '#999999'
              }}
              onMouseOver={(e) => {
                if (selectedType) {
                  e.currentTarget.style.backgroundColor = '#108900';
                }
              }}
              onMouseOut={(e) => {
                if (selectedType) {
                  e.currentTarget.style.backgroundColor = '#14A800';
                }
              }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>

            <div style={{ fontSize: '15px', color: '#656565' }}>
              Already have an account?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
                style={{
                  color: '#14A800',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}