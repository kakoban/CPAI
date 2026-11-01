export interface McpLessonStep {
  stepNumber: string;
  keyHint: string;
  badgeFa: string;
  titleFa: string;
  titleEn: string;
  deepDiveFa: string[];
  proTipFa: string;
  codeOrConfigSnippet?: {
    titleFa: string;
    code: string;
    language: 'python' | 'bash' | 'json';
  };
}

export interface McpTroubleshootingItem {
  errorTitle: string;
  causeFa: string;
  solutionFa: string;
}

export const MCP_MASTERCLASS_STEPS: McpLessonStep[] = [
  {
    stepNumber: 'فصل ۰۱',
    keyHint: 'M1',
    badgeFa: 'مفهوم پایه (USB-C هوش مصنوعی)',
    titleFa: 'MCP دقیقاً چیست؟ (به زبان ساده: پورت USB-C دنیای هوش مصنوعی)',
    titleEn: 'What Exactly Is MCP? The USB-C Port of the AI World',
    deepDiveFa: [
      'کلمه MCP مخفف Model Context Protocol (پروتکل زمینه مدل) است؛ یک استاندارد متن‌باز و جهانی که توسط شرکت Anthropic معرفی شد و اکنون در Claude، Cursor، ChatGPT، VS Code و ایجنت‌های مدرن پشتیبانی می‌شود.',
      'بهترین تشبیه برای درک MCP، کابل «USB-C» است: یادتان هست قدیم‌ها هر گوشی، دوربین و لپ‌تاپی کابل شارژ و پورت مخصوص خودش را داشت و هیچ‌کدام به هم نمی‌خوردند؟ بعد USB-C آمد و یک استاندارد واحد برای اتصال همه دستگاه‌ها شد.',
      'در دنیای هوش مصنوعی هم دقیقاً همین اتفاق افتاده است: MCP یک «زبان مشترک و فیش استاندارد» است که به شما اجازه می‌دهد هوش مصنوعی را به هر نرم‌افزار، پوشه فایل، دیتابیس، تقویم یا ابزاری که خودتان می‌سازید وصل کنید.'
    ],
    proTipFa:
      'حتی اگر برنامه‌نویس حرفه‌ای نباشید، با یادگیری منطق MCP می‌توانید در کمتر از ۱۵ دقیقه اولین ابزار اختصاصی خودتان را بسازید و به Claude وصل کنید.'
  },
  {
    stepNumber: 'فصل ۰۲',
    keyHint: 'M2',
    badgeFa: 'مسئله و ضرورت',
    titleFa: 'مشکلی که MCP حل می‌کند: خروج هوش مصنوعی از اتاق دربسته!',
    titleEn: 'The Problem MCP Solves: Giving AI Hands to Act in the Real World',
    deepDiveFa: [
      'مدل‌های هوش مصنوعی به تنهایی مثل یک «دانشند نابغه داخل یک اتاق دربسته» هستند؛ آن‌ها خیلی خوب فکر می‌کنند و متن می‌نویسند، اما دست و پا ندارند! یعنی به صورت پیش‌فرض نمی‌توانند فایل‌های روی هارد شما را بخوانند، کار جدیدی در لیست تسک‌هایتان ثبت کنند یا دیتابیس شرکت را چک کنند.',
      'قبل از MCP، هر شرکت باید برای وصل کردن هر مدل هوش مصنوعی به هر نرم‌افزار (مثلاً Google Drive، Slack، GitHub)، یک کد اختصاصی جداگانه می‌نوشت.',
      'با آمدن MCP، هر ابزار فقط یک بار یک «MCP Server» می‌سازد و تمام مدل‌های هوش مصنوعی دنیا می‌توانند از همان یک سرور استفاده کنند.'
    ],
    proTipFa:
      'تفاوت طلایی: Skill (فایل SKILL.md) به هوش مصنوعی یاد می‌دهد «چگونه فکر کند و با چه قالبی بنویسد»، اما MCP به هوش مصنوعی «ابزار و دسترسی واقعی برای انجام کار بیرون از چت» می‌دهد.'
  },
  {
    stepNumber: 'فصل ۰۳',
    keyHint: 'M3',
    badgeFa: 'معماری ۳ جزئی',
    titleFa: 'سه جزء اصلی معماری MCP (Host، Client، Server) و سه قابلیت Tools، Resources و Prompts',
    titleEn: 'Three Core Components (Host, Client, Server) & Tools, Resources, Prompts',
    deepDiveFa: [
      'معماری MCP از ۳ بخش بسیار ساده تشکیل شده است:',
      '۱) Host (میزبان): برنامه‌ای که شما مستقیم با آن چت می‌کنید (مثل Claude Desktop، ادیتور Cursor یا ایجنت Hermes).',
      '۲) Client (مشتری / واسطه): بخش داخلی و نامرئی داخل برنامه میزبان که درخواست هوش مصنوعی را به سرور منتقل می‌کند.',
      '۳) Server (سرور MCP): برنامه سبک و کوچکی که ما می‌سازیم (یا آماده نصب می‌کنیم) و کارهای واقعی را انجام می‌دهد.',
      'خودِ MCP Server می‌تواند ۳ نوع قابلیت در اختیار هوش مصنوعی بگذارد: ۱) Tools (ابزارهای عملیاتی مثل افزودن تسک یا ساخت فایل)، ۲) Resources (منابع اطلاعاتی فقط‌خواندنی مثل محتوای یک فایل)، و ۳) Prompts (الگوهای دستور آماده). تمرکز اصلی و جذاب‌ترین بخش MCP، ساخت Tools است!'
    ],
    proTipFa:
      'جریان کار در یک جمله: شما در Host (مثلاً کلاد) پیامی می‌نویسید -> Client آن را به MCP Server می‌دهد -> Server کار را روی سیستم انجام می‌دهد و نتیجه را به کلاد برمی‌گرداند.'
  },
  {
    stepNumber: 'فصل ۰۴',
    keyHint: 'M4',
    badgeFa: 'پیش‌نیازها و نصب',
    titleFa: 'آماده‌سازی محیط MCP از صفر (نصب ۵ ابزار رایگان روی کامپیوتر)',
    titleEn: 'Preparing Your MCP Environment from Scratch (Installing the 5 Free Tools)',
    deepDiveFa: [
      'برای ساخت و اجرای سرورهای MCP روی کامپیوتر خود، این ۵ ابزار رایگان را نصب کنید:',
      '۱. پایتون (Python 3.10 یا بالاتر): از سایت python.org دانلود کنید. (نکته حیاتی ویندوز: در صفحه اول نصب حتماً تیک گزینه Add Python to PATH را بزنید!).',
      '۲. ابزار مدیریت بسته `uv`: کار ساخت پروژه و نصب کتابخانه‌های پایتون را ۱۰ برابر سریع‌تر و بی‌دردسرتر می‌کند.',
      '۳. یک ویرایشگر کد رایگان: مثل VS Code یا Cursor.',
      '۴. برنامه Claude Desktop: از سایت claude.ai/download دانلود کنید (با اکانت رایگان هم کاملاً کار می‌کند).',
      '۵. برنامه Node.js (نسخه LTS): از سایت nodejs.org نصب کنید تا بتوانید هم ابزار تست تصویری (MCP Inspector) و هم سرورهای آماده (`npx`) را اجرا کنید.'
    ],
    proTipFa:
      'پس از نصب، در ترمینال (یا PowerShell ویندوز) دو دستور زیر را بزنید تا مطمئن شوید پایتون و uv به درستی نصب شده‌اند:',
    codeOrConfigSnippet: {
      titleFa: 'بررسی صحت نصب Python و uv در ترمینال:',
      language: 'bash',
      code: `python --version
uv --version`
    }
  },
  {
    stepNumber: 'فصل ۰۵',
    keyHint: 'M5',
    badgeFa: 'ساخت اولین سرور',
    titleFa: 'ساخت اولین MCP Server در کمتر از ۱۰ خط کد با FastMCP',
    titleEn: 'Building Your First MCP Server in Under 10 Lines with FastMCP',
    deepDiveFa: [
      'ابتدا در ترمینال یک پوشه پروژه با `uv` می‌سازیم و کتابخانه رسمی MCP را نصب می‌کنیم.',
      '⚠️ نکته بسیار مهم درباره نسخه کتابخانه MCP: اخیراً نسخه ۲ این کتابخانه منتشر شده که ساختار آن متفاوت است و اگر نصب شود خطای `No module named mcp.server.fastmcp` می‌گیرید! поэтому حتماً با دستور زیر نسخه را روی نسخه پایدار ۱ قفل کنید.',
      'سپس یک فایل به نام `server.py` بسازید و کد زیر را در آن قرار دهید. علامت `@mcp.tool()` به سرور می‌گوید تابع پایینی یک «ابزار» برای هوش مصنوعی است، و جمله داخل سه کوتیشن (`"""..."""`) حیاتی‌ترین بخش است چون هوش مصنوعی از روی آن می‌فهمد این ابزار چه کاری انجام می‌دهد!'
    ],
    proTipFa:
      'همیشه داخل سه کوتیشن (`"""توضیح ابزار"""`) به صورت شفاف بنویسید که تابع چه کاری انجام می‌دهد تا مدل هوش مصنوعی دقیقاً در زمان درست آن را صدا بزند.',
    codeOrConfigSnippet: {
      titleFa: 'دستورات ساخت پروژه + کد کامل server.py (اولین سرور MCP):',
      language: 'python',
      code: `# ۱. این سه دستور را در ترمینال بزنید:
# uv init mcp-server-demo
# cd mcp-server-demo
# uv add "mcp[cli]>=1.28,<2"

# ۲. این کد را داخل فایل server.py ذخیره کنید:
from mcp.server.fastmcp import FastMCP

# ساختن سرور با یک نام دلخواه
mcp = FastMCP("hozhi-first-server")

# تعریف اولین ابزار ما با دکوریتور @mcp.tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """دو عدد صحیح را با هم جمع می‌کند و نتیجه را برمی‌گرداند"""
    return a + b

if __name__ == "__main__":
    mcp.run()`
    }
  },
  {
    stepNumber: 'فصل ۰۶',
    keyHint: 'M6',
    badgeFa: 'تست و عیب‌یابی تصویری',
    titleFa: 'تست سرور با ابزار تصویری MCP Inspector (قبل از اتصال به کلاد)',
    titleEn: 'Testing Your MCP Server Visually with MCP Inspector',
    deepDiveFa: [
      'قبل از اینکه سرور را به Claude Desktop وصل کنید، بهترین کار این است که با ابزار رسمی **MCP Inspector** در مرورگر خودتان تست کنید که سرور بدون خطا کار می‌کند.',
      '۱. در ترمینال دستور `uv run mcp dev server.py` را اجرا کنید. (اگر اولین بار سوال `Ok to proceed? (y)` پرسید، حرف `y` را بزنید و Enter کنید).',
      '۲. یک صفحه وب به صورت محلی (`localhost`) در مرورگر باز می‌شود. روی دکمه **Connect** در سمت چپ کلیک کنید.',
      '۳. از منوی بالا وارد تب **Tools** شوید، روی `List Tools` کلیک کنید، ابزار `add` را انتخاب کرده و دو عدد (مثلاً ۵ و ۳) به آن بدهید و `Run Tool` را بزنید. وقتی عدد ۸ را برگرداند، یعنی سرور شما ۱۰۰٪ سالم است!'
    ],
    proTipFa:
      'استفاده از MCP Inspector ساعت‌ها در وقت شما صرفه‌جویی می‌کند، چون اگر خطایی در کد پایتون باشد همان‌جا قبل از درگیر شدن با تنظیمات Claude به شما نشان می‌دهد.',
    codeOrConfigSnippet: {
      titleFa: 'دستور اجرای محیط تست گرافیکی MCP Inspector:',
      language: 'bash',
      code: `uv run mcp dev server.py`
    }
  },
  {
    stepNumber: 'فصل ۰۷',
    keyHint: 'M7',
    badgeFa: 'اتصال به Claude Desktop',
    titleFa: 'اتصال سرور MCP به Claude Desktop (روش دستی و ۱۰۰٪ تضمینی در ویندوز و مک)',
    titleEn: 'Connecting Your MCP Server to Claude Desktop (Reliable Manual Method)',
    deepDiveFa: [
      'چرا نباید از دستور خودکار `mcp install` روی ویندوز استفاده کنیم؟ چون نسخه ویندوز Claude Desktop به صورت پکیج MSIX در یک مسیر مجازی‌سازی‌شده نصب می‌شود و دستور خودکار اغلب خطای `Claude app not found` می‌دهد یا فایل اشتباهی را ویرایش می‌کند. روش دستی زیر همیشه ۱۰۰٪ کار می‌کند:',
      'قدم ۱: در ترمینال پروژه دستور `uv run python -c "import sys; print(sys.executable)"` را بزنید تا مسیر دقیق فایل `python.exe` داخل پوشه `.venv` پروژه را به شما بدهد.',
      'قدم ۲: در برنامه Claude Desktop وارد `Settings -> Developer -> Edit Config` شوید تا فایل واقعی `claude_desktop_config.json` باز شود.',
      'قدم ۳: بلوک JSON سرور خود را اضافه کنید (در ویندوز حتماً هر بک‌اسلش `\\` را دوتا کنید یعنی `\\\\`).',
      'قدم ۴: برنامه Claude را از کنار ساعت ویندوز (System Tray) راست‌کلیک کرده و **Quit** بزنید (زدن ضربدر قرمز کافی نیست!) و دوباره باز کنید.'
    ],
    proTipFa:
      'پس از باز کردن مجدد Claude، در کادر چت بنویسید: «با استفاده از ابزارت عدد ۱۲۴ و ۲۹۸ را جمع کن». کلاد پنجره اجازه دسترسی را نشان می‌دهد و با فراخوانی سرور شما پاسخ ۴۲۲ را برمی‌گرداند!',
    codeOrConfigSnippet: {
      titleFa: 'پیدا کردن مسیر پایتون + کد claude_desktop_config.json:',
      language: 'json',
      code: `// ۱. دستور پیدا کردن مسیر دقیق python.exe در ترمینال:
// uv run python -c "import sys; print(sys.executable)"

// ۲. قرار دادن در فایل claude_desktop_config.json:
{
  "mcpServers": {
    "hozhi-first-server": {
      "command": "C:\\\\path\\\\to\\\\mcp-server-demo\\\\.venv\\\\Scripts\\\\python.exe",
      "args": [
        "C:\\\\path\\\\to\\\\mcp-server-demo\\\\server.py"
      ]
    }
  }
}`
    }
  },
  {
    stepNumber: 'فصل ۰۸',
    keyHint: 'M8',
    badgeFa: 'اتصال به Cursor',
    titleFa: 'اتصال سرور MCP به ادیتور هوشمند Cursor',
    titleEn: 'Connecting Your MCP Server to Cursor AI IDE',
    deepDiveFa: [
      'یکی از بزرگ‌ترین مزایای استاندارد بودن MCP این است که همان سروری را که برای Claude Desktop ساختید، بدون تغییر حتی یک خط کد می‌توانید به ادیتور **Cursor** هم وصل کنید!',
      '۱. در برنامه Cursor وارد `Cursor Settings -> MCP` شوید.',
      '۲. روی دکمه `Add new global MCP server` کلیک کنید.',
      '۳. دقیقاً همان ساختار `mcpServers` (شامل مسیر `python.exe` محیط مجازی و مسیر فایل `server.py`) را در فایل تنظیمات MCP کرسر قرار دهید تا چراغ وضعیت سرور سبز شود.'
    ],
    proTipFa:
      'وقتی سرور MCP شما در Cursor سبز شود، ایجنت داخل Cursor می‌تواند در حین کدنویسی یا مدیریت پروژه، ابزارهای اختصاصی شما را مستقیماً صدا بزند.'
  },
  {
    stepNumber: 'فصل ۰۹',
    keyHint: 'M9',
    badgeFa: 'پروژه عملی واقعی',
    titleFa: 'ساخت سرور واقعی MCP: دستیار هوشمند مدیریت کارها (Todo Manager Server)',
    titleEn: 'Building a Real-World MCP Server: Persistent Task Manager (todo_server.py)',
    deepDiveFa: [
      'حالا یک سرور واقعی و کاربردی می‌سازیم: دستیار مدیریت کارها (`todo_server.py`) که به هوش مصنوعی اجازه می‌دهد کار جدید اضافه کند (`add_task`)، لیست کارها را بخواند (`list_tasks`) و کارهای انجام‌شده را تیک بزند (`complete_task`). تمام کارها در یک فایل محلی `tasks.json` ذخیره می‌شوند.',
      '💡 نکته طلایی و بسیار مهم `Path(__file__).parent`: هرگز در کد سرور ننویسید `Path("tasks.json")`! چرا؟ چون وقتی Claude Desktop سرور شما را اجرا می‌کند، پوشه کاری آن یک مسیر سیستمی ویندوز است که اجازه ساخت فایل ندارد و خطای Permission می‌گیرید. با نوشتن `Path(__file__).parent / "tasks.json"`، فایل همیشه دقیقاً در کنار خود فایل `todo_server.py` ساخته می‌شود.'
    ],
    proTipFa:
      'پس از اتصال این سرور به کلاد، کافی است به زبان فارسی معمولی بگویید: «این ۳ کار را به لیست من اضافه کن: بررسی صورت‌وضعیت پیمانکار، ارسال نامه کارگاه، و جلسه هفتگی» تا کلاد خودش ۳ بار ابزار `add_task` را اجرا کند!',
    codeOrConfigSnippet: {
      titleFa: 'کد کامل و آماده اجرای todo_server.py (سرور مدیریت کارها):',
      language: 'python',
      code: `import json
from pathlib import Path
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("todo-manager")

# ذخیره فایل دقیقاً در کنار همین فایل پایتون (جلوگیری از خطای دسترسی ویندوز)
TASKS_FILE = Path(__file__).parent / "tasks.json"

def load_tasks() -> list:
    """کارها را از فایل JSON می‌خواند"""
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text(encoding="utf-8"))
    return []

def save_tasks(tasks: list) -> None:
    """کارها را در فایل JSON ذخیره می‌کند"""
    TASKS_FILE.write_text(
        json.dumps(tasks, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

@mcp.tool()
def add_task(title: str) -> str:
    """یک کار جدید به لیست کارها اضافه می‌کند"""
    tasks = load_tasks()
    new_task = {"id": len(tasks) + 1, "title": title, "done": False}
    tasks.append(new_task)
    save_tasks(tasks)
    return f"کار جدید اضافه شد: {title}"

@mcp.tool()
def list_tasks() -> str:
    """همه‌ی کارهای موجود در لیست را نمایش می‌دهد"""
    tasks = load_tasks()
    if not tasks:
        return "هیچ کاری در لیست ثبت نشده است."
    result = []
    for task in tasks:
        status = "✅ انجام‌شده" if task["done"] else "⏳ در انتظار"
        result.append(f'{task["id"]}. {task["title"]} ({status})')
    return "\\n".join(result)

@mcp.tool()
def complete_task(task_id: int) -> str:
    """یک کار را با شماره شناسه آن انجام‌شده علامت می‌زند"""
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            save_tasks(tasks)
            return f"کار شماره {task_id} انجام‌شده علامت خورد."
    return f"کاری با شماره {task_id} پیدا نشد."

if __name__ == "__main__":
    mcp.run()`
    }
  },
  {
    stepNumber: 'فصل ۱۰',
    keyHint: 'M10',
    badgeFa: 'سرورهای آماده جهانی',
    titleFa: 'اضافه کردن سرورهای MCP آماده و رایگان (بدون نیاز به کدنویسی با npx)',
    titleEn: 'Adding Free Ready-Made MCP Servers (Filesystem, GitHub, SQLite via npx)',
    deepDiveFa: [
      'شما مجبور نیستید همه سرورهای MCP را خودتان بنویسید! صدها سرور رسمی و رایگان توسط شرکت‌ها و جامعه برنامه‌نویسی ساخته شده‌اند که می‌توانید از سایت‌های زیر پیدا کنید:',
      '• مخزن رسمی گیت‌هاب: `github.com/modelcontextprotocol/servers`',
      '• دایرکتوری‌های معتبر سرورهای آماده: `smithery.ai` ، `glama.ai/mcp/servers` و `mcp.so`',
      'چرا سرورهای آماده با دستور `npx` اجرا می‌شوند نه `python`؟ چون پروتکل MCP به هیچ زبان برنامه‌نویسی خاصی وابسته نیست! هر کسی می‌تواند با Python یا Node.js سرور بسازد. دستور `npx -y` همراه Node.js می‌آید و پکیج سرور آماده (مثل سرور `filesystem` برای مدیریت فایل‌های کامپیوتر یا اتصال به والت Obsidian) را مستقیم دانلود و اجرا می‌کند.'
    ],
    proTipFa:
      'نکته مهم هنگام کار با سرور Filesystem در Claude: آدرس پوشه یا درایو را در پرامپت خود کامل و صریح بنویسید تا Claude به جای ابزار داخلی خودش، از سرور MCP شما استفاده کند.',
    codeOrConfigSnippet: {
      titleFa: 'کانفیگ هم‌زمان سرور پایتونی ما + سرور آماده Filesystem در کلاد:',
      language: 'json',
      code: `{
  "mcpServers": {
    "todo-manager": {
      "command": "C:\\\\path\\\\to\\\\.venv\\\\Scripts\\\\python.exe",
      "args": ["C:\\\\path\\\\to\\\\todo_server.py"]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/MIND"
      ]
    }
  }
}`
    }
  },
  {
    stepNumber: 'فصل ۱۱',
    keyHint: 'M11',
    badgeFa: 'عیب‌یابی و رفع خطا',
    titleFa: 'رفع ۷ خطای پرتکرار در راه‌اندازی MCP + سه قانون طلایی JSON',
    titleEn: 'Troubleshooting the 7 Most Common MCP Errors & 3 Golden JSON Rules',
    deepDiveFa: [
      'بیش از ۹۰٪ مشکلات هنگام اتصال سرور MCP به Claude یا Cursor ناشی از ۳ چیز است: ۱) ساختار فایل JSON، ۲) مسیر فایل‌ها در ویندوز، یا ۳) نسخه کتابخانه.',
      'سه قانون طلایی فایل کانفیگ JSON که جلوی اکثر خطاها را می‌گیرد:',
      '۱) کل محتوا باید داخل آکولاد `{ }` باشد و همه سرورها زیرمجموعه کلید `"mcpServers"` قرار بگیرند.',
      '۲) بین دو سرور حتماً ویرگول (`,`) بگذارید، اما بعد از آخرین سرور ویرگول نگذارید (می‌توانید کد خود را در سایت `jsonlint.com` تست کنید).',
      '۳) در ویندوز هر بک‌اسلش `\\` در مسیر فایل‌های پایتون را حتماً دوتا کنید (`\\\\`).'
    ],
    proTipFa:
      'جدول کامل عیب‌یابی ۷ خطای پرتکرار MCP را در بخش پایین همین صفحه قرار داده‌ایم تا هر زمان به خطایی برخوردید در چند ثانیه آن را برطرف کنید.'
  },
  {
    stepNumber: 'فصل ۱۲',
    keyHint: 'M12',
    badgeFa: 'امنیت و گام‌های بعدی',
    titleFa: 'جمع‌بندی، ۴ قانون طلایی امنیت در MCP و مسیر پیشرفت',
    titleEn: 'Security Best Practices in MCP & Next Steps (Remote Servers, Resources)',
    deepDiveFa: [
      'وقتی یک سرور MCP می‌سازید یا نصب می‌کنید، به هوش مصنوعی قدرت اجرای عملیات واقعی روی کامپیوترتان را می‌دهید. بنابراین رعایت این ۴ اصل امنیتی الزامی است:',
      '۱. اصل کمترین دسترسی (Least Privilege): مثلاً به سرور Filesystem هرگز دسترسی کل درایو `C:\\` را ندهید! فقط همان یک پوشه مشخصی که لازم دارد (مثلاً `D:/MIND`) را معرفی کنید.',
      '۲. عدم قرار دادن رمز عبور و API Key در کد: هرگز پسوردها یا کلیدهای محرمانه را مستقیم داخل کد `server.py` ننویسید.',
      '۳. نصب سرورهای آماده فقط از منابع معتبر: فقط سرورهایی را نصب کنید که سورس آن‌ها در گیت‌هاب رسمی یا سایت‌های معتبر بررسی شده باشد.',
      '۴. قدم‌های بعدی شما پس از این آموزش: افزودن `Resources` و `Prompts` به سرور خود، و ساخت سرورهای راه‌دور (Remote MCP) با پروتکل `Streamable HTTP` برای اشتراک‌گذاری با اعضای تیم.'
    ],
    proTipFa:
      'اکنون هر سه ضلع مثلث طلایی هوش مصنوعی سال ۲۰۲۶ را در اختیار دارید: ۱) Skill (مغز و روش انجام کار)، ۲) Obsidian (حافظه دائمی مغز دوم)، و ۳) MCP (دست و پا و اتصال به ابزارهای واقعی)!'
  }
];

