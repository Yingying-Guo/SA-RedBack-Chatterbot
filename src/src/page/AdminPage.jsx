import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";  // 引入 CryptoJS 用于加密

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false); // 是否认证通过
  const [password, setPassword] = useState(''); // 密码输入
  const [loading, setLoading] = useState(false); // 加载状态
  const [errorMessage, setErrorMessage] = useState(''); // 错误信息
  const [dataLoading, setDataLoading] = useState(true); // 数据加载状态

  const [userCount, setUserCount] = useState(0); // 用户数据总条数
  const [userLimit, setUserLimit] = useState(''); // 用户选择导出的数量
  const [chatCount, setChatCount] = useState(0); // 聊天记录总条数
  const [chatLimit, setChatLimit] = useState(''); // 用户选择导出的聊天记录数量

  // 获取用户数据总条数
  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/admin/export/users/count");
      const result = await response.json();
      setUserCount(result.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // 获取聊天记录数据总条数
  const fetchChatCount = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/admin/export/chats/count");
      const result = await response.json();
      setChatCount(result.count);
    } catch (error) {
      console.error("Error fetching chat count:", error);
    }
  };

  // 使用 useEffect 在组件加载时获取数据
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      await Promise.all([fetchUserCount(), fetchChatCount()]);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  // 处理密码输入
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 使用 CryptoJS 进行加密，使用 SHA-256 哈希算法
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      // 将加密后的密码发送到后端进行验证
      const response = await fetch("http://localhost:3001/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: hashedPassword })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAuthenticated(true); // 验证通过
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
    // 使用 fetch 来导出用户数据
    const limit = userLimit || userCount;
    try {
      const response = await fetch(`http://localhost:3001/api/admin/export/users?limit=${limit}`);
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
    // 使用 fetch 来导出聊天记录
    const limit = chatLimit || chatCount;
    try {
      const response = await fetch(`http://localhost:3001/api/admin/export/chats?limit=${limit}`);
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

      {/* 显示用户数据总条数 */}
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

      {/* 显示聊天记录数据总条数 */}
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

// 样式
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
