/**
 * app.jsx - React 雙計數器應用程式
 * 這個檔案包含了 React 元件的定義
 * 注意：這是在瀏覽器環境中運行，不使用 import/export 語法
 */

// ==================== 子元件：Display ====================
/**
 * Display 元件 - 純展示用的函式元件
 * 功能：接收 props 並顯示標題和計數值
 * 
 * @param {Object} props - 從父元件傳入的屬性
 * @param {string} props.title - 顯示的標題文字
 * @param {number} props.count - 要顯示的計數值
 * @returns {JSX.Element} 回傳 JSX 元素
 * 
 * 元件特性：
 * 1. 無狀態（stateless）- 只依賴傳入的 props
 * 2. 純函式（pure function）- 相同的輸入總是產生相同的輸出
 * 3. 使用解構賦值直接從 props 取出 title 和 count
 */
const Display = ({ title, count }) => (
    // 使用行內樣式設定外框樣式
    <div style={{ 
        padding: '10px',              // 內距
        border: '1px solid #ddd',      // 灰色邊框
        margin: '5px',                 // 外距
        borderRadius: '5px',           // 圓角效果
        backgroundColor: '#f9f9f9'     // 淺灰色背景
    }}>
        <h3>{title}</h3>               {/* 動態顯示標題 */}
        <p>目前計數：<strong>{count}</strong></p>  {/* 動態顯示計數值，並加粗 */}
    </div>
);

// ==================== 父元件：DualCounter ====================
/**
 * DualCounter 元件 - 主要的計數器應用程式
 * 功能：管理兩個獨立的計數器狀態，並提供增加按鈕
 * 
 * 使用的 React Hooks：
 * 1. useState - 管理元件狀態
 * 2. useEffect - 處理副作用（狀態變更時記錄日誌）
 * 
 * @returns {JSX.Element} 回傳完整的應用程式介面
 */
const DualCounter = () => {
    // ========== useState Hook：狀態管理 ==========
    /**
     * useState 語法：const [state, setState] = useState(initialValue)
     * - state: 目前的狀態值
     * - setState: 更新狀態的函式
     * - initialValue: 狀態的初始值
     * 
     * 陣列解構賦值：useState 回傳一個包含兩個元素的陣列
     * 第一個元素是狀態值，第二個元素是更新該狀態的函式
     */
    
    /**
     * workCount 狀態 - 記錄工作任務數量
     * setWorkCount - 更新 workCount 的函式
     * 初始值：0
     */
    const [workCount, setWorkCount] = React.useState(0);
    
    /**
     * restCount 狀態 - 記錄休息次數
     * setRestCount - 更新 restCount 的函式
     * 初始值：0
     */
    const [restCount, setRestCount] = React.useState(0);

    // ========== useEffect Hook：副作用處理 ==========
    /**
     * useEffect 語法：useEffect(callback, dependencies)
     * - callback: 要執行的副作用函式
     * - dependencies: 依賴陣列，當陣列中的值改變時才執行 callback
     * 
     * 功能：監聽 workCount 或 restCount 的變化
     * 每當任一計數器改變時，在控制台輸出目前的狀態
     */
    React.useEffect(() => {
        // 這個函式會在元件初次渲染後執行
        // 並且每當 workCount 或 restCount 改變時都會再次執行
        console.log(`[系統紀錄] 工作任務數：${workCount}, 休息次數：${restCount}`);
        
        // 注意：這裡沒有回傳 cleanup 函式，因為不需要清除任何東西
    }, [workCount, restCount]); // 依賴陣列包含 workCount 和 restCount

    // ========== 事件處理函式 ==========
    /**
     * incrementWork - 增加工作任務數的處理函式
     * 使用 setWorkCount 的函式形式更新狀態
     * 函式形式 (prev => prev + 1) 可以確保基於最新的狀態值進行更新
     * 避免因非同步更新造成的狀態不一致問題
     */
    const incrementWork = () => {
        // prev 代表當前的 workCount 值
        setWorkCount(prev => {
            const newValue = prev + 1;
            console.log(`工作任務增加：${prev} → ${newValue}`);
            return newValue;
        });
    };

    /**
     * incrementRest - 增加休息次數的處理函式
     * 同樣使用函式形式更新狀態
     */
    const incrementRest = () => {
        setWorkCount(prev => {
            const newValue = prev + 1;
            console.log(`休息次數增加：${prev} → ${newValue}`);
            return newValue;
        });
    };

    // ========== 簡潔版事件處理函式 ==========
    // 如果您喜歡更簡潔的寫法，可以使用箭頭函式直接回傳
    // const incrementWork = () => setWorkCount(prev => prev + 1);
    // const incrementRest = () => setRestCount(prev => prev + 1);

    // ========== 渲染 JSX ==========
    /**
     * 元件的 JSX 結構
     * 包含：
     * 1. 標題區
     * 2. 兩個 Display 子元件（透過 props 傳遞數據）
     * 3. 兩個控制按鈕（綁定點擊事件）
     */
    return (
        <div style={{ 
            padding: '20px',           // 整體內距
            fontFamily: 'Arial, sans-serif'  // 設定字型
        }}>
            {/* 主標題 */}
            <h1 style={{ 
                color: '#333',          // 深灰色文字
                textAlign: 'center',    // 置中對齊
                marginBottom: '20px'    // 底部外距
            }}>
                雙計數器系統
            </h1>
            
            {/* 
                Display 子元件：工作任務計數器
                透過 props 傳遞：
                - title: 顯示的標題
                - count: 要顯示的計數值（workCount）
            */}
            <Display title="工作任務數" count={workCount} />
            
            {/* 
                Display 子元件：休息次數計數器
                透過 props 傳遞：
                - title: 顯示的標題
                - count: 要顯示的計數值（restCount）
            */}
            <Display title="休息次數" count={restCount} />
            
            {/* 
                按鈕區域：使用 flexbox 排版
                讓兩個按鈕並排顯示
            */}
            <div style={{
                display: 'flex',        // 彈性盒子布局
                gap: '10px',            // 按鈕間距
                justifyContent: 'center', // 水平置中
                marginTop: '20px'        // 頂部外距
            }}>
                {/* 增加工作任務按鈕 */}
                <button 
                    onClick={incrementWork}
                    style={{
                        backgroundColor: '#4CAF50',  // 綠色背景
                        color: 'white',               // 白色文字
                        border: 'none',                // 移除邊框
                        padding: '10px 20px',          // 按鈕內距
                        borderRadius: '5px',           // 圓角
                        cursor: 'pointer',              // 滑鼠指標
                        fontSize: '16px'                // 字體大小
                    }}
                >
                    增加工作任務
                </button>
                
                {/* 增加休息次數按鈕 */}
                <button 
                    onClick={incrementRest}
                    style={{
                        backgroundColor: '#008CBA',  // 藍色背景
                        color: 'white',               // 白色文字
                        border: 'none',                // 移除邊框
                        padding: '10px 20px',          // 按鈕內距
                        borderRadius: '5px',           // 圓角
                        cursor: 'pointer',              // 滑鼠指標
                        fontSize: '16px'                // 字體大小
                    }}
                >
                    增加休息次數
                </button>
            </div>
            
            {/* 提示訊息：開啟控制台查看 useEffect 日誌 */}
            <p style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '14px',
                marginTop: '20px',
                fontStyle: 'italic'
            }}>
                💡 提示：開啟開發者工具（F12）的 Console 頁籤，查看狀態變化日誌
            </p>
        </div>
    );
};

