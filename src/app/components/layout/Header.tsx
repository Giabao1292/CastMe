import { Container, Navbar } from 'react-bootstrap';
import { Logo } from '../common/Logo';

export function Header() {
  return (
    <Navbar bg="white" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <Logo size="md" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
