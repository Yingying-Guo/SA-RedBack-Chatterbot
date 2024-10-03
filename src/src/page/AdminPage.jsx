import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";  // Import CryptoJS for encryption

document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || 
      (event.ctrlKey && event.shiftKey && event.key === 'I') || 
      (event.ctrlKey && event.shiftKey && event.key === 'C') || 
      (event.ctrlKey && event.shiftKey && event.key === 'J') || 
      (event.ctrlKey && event.key === 'U')) {
      event.preventDefault();  // 阻止默认行为
  }
});

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false); // Whether authentication is successful
  const [password, setPassword] = useState(''); // Password input
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message
  const [dataLoading, setDataLoading] = useState(true); // Data loading state

  const [userCount, setUserCount] = useState(0); // Total number of user records
  const [userLimit, setUserLimit] = useState(''); // Number of user records to export
  const [chatCount, setChatCount] = useState(0); // Total number of chat records
  const [chatLimit, setChatLimit] = useState(''); // Number of chat records to export

  // Fetch total user count
  const fetchUserCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/export/users/count`);
      const result = await response.json();
      setUserCount(result.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Fetch total chat count
  const fetchChatCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/export/chats/count`);
      const result = await response.json();
      setChatCount(result.count);
    } catch (error) {
      console.error("Error fetching chat count:", error);
    }
  };

  // Use useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      await Promise.all([fetchUserCount(), fetchChatCount()]);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Encrypt the password using CryptoJS and SHA-256 hashing
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      // Send the encrypted password to the backend for verification
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: hashedPassword })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAuthenticated(true); // Authentication successful
        } else {
          setErrorMessage("Incorrect password!");
        }
      } else {
        setErrorMessage("Password verification failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during verification.");
      console.error("Error verifying password:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportUserCSV = async () => {
    // Use fetch to export user data
    const limit = userLimit || userCount;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/export/users?limit=${limit}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_data.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting user data:", error);
    }
  };

  const exportChatCSV = async () => {
    // Use fetch to export chat data
    const limit = chatLimit || chatCount;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/export/chats?limit=${limit}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "chats_data.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting chat data:", error);
    }
  };

  if (!authenticated) {
    return (
      <div style={styles.loginContainer}>
        <h2>Please Enter Password</h2>
        <form onSubmit={handlePasswordSubmit} style={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      </div>
    );
  }

  if (dataLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Panel</h1>

      {/* Display total user record count */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>User Data</h2>
        <p>Total user records: {userCount}</p>
        <input
          type="number"
          value={userLimit}
          onChange={(e) => setUserLimit(e.target.value)}
          placeholder="Enter number of users to export (default: all)"
          style={styles.input}
          min="0"
          max={userCount}
        />
        <button onClick={exportUserCSV} style={styles.button}>
          Export User Data as CSV
        </button>
      </div>

      {/* Display total chat record count */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Chat Data</h2>
        <p>Total chat records: {chatCount}</p>
        <input
          type="number"
          value={chatLimit}
          onChange={(e) => setChatLimit(e.target.value)}
          placeholder="Enter number of chats to export (default: all)"
          style={styles.input}
          min="0"
          max={chatCount}
        />
        <button onClick={exportChatCSV} style={styles.button}>
          Export Chat Data as CSV
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  header: {
    color: '#4A90E2',
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default AdminPage;
