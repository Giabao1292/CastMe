import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { SocialButton } from "../components/common/SocialButton";

export function LoginPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email" && email.trim()) {
      setStep("password");
    } else if (step === "password") {
      console.log("Login with:", { email, password, keepLoggedIn });
      navigate("/jobs");
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
    // TODO: Implement Google login
  };

  const handleAppleLogin = () => {
    console.log("Login with Apple");
    // TODO: Implement Apple login
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Card
          style={{
            maxWidth: "480px",
            width: "100%",
            border: "1px solid #E5E7EB",
            borderRadius: "16px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Card.Body className="px-4 py-5">
            {step === "email" ? (
              <>
                <h2
                  className="text-center mb-4"
                  style={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: "#1F1F1F",
                  }}
                >
                  Log in to CastMe
                </h2>

                <Form onSubmit={handleContinue}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username or Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        padding: "12px 16px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #D5D9DD",
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mb-4"
                    style={{
                      backgroundColor: "#14A800",
                      border: "none",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#108900")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#14A800")
                    }
                  >
                    Continue
                  </Button>
                </Form>

                <div
                  className="text-center mb-4"
                  style={{ color: "#656565", fontSize: "14px" }}
                >
                  or
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                  <SocialButton provider="google" onClick={handleGoogleLogin} />
                  <SocialButton provider="apple" onClick={handleAppleLogin} />
                </div>

                <div className="text-center mt-4">
                  <p
                    style={{
                      color: "#656565",
                      fontSize: "15px",
                      marginBottom: "12px",
                    }}
                  >
                    Don't have a CastMe account?
                  </p>
                  <Button
                    variant="outline-success"
                    className="w-100"
                    style={{
                      borderColor: "#14A800",
                      color: "#14A800",
                      padding: "10px 24px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      backgroundColor: "transparent",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#F7FFF5";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="text-center mb-2"
                  style={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: "#1F1F1F",
                  }}
                >
                  Welcome
                </h2>
                <p
                  className="text-center mb-4"
                  style={{
                    fontSize: "16px",
                    color: "#656565",
                  }}
                >
                  {email}
                </p>

                <Form onSubmit={handleContinue}>
                  <Form.Group className="mb-3">
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#656565",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          padding: "12px 16px 12px 42px",
                          fontSize: "16px",
                          borderRadius: "8px",
                          border: "1px solid #D5D9DD",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          color: "#656565",
                        }}
                      >
                        {showPassword ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Keep me logged in"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                      style={{
                        fontSize: "14px",
                        color: "#656565",
                      }}
                    />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Forgot password");
                      }}
                      style={{
                        color: "#14A800",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    style={{
                      backgroundColor: "#14A800",
                      border: "none",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#108900")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#14A800")
                    }
                  >
                    Log in
                  </Button>
                </Form>

                <div className="text-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBackToEmail();
                    }}
                    style={{
                      color: "#14A800",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Not you?
                  </a>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}
