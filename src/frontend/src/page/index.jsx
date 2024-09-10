import React, { useState, useEffect, useRef } from 'react';
import './info_collect.css';

/* export default function Main() {
  // 定义 showNewInterface 状态，用于控制是否显示新界面
  const [showNewInterface, setShowNewInterface] = useState(false);
  // 定义 isRobotChecked 状态，用于记录是否勾选机器人检测
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  // 定义 isDataShared 状态，用于记录是否勾选数据共享
  const [isDataShared, setIsDataShared] = useState(false);
  // 定义 selectedCountry 状态，用于记录选择的的国家
  const [selectedCountry, setSelectedCountry] = useState('');
  // 定义 selectedGender 状态，用于记录选择的性别
  const [selectedGender, setSelectedGender] = useState('');
  // 定义 selectedMonth 状态，用于记录选择的月份
  const [selectedMonth, setSelectedMonth] = useState('');
  // 定义 selectedDate 状态，用于记录选择的日期
  const [selectedDate, setSelectedDate] = useState('');
  // 定义 selectedYear 状态，用于记录选择的年份
  const [selectedYear, setSelectedYear] = useState('');


  // 定义 inputText 状态，用于记录输入的文本
  const [inputText, setInputText] = useState('');
  // 定义 searchInputText 状态，用于记录搜索的文本
  const [searchInputText, setSearchInputText] = useState('');
  // 定义 isConvStart 状态，用于记录是否开始对话
  const [isConvStart, setIsConvStart] = useState(false);
  // 定义 isInputFocused 状态，用于记录输入框是否获得焦点
  const [isInputFocused, setIsInputFocused] = useState(false);
  // 定义 conversation 状态，用于记录对话内容
  const [conversation, setConversation] = useState([]);

  const [isWaitingForBotResponse, setIsWaitingForBotResponse] = useState(false); // 新状态

  const messagesEndRef = useRef(null); // 引用消息列表底部
  
  const [creativityLevel, setCreativityLevel] = useState('medium');

  const [sessionId, setSessionId] = useState([]);



  // 导入第二个界面的 CSS
  useEffect(() => {
    if (showNewInterface) {
      // 导入第二个界面的 CSS
      import('./user_chat.css');
    }
  }, [showNewInterface]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);


  // Declare an array of months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Declare an array of dates
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  // Declare the current year
  const currentYear = new Date().getFullYear();
  // Declare an array of years
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Function to check if button is enabled
  const isButtonEnabled = () => {
    // Return true if robot is checked, data is shared, and at least one of the following is selected: country, gender, month, date, or year
    return isRobotChecked && isDataShared && (selectedCountry || selectedGender || selectedMonth || selectedDate || selectedYear);
  };

  // Function to send the user's message to the server
  const sendMessageToServer = async (message, creativityLevel, sessionId) => {
    if (message.trim()) {
      try {
        // 调用后端 API 获取助手回复
        const response = await fetch('http://127.0.0.1:3001/completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message, creativityLevel: creativityLevel, sessionId: sessionId }),
        });

        const data = await response.json();

        // 模拟机器人回复
        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'bot', text: data.reply } // 从后端获取的 AI 回复
          ]);

          if(!sessionId) {
            setSessionId(data.sessionId); // 更新会话 ID
          } else if (data.sessionId !== sessionId) {
            throw new Error('Session ID mismatch');
          }
          setSessionId(data.sessionId); // 更新会话 ID

          setIsWaitingForBotResponse(false);
        }, 500); // 延迟500毫秒后回复，模拟真实聊天的效果

      } catch (error) {
        console.error('Error fetching completion:', error);
        // 模拟机器人回复
        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'bot', text: 'Error retrieving response from the server.' }
          ]);

          setIsWaitingForBotResponse(false);
        }, 500); // 延迟500毫秒后回复，模拟真实聊天的效果
      }
    }
  };

  // 处理发送消息
  const handleSend = async () => {
    if (inputText.trim()) {

      //TODO
      // 添加用户的消息到对话框
      setConversation([...conversation, { type: 'user', text: inputText }]);

      // 清空输入框
      setInputText('');

      await sendMessageToServer(inputText, creativityLevel, sessionId);
    }
  }; */

