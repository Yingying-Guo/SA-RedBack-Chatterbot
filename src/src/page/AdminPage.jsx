import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js"; // Import CryptoJS for encryption

document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.shiftKey && event.key === "C") ||
    (event.ctrlKey && event.shiftKey && event.key === "J") ||
    (event.ctrlKey && event.key === "U")
  ) {
    event.preventDefault();
  }
});

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false); // Whether authentication is successful
  const [password, setPassword] = useState(""); // Password input
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [dataLoading, setDataLoading] = useState(true); // Data loading state

  const [userCount, setUserCount] = useState(0); // Total number of user records
  const [userLimit, setUserLimit] = useState(""); // Number of user records to export
  const [chatCount, setChatCount] = useState(0); // Total number of chat records
  const [chatLimit, setChatLimit] = useState(""); // Number of chat records to export

  // Fetch total user count
  const fetchUserCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/users/count`
      );
      const result = await response.json();
      setUserCount(result.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Fetch total chat count
  const fetchChatCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/chats/count`
      );
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
    setErrorMessage("");

    try {
      // Encrypt the password using CryptoJS and SHA-256 hashing
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      // Send the encrypted password to the backend for verification
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: hashedPassword }),
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

  // Function to validate and prevent export limit input exceeding total records
  const handleUserLimitChange = (e) => {
    const value = Math.min(e.target.value, userCount); // Ensure input doesn't exceed user count
    setUserLimit(value);
  };

  const handleChatLimitChange = (e) => {
    const value = Math.min(e.target.value, chatCount); // Ensure input doesn't exceed chat count
    setChatLimit(value);
  };

  const exportUserCSV = async () => {
    const limit = userLimit || userCount;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/users?limit=${limit}`
      );
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
    const limit = chatLimit || chatCount;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/chats?limit=${limit}`
      );
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

  // Function to preview user data in a new window
  const previewUserCSV = async () => {
    const limit = userLimit || userCount;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/users?limit=${limit}`
      );
      const text = await response.text();
      openPreviewWindow(text, "User Data Preview");
    } catch (error) {
      console.error("Error previewing user data:", error);
    }
  };

  // Function to preview chat data in a new window
  const previewChatCSV = async () => {
    const limit = chatLimit || chatCount;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/chats?limit=${limit}`
      );
      const text = await response.text();
      openPreviewWindow(text, "Chat Data Preview");
    } catch (error) {
      console.error("Error previewing chat data:", error);
    }
  };

  // Function to open a new window and render the preview as a table
  const openPreviewWindow = (csvData, title) => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f7f7f7;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              background-color: #fff;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #4CAF50;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table id="data-table"></table>
          <script>
            const csvData = \`${csvData}\`;
            const rows = csvData.split("\\n");
            const table = document.getElementById("data-table");

            rows.forEach((row, index) => {
              const tr = document.createElement("tr");
              const columns = row.split(",");

              columns.forEach(column => {
                const cell = document.createElement(index === 0 ? "th" : "td");
                cell.textContent = column;
                tr.appendChild(cell);
              });

              table.appendChild(tr);
            });
          </script>
        </body>
      </html>
    `);
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

      {/* User Data Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>User Data</h2>
        <p>Total user records: {userCount}</p>
        <input
          type="number"
          value={userLimit}
          onChange={handleUserLimitChange}
          placeholder="Enter number of users to export (default: all)"
          style={styles.input}
          min="0"
          max={userCount}
        />
        <div style={styles.buttonGroup}>
          <button onClick={exportUserCSV} style={styles.button}>
            Export User Data
          </button>
          <button onClick={previewUserCSV} style={styles.button}>
            Preview User Data
          </button>
        </div>
      </div>

      {/* Chat Data Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Chat Data</h2>
        <p>Total chat records: {chatCount}</p>
        <input
          type="number"
          value={chatLimit}
          onChange={handleChatLimitChange}
          placeholder="Enter number of chats to export (default: all)"
          style={styles.input}
          min="0"
          max={chatCount}
        />
        <div style={styles.buttonGroup}>
          <button onClick={exportChatCSV} style={styles.button}>
            Export Chat Data
          </button>
          <button onClick={previewChatCSV} style={styles.button}>
            Preview Chat Data
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px", // Set a max width for wider layout
    margin: "0 auto",  // Center the content horizontally
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  header: {
    color: "#4A90E2",
    fontSize: "2.5rem",
    marginBottom: "40px",
  },
  section: {
    marginBottom: "30px",
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    width: "354px",  // Set input width to make it wider
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 10px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "5px", // Add margin to separate buttons
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
};

export default AdminPage;