/**
 * 注意：這裡沒有使用 export default
 * 因為在瀏覽器環境中，我們直接將元件定義為全域變數
 * 稍後會在 index.html 中直接使用這個元件
 * <script src="App.js">` 讀取，這叫做 **Global Script（全域腳本）**。
 * 這是一個非常棒的觀察！這正好觸及了「傳統網頁開發」與「現代前端工程化」之間的核心差異。

不過，這裡有個小誤解需要先釐清：**不論是哪種方法，`App.jsx` 執行的環境都是「瀏覽器（前端）」，而不是後端。** 差別在於瀏覽器「讀取程式碼的方式」。

以下為你詳細分析這兩種模式的區別：

---

## 1. 第一種方法：傳統 HTML 直接引用 (不用 Export)
如果你在 `index.html` 裡直接用 `<script src="App.js">` 讀取，這叫做 **Global Script（全域腳本）**。

* **為什麼不用 Export？** 因為這種方式是直接把程式碼「倒進」瀏覽器的視窗（window）裡。所有的變數和函式預設都是全域的。就像在同一間教室裡，你大喊一聲，所有人都聽得到，不需要特別透過「出口（Export）」把訊息傳出去。
* **缺點：** 當專案變大時，容易發生命名衝突（例如兩個檔案都叫 `count`），且難以管理檔案之間的依賴關係。

---

## 2. 第二種方法：Vite 現代開發模式 (必須 Export)
你在第二張圖看到的 Vite/React 架構，使用的是 **ES Modules (ESM)** 規範。

* **為什麼一定要 Export？** 在這種模式下，**每個檔案都是一個獨立的隔離島（Module）**。
    * `App.jsx` 裡寫的組件，預設被鎖在這個檔案內。
    * `main.jsx` 如果想用 `App.jsx` 的內容，就必須像「進出口貿易」一樣：`App.jsx` 要 `export`，然後 `main.jsx` 再 `import`。
* **Vite 的角色：** 它不是後端，它是一個**開發伺服器與打包工具**。它負責把這些分散的模組（Module）整理好，並轉換成瀏覽器看得懂的格式。

---

## 核心差異對照表

| 特性 | 方法一：直接引用 (原生/CDN) | 方法二：Vite 建立 (工程化) |
| :--- | :--- | :--- |
| **隔離性** | 無（全域共享） | 高（模組獨立） |
| **匯出語法** | 不需要 `export` | 必須使用 `export default` |
| **讀取方式** | `<script>` 標籤直接讀取 | 透過 `import` 互相引用 |
| **運行環境** | 瀏覽器前端 | 瀏覽器前端 (但需要 Node.js 環境開發) |
| **適合規模** | 小型練習、簡單 Demo | 正式專案、複雜 App |

---

### 總結
* **`App.jsx` 永遠是前端程式碼**，負責畫面的渲染。
* **不寫 export** 是因為你把檔案當作「普通腳本」直接執行。
* **寫 export** 是因為現代開發將其視為「模組」，這是為了讓程式碼更乾淨、更好維護，也是業界目前的標準做法。

如果你想跑第二張圖（Vite）的專案，記得在終端機輸入 `npm run dev`；如果是第一張圖，直接用瀏覽器打開 `index.html` 即可（但通常需要透過 CDN 引入 React）。

**你想試試看把第一種方法的程式碼，「升級」改寫成第二種 Vite 專案的格式嗎？**
 * 
 */