// const handleCreativityChange = (level) => {
//   setCreativityLevel(level);
// };

export default function Main() {
  // 定义状态
  const [showNewInterface, setShowNewInterface] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [isDataShared, setIsDataShared] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [inputText, setInputText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');
  const [isConvStart, setIsConvStart] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isWaitingForBotResponse, setIsWaitingForBotResponse] = useState(false);
  const messagesEndRef = useRef(null);
  const [creativityLevel, setCreativityLevel] = useState('medium');
  const [sessionId, setSessionId] = useState([]);

  // 导入第二个界面的 CSS
  useEffect(() => {
    if (showNewInterface) {
      import('./user_chat.css');
    }
  }, [showNewInterface]);

  // Scroll 到消息末端
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  // 从 localStorage 读取 conversation 数据
  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  // 每次 conversation 变化时，将其保存到 localStorage
  useEffect(() => {
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }, [conversation]);

  // 声明月份、日期和年份数组
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // 检查按钮是否启用
  const isButtonEnabled = () => {
    return isRobotChecked && isDataShared && (selectedCountry || selectedGender || selectedMonth || selectedDate || selectedYear);
  };

  // 发送消息到服务器
  const sendMessageToServer = async (message, creativityLevel, sessionId) => {
    if (message.trim()) {
      try {
        const response = await fetch('http://127.0.0.1:3001/completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message, creativityLevel: creativityLevel, sessionId: sessionId }),
        });

        const data = await response.json();

        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'bot', text: data.reply }
          ]);

          if (!sessionId) {
            setSessionId(data.sessionId);
          } else if (data.sessionId !== sessionId) {
            throw new Error('Session ID mismatch');
          }
          setSessionId(data.sessionId);
          setIsWaitingForBotResponse(false);
        }, 500);

      } catch (error) {
        console.error('Error fetching completion:', error);
        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'bot', text: 'Error retrieving response from the server.' }
          ]);
          setIsWaitingForBotResponse(false);
        }, 500);
      }
    }
  };

  // 处理消息发送
  const handleSend = async () => {
    if (inputText.trim()) {
      setConversation([...conversation, { type: 'user', text: inputText }]);
      setInputText('');
      await sendMessageToServer(inputText, creativityLevel, sessionId);
    }
  };


  if (showNewInterface) {
    return (
      <div className='main-container'>
        <div className='flex-column-c'>


          {/* <button className='extended-fab'>
            <div className='state-layer'>
              <span className='label-text-en'>EN</span>
            </div>
          </button> */}


          <div className='frame'>
            <div className='subtract' />
            <div className='frame-1'>
              <div className='component'>
                <button className='group' onClick={() => setConversation([])}>
                  <div className='group-2'>
                    {/* <span className='new-chat'>New chat</span> */}
                    <div className='vuesax-linear-add'>
                      <div className='vuesax-linear-add-3'>
                        <div className='add' />
                      </div>
                    </div>
                  </div>
                  <div className='rectangle' />
                </button>

                <div className='search-input'>
                  <input
                    className='search-type-input'
                    value={searchInputText}
                    onChange={(e) => setSearchInputText(e.target.value)}
                  // placeholder="What's in your mind?..."
                  />
                </div>


                <button className='group-4'>
                  <div className='vuesax-linear-search-normal'>
                    <div className='vuesax-linear-search-normal-5'>
                      <div className='search-normal' />
                    </div>
                  </div>
                  <div className='rectangle-6' />
                </button>





              </div>
              {/* 其他侧边栏内容 */}
            </div>
            <div className='group-2c'>
              <div className='group-2d'>
                <div className='group-2e' />
                <span className='swisp-gpt'>SWISP GPT</span>
              </div>
            </div>





            {/* <div className='frame-2f'>
              <button className='frame-30'>
                <div className='frame-31'>
                  <div className='frame-32'>
                    <div className='vuesax-linear-setting'>
                      <div className='vuesax-linear-setting-33'>
                        <div className='setting' />
                      </div>
                    </div>
                  </div>
                  <span className='settings'>Settings</span>
                </div>
              </button>
            </div> */}





            <div className="creativity-level-container">
              <div className="creativity-level-header">Choose a creativity level</div>
              <div className="creativity-level-buttons">
                <button className={`creativity-level-button ${creativityLevel === 'low' ? 'active' : ''}`} onClick={() => setCreativityLevel('low')}>
                  Low
                </button>
                <button className={`creativity-level-button ${creativityLevel === 'medium' ? 'active' : ''}`} onClick={() => setCreativityLevel('medium')}>
                  Medium
                </button>
                <button className={`creativity-level-button ${creativityLevel === 'high' ? 'active' : ''}`} onClick={() => setCreativityLevel('high')}>
                  High
                </button>
              </div>
            </div>





          </div>
        </div>

        {/* 对话框内容 */}
        <div className='flex-column-acdd'>

          {/* {conversation.map((message, index) => (
            <div key={index} className={`message-box ${message.type}`}>
              <span>{message.text}</span>
            </div>
          ))} */}




          <div className='message-column'>
            {conversation.map((message, index) => (
              <div key={index} className={`message-container ${message.type}`}>

                <img
                  className="avatar"
                  src={message.type === 'user' ? 'src/assets/images/IMG_9007.jpg' : 'src/assets/images/Group 1437252836.png'}
                  alt={message.type === 'user' ? 'User Avatar' : 'Bot Avatar'}
                />

                <div className={`message-box ${message.type}`}>
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>


          {conversation.length === 0 && !isConvStart && (
            <div className='frame-34'>
              <div className='group-35' />
              <div className='frame-36'>
                <div className='frame-37'>
                  <div className='clarity-plane-line' />
                  <span className='plan-a-relaxing-day'>Plan a relaxing day</span>
                </div>
                <div className='frame-38'>
                  <div className='group-39' />
                  <span className='nostalgia-kindergarden'>
                    Nostalgia to a kindergarden
                  </span>
                </div>
                <div className='frame-3a'>
                  <div className='carbon-idea'>
                    <div className='vector-3b' />
                  </div>
                  <span className='activities-friends-new-city'>
                    Activities to make <br />
                    friends in new city
                  </span>
                </div>
                <div className='frame-3c'>
                  <div className='projector-screen-light'>
                    <div className='vector-3d' />
                  </div>
                  <span className='software-project'>Software Project</span>
                </div>
              </div>
            </div>
          )}


          {/* TODO */}
          <div className='type'>
            <input
              className='type-input'
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isWaitingForBotResponse) {
                  handleSend();
                  setIsConvStart(true);
                }
              }}
            // placeholder="What's in your mind?..."
            />

            {!isInputFocused && (
              <div className='frame-3e'>
                <div className='frame-3f'>
                  <div className='group-40'>
                    <div className='group-41' />
                  </div>
                  <span className='whats-mind'>What's in your mind?...</span>
                </div>
              </div>
            )}

          </div>

          <button
            className={`frame-42 ${isWaitingForBotResponse ? 'frame-42-grey' : ''}`}
            onClick={() => {
              handleSend();
              setIsConvStart(true);
            }}
            disabled={isWaitingForBotResponse}>
            <div className='vuesax-linear-send'>
              <div className='vuesax-linear-send-43'>
                <div className='send' />
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='main-container'>
      <div className='content'>
        <div className='frame'>
          <div className='logo' />
          <div className='group' />
          <span className='start-chat'>Start a Chat</span>
        </div>
        <div className='frame-1'>
          <div className='basic-info'>
            <div className='frame-2'>
              <span className='choose-country'>
                Choose your region or country *
              </span>
              <div className='frame-3'>
                <div className='text-field'>
                  <select
                    className='country-select'
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    <option value="australia">Australia</option>
                    {/* Add more countries here as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='frame-5'>
            <div className='gender'>
              <div className='whats-your-gender'>
                <span className='whats-your-gender-6'>
                  What's your gender?
                </span>
                <span className='optional'>(optional)</span>
              </div>
              <div className='frame-7'>
                <label className='radio-button'>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={selectedGender === 'female'}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className='radio-button-input'
                  />
                  <span className='radio-button-custom'></span>
                  <span className='text-gender'>Female</span>
                </label>
                <label className='radio-button'>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={selectedGender === 'male'}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className='radio-button-input'
                  />
                  <span className='radio-button-custom'></span>
                  <span className='text-gender'>Male</span>
                </label>
                <label className='radio-button'>
                  <input
                    type="radio"
                    name="gender"
                    value="non-binary"
                    checked={selectedGender === 'non-binary'}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className='radio-button-input'
                  />
                  <span className='radio-button-custom'></span>
                  <span className='text-gender'>Non-binary</span>
                </label>
              </div>
            </div>
            <div className='frame-d'>
              <span className='date-of-birth'>What's your date of birth? *</span>
              <div className='frame-e'>
                <div className='text-field-f'>
                  <div className='frame-10'>
                    <span className='label'>Month</span>
                  </div>
                  <select
                    className='date-select'
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <div className='text-field-13'>
                  <div className='frame-14'>
                    <span className='label-15'>Date</span>
                  </div>
                  <select
                    className='date-select'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Select Date</option>
                    {dates.map((date) => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                <div className='text-field-18'>
                  <div className='frame-19'>
                    <span className='label-1a'>Year</span>
                  </div>
                  <select
                    className='date-select'
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='frame-1d'>
            <div className='check-box'>
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  className='custom-checkbox-input'
                  checked={isDataShared}
                  onChange={() => setIsDataShared(!isDataShared)}
                />
                <span className="checkmark"></span>
                <span className='receive-emails'>
                  Share my registration data with our content providers for <br />
                  research purposes.
                </span>
              </label>
            </div>
            <div className='link-text'>
              <div className='terms-privacy-policy'>
                <span className='create-account'>
                  By creating an account, you agree to the
                </span>
                <span className='terms-of-use'>Terms of use</span>
                <span className='empty'> </span>
                <span className='create-account-1f'>and</span>
                <span className='empty-20'> </span>
                <span className='terms-of-use-21'>Privacy Policy.</span>
                <span className='empty-22'> </span>
              </div>
            </div>
            <div className='not-a-robot-checkbox'>
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  className='custom-checkbox-input'
                  checked={isRobotChecked}
                  onChange={() => setIsRobotChecked(!isRobotChecked)}
                />
                <span className="checkmark"></span>
                <span className='not-a-robot'>I'm not a robot</span>
              </label>
              <div className='google-recaptcha-official' />
            </div>
          </div>
          <div className='frame-25'>


            <button
              className="button"
              onClick={() => setShowNewInterface(true)}
              disabled={!isButtonEnabled()}  // Optional: Disable button when the conditions are not met
            >
              <div className={`button-26 ${isButtonEnabled() ? 'button-turn_blue' : ''}`}>
                <div className='frame-27'>
                  <span className='sign-up-28'>Start</span>
                </div>
              </div>
            </button>

            <div className='have-an-account-login'>
              <div className='have-an-account-login-29'>
                <span
                  className='already-have-an-account'
                  onClick={() => setShowNewInterface(true)}
                  style={{ cursor: 'pointer' }}
                >
                  skip
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