export const MCP_TROUBLESHOOTING_TABLE: McpTroubleshootingItem[] = [
  {
    errorTitle: '۱. خطای No server object found',
    causeFa: 'کد داخل فایل server.py ذخیره نشده (Ctrl+S نزده‌اید) یا خط mcp = FastMCP(...) دارای فاصله/تورفتگی در اول خط است.',
    solutionFa: 'فایل را با Ctrl+S ذخیره کنید و مطمئن شوید خط تعریف mcp دقیقاً به ابتدای خط (سمت چپ) چسبیده است.'
  },
  {
    errorTitle: '۲. خطای No module named "mcp.server.fastmcp"',
    causeFa: 'نسخه ۲ کتابخانه MCP به جای نسخه پایدار ۱ نصب شده است.',
    solutionFa: 'در ترمینال پروژه دستور uv add "mcp[cli]>=1.28,<2" را اجرا کنید تا روی نسخه ۱ قفل شود.'
  },
  {
    errorTitle: '۳. خطای The system cannot find the path specified',
    causeFa: 'مسیر فایل در کانفیگ اشتباه است یا در ویندوز بک‌اسلش‌ها را دوتا (\\\\) نکرده‌اید.',
    solutionFa: 'مسیر دقیق python.exe را با دستور sys.executable بگیرید و هر \\ را به \\\\ تبدیل کنید.'
  },
  {
    errorTitle: '۴. دو سرور مختلف ابزارهای شبیه هم نشان می‌دهند',
    causeFa: 'در فایل کانفیگ، بخش args سرور دوم به اشتباه به فایل پایتون سرور اول اشاره می‌کند.',
    solutionFa: 'بررسی کنید که args هر سرور دقیقاً به فایل پایتون خودش (مثلاً todo_server.py) اشاره کند.'
  },
  {
    errorTitle: '۵. خطای دسترسی هنگام ذخیره فایل (tasks.json)',
    causeFa: 'مسیر فایل را به صورت نسبی Path("tasks.json") نوشته‌اید که در پوشه سیستمی قفل‌شده کلاد اجرا می‌شود.',
    solutionFa: 'همیشه مسیر را با Path(__file__).parent / "tasks.json" بنویسید تا کنار فایل پایتون ذخیره شود.'
  },
  {
    errorTitle: '۶. سرور اصلاً در Claude Desktop دیده نمی‌شود',
    causeFa: 'خطای سینتکس ویرگول در JSON وجود دارد یا برنامه Claude را از System Tray کامل Quit نکرده‌اید.',
    solutionFa: 'کد JSON را در سایت jsonlint.com چک کنید و روی آیکون Claude کنار ساعت ویندوز راست‌کلیک کرده و Quit بزنید.'
  },
  {
    errorTitle: '۷. فایل در جای اشتباه ساخته می‌شود (در سرور Filesystem)',
    causeFa: 'در حالت Agent، کلاد ممکن است از ابزار ساخت فایل داخلی خودش به جای سرور MCP شما استفاده کند.',
    solutionFa: 'در پرامپت خود مسیر کامل درایو را بنویسید و صریح بگویید با ابزار filesystem این کار را انجام دهد.'
  }
];